# build — pinned to match local SDK (dotnet --version)
FROM mcr.microsoft.com/dotnet/sdk:10.0.102 AS build
WORKDIR /src

COPY backend/HeatSphere.Domain/HeatSphere.Domain.csproj backend/HeatSphere.Domain/
COPY backend/HeatSphere.Application/HeatSphere.Application.csproj backend/HeatSphere.Application/
COPY backend/HeatSphere.Infrastructure/HeatSphere.Infrastructure.csproj backend/HeatSphere.Infrastructure/
COPY backend/HeatSphere.Api/HeatSphere.Api.csproj backend/HeatSphere.Api/

RUN dotnet restore backend/HeatSphere.Api/HeatSphere.Api.csproj

COPY . .
RUN dotnet publish backend/HeatSphere.Api/HeatSphere.Api.csproj -c Release -o /app/publish

# run — pinned to matching runtime
FROM mcr.microsoft.com/dotnet/aspnet:10.0.1 AS final
WORKDIR /app
EXPOSE 8080
ENV ASPNETCORE_URLS=http://+:8080
COPY --from=build /app/publish .
ENTRYPOINT ["dotnet", "HeatSphere.Api.dll"]
