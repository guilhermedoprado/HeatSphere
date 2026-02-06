using HeatSphere.Application.HeatExchangers;

var builder = WebApplication.CreateBuilder(args);

// Swagger / OpenAPI
builder.Services.AddEndpointsApiExplorer(); // necessário para Minimal APIs [web:255]
builder.Services.AddSwaggerGen();

// CORS (para React em http://localhost:5173)
const string CorsPolicy = "FrontendDev";
builder.Services.AddCors(options =>
{
    options.AddPolicy(CorsPolicy, policy =>
        policy.WithOrigins("http://localhost:5173")
              .AllowAnyHeader()
              .AllowAnyMethod());
});

// Use cases
builder.Services.AddSingleton<RateShellAndTube12WithLmtd>();

var app = builder.Build();

app.UseCors(CorsPolicy); // habilita CORS globalmente [web:456]

app.UseSwagger();
app.UseSwaggerUI();

var api = app.MapGroup("/api");

// endpoint de exemplo (o seu rating)
api.MapPost("/heat-exchangers/shell-tube/1-2/rating",
    (RateShellAndTube12Request req, RateShellAndTube12WithLmtd useCase) =>
        TypedResults.Ok(useCase.Execute(req)));

app.Run();