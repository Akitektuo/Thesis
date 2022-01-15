using System.ComponentModel.DataAnnotations;

namespace WebApi.ViewModels.User
{
    public class RegisterUserModel
    {
        [EmailAddress]
        public string Email { get; set; }

        public string Password { get; set; }

        public string ConfirmPassword { get; set; }

        public Models.User ToUser() => new()
        {
            Email = Email,
            UserName = Email
        };
    }
}
