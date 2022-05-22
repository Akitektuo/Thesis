namespace WebApi.Models;

public class UserChapter
{
    [Key]
    public Guid UserId { get; set; }

    [Key]
    public Guid ChapterId { get; set; }

    public virtual User User { get; set; }

    public virtual Chapter Chapter { get; set; }

    public string FileName { get; set; }

    public bool Approved { get; set; }

    public string Message { get; set; }

    public UserChapter()
    {
    }

    public UserChapter(Guid userId, Guid chapterId)
    {
        UserId = userId;
        ChapterId = chapterId;
        FileName = "";
        Approved = false;
        Message = "";
    }
}
