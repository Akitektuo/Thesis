namespace WebApi.Models;

public class Course
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string Image { get; set; }

    public virtual ICollection<Chapter> Chapters { get; set; }
}
