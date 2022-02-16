using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace WebApi.Context;

public class DataContext : IdentityDbContext<User, IdentityRole<Guid>, Guid>
{
    public DataContext(DbContextOptions options) : base(options)
    {
    }

    public DbSet<Badge> Badges { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<UserBadge>()
            .HasKey(table => new { table.UserId, table.BadgeId });
    }
}
