﻿namespace WebApi.Services;

public class ChapterService : IChapterService
{
    private readonly DataContext context;
    private readonly IUserService userService;

    public ChapterService(DataContext context, IUserService userService)
    {
        this.context = context;
        this.userService = userService;
    }

    public async Task<List<Chapter>> GetAll(Guid courseId)
    {
        await userService.EnsureCurrentIsAdmin();
        
        var chapters = await context.Chapters.Where(chapter => chapter.CourseId == courseId)
            .ToListAsync();

        return chapters;
    }

    public async Task<Chapter> Create(Chapter chapter)
    {
        await userService.EnsureCurrentIsAdmin();

        await context.AddAsync(chapter);
        await context.SaveChangesAsync();

        return chapter;
    }

    public async Task<Chapter> Update(Chapter chapter)
    {
        await userService.EnsureCurrentIsAdmin();

        var existingChapter = await context.Chapters.FindAsync(chapter.Id);
        if (existingChapter != null)
            throw new ClientException($"No chapter was found with ID '{chapter.Id}'");

        chapter.FilesPath = existingChapter.FilesPath;
        chapter.Level = existingChapter.Level;
        chapter.Name = existingChapter.Name;
        chapter.ParentChapterId = existingChapter.ParentChapterId;
        chapter.Points = existingChapter.Points;

        context.Update(chapter);
        await context.SaveChangesAsync();

        return chapter;
    }

    public Task<ChapterDetailsModel> Get(Guid id)
    {
        return Task.FromResult(new ChapterDetailsModel());
    }
}
