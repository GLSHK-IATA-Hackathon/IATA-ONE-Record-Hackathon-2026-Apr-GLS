using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebAPITemplate.Controllers.Sample.DBConnection;

namespace WebAPITemplate.Controllers.Sample
{
    /// <summary>
    /// sample code to test db connection
    /// DBConnection_SqlServer_GetDateTime: connection to MSSQL DB, and get current datetime 
    /// DBConnection_MariaServer_GetDateTime: connection to Maria DB, and get current datetime
    /// </summary>
    [AllowAnonymous]
    [Route("Sample/")]
    [ApiController]
    public class DBController : ControllerBase
    {
        readonly SqlServerDataBaseContext _SqlDbContext;
        readonly MariaDataBaseContext _MariaDbContext;

        public DBController(SqlServerDataBaseContext SqlDbContext, MariaDataBaseContext MariaDbContext)
        {
            _SqlDbContext = SqlDbContext;
            _MariaDbContext = MariaDbContext;
        }

        [Route("DBConnection_SqlServer_GetDateTime")]
        [HttpGet]
        public ActionResult DBConnection_SqlServer_GetDateTime()
        {
            string currentDateTime = GetDateTime(_SqlDbContext);
            return Content("Current datetime:" + currentDateTime, "text/plain", System.Text.Encoding.UTF8);
        }

        [Route("DBConnection_MariaServer_GetDateTime")]
        [HttpGet]
        public ActionResult DBConnection_MariaServer_GetDateTime()
        {
            string currentDateTime = GetDateTime(_MariaDbContext);
            return Content("Current datetime:" + currentDateTime, "text/plain", System.Text.Encoding.UTF8);
        }


        #region"sample code to connect to db server: get current datetime from DB"

        /// <summary>
        /// connect sql database to get current datetime
        /// </summary>
        /// <param name="SqlDbContext"></param>
        /// <returns></returns>
        private string GetDateTime(SqlServerDataBaseContext SqlDbContext)
        {
            //method 1: get current datetime using output parameter
            var parameter = new Microsoft.Data.SqlClient.SqlParameter("@currentDateTime", System.Data.SqlDbType.DateTime);

            parameter.Direction = System.Data.ParameterDirection.Output;

            SqlDbContext.Database.ExecuteSqlRaw("set @currentDateTime = (select getdate() as currentDateTime )", parameter);

            var currentDateTime = (DateTime)parameter.Value;

            //method 2: get current datetime using select sql and retrun a "list";
            FormattableString getCurrentDateTime = $"SELECT getdate() currentDateTime";

            string currentDateTimeString = SqlDbContext.Database.SqlQuery<DateTime>(getCurrentDateTime).ToList().FirstOrDefault().ToString();

            return currentDateTime.ToString();
        }
        /// <summary>
        /// connect maria database to get current datetime
        /// </summary>
        /// <param name="MariaDbContext"></param>
        /// <returns></returns>
        private string GetDateTime(MariaDataBaseContext MariaDbContext)
        {
            //method 1: get current datetime using output parameter
            FormattableString getCurrentDateTime = $"SELECT NOW() currentDateTime";

            string currentDateTime = MariaDbContext.Database.SqlQuery<DateTime>(getCurrentDateTime).ToList().FirstOrDefault().ToString();

            return currentDateTime.ToString();
        }
        #endregion
    }
}
