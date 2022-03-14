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
        var isCurrentUserAdmin = await userService.IsCurrentAdmin();
        if (!isCurrentUserAdmin)
            throw new ClientException("Forbidden");

        await context.AddAsync(course);
        await context.SaveChangesAsync();

        return course;
    }

    public async Task<List<Course>> GetAll()
    {
        var isCurrentUserAdmin = await userService.IsCurrentAdmin();
        if (!isCurrentUserAdmin)
            throw new ClientException("Forbidden");

        var allCourses = await context.Courses.ToListAsync();
        return allCourses;
    }

    public async Task<List<DisplayCourseModel>> GetAllForUser()
    {
        var userCourses = await context.Courses.Select(course => new DisplayCourseModel(course))
            .ToListAsync();

        return userCourses;
    }

    public async Task<Course> Update(Course course)
    {
        var isCurrentUserAdmin = await userService.IsCurrentAdmin();
        if (!isCurrentUserAdmin)
            throw new ClientException("Forbidden");

        var existingCourse = await context.Courses.FindAsync(course.Id);
        if (existingCourse == null)
            throw new ClientException($"No course was found with ID '{course.Id}'");

        existingCourse.Name = course.Name;
        existingCourse.Image = course.Image;

        context.Update(existingCourse);
        await context.SaveChangesAsync();

        return course;
    }
}
