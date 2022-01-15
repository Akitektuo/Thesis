using Microsoft.AspNetCore.Identity;
using System;

namespace WebApi.Models
{
    public class User : IdentityUser<Guid>
    {
        public int Experience { get; set; }
    }
}
