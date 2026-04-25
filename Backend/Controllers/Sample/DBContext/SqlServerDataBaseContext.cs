namespace WebAPITemplate.Controllers.Sample.DBConnection
{
    /// <summary>
    /// sample code to create SQL Server Database connection using GLSHK.Common.DataSource.BasicDataBaseContext
    /// </summary>
    public partial class SqlServerDataBaseContext : GLSHK.Common.DataSource.BasicDataBaseContext
    {
        //change DBID to match with connection string attribute
        private const string _DBID = "SQLServerConnectionString";
        private const DBSystem _DBProvider = DBSystem.SQLServerOrAzureSQL;

        public SqlServerDataBaseContext(IConfiguration config)
        {
            //tuning
            base.Init(config, _DBID, _DBProvider);
        }
    }
}
