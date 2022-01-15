﻿using System.Threading.Tasks;
using WebApi.ViewModels.User;

namespace WebApi.Services
{
    public interface IUserService
    {
        Task Register(RegisterUserModel registerUserModel);

        Task<string> Login(LoginUserModel loginUserModel);
    }
}