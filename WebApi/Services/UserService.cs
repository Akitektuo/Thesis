using System.IdentityModel.Tokens.Jwt;

namespace WebApi.Services;

public class UserService : IUserService
{
    private readonly UserManager<User> userManager;
    private readonly IConfiguration configuration;
    private readonly IHttpContextAccessor httpAccessor;
    private readonly DataContext context;
    private readonly IServiceProvider serviceProvider;

    public UserService(
        UserManager<User> userManager,
        IConfiguration configuration,
        IHttpContextAccessor httpAccessor,
        DataContext context,
        IServiceProvider serviceProvider)
    {
        this.userManager = userManager;
        this.configuration = configuration;
        this.httpAccessor = httpAccessor;
        this.context = context;
        this.serviceProvider = serviceProvider;
    }

    public Guid GetCurrentUserId() => httpAccessor.GetUserId();

    public async Task<User> GetCurrent(Guid? id = null)
    {
        var userId = id ?? GetCurrentUserId();
        var user = await userManager.FindByIdAsync(userId.ToString());

        return user;
    }

    public async Task<bool> IsCurrentAdmin(Guid? id = null)
    {
        var currentUser = await GetCurrent(id);

        return currentUser.IsAdmin;
    }

    public async Task<string> Login(LoginUserModel loginUserModel)
    {
        var user = await userManager.FindByEmailAsync(loginUserModel.Email);
        if (user == null)
            return null;

        var isPasswordCorrect = await userManager.CheckPasswordAsync(
            user, loginUserModel.Password);
        if (!isPasswordCorrect)
            return null;

        var token = GenerateJwtToken(user);

        await UnlockFirstLoginBadge(user.Id);

        return token;
    }

    public async Task Register(RegisterUserModel registerUserModel)
    {
        if (registerUserModel.Password != registerUserModel.ConfirmPassword)
            throw new ClientException("Passwords do not match!");

        var result = await userManager.CreateAsync(
            registerUserModel.ToUser(),
            registerUserModel.Password);

        if (result.Succeeded)
            return;

        throw new ClientException(
            result.Errors.FirstOrDefault()?.Description ??
            "The account could not be created, try again!");
    }

    private string GenerateJwtToken(User user)
    {
        var authenticationClaims = new List<Claim>
            {
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

        var authenticationSigningKey = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(configuration[Constants.JwtSecret]));

        var token = new JwtSecurityToken(
            issuer: configuration[Constants.JwtIssuer],
            audience: configuration[Constants.JwtAudience],
            expires: DateTime.Now.AddMonths(1),
            claims: authenticationClaims,
            signingCredentials: new SigningCredentials(
                authenticationSigningKey,
                SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }

    public async Task<User> GetUserWithBadges(bool includeBadges = false)
    {
        var currentUserId = GetCurrentUserId();

        var query = context.Users.Include(user => user.UserBadges);
        if (!includeBadges)
            return await query.FirstAsync(user => user.Id == currentUserId);

        return await query.ThenInclude(userBadge => userBadge.Badge)
            .FirstAsync(user => user.Id == currentUserId);
    }

    public async Task<UserDashbordModel> GetUserDashbord()
    {
        var userWithBadges = await GetUserWithBadges(true);

        var topBadges = userWithBadges.UserBadges
            .Select(userBadge => new DisplayBadgeModel(userBadge.Badge))
            .OrderByDescending(badge => badge.Points)
            .ToList();

        return new UserDashbordModel(userWithBadges, topBadges);
    }

    public async Task EnsureCurrentIsAdmin()
    {
        var isCurrentUserAdmin = await IsCurrentAdmin();
        if (!isCurrentUserAdmin)
            throw new ClientException("Forbidden");
    }

    public async Task IncreaseExperience(
        int experience, 
        Guid? userId = null, 
        bool bypassSaveChanges = false)
    {
        var user = await GetCurrent(userId);
        user.Experience += experience;
        context.Update(user);

        await UnlockBadgesForLevel(user.Experience);

        if (!bypassSaveChanges)
            await context.SaveChangesAsync();
    }

    private async Task UnlockFirstLoginBadge(Guid userId)
    {
        using var scope = serviceProvider.CreateAsyncScope();
        var badgeService = scope.ServiceProvider.GetRequiredService<IBadgeService>();
        await badgeService.UnlockBadge(BadgeNames.NewExperience, notLoggedUserId: userId);
    }

    private async Task UnlockBadgesForLevel(int experience)
    {
        var level = (experience / 100).Sqrt() + 1;
        if (level < 2)
            return;

        using var scope = serviceProvider.CreateAsyncScope();
        var badgeService = scope.ServiceProvider.GetRequiredService<IBadgeService>();

        await badgeService.UnlockBadge(BadgeNames.Level2, true);

        if (level < 3)
            return;
        await badgeService.UnlockBadge(BadgeNames.Level3, true);

        if (level < 4)
            return;
        await badgeService.UnlockBadge(BadgeNames.Level4, true);

        if (level < 5)
            return;
        await badgeService.UnlockBadge(BadgeNames.Level5, true);

        if (level < 6)
            return;
        await badgeService.UnlockBadge(BadgeNames.Level6, true);

        if (level < 7)
            return;
        await badgeService.UnlockBadge(BadgeNames.Level7, true);

        if (level < 8)
            return;
        await badgeService.UnlockBadge(BadgeNames.Level8, true);

        if (level < 9)
            return;
        await badgeService.UnlockBadge(BadgeNames.Level9, true);

        if (level < 10)
            return;
        await badgeService.UnlockBadge(BadgeNames.TheTop, true);
    }
}
