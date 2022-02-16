namespace WebApi.Models;

public class UserBadge
{
    [Key]
    public Guid UserId { get; set; }

    [Key]
    public Guid BadgeId { get; set; }

    public virtual User User { get; set; }

    public virtual Badge Badge { get; set; }
}
