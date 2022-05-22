namespace WebApi.Services;

public class ChapterService : IChapterService
{
    private readonly DataContext context;
    private readonly IUserService userService;
    private readonly IDocumentService documentService;
    private readonly IEvaluatorService evaluatorService;
    private readonly IBadgeService badgeService;

    public ChapterService(
        DataContext context,
        IUserService userService,
        IDocumentService documentService,
        IEvaluatorService evaluatorService, 
        IBadgeService badgeService)
    {
        this.context = context;
        this.userService = userService;
        this.documentService = documentService;
        this.evaluatorService = evaluatorService;
        this.badgeService = badgeService;
    }

    public async Task<List<Chapter>> GetAll(Guid courseId)
    {
        await userService.EnsureCurrentIsAdmin();
        
        var chapters = await context.Chapters.Where(chapter => chapter.CourseId == courseId)
            .ToListAsync();

        return chapters;
    }

    public async Task<Chapter> Create(Chapter chapter)
    {
        await userService.EnsureCurrentIsAdmin();

        await context.AddAsync(chapter);
        await context.SaveChangesAsync();

        return chapter;
    }

    public async Task<Chapter> Update(Chapter chapter)
    {
        await userService.EnsureCurrentIsAdmin();

        var existingChapter = await context.Chapters.FindAsync(chapter.Id);
        if (existingChapter == null)
            throw new ClientException($"No chapter was found with ID '{chapter.Id}'");

        if (existingChapter.FileName != chapter.FileName)
        {
            documentService.Delete(existingChapter.FileName);
            existingChapter.FileName = chapter.FileName;
        }

        existingChapter.Level = chapter.Level;
        existingChapter.Name = chapter.Name;
        existingChapter.ParentChapterId = chapter.ParentChapterId;
        existingChapter.Points = chapter.Points;

        context.Update(existingChapter);
        await context.SaveChangesAsync();

        return chapter;
    }

    public async Task<ChapterDetailsModel> Get(Guid id)
    {
        var chapter = await context.Chapters.Include(chapter => chapter.Course)
            .Include(chapter => chapter.Contents)
            .FirstOrDefaultAsync(chapter => chapter.Id == id);
        if (chapter == null)
            throw new ClientException($"No chapter was found with ID '{chapter.Id}'");

        var userChapter = await GetOrCreateUserChapter(id);

        return new ChapterDetailsModel(chapter, userChapter);
    }

    private async Task<UserChapter> GetOrCreateUserChapter(Guid chapterId)
    {
        var userId = userService.GetCurrentUserId();
        var userChapter = await context.UserChapters.FindAsync(userId, chapterId);
        if (userChapter != null)
            return userChapter;

        userChapter = new UserChapter(userId, chapterId);

        await context.AddAsync(userChapter);
        await badgeService.UnlockBadge(BadgeNames.GettingStarted);
        await context.SaveChangesAsync();

        return userChapter;
    }

    public async Task<SolutionResultModel> PostSolution(Guid chapterId, string fileName)
    {
        var userId = userService.GetCurrentUserId();
        var userChapter = await context.UserChapters.FindAsync(userId, chapterId);
        if (userChapter == null)
            return null;

        var evaluationMessages = evaluatorService.Evaluate(fileName);

        var approved = !evaluationMessages.Any();
        var messages = string.Join("\n\n", evaluationMessages);

        if (approved && !userChapter.Approved)
            await MakeChapterApprovedForUser(userChapter, fileName);
        else if (!userChapter.Approved)
        {
            userChapter.Message = messages;
            await badgeService.UnlockBadge(BadgeNames.FirstFail);
            await UpdateUserChapterAndSetFile(userChapter, fileName);
        }
        else
        {
            await badgeService.UnlockBadge(BadgeNames.Perfectionist);
        }

        return new SolutionResultModel
        {
            Approved = approved,
            Message = messages
        };
    }

    private async Task MakeChapterApprovedForUser(UserChapter userChapter, string fileName)
    {
        userChapter.Approved = true;

        var chapter = await context.Chapters.FindAsync(userChapter.ChapterId);

        await UpdateUserChapterAndSetFile(userChapter, fileName, true);
        await UnlockNextChapters(userChapter.ChapterId, userChapter.UserId);
        await badgeService.UnlockBadge(BadgeNames.TheFirstWin);
        await UnlockFor5Chapters();
        await userService.IncreaseExperience(chapter.Points, userChapter.UserId);
    }

    private async Task UpdateUserChapterAndSetFile(
        UserChapter userChapter, 
        string fileName, 
        bool bypassSaveChanges = false)
    {
        userChapter.FileName = fileName;

        context.Update(userChapter);
        if (!bypassSaveChanges)
            await context.SaveChangesAsync();
    }

    private async Task UnlockNextChapters(Guid forId, Guid userId)
    {
        var userChaptersToAdd = context.Chapters.Where(chapter => chapter.ParentChapterId == forId)
            .Select(chapter => new UserChapter(userId, chapter.Id));
        await context.AddRangeAsync(userChaptersToAdd);
    }

    private async Task UnlockFor5Chapters()
    {
        var completedChapters = 
            await context.UserChapters.CountAsync(userChapter => userChapter.Approved);
        if (completedChapters > 4)
            await badgeService.UnlockBadge(BadgeNames.GettingIntoIt);
    }
}
