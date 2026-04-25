using Microsoft.AspNetCore.Mvc;
using RestSharp;

namespace WebAPITemplate.Controllers.Sample
{
    /// <summary>
    /// sample code to test API connection
    /// use MQAPI as an example for testing
    /// </summary>
    [ApiController]
    [Route("[controller]")]
    public class APIClientController : ControllerBase
    {
        private readonly WebAPITemplate.Controllers.Sample.RestClient.MQApiRestClient _gLSRestClient;

        public APIClientController(WebAPITemplate.Controllers.Sample.RestClient.MQApiRestClient gLSRestClient)
        {
            _gLSRestClient = gLSRestClient;
        }


        [HttpGet("SampleCode_MQAPIClientGet")]
        public string SampleCode_MQAPIClientGet()
        {
            //use MQAPI for testing
            var restRequest = new RestRequest($"/uat-mqapi", Method.Get)
              .AddParameter("GLSAppID", "JMSTESTPUT")  //pass GLSAppID
              .AddParameter("NoOfMessage", "5");

            var restResponse = _gLSRestClient.Execute(restRequest);

            return restResponse.Content;
        }

        [HttpPost("SampleCode_APIClientPost")]
        public string SampleCode_APIClientPost(string TestPostContent = "This is texting content")
        {
            WebAPITemplate.Controllers.Sample.RestClient.TestRequestBodyContent testing = new WebAPITemplate.Controllers.Sample.RestClient.TestRequestBodyContent()
            {
                TestContent = TestPostContent
            };
            //use MQAPI for testing
            var restRequest = new RestRequest($"/uat-mqapi?GLSAppID=JMSTESTPUT", Method.Post)
              .AddHeader("Content-Type", "application/json")
              .AddJsonBody(testing)
            ;

            //code for execution
            var restResponse = _gLSRestClient.Execute(restRequest);

            return restResponse.Content;
        }
    }
}