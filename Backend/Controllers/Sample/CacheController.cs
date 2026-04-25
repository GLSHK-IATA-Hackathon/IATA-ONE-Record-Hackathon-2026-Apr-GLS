using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using WebAPITemplate.Controllers.Sample.RedisConnection;

namespace WebAPITemplate.Controllers.Sample
{
    /// <summary>
    /// sample code for Cache
    /// </summary>
    [AllowAnonymous]
    [Route("Sample/")]
    [ApiController]
    public class CacheController : ControllerBase
    {
        private readonly Cache_01 _TestCache;

        public CacheController(Cache_01 TestCache)
        {
            _TestCache = TestCache;
        }

        /// <summary>
        /// set cache
        /// </summary>
        /// <param name="key"></param>
        /// <param name="value"></param>
        /// <returns></returns>
        [Route("TestCache_Set")]
        [HttpPost]
        public ActionResult SetCache_string(string key, string value)
        {
            string result;
            string action;
            //Interface for decoupling
            if (_TestCache.IsKeyExists(key))
            {
                string originalValue = _TestCache.Get(key);
                action = "updated";
                result = "[" + originalValue + "] -> [" + value + "]";
            }
            else
            {
                action = "added";
                result = value;
            }
            _TestCache.Put(key, value);

            return Ok("key {" + key + "}: " + action + "; value {" + result + "}");
        }

        /// <summary>
        /// get cache
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        [Route("TestCache_Get")]
        [HttpGet]
        public ActionResult GetCache_string(string key)
        {
            if (_TestCache.IsKeyExists(key))
            {
                return Ok("key {" + key + "}; value {" + _TestCache.Get(key) + "}");
            }
            else
            {
                return Ok("key {" + key + "} does not exist.");
            }
        }

        [Route("TestCache_SetBody")]
        [HttpPost]
        public ActionResult SetCache_Object(string key, CachePerson body)
        {
            string result;
            string action;

            var bodystr = JsonConvert.SerializeObject(body,
                                 new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });

            //Interface for decoupling
            if (_TestCache.IsKeyExists(key))
            {
                CachePerson originalValue = _TestCache.GetObject<CachePerson>(key);

                var str = JsonConvert.SerializeObject(originalValue,
                     new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });
                action = "updated";
                result = "[" + str + "] -> [" + bodystr + "]";
            }
            else
            {
                action = "added";
                result = bodystr;
            }
            _TestCache.SetObject(key, body);

            return Ok("key {" + key + "}: " + action + "; value {" + result + "}");
        }

        /// <summary>
        /// get cache
        /// </summary>
        /// <param name="key"></param>
        /// <returns></returns>
        [Route("TestCache_GetBody")]
        [HttpGet]
        public ActionResult GetCache_Body(string key)
        {
            if (_TestCache.IsKeyExists(key))
            {
                CachePerson originalValue = _TestCache.GetObject<CachePerson>(key);
                var str = JsonConvert.SerializeObject(originalValue,
                     new JsonSerializerSettings { NullValueHandling = NullValueHandling.Ignore });

                return Ok("key {" + key + "}; value {" + str + "}");
            }
            else
            {
                return Ok("key {" + key + "} does not exist.");
            }

        }

        public class CachePerson
        {
            public int Id { get; set; }
            public string Name { get; set; }
            public string Email { get; set; }
            public int Age { get; set; }
        }
    }
}
