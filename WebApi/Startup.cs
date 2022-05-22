using Microsoft.AspNetCore.Builder;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using WebApi.Middlewares;

namespace WebApi;

public class Startup
{
    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    // This method gets called by the runtime. Use this method to add services to the container.
    public void ConfigureServices(IServiceCollection services)
    {
        ConfigureAuthentication(services);

        services.AddCors(config =>
            config.AddDefaultPolicy(options =>
                options.WithOrigins("http://localhost:3000")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials()));
        services.Configure<ApiBehaviorOptions>(options =>
        {
            options.SuppressModelStateInvalidFilter = true;
        });
        services.AddControllers();
        services.AddSignalR();
        services.AddSwaggerGen(c =>
        {
            c.SwaggerDoc("v1", new OpenApiInfo { Title = "WebApi", Version = "v1" });
        });
        services.AddDbContext<DataContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString(nameof(DataContext))));

        services.AddTransient<IUserService, UserService>();
        services.AddTransient<IBadgeService, BadgeService>();
        services.AddTransient<ICourseService, CourseService>();
        services.AddTransient<IChapterService, ChapterService>();
        services.AddTransient<IDocumentService, DocumentService>();
        services.AddTransient<IContentService, ContentService>();
        services.AddTransient<IEvaluatorService, EvaluatorService>();
    }

    // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "WebApi v1"));
        }

        app.UseCors();

        app.UseWhen(context => context.Request.Path.StartsWithSegments("/api") &&
                !context.Request.Path.StartsWithSegments("/api/Documents/"),
            appBuilder => appBuilder.UseMiddleware<MiddlewareHandler>());
        app.UseHttpsRedirection();

        app.UseRouting();

        app.UseAuthentication();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers();
            endpoints.MapHub<AchievementHub>("/achievement");
        });
    }

    private void ConfigureAuthentication(IServiceCollection services)
    {
        services.AddIdentity<User, IdentityRole<Guid>>()
            .AddEntityFrameworkStores<DataContext>()
            .AddDefaultTokenProviders();

        services.AddAuthentication(options =>
        {
            options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
        }).AddJwtBearer(options =>
        {
            options.SaveToken = true;
            options.RequireHttpsMetadata = false;
            options.TokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidAudience = Configuration[Constants.JwtAudience],
                ValidIssuer = Configuration[Constants.JwtIssuer],
                IssuerSigningKey = new SymmetricSecurityKey(
                    Encoding.UTF8.GetBytes(Configuration[Constants.JwtSecret]))
            };
        });
    }
}
