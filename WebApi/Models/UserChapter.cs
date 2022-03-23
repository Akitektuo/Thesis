namespace WebApi.Models;

public class UserChapter
{
    [Key]
    public Guid UserId { get; set; }

    [Key]
    public Guid ChapterId { get; set; }

    public virtual User User { get; set; }

    public string SolutionPath { get; set; }

    public bool Approved { get; set; }

    public string Message { get; set; }
}
