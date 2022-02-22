namespace WebApi.ViewModels;

public class DisplayBadgeModel
{
    public string Name { get; set; }

    public string Image { get; set; }

    public int Points { get; set; }

    public bool Unlocked { get; set; }

    public DisplayBadgeModel()
    {
    }

    public DisplayBadgeModel(Badge badge, bool unlocked = true)
    {
        Name = badge.Name;
        Image = badge.Image;
        Points = badge.Points;
        Unlocked = unlocked;
    }
}
