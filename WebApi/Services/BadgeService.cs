using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi.Context;
using WebApi.Exceptions;
using WebApi.Models;

namespace WebApi.Services
{
    public class BadgeService : IBadgeService
    {
        private readonly DataContext context;
        private readonly IUserService userService;

        public BadgeService(DataContext context, IUserService userService)
        {
            this.context = context;
            this.userService = userService;
        }

        public async Task<Badge> Create(Badge badge)
        {
            var isCurrentUserAdmin = await userService.IsCurrentAdmin();
            if (!isCurrentUserAdmin)
                throw new ClientException("Forbidden");

            await context.AddAsync(badge);
            await context.SaveChangesAsync();

            return badge;
        }

        public async Task<List<Badge>> GetAll()
        {
            var isCurrentUserAdmin = await userService.IsCurrentAdmin();
            if (!isCurrentUserAdmin)
                throw new ClientException("Forbidden");

            return context.Badges.ToList();
        }

        public async Task<Badge> Update(Badge badge)
        {
            var isCurrentUserAdmin = await userService.IsCurrentAdmin();
            if (!isCurrentUserAdmin)
                throw new ClientException("Forbidden");

            var existingBadge = await context.Badges.FindAsync(badge.Id);

            existingBadge.Name = badge.Name;
            existingBadge.Image = badge.Image;
            existingBadge.Points = badge.Points;

            context.Update(existingBadge);
            await context.SaveChangesAsync();

            return badge;
        }
    }
}
