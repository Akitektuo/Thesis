namespace WebApi.Models;

public class Chapter
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public int Points { get; set; }

    public int Level { get; set; }

    public Guid? ParentChapterId { get; set; }

    public virtual Chapter ParentChapter { get; set; }

    public string FileName { get; set; }

    public Guid CourseId { get; set; }

    public virtual Course Course { get; set; }

    public virtual ICollection<Content> Contents { get; set; }
}
