namespace WebApi.Services;

public class CourseService : ICourseService
{
    private readonly DataContext context;
    private readonly IUserService userService;

    public CourseService(DataContext context, IUserService userService)
    {
        this.context = context;
        this.userService = userService;
    }

    public async Task<Course> Create(Course course)
    {
        await userService.EnsureCurrentIsAdmin();

        await context.AddAsync(course);
        await context.SaveChangesAsync();

        return course;
    }

    public async Task<List<Course>> GetAll()
    {
        await userService.EnsureCurrentIsAdmin();

        var allCourses = await context.Courses.ToListAsync();
        return allCourses;
    }

    public async Task<List<DisplayCourseModel>> GetAllForUser()
    {
        var allCourses = await context.Courses.Include(course => course.Chapters)
            .ToListAsync();

        var userChapters = await GetCurrentUserChapters();
      
        return allCourses.Select(course => MapCourseToDisplay(course, userChapters))
            .ToList();
    }

    public async Task<Course> Update(Course course)
    {
        await userService.EnsureCurrentIsAdmin();

        var existingCourse = await context.Courses.FindAsync(course.Id);
        if (existingCourse == null)
            throw new ClientException($"No course was found with ID '{course.Id}'");

        existingCourse.Name = course.Name;
        existingCourse.Image = course.Image;

        context.Update(existingCourse);
        await context.SaveChangesAsync();

        return course;
    }

    public async Task<CourseDetailsModel> Get(Guid id)
    {
        var course = await context.Courses.Include(course => course.Chapters)
            .ThenInclude(chapter => chapter.ParentChapter)
            .FirstOrDefaultAsync(course => course.Id == id);

        if (course == null)
            throw new ClientException($"No course was found with ID '{course.Id}'");

        await MarkCourseStartedForCurrentUser(id);

        var userChapters = await GetCurrentUserChapters();

        (var completed, var total) = GetCompletedAndTotalChapters(userChapters, course.Chapters);

        var rootChapter = MapChaptersAsTree(course.Chapters, userChapters);

        return new CourseDetailsModel
        {
            Id = id,
            Name = course.Name,
            CompletedChapters = completed,
            TotalChapters = total,
            RootChapter = rootChapter
        };
    }

    private Task<List<UserChapter>> GetCurrentUserChapters()
    {
        var userId = userService.GetCurrentUserId();

        return context.UserChapters.Where(userChapter => userChapter.UserId == userId)
            .ToListAsync();
    }

    private Tuple<int, int> GetCompletedAndTotalChapters(
        List<UserChapter> userChapters,
        ICollection<Chapter> chapters)
    {
        return new(userChapters.Count(userChapter => userChapter.Approved), chapters.Count);
    }

    private ChapterNode MapChaptersAsTree(
        ICollection<Chapter> chapters,
        List<UserChapter> userChapters,
        Chapter chapter = null)
    {
        var root = chapter ?? chapters.FirstOrDefault(chapter => chapter.ParentChapterId == null);

        if (root == null)
            return null;

        return new ChapterNode
        {
            Id = root.Id,
            Name = root.Name,
            Completed = userChapters.Any(userChapter =>
                userChapter.ChapterId == root.Id && userChapter.Approved),
            Level = root.Level,
            Points = root.Points,
            Unlocked = root.ParentChapterId == null || userChapters.Any(userChapter =>
                userChapter.ChapterId == root.Id),
            Chapters = chapters.Where(chapter => chapter.ParentChapterId == root.Id)
                .Select(chapter => MapChaptersAsTree(chapters, userChapters, chapter))
                .ToList()
        };
    }

    private int GetPointsToCollect(
        List<UserChapter> userChapters,
        ICollection<Chapter> chapters) =>
        chapters.Where(chapter =>
            userChapters.All(userChapters =>
                userChapters.ChapterId != chapter.Id || !userChapters.Approved))
            .Sum(chapter => chapter.Points);

    private DisplayCourseModel MapCourseToDisplay(
        Course course,
        List<UserChapter> userChapters)
    {
        var completedAndTotalChapters =
            GetCompletedAndTotalChapters(userChapters, course.Chapters);
        var availablePoints = GetPointsToCollect(userChapters, course.Chapters);

        return new(course, completedAndTotalChapters, availablePoints);
    }

    private async Task MarkCourseStartedForCurrentUser(Guid courseId)
    {
        var userId = userService.GetCurrentUserId();

        var isCourseRelationShip = await context.UserCourses.AnyAsync(c => c.CourseId == courseId);
        if (isCourseRelationShip)
            return;

        await context.AddAsync(new UserCourse
        {
            UserId = userId,
            CourseId = courseId
        });

        var rootChapter = await context.Chapters.FirstOrDefaultAsync(chapter =>
            chapter.CourseId == courseId && chapter.ParentChapterId == null);

        await context.AddAsync(new UserChapter(userId, rootChapter.Id));
        // TODO: Maybe also add a badge 'Oh, what's this? :eyes:'
        await context.SaveChangesAsync();
    }
}
