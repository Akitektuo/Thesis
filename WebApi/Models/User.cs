using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;

namespace WebApi.Models
{
    public class User : IdentityUser<Guid>
    {
        public int Experience { get; set; }

        public bool IsAdmin { get; set; }

        public virtual ICollection<UserBadge> UserBadges { get; set; }
    }
}
