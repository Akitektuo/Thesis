namespace WebApi.Services;

public interface IUserService
{
    Task Register(RegisterUserModel registerUserModel);

    Task<string> Login(LoginUserModel loginUserModel);

    Guid GetCurrentUserId();

    Task<User> GetCurrent(Guid? id = null);

    Task<bool> IsCurrentAdmin(Guid? id = null);

    Task<User> GetUserWithBadges(bool includeBadges = false);

    Task<UserDashbordModel> GetUserDashbord();

    Task EnsureCurrentIsAdmin();

    Task IncreaseExperience(int experience, Guid? userId = null, bool bypassSaveChanges = false);
}
