using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebAPITemplate.Controllers.Sample.ValidModels;

namespace WebAPITemplate.Controllers.Sample
{
    /// <summary>
    /// sample code for validate query string paramter
    /// </summary>
    [AllowAnonymous]
    [Route("Sample/")]
    [ApiController]
    public class CallValidateController : ControllerBase
    {
        public CallValidateController()
        {
        }

        /// <summary>
        /// Test API: for validate query string
        /// </summary>
        /// <returns></returns>
        [Route("CallValidation_QueryString")]
        [HttpPost]
        public GLSHK.Common.CallValidation.ValidInfoResult CallValidation_QueryString()
        {
            GLSHK.Common.CallValidation.ValidInfoResult qsResult = GLSHK.Common.CallValidation.ValidateQueryString(Request.QueryString, new ValidateObjectModel_Sample.ValidInfoQueryString());
            return qsResult;
        }

        /// <summary>
        /// Test API: for validate body
        /// </summary>
        /// <param name="queryBody"></param>
        /// <returns></returns>
        [Route("CallValidation_Body")]
        [HttpPost]
        public string CallValidation_Body([FromBody] ValidateObjectModel_Sample.ValidInfoBody queryBody)
        {
            return "OK";
        }
    }
}
