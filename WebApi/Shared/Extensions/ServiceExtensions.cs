namespace WebApi.Shared.Extensions;

public static class ServiceExtensions
{
    public static Guid GetUserId(this IHttpContextAccessor httpContextAccessor)
    {
        var userId = httpContextAccessor.HttpContext?.User.FindFirst(ClaimTypes.NameIdentifier);

        return new Guid(userId?.Value);
    }
}
