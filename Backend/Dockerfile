#See https://aka.ms/containerfastmode to understand how Visual Studio uses this Dockerfile to build your images for faster debugging.

FROM harbor.ad.glshk.com/baseimgproxy/dotnet/aspnet:8.0.21
WORKDIR /app
EXPOSE 80
EXPOSE 443

#build through Jenkins: "COPY app ."
COPY app .
#build at local [Window docker with Linux container]: "COPY . app"
#COPY . app 

#DOTNET 8.0 Default port changed to 8080 for non-root user. 
#However, this port does not follow GLS CI/CD standard. So need to add these variables to select port 80 explicitly.
#ref: https://learn.microsoft.com/en-us/dotnet/core/compatibility/containers/8.0/aspnet-port
ENV ASPNETCORE_HTTP_PORTS 80
ENV ASPNETCORE_URLS http://*:80

ENTRYPOINT ["dotnet", "WebAPITemplate.dll"]