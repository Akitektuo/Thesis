﻿namespace WebApi.Controllers;

[Route("api/[controller]")]
[ApiController]
[Authorize]
public class UserController : ControllerBase
{
    private readonly IUserService userService;

    public UserController(IUserService userService)
    {
        this.userService = userService;
    }

    [HttpGet("isAdmin")]
    public async Task<IActionResult> IsUserAdmin()
    {
        var result = await userService.IsCurrentAdmin();

        return Ok(result);
    }

    [HttpGet("dashboard")]
    public async Task<IActionResult> GetUserDashboard()
    {
        var result = await userService.GetUserDashbord();

        return Ok(result);
    }
}
