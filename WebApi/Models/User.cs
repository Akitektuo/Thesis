namespace WebApi.Models;

public class User : IdentityUser<Guid>
{
    public int Experience { get; set; }

    public bool IsAdmin { get; set; }

    public virtual ICollection<UserBadge> UserBadges { get; set; }

    public virtual ICollection<UserCourse> UserCourses { get; set; }
}
