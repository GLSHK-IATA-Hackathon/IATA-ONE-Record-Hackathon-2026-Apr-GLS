namespace WebAPITemplate.Controllers.Sample.RedisConnection
{
    //DI with interface
    public partial class Cache_01 : GLSHK.Redis.IGLSHKDictonary
    {
        GLSHK.Redis.GLSHKRedis Cache;
        //change CacheConfig to match CacheId attribute
        private const string _CacheId = "Cache01";

        public Cache_01(IConfiguration config)
        {
            Init(config, _CacheId);
        }

        public void Init(IConfiguration config, string ConnectionId)
        {
            Cache = new GLSHK.Redis.GLSHKRedis(config, ConnectionId);
        }

        public string Get(string key)
        {
            return Cache.Get(key);
        }

        public bool Put(string key, string value, TimeSpan? expiry = null)
        {
            return Cache.Put(key, value, expiry);
        }

        public bool RemoveKey(string key)
        {
            return Cache.RemoveKey(key);
        }

        public bool IsKeyExists(string key)
        {
            return Cache.IsKeyExists(key);
        }

        public bool SetObject<T>(string key, T value, int? minutes = null)
        {
            return Cache.SetObject<T>(key, value, minutes);
            
        }

        public T GetObject<T>(string key)
        {
            return Cache.GetObject<T>(key);
        }

        public T GetHashSet<T>(string key, string subKey)
        {
            return Cache.GetHashSet<T>(key, subKey);
        }

        public bool SetHashSet<T>(string key, Dictionary<string, T> oList, int? minutes = null)
        {
            return Cache.SetHashSet<T>(key, oList,minutes);
            
        }
    }
}
