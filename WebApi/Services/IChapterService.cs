namespace WebApi.Services;

public interface IChapterService
{
    Task<List<Chapter>> GetAll(Guid courseId);

    Task<Chapter> Create(Chapter chapter);

    Task<Chapter> Update(Chapter chapter);

    Task<ChapterDetailsModel> Get(Guid id);

    Task<SolutionResultModel> PostSolution(Guid chapterId, string fileName);
}
