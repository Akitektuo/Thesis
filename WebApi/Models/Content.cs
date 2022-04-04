namespace WebApi.Models;

public class Content
{
    public Guid Id { get; set; }

    public Guid ChapterId { get; set; }

    public virtual Chapter Chapter { get; set; }

    public ContentType Type { get; set; }

    public int Position { get; set; }

    public string Text { get; set; }
}
