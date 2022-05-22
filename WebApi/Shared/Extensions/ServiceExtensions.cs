namespace WebApi.Shared.Extensions;

public static class ServiceExtensions
{
    public static Guid GetUserId(this IHttpContextAccessor httpContextAccessor)
    {
        var userId = httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier);

        return new Guid(userId?.Value);
    }

    public static bool SelectByName(this Badge badge, BadgeNames name) => 
        badge.Name.Replace(" ", "").Equals(name.Get(), StringComparison.OrdinalIgnoreCase);
}
