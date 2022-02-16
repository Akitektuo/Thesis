namespace WebApi.Services;

public class BadgeService : IBadgeService
{
    private readonly DataContext context;
    private readonly IUserService userService;

    public BadgeService(DataContext context, IUserService userService)
    {
        this.context = context;
        this.userService = userService;
    }

    public async Task<Badge> Create(Badge badge)
    {
        var isCurrentUserAdmin = await userService.IsCurrentAdmin();
        if (!isCurrentUserAdmin)
            throw new ClientException("Forbidden");

        CheckIfNameIsUnique(badge);

        await context.AddAsync(badge);
        await context.SaveChangesAsync();

        return badge;
    }

    public async Task<List<Badge>> GetAll()
    {
        var isCurrentUserAdmin = await userService.IsCurrentAdmin();
        if (!isCurrentUserAdmin)
            throw new ClientException("Forbidden");

        return context.Badges.ToList();
    }

    public async Task<Badge> Update(Badge badge)
    {
        var isCurrentUserAdmin = await userService.IsCurrentAdmin();
        if (!isCurrentUserAdmin)
            throw new ClientException("Forbidden");

        var existingBadge = await context.Badges.FindAsync(badge.Id);
        if (existingBadge == null)
            throw new ClientException($"No badge was found with ID '{badge.Id}'");

        CheckIfNameIsUnique(badge);

        existingBadge.Name = badge.Name;
        existingBadge.Image = badge.Image;
        existingBadge.Points = badge.Points;

        context.Update(existingBadge);
        await context.SaveChangesAsync();

        return badge;
    }

    private void CheckIfNameIsUnique(Badge forBadge)
    {
        if (context.Badges.Any(badge =>
            badge.Id != forBadge.Id && badge.Name == forBadge.Name))
            throw new ClientException(
                $"A badge with the name of '{forBadge.Name}' already exists!");
    }
}
