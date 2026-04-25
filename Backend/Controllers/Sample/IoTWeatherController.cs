using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;
using System;
using System.Net.Http;
using System.Threading.Tasks;

namespace WebAPITemplate.Controllers
{
    [AllowAnonymous]
    [ApiController]
    [Route("api/[controller]")]
    public class IoTWeatherController : ControllerBase
    {
 
        private static readonly HttpClient _httpClient = new HttpClient();

        /// <summary>
        // Obtain location information and weather forecasts via ULD IoT's latitude and longitude
        // </summary>
        // <param name="lat">Latitude</param>
        // <param name="lon">Longitude</param>
        [HttpGet("GetLocationAndWeather")]
        public async Task<IActionResult> GetLocationAndWeather([FromQuery] double lat, [FromQuery] double lon)
        {
            try
            {
                // Reverse Geocoding using the BigDataCloud API
                // Convert latitude and longitude to city and country names
                string geoApiUrl = $"https://api.bigdatacloud.net/data/reverse-geocode-client?latitude={lat}&longitude={lon}&localityLanguage=en";
                var geoResponse = await _httpClient.GetStringAsync(geoApiUrl);
                var geoData = JObject.Parse(geoResponse);

                string city = geoData["city"]?.ToString();
                string country = geoData["countryName"]?.ToString();
                string locality = geoData["locality"]?.ToString();

                // Handle cases where the city name cannot be retrieved, and instead use the locality
                string locationName = !string.IsNullOrEmpty(city) ? city : locality;

                string weatherApiUrl = $"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lon}&current_weather=true&daily=temperature_2m_max,temperature_2m_min,precipitation_sum&timezone=auto";
                var weatherResponse = await _httpClient.GetStringAsync(weatherApiUrl);
                var weatherData = JObject.Parse(weatherResponse);

                var currentWeather = weatherData["current_weather"];

                var result = new
                {
                    ULD_Coordinates = new
                    {
                        Latitude = lat,
                        Longitude = lon
                    },
                    LocationDetails = new
                    {
                        City = locationName,
                        Country = country,
                        FullLocation = $"{locationName}, {country}"
                    },
                    WeatherForecast = new
                    {
                        CurrentTemperature = currentWeather?["temperature"]?.ToString() + " °C",
                        WindSpeed = currentWeather?["windspeed"]?.ToString() + " km/h",
                        WeatherCode = GetWeatherDescription(currentWeather?["weathercode"]?.ToObject<int>() ?? 0),
                        MeasurementTime = currentWeather?["time"]?.ToString()
                    }
                };

                return Ok(result);
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { Error = "Unexpected Error: ", Details = ex.Message });
            }
        }

        /// <summary>
        ///  Open-Meteo WMO To Readable Record
        /// </summary>
        private string GetWeatherDescription(int weatherCode)
        {
            // Based on WMO Code List
            return weatherCode switch
            {
                0 => "Clear sky",
                1 or 2 or 3 => "Mainly clear, partly cloudy, and overcast",
                45 or 48 => "Fog and depositing rime fog",
                51 or 53 or 55 => "Drizzle: Light, moderate, and dense intensity",
                61 or 63 or 65 => "Rain: Slight, moderate and heavy intensity",
                71 or 73 or 75 => "Snow fall: Slight, moderate, and heavy intensity",
                95 => "Thunderstorm: Slight or moderate",
                96 or 99 => "Thunderstorm with slight and heavy hail",
                _ => "Unknown"
            };
        }
    }
}