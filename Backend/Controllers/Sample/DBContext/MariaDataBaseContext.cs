namespace WebAPITemplate.Controllers.Sample.DBConnection
{
    /// <summary>
    /// sample code to create Maria Database connection using GLSHK.Common.DataSource.BasicDataBaseContext
    /// </summary>
    public partial class MariaDataBaseContext : GLSHK.Common.DataSource.BasicDataBaseContext
    {
        //change DBID to match with connection string attribute
        private const string _DBID = "MariaDbConnectionString";
        private const DBSystem _DBProvider = DBSystem.MySQLOrMariaDB;
        
        public MariaDataBaseContext(IConfiguration config)
        {
            //tuning
            base.Init(config, _DBID, _DBProvider);
        }
    }
}
