using GLSHK.Logging;
using Microsoft.AspNetCore.Mvc;

namespace WebAPITemplate.Controllers.Sample
{
    /// <summary>
    /// Sample code for logging information
    /// 1. LogErrorWithTemplate: use log template to log error 
    /// 2. LogErrorWithDictionary: use dictionary to log error
    /// 3. Log_LogLevelWithTemplate: use log template to log "different log level"
    /// 4. Log_LogLevelWithDictionary: use log dictionary to log "different log level"
    /// 5. LogErrorWithLargeBody: log large body content - large content will log to local file system
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class LoggingController : ControllerBase
    {
        //Interface for decoupling
        private readonly IGLSLoggerHelper _logger;

        public LoggingController(IGLSLoggerHelper logger)
        {
            _logger = logger;
        }

        [HttpGet("LogErrorWithTemplate")]
        public int LogErrorWithTemplate()
        {
            LogTemplate infoTemplate = new LogTemplate()
                .Tag("TagKey01", "TemplateError01")
                .Tag("TagKey02", "TemplateError02")
                .Tag("TagKey03", "TemplateError03")
                .TagRequestHeader(HttpContextItem.TraceID, "[trace-id]");

            _logger.LogErrorWithTemplate("Log Error With Template", null, infoTemplate);
            return 0;
        }

        [HttpGet("LogErrorWithDictionary")]
        public void LogErrorWithDictionary()
        {
            Dictionary<string, Func<object>> LogDictonaryDetail = new Dictionary<string, Func<object>>()
            {
                { "TagKey01",new Func<object>(() => "DictionaryError01")},
                { "TagKey02",new Func<object>(() => "DictionaryError02")},
                { "TagKey03",new Func<object>(() => "DictionaryError03")},
            };
            LogDictonaryDetail.Add("TagKey04", new Func<object>(() => "DictionaryError04"));
            _logger.LogErrorWithDictionary("Log with Dictionary", null, LogDictonaryDetail);
        }

        [HttpGet("Log_LogLevelWithTemplate")]
        public void Log_LogLevelWithTemplate(GLSHK.Logging.LogLevel logLevel)
        {
            LogTemplate infoTemplate = new LogTemplate()
                .Tag("TagKey01", "TemplateError01")
                .Tag("TagKey02", "TemplateError02")
                .Tag("TagKey03", "TemplateError03")
                .TagRequestHeader(HttpContextItem.TraceID, "[trace-id]");
            _logger.LogWithTemplate("Log [LogLevel:" + logLevel + "] With Template", logLevel, null, infoTemplate);
        }

        [HttpGet("Log_LogLevelWithDictionary")]
        public void Log_LogLevelWithDictionary(GLSHK.Logging.LogLevel logLevel)
        {
            Dictionary<string, Func<object>> LogDictonaryDetail = new Dictionary<string, Func<object>>()
            {
                { "TagKey01",new Func<object>(() => "DictionaryError01")},
                { "TagKey02",new Func<object>(() => "DictionaryError02")},
                { "TagKey03",new Func<object>(() => "DictionaryError03")},
            };
            LogDictonaryDetail.Add("TagKey04", new Func<object>(() => "DictionaryError04"));
            _logger.LogWithDictionary("Log [LogLevel:" + logLevel + "] With Dictionary", logLevel, null, LogDictonaryDetail);
        }

        /// <summary>
        /// sample code to test log large object
        /// </summary>
        /// <param name="noOfTagKey"></param>
        /// <returns></returns>
        [HttpGet("LogErrorWithLargeBody")]
        public int LogErrorWithLargeBody(int noOfTagKey = 100000)
        {
            Dictionary<string, Func<object>> LogDictonaryDetail = new Dictionary<string, Func<object>>();
            //loop to add tab key to increase content size
            for (int i = 0; i < noOfTagKey; i++)
            {
                LogDictonaryDetail.Add("TagKey" + i.ToString(), new Func<object>(() => "DictionaryError" + i.ToString()));
            }
            _logger.LogErrorWithDictionary("Log LargeBody with " + noOfTagKey.ToString() + " tag content.", null, LogDictonaryDetail);
            return 0;
        }
    }
}