namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
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

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteContent(Guid id)
    {
        await contentService.Delete(id);

        return Ok($"Content with ID '{id}' was removed");
    }

    [HttpGet("allForChapter/{chapterId}")]
    public async Task<IActionResult> GetAllContentsForChapter(Guid chapterId)
    {
        var contents = await contentService.GetAll(chapterId);

        return Ok(contents);
    }

    [HttpPut("rearrange/{chapterId}")]
    public async Task<IActionResult> RearrangeContents(Guid chapterId, List<IdWithPosition> idsWithPositions)
    {
        await contentService.Rearrange(chapterId, idsWithPositions);

        return Ok("Contets have been rearranged");
    }
}
