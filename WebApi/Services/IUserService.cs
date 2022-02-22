namespace WebApi.Services;

public interface IUserService
{
    Task Register(RegisterUserModel registerUserModel);

    Task<string> Login(LoginUserModel loginUserModel);

    Guid GetCurrentUserId();

    Task<User> GetCurrent();

    Task<bool> IsCurrentAdmin();

    Task<User> GetUserWithBadges(bool includeBadges = false);

    Task<UserDashbordModel> GetUserDashbord();
}
