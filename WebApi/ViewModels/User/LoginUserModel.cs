using System.ComponentModel.DataAnnotations;

namespace WebApi.ViewModels.User
{
    public class LoginUserModel
    {
        [EmailAddress]
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
