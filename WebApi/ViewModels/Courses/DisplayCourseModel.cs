namespace WebApi.ViewModels.Courses;

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

    public DisplayCourseModel(
        Course course,
        Tuple<int, int> completedAndTotalCHapters,
        int availablePoints)
    {
        Id = course.Id;
        Name = course.Name;
        Image = course.Image;
        CompletedChapters = completedAndTotalCHapters.Item1;
        TotalChapters = completedAndTotalCHapters.Item2;
        AvailablePoints = availablePoints;
    }
}
