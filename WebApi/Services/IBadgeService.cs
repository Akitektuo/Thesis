namespace WebApi.Services;

public interface IBadgeService
{
    Task<List<DisplayBadgeModel>> GetAllForUser();

    Task<List<Badge>> GetAll();

    Task<Badge> Create(Badge badge);

    Task<Badge> Update(Badge badge);
}
