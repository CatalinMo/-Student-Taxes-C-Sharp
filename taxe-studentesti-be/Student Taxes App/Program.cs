using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.EntityFrameworkCore;
using System.IdentityModel.Tokens.Jwt;
using System.Text.Json.Serialization;
using taxe_studentesti_be.Security_Impl.Application;
using taxe_studentesti_be.Security_Impl.Config;
using taxe_studentesti_be.Security_Impl.Config.Properties;
using taxe_studentesti_be.Security_Impl.Filter;
using taxe_studentesti_be.student_taxes_api.application;
using taxe_studentesti_be.student_taxes_impl.model.Context;
using taxe_studentesti_be.Student_Taxes_Impl.Application;
using taxe_studentesti_be.Student_Taxes_Impl.Config;
using taxe_studentesti_be.Student_Taxes_Impl.Config.Properties;
using taxe_studentesti_be.Student_Taxes_Impl.Infrastructure;

public class Program
{
    public static void Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);
        builder.Configuration.AddJsonFile("Student Taxes App/Resources/appsettings.json");

        builder.Services.AddDbContext<StudentTaxesContext>(options => options.UseMySQL(builder.Configuration.GetConnectionString("StudentTaxes")));
        builder.Services.AddAutoMapper(typeof(MappingConfig));

        builder.Services.Configure<UserProperties>(builder.Configuration.GetSection("User"));
        builder.Services.Configure<JwtAuthProperties>(builder.Configuration.GetSection("JWT"));

        builder.Services.AddScoped<AccountRepository>();
        builder.Services.AddScoped<ActiveFeeRepository>();
        builder.Services.AddScoped<ActiveStudyRepository>();
        builder.Services.AddScoped<HostelFeeRepository>();
        builder.Services.AddScoped<OtherFeeRepository>();
        builder.Services.AddScoped<StudyFeeRepository>();
        builder.Services.AddScoped<StudyRepository>();

        builder.Services.AddScoped<IAccountServiceApi, AccountService>();
        builder.Services.AddScoped<IHostelFeeServiceApi, HostelFeeService>();
        builder.Services.AddScoped<IOtherFeeServiceApi, OtherFeeService>();
        builder.Services.AddScoped<IStudyFeeServiceApi, StudyFeeService>();
        builder.Services.AddScoped<IStudyServiceApi, StudyService>();

        builder.Services.AddScoped<AuthorizationService>();
        builder.Services.AddScoped<JwtTokenProvider>();
        builder.Services.AddScoped<JwtSecurityTokenHandler>();
        builder.Services.AddScoped<TokenCacheService>();
        builder.Services.AddScoped<AuthorizationFilter>();

        builder.Services.AddCors();
        builder.Services.AddAuthentication(options =>
        {
            options.DefaultScheme = "SecuritySchema";
        }).AddScheme<AuthenticationSchemeOptions, SecurityHandler>("SecuritySchema", options => {});
        builder.Services.AddControllers().AddJsonOptions(options =>
        {
            options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
        });

        var app = builder.Build();
        app.UseRouting();
        app.UseCors(builder => builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
        app.UseAuthentication();
        app.UseAuthorization();
        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllers().RequireAuthorization();
        });

        app.Run();
    }
}