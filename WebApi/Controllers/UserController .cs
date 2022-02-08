using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using WebApi.Services;

namespace WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
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
    }
}
