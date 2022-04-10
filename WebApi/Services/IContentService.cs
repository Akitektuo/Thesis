namespace WebApi.Services;

public interface IContentService
{
    Task<List<Content>> GetAll(Guid chapterId);

    Task<Content> Create(Content content);

    Task<Content> Update(Content content);

    Task Delete(Guid contentId);

    Task Rearrange(Guid chapterId, List<IdWithPosition> idsWithPositions);
}
