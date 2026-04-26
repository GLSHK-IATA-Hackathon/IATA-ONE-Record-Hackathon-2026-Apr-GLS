using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System.IO;
using System.Linq;

namespace WebAPITemplate.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class TrackingController : ControllerBase
    {
        private readonly IWebHostEnvironment _env;

        // Injecting IWebHostEnvironment via constructor to obtain the project path.
        public TrackingController(IWebHostEnvironment env)
        {
            _env = env;
        }

        /// <summary>
        // Retrieve Route information via LO_ID
        // </summary>
        // <param name="lo_id">ONE Record LO ID</param>

        [HttpGet("GetRouteByLoId")]
        public IActionResult GetRouteByLoId([FromQuery] string lo_id)
        {
            if (string.IsNullOrWhiteSpace(lo_id))
            {
                return BadRequest(new { Error = "Please provide a valid LO_ID (lo_id) parameter" });
            }

            bool DemoMode = true;       // Toggle for Demo Use

            try
            {
                // 1. Define the entity path of the JSON file
                string filePath = Path.Combine(_env.ContentRootPath, "Data", "MockTrackingData.json");

                // 2. Check if the file exists
                if (!System.IO.File.Exists(filePath))
                {
                    return StatusCode(500, new { Error = "Server internal error: Database/JSON Result file not found. ", Path = filePath });
                }

                // 3. Read the contents of the JSON file
                string jsonContent = System.IO.File.ReadAllText(filePath);
                JArray database = JArray.Parse(jsonContent);

                // DemoMode Logic

                if (DemoMode)
                {
                    return Ok(database);

                }

                // 4. Using LINQ for searching 
                var record = database.FirstOrDefault(r => r["oneRecordLo"]?.ToString() == lo_id);

                if (record != null)
                {
                    return Ok(record);
                }
                else
                {
                    return NotFound(new { Error = $"Unable to find route record for this LO_ID: '{lo_id}'" });
                }
            }
            catch (System.Exception ex)
            {
                return StatusCode(500, new { Error = "An exception occurred while reading data", Details = ex.Message });
            }
        }
    }
}