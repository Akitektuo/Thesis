namespace WebApi.Models;

public class UserCourse
{
    [Key]
    public Guid UserId { get; set; }

    [Key]
    public Guid CourseId { get; set; }

    public virtual User User { get; set; }

    public virtual Course Course { get; set; }
}
