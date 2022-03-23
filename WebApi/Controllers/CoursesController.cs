namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class CoursesController : ControllerBase
{
    private readonly ICourseService courseService;

    public CoursesController(ICourseService courseService)
    {
        this.courseService = courseService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateCourse(Course course)
    {
        ClientException.ValidateModel(ModelState);

        var createdCourse = await courseService.Create(course);

        return Ok(createdCourse);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateCourse(Course course)
    {
        ClientException.ValidateModel(ModelState);

        var updatedCourse = await courseService.Update(course);

        return Ok(updatedCourse);
    }

    [HttpGet("all")]
    public async Task<IActionResult> GetAllCourses()
    {
        var allCourses = await courseService.GetAll();

        return Ok(allCourses);
    }

    [HttpGet("userAll")]
    public async Task<IActionResult> GetAllUserCourses()
    {
        var allCourses = await courseService.GetAllForUser();

        return Ok(allCourses);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetCourse(Guid id)
    {
        var course = await courseService.Get(id);

        return Ok(course);
    }
}
