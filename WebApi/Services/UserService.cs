using System.IdentityModel.Tokens.Jwt;

namespace WebApi.Services;

public class UserService : IUserService
{
    private readonly UserManager<User> userManager;
    private readonly IConfiguration configuration;
    private readonly IHttpContextAccessor httpAccessor;
    private readonly DataContext context;

    public UserService(
        UserManager<User> userManager,
        IConfiguration configuration,
        IHttpContextAccessor httpAccessor,
        DataContext context)
    {
        this.userManager = userManager;
        this.configuration = configuration;
        this.httpAccessor = httpAccessor;
        this.context = context;
    }

    public Guid GetCurrentUserId() => httpAccessor.GetUserId();

    public async Task<User> GetCurrent()
    {
        var userId = GetCurrentUserId();
        var user = await userManager.FindByIdAsync(userId.ToString());

        return user;
    }

    public async Task<bool> IsCurrentAdmin()
    {
        var currentUser = await GetCurrent();

        return currentUser.IsAdmin;
    }

    public async Task<string> Login(LoginUserModel loginUserModel)
    {
        var user = await userManager.FindByEmailAsync(loginUserModel.Email);
        if (user == null)
            return null;

        var isPasswordCorrect = await userManager.CheckPasswordAsync(user, loginUserModel.Password);
        if (!isPasswordCorrect)
            return null;

        return GenerateJwtToken(user);
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
}
