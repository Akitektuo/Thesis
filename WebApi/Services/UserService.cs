using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using WebApi.Exceptions;
using WebApi.Models;
using WebApi.Shared;
using WebApi.ViewModels.User;

namespace WebApi.Services
{
    public class UserService : IUserService
    {
        private readonly UserManager<User> userManager;
        private readonly IConfiguration configuration;

        public UserService(UserManager<User> userManager, IConfiguration configuration)
        {
            this.userManager = userManager;
            this.configuration = configuration;
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
    }
}
