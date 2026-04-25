using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;

namespace WebAPITemplate.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class ULDMonitorController : ControllerBase
    {

        private static readonly ConcurrentDictionary<string, UldReportDto> _uldLatestData = new ConcurrentDictionary<string, UldReportDto>();

        /// <summary>
        /// 
        /// </summary>
        [HttpPost("ULDStatusReport")]
        public IActionResult ReceiveUldStatus([FromBody] UldReportDto payload)
        {
            if (payload == null || string.IsNullOrWhiteSpace(payload.UldId))
            {
                return BadRequest(new { Error = "Invalid Payload or uldId Missing" });
            }

            try
            {
                // Store the latest data in a dictionary. If uldId already exists, overwrite it (Update); otherwise, add it (Insert).
                _uldLatestData.AddOrUpdate(payload.UldId, payload, (key, oldValue) => payload);

                // 回傳 200 OK 告訴 Python 成功接收
                return Ok(new { Message = $"ULD {payload.UldId} Status Updated, DateTime: ", Timestamp = DateTime.UtcNow });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "Internal Server Error: ", Details = ex.Message });
            }
        }

        [HttpGet("GetAllUldStatuses")]
        public IActionResult GetAllUldStatuses()
        {
            var currentData = _uldLatestData.Values.ToList();

            return Ok(new
            {
                TotalCount = currentData.Count,
                LastUpdated = DateTime.UtcNow,
                Data = currentData
            });
        }
    }



    public class UldReportDto
    {
        public string UldId { get; set; }
        public DateTime Timestamp { get; set; }
        public GeolocationDto Geolocation { get; set; }
        public MeasurementsDto Measurements { get; set; }
        public DeviceStatusDto DeviceStatus { get; set; }
    }

    public class GeolocationDto
    {
        public double Latitude { get; set; }
        public double Longitude { get; set; }
    }

    public class MeasurementsDto
    {
        public double Temperature_C { get; set; }
        public double Humidity_percent { get; set; }
    }

    public class DeviceStatusDto
    {
        public double BatteryLevel { get; set; }
        public bool IsAlert { get; set; }
    }
}