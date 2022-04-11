namespace WebApi.Services;

public interface IDocumentService
{
    Task<string> Save(IFormFile file);

    bool Delete(string fileName);

    string Get(string fileName);
}
