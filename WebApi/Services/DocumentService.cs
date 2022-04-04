namespace WebApi.Services;

public class DocumentService : IDocumentService
{
    public bool Delete(string fileName)
    {
        var filePath = GetFilePath(fileName);

        if (!File.Exists(filePath))
            return false; 

        File.Delete(filePath);
        return true;
    }

    public async Task<string> Save(IFormFile file)
    {
        if (file.Length <= 0)
            return null;

        var extension = Path.GetExtension(file.FileName);

        var uniqueFileName = Guid.NewGuid().ToString() + extension;
        var uniqueFilePath = GetFilePath(uniqueFileName);

        using (var stream = File.Create(uniqueFilePath))
        {
            await file.CopyToAsync(stream);
        }

        return uniqueFileName;
    }

    private string GetFilePath(string fileName) =>
        Path.Combine(Constants.FileUploadDirectory, fileName);
}
