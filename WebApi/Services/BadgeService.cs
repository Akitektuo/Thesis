namespace WebApi.Services;

public class BadgeService : IBadgeService
{
    private readonly DataContext context;
    private readonly IUserService userService;
    private readonly IHubContext<AchievementHub> hub;

    public BadgeService(
        DataContext context, 
        IUserService userService, 
        IHubContext<AchievementHub> hub)
    {
        this.context = context;
        this.userService = userService;
        this.hub = hub;
    }

    public async Task<Badge> Create(Badge badge)
    {
        await userService.EnsureCurrentIsAdmin();

        CheckIfNameIsUnique(badge);

        await context.AddAsync(badge);
        await context.SaveChangesAsync();

        return badge;
    }

    public async Task<List<Badge>> GetAll()
    {
        await userService.EnsureCurrentIsAdmin();

        var allBadges = await context.Badges.ToListAsync();
        return allBadges;
    }

    public async Task<List<DisplayBadgeModel>> GetAllForUser()
    {
        var userWithUnlockedBadges = await userService.GetUserWithBadges();
        var unlockedBadges = userWithUnlockedBadges.UserBadges;

        var allBadges = await context.Badges.ToListAsync();

        return allBadges.Select(badge => new DisplayBadgeModel(
                badge, unlockedBadges.Any(userBadges => userBadges.BadgeId == badge.Id)))
            .OrderBy(badge => badge.Name)
            .ThenByDescending(badge => badge.Unlocked)
            .ToList();
    }

    public Task Test() => hub.Clients.All.SendAsync("new", new DisplayBadgeModel(new()
    {
        Id = Guid.NewGuid(),
        Name = "New experience",
        Image = "https://img.icons8.com/cute-clipart/256/000000/1-circle-c.png",
        Points = 50
    }, true));

    public async Task<bool> UnlockBadge(
        BadgeNames name, 
        bool bypassSaveChanges = false, 
        Guid? notLoggedUserId = null)
    {
        var badges = await context.Badges.ToListAsync();
        var badge = badges.FirstOrDefault(badge => badge.SelectByName(name));
        if (badge == null)
            return false;

        var userId = notLoggedUserId ?? userService.GetCurrentUserId();
        var isBadgeUnlocked = await context.UserBadges.AnyAsync(userBadge =>
            userBadge.UserId == userId && userBadge.BadgeId == badge.Id);
        if (isBadgeUnlocked)
            return false;

        await context.AddAsync(new UserBadge
        {
            UserId = userId,
            BadgeId = badge.Id,
        });
        await userService.IncreaseExperience(badge.Points, userId, bypassSaveChanges);

        await hub.Clients.All.SendAsync("new", new DisplayBadgeModel(badge, true));

        return true;
    }

    public async Task<Badge> Update(Badge badge)
    {
        await userService.EnsureCurrentIsAdmin();

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
