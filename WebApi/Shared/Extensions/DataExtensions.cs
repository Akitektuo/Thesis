namespace WebApi.Shared.Extensions;

public static class DataExtensions
{
    public static bool? ToBool(this string fromString)
    {
        try
        {
            return bool.Parse(fromString);
        }
        catch
        {
            return null;
        }
    }

    public static int? ToInt(this string fromString)
    {
        try
        {
            return int.Parse(fromString);
        }
        catch
        {
            return null;
        }
    }

    public static async Task<object> ToObjectAsync(this MemoryStream fromStream)
    {
        try
        {
            fromStream.Seek(0, SeekOrigin.Begin);
            return await JsonSerializer.DeserializeAsync<object>(fromStream);
        }
        catch
        {
            return null;
        }
    }

    public static async Task<string> ToStringAsync(this MemoryStream fromStream)
    {
        try
        {
            fromStream.Seek(0, SeekOrigin.Begin);
            return await new StreamReader(fromStream).ReadToEndAsync();
        }
        catch
        {
            return null;
        }
    }

    public static string Get(this BadgeNames names) => Enum.GetName(names);
}
