namespace WebApi.ViewModels.User;

public class UserDashbordModel
{
    public string Email { get; set; }

    public int Level { get; set; }

    public int Experience { get; set; }

    public int LevelMinimumExperience { get; set; }

    public int LevelMaximumExperience { get; set; }

    public IEnumerable<DisplayBadgeModel> TopBadges { get; set; }

    public UserDashbordModel(Models.User user, List<DisplayBadgeModel> topBadges)
    {
        Email = user.Email;
        TopBadges = topBadges;

        SetExperienceRelatedInformation(user.Experience);
    }

    private void SetExperienceRelatedInformation(int experience)
    {
        Experience = experience;
        var experienceSqrt = (experience / 100).Sqrt();

        Level = experienceSqrt + 1;
        LevelMinimumExperience = experienceSqrt.Pow(2) * 100;
        LevelMaximumExperience = (experienceSqrt + 1).Pow(2) * 100;
    }
}
