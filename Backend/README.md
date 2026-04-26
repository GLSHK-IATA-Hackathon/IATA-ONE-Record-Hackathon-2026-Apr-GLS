# API Reference

This document covers all API endpoints in the following controllers:

- `ConverterController`
- `ULDMonitorController`
- `TrackingController`
- `IoTWeatherController`

## ConverterController

**Route Prefix:** `/api/Converter`

### 1. `POST /Mapping1RCompacttoXSDG`
- **Description:** Converts ONE Record JSON (compact) to XSDG XML.
- **Request Body:** JSON (ONE Record format)
- **Response:** XML (XSDG format)
- **Content-Type:** `application/xml`

### 2. `POST /MappingXSDGto1RCompact`
- **Description:** Converts XSDG XML to ONE Record JSON (compact).
- **Request Body:** Form field `xmlContent` (string, XML)
- **Response:** JSON (ONE Record format)
- **Content-Type:** `application/json`

### 3. `POST /Mapping1RFlattentoXSDG`
- **Description:** Converts ONE Record Flattened JSON-LD (`@graph`) to XSDG XML.
- **Request Body:** JSON-LD (with `@graph`)
- **Response:** XML (XSDG format)
- **Content-Type:** `application/xml`

### 4. `POST /MappingXSDGto1RFlatten`
- **Description:** Converts XSDG XML to ONE Record Flattened JSON-LD (`@graph`).
- **Request Body:** Form field `xmlContent` (string, XML)
- **Response:** JSON-LD (with `@graph`)
- **Content-Type:** `application/json`

## ULDMonitorController

**Route Prefix:** `/api/ULDMonitor`

> _**Note:** The actual endpoints and their details depend on your implementation in `ULDMonitorController.cs`.  
> Please update this section with the specific endpoints, parameters, and descriptions from your code._

## TrackingController

**Route Prefix:** `/api/Tracking`

> _**Note:** The actual endpoints and their details depend on your implementation in `TrackingController.cs`.  
> Please update this section with the specific endpoints, parameters, and descriptions from your code._

## IoTWeatherController

**Route Prefix:** `/api/IoTWeather`

### 1. `GET /GetLocationAndWeather`
- **Description:** Obtain location information and weather forecasts via ULD IoT's latitude and longitude.
- **Query Parameters:**
  - `lat` (double, required): Latitude
  - `lon` (double, required): Longitude
- **Response:** JSON object containing:
  - `ULD_Coordinates`: `{ Latitude, Longitude }`
  - `LocationDetails`: `{ City, Country, FullLocation }`
  - `WeatherForecast`: `{ CurrentTemperature, WindSpeed, WeatherCode, MeasurementTime }`
- **Content-Type:** `application/json`

## Error Handling

All endpoints return HTTP 500 with a JSON error object on unexpected errors.

## Notes

- All endpoints are accessible anonymously by default.
- For detailed request/response examples, see the main [README.md](./README.md).
- For endpoints in `ULDMonitorController` and `TrackingController`, please refer to their respective source files or update this document with their API details.



## Remarks
To the testing port might be different by PC, please use the port you see after complie in swagger (e,g https://localhost:7183/swagger/index.html)