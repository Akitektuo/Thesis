namespace WebApi.ViewModels.Courses;

public class CourseDetailsModel
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public int TotalChapters { get; set; }

    public int CompletedChapters { get; set; }

    public ChapterNode RootChapter { get; set; }
}
