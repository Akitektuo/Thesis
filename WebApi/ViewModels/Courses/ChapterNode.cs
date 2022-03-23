namespace WebApi.ViewModels.Courses;

public class ChapterNode
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public bool Unlocked { get; set; }

    public bool Completed { get; set; }

    public int Points { get; set; }

    public int Level { get; set; }

    public List<ChapterNode> Chapters { get; set; }
}
