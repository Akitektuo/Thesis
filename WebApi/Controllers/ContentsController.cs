namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContentsController : ControllerBase
{
    private readonly IContentService contentService;

    public ContentsController(IContentService contentService)
    {
        this.contentService = contentService;
    }

    [HttpPost]
    public async Task<IActionResult> CreateContent(Content content)
    {
        ClientException.ValidateModel(ModelState);

        var createdContent = await contentService.Create(content);

        return Ok(createdContent);
    }

    [HttpPut]
    public async Task<IActionResult> UpdateContent(Content content)
    {
        ClientException.ValidateModel(ModelState);

        var updatedContent = await contentService.Update(content);

        return Ok(updatedContent);
    }

    [HttpGet("allForChapter/{chapterId}")]
    public async Task<IActionResult> GetAllContentsForChapter(Guid chapterId)
    {
        var contents = await contentService.GetAll(chapterId);

        return Ok(contents);
    }

    [HttpPut]
    public async Task<IActionResult> RearrangeContents(List<IdWithPosition> idsWithPositions)
    {
        await contentService.Rearrange(idsWithPositions);

        return Ok("Contets have been rearranged");
    }
}
