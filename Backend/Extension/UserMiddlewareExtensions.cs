namespace WebAPITemplate.Extension
{
    public static class UserMiddlewareExtensions
    {
        //add middleware: https://learn.microsoft.com/en-us/aspnet/core/fundamentals/middleware/write?view=aspnetcore-7.0&viewFallbackFrom=aspnetcore-2.2#per-request-middleware-dependencies
        public static IApplicationBuilder UseGLSMiddleware(
            this IApplicationBuilder builder)
        {
            return builder.UseMiddleware<GLSHK.Logging.GLSLoggerMiddleware>();
        }
    }
}
