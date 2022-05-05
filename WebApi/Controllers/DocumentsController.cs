namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class DocumentsController : ControllerBase
{
    private readonly IDocumentService documentService;

    public DocumentsController(IDocumentService documentService)
    {
        this.documentService = documentService;
    }

    [HttpPost]
    public async Task<IActionResult> Upload(IFormFile file)
    {
        var result = await documentService.Save(file);

        if (result == null)
            return BadRequest("Empty file");

        return Ok(result);
    }

    [HttpGet]
    public async Task<IActionResult> Download(string fileName)
    {
        var file = documentService.GetBytes(fileName);

        return Ok(file);
    }
}
