using Newtonsoft.Json;
using System.Xml.Serialization;

namespace WebAPITemplate.Controllers.Sample.RestClient
{
    /// <summary>
    /// sample code to create Rest Client using GLSHK.APIClient.GLSRestClient
    /// configure parameter:
    ///  "_ApiName"
    /// </summary>
    public partial class MQApiRestClient : GLSHK.APIClient.GLSRestClient
    {
        /// <summary>
        /// API Name that configure at appsetting: e.g.: APIConfig:{_ApiName}
        /// </summary>
        private string _ApiName = "TestAPI";

        public MQApiRestClient(IConfiguration config, string APIName = "")
        {
            if (!string.IsNullOrWhiteSpace(APIName))
            {
                _ApiName = APIName;
            }
            base.Init(config, _ApiName);
        }
    }

    /// <summary>
    /// sample body use for MQAPI: for demo purpose
    /// </summary>
    public class TestRequestBodyContent
    {
        [JsonProperty("testContent")]
        [XmlElement("testContent")]
        public string TestContent { get; set; }
    }
}
