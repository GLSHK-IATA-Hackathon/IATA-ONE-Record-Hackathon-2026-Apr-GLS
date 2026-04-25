using WebAPITemplate.Extension;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddNewtonsoftJson();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

//include all configure.
//e.g.: log4net.config, DataSource.config
builder.Host.AddHostConfigure();

//include all DI
builder.Services.AddDIServices();

//add validation
builder.Services.AddValidationServices();

var app = builder.Build();

// Add middleware to auto log request and response content
// must add AddDIServices for IGLSLoggerHelper
//https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/write?view=aspnetcore-7.0&viewFallbackFrom=aspnetcore-2.2#per-request-middleware-dependencies

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();

