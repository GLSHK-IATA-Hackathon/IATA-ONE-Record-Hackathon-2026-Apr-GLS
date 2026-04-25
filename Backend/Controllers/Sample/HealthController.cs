using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace WebAPITemplate.Controllers.Sample
{
    /// <summary>
    /// sample code for health check
    /// HealthCheck: basic health check function which must exist at project
    /// HealthCheckWithConfig: sample code - health check and showning others configured value
    /// </summary>
    [AllowAnonymous]
    [Route("Sample/")]
    [ApiController]
    public class HealthController : ControllerBase
    {
        private readonly IConfiguration _config;
        private readonly IWebHostEnvironment _env;

        public HealthController(IConfiguration config, IWebHostEnvironment env)
        {
            _config = config;
            //for health check display environment variable
            _env = env;
        }

        [Route("healthcheck")]
        [HttpGet]
        public ActionResult HealthCheck()
        {
            //basic checking
            return base.Ok("OK");
        }

        /// <summary>
        /// Sample code: remove following code if it is not necessary
        /// health check and display configured information
        /// show configure
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        [Route("healthcheck_withconfig")]
        [ApiExplorerSettings(IgnoreApi = false)]
        public string HealthCheckWithConfig()
        {
            //health check, and show configure details

            //dome code
            string Status = "";
            Status = "OK";
            //get and show configure information if necessary
            Status += "\n\r" + "-- AppSettings and Envirable Variable --";
            Status += "\n\r" + "_app: " + _env.ApplicationName;
            Status += "\n\r" + "_env: " + _env.EnvironmentName;
            if (false)
            { 
                Status += "\n\r" + "--CPU Info--";
                Status += "\n\r" + "Number Of Logical Processors: " + Environment.ProcessorCount.ToString();
            }

            var settingsSection = _config.GetSection("Logging:LogLevel");
            foreach (var section in settingsSection.GetChildren())
            {
                Status += "\n\r" + section.Path + ": " + section.Value;
            }
            return Status;
        }
    }
}
