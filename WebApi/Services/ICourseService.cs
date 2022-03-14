namespace WebApi.Services;

public interface ICourseService
{
    Task<List<DisplayCourseModel>> GetAllForUser();

    Task<List<Course>> GetAll();

    Task<Course> Create(Course course);

    Task<Course> Update(Course course);
}
