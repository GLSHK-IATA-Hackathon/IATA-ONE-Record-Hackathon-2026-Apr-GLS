using FluentValidation;
using WebAPITemplate.Controllers.Sample.ValidModels;

namespace WebAPITemplate.Extension
{
    public static class ServiceRegistrationExtension
    {
        /// <summary>
        /// Add DI services here
        /// </summary>
        /// <param name="services"></param>
        public static void AddDIServices(this IServiceCollection services)
        {

            // Register Logger DI
            //DI with interface
            _ = services.AddTransient<GLSHK.Logging.IGLSLoggerHelper, GLSHK.Logging.GLSLoggerHelper>();

            //add DB related
            //add DB connection: use Microsoft.Extensions.DependencyInjection
            _ = services.AddDbContext<WebAPITemplate.Controllers.Sample.DBConnection.SqlServerDataBaseContext>();
            _ = services.AddDbContext<WebAPITemplate.Controllers.Sample.DBConnection.MariaDataBaseContext>();

            //add Restclient DI
            _ = services.AddSingleton<WebAPITemplate.Controllers.Sample.RestClient.MQApiRestClient>();

            // Register HttpContext DI
            _ = services.AddHttpContextAccessor();

            // Register Cache DI
            _ = services.AddSingleton<WebAPITemplate.Controllers.Sample.RedisConnection.Cache_01>();

            // Register Middleware
            _ = services.AddScoped<GLSHK.Logging.IGLSLoggerApiLoggingMiddleware, GLSHK.Logging.GLSLoggerApiLoggingMiddleware>();

            //register others object if necessary

        }

        public static void AddValidationServices(this IServiceCollection services)
        {
            //Fluentvalidation
            _ = services.AddSingleton<IValidator<ValidateObjectModel_FluentvalidationSample.Person>, ValidateObjectModel_FluentvalidationSample.PersonValidator>();
            _ = services.AddSingleton<IValidator<ValidateObjectModel_FluentvalidationSample.ContactInfo>, ValidateObjectModel_FluentvalidationSample.ContactInfoValidator>();

            _ = services.AddSingleton<IValidator<ValidateObjectModel_FluentvalidationSample.PersonName>, ValidateObjectModel_FluentvalidationSample.PersonNameValidator>();
        }
        /// <summary>
        /// add configure file here
        /// </summary>
        /// <param name="Host"></param>
        public static void AddHostConfigure(this ConfigureHostBuilder Host)
        {
            //add logger configure file
            string log4NetPath = GLSHK.Common.Common.FindFile("log4net", "config", null, true);
            _ = Host.ConfigureLogging(logging =>
            {
                logging.AddProvider(new Log4NetProvider(log4NetPath));
                logging.AddLog4Net(log4NetPath);
            }
            );
            //add follow code ONLY IF CONFIGURE information IS NOT KEEP at appsetting.json
            //remove follow code if db access is not necessary
            //add DataSource
            string DataSourceConfigurePath = GLSHK.Common.Common.FindFile("DataSource", "config", null, true);
            _ = Host.ConfigureAppConfiguration(config =>
            {
                config.AddXmlFile(DataSourceConfigurePath);
            }
            );
        }
    }
}
