namespace WebApi.ViewModels;

public class DisplayCourseModel
{
    public Guid Id { get; set; }

    public string Name { get; set; }

    public string Image { get; set; }

    public int AvailablePoints { get; set; }

    public int TotalChapters { get; set; }

    public int CompletedChapters { get; set; }

    public DisplayCourseModel()
    {
    }

    public DisplayCourseModel(Course course)
    {
        Id = course.Id;
        Name = course.Name;
        Image = course.Image;
        AvailablePoints = 0;
        TotalChapters = 0;
        CompletedChapters = 0;
    }
}
