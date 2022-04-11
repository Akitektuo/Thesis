namespace WebApi.Services;

public class ChapterService : IChapterService
{
    private readonly DataContext context;
    private readonly IUserService userService;
    private readonly IDocumentService documentService;

    public ChapterService(
        DataContext context, 
        IUserService userService, 
        IDocumentService documentService)
    {
        this.context = context;
        this.userService = userService;
        this.documentService = documentService;
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

        if (existingChapter.FilesPath != chapter.FilesPath)
        {
            documentService.Delete(existingChapter.FilesPath);
            existingChapter.FilesPath = chapter.FilesPath;
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
        var filePath = documentService.Get(chapter.FilesPath);

        return new ChapterDetailsModel(chapter, filePath, userChapter);
    }

    private async Task<UserChapter> GetOrCreateUserChapter(Guid chapterId)
    {
        var userId = userService.GetCurrentUserId();
        var userChapter = await context.UserChapters.FindAsync(userId, chapterId);
        if (userChapter != null)
            return userChapter;

        userChapter = new()
        {
            UserId = userId,
            ChapterId = chapterId,
            Approved = false,
            Message = "",
            SolutionPath = ""
        };

        await context.UserChapters.AddAsync(userChapter);
        await context.SaveChangesAsync();

        return userChapter;
    }
}
