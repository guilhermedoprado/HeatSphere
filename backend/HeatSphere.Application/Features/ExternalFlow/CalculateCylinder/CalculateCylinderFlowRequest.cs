using MediatR;

namespace HeatSphere.Application.Features.ExternalFlow.CalculateCylinder;

// Input do usuário (Command)
public record CalculateCylinderFlowRequest(
    string Name,
    double Diameter,            // Metros
    double Velocity,            // m/s
    double FluidTemperature,    // Kelvin
    double SurfaceTemperature   // Kelvin
) : IRequest<CalculateCylinderFlowResponse>;
