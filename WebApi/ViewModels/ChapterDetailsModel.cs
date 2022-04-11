namespace WebApi.ViewModels;

public class ChapterDetailsModel
{
    public Guid CourseId { get; set; }

    public string CourseName { get; set; }

    public string ChapterName { get; set; }

    public int Points { get; set; }

    public string FilesUrl { get; set; }

    public List<ContentModel> Contents { get; set; }

    public bool Approved { get; set; }

    public string Message { get; set; }

    public ChapterDetailsModel()
    {
    }

    public ChapterDetailsModel(Chapter chapter, string filePath, UserChapter userChapter)
    {
        CourseId = chapter.CourseId;
        CourseName = chapter.Course.Name;
        ChapterName = chapter.Name;
        Points = chapter.Points;
        FilesUrl = filePath;
        Contents = chapter.Contents.OrderBy(content => content.Position)
            .Select(content => new ContentModel(content))
            .ToList();
        Approved = userChapter.Approved;
        Message = userChapter.Message;
    }
}
