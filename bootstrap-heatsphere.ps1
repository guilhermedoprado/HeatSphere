dotnet new sln -n HeatSphere
dotnet new gitignore

dotnet new classlib -o backend/HeatSphere.Domain -n HeatSphere.Domain
dotnet new classlib -o backend/HeatSphere.Application -n HeatSphere.Application
dotnet new classlib -o backend/HeatSphere.Infrastructure -n HeatSphere.Infrastructure
dotnet new webapi -o backend/HeatSphere.Api -n HeatSphere.Api

dotnet sln add backend/HeatSphere.Domain/HeatSphere.Domain.csproj
dotnet sln add backend/HeatSphere.Application/HeatSphere.Application.csproj
dotnet sln add backend/HeatSphere.Infrastructure/HeatSphere.Infrastructure.csproj
dotnet sln add backend/HeatSphere.Api/HeatSphere.Api.csproj

dotnet add backend/HeatSphere.Application reference backend/HeatSphere.Domain
dotnet add backend/HeatSphere.Infrastructure reference backend/HeatSphere.Application
dotnet add backend/HeatSphere.Infrastructure reference backend/HeatSphere.Domain
dotnet add backend/HeatSphere.Api reference backend/HeatSphere.Application
dotnet add backend/HeatSphere.Api reference backend/HeatSphere.Infrastructure
