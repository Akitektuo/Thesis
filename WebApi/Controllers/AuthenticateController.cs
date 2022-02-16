namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthenticateController : ControllerBase
{
    private readonly IUserService userService;

    public AuthenticateController(IUserService userService)
    {
        this.userService = userService;
    }

    [HttpPost("register")]
    public async Task<IActionResult> RegisterUser(RegisterUserModel registerUser)
    {
        ClientException.ValidateModel(ModelState);

        await userService.Register(registerUser);

        return Ok("User created");
    }

    [HttpPost("login")]
    public async Task<IActionResult> LoginUser(LoginUserModel loginUser)
    {
        ClientException.ValidateModel(ModelState);

        var loginResult = await userService.Login(loginUser);

        if (loginResult == null)
            return Unauthorized("Wrong email or password!");

        return Ok(loginResult);
    }
}
