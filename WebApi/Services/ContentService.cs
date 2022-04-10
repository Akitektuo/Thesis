namespace WebApi.Services;

public class ContentService : IContentService
{
    private readonly DataContext context;
    private readonly IUserService userService;

    public ContentService(DataContext context, IUserService userService)
    {
        this.context = context;
        this.userService = userService;
    }

    public async Task<Content> Create(Content content)
    {
        await userService.EnsureCurrentIsAdmin();

        await context.AddAsync(content);
        await context.SaveChangesAsync();

        return content;
    }

    public async Task Delete(Guid contentId)
    {
        await userService.EnsureCurrentIsAdmin();

        var existingContent = await context.Contents.FindAsync(contentId);
        if (existingContent == null)
            throw new ClientException($"No content was found with ID '{contentId}'");

        context.Remove(existingContent);
        await context.SaveChangesAsync();
    }

    public async Task<List<Content>> GetAll(Guid chapterId)
    {
        await userService.EnsureCurrentIsAdmin();

        var contents = await context.Contents.Where(content => content.ChapterId == chapterId)
            .OrderBy(content => content.Position)
            .ToListAsync();

        return contents;
    }

    public async Task Rearrange(Guid chapterId, List<IdWithPosition> idsWithPositions)
    {
        await context.Contents.Where(content => content.ChapterId == chapterId)
            .ForEachAsync(content => {
                var idWithPosition = idsWithPositions.First(idWithPosition => content.Id == idWithPosition.Id);

                content.Position = idWithPosition.Position;
                context.Update(content);
            });

        await context.SaveChangesAsync();
    }

    public async Task<Content> Update(Content content)
    {
        await userService.EnsureCurrentIsAdmin();

        var existingContent = await context.Contents.FindAsync(content.Id);
        if (existingContent == null)
            throw new ClientException($"No content was found with ID '{content.Id}'");

        existingContent.Type = content.Type;
        existingContent.Text = content.Text;

        context.Update(existingContent);
        await context.SaveChangesAsync();

        return content;
    }
}
