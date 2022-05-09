namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class ChaptersController : ControllerBase
{
    private readonly IChapterService chapterService;

    public ChaptersController(IChapterService chapterService)
    {
        this.chapterService = chapterService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateChapter(Chapter chapter)
    {
        ClientException.ValidateModel(ModelState);

        var createdChapter = await chapterService.Create(chapter);

        return Ok(createdChapter);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateChapter(Chapter chapter)
    {
        ClientException.ValidateModel(ModelState);

        var updatedChapter = await chapterService.Update(chapter);

        return Ok(updatedChapter);
    }

    [HttpGet("allForCourse/{courseId}")]
    public async Task<IActionResult> GetAllChaptersForCourse(Guid courseId)
    {
        var chapters = await chapterService.GetAll(courseId);

        return Ok(chapters);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetChapter(Guid id)
    {
        var chapter = await chapterService.Get(id);

        return Ok(chapter);
    }

    [HttpPost("{id}")]
    public async Task<IActionResult> PostChapterSolution(Guid id, string fileName)
    {
        var chapter = await chapterService.PostSolution(id, fileName);

        return Ok(chapter);
    }
}
