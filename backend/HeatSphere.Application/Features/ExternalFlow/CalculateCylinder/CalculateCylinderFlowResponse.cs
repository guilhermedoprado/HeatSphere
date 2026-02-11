namespace HeatSphere.Application.Features.ExternalFlow.CalculateCylinder;

public record CalculateCylinderFlowResponse(
    // Identificação
    Guid Id,
    string Name,

    // Inputs confirmados
    double Diameter,
    double Velocity,
    double FluidTemperatureK,
    double SurfaceTemperatureK,

    // Propriedades Interpoladas (Snapshot)
    double FilmTemperatureK,
    double KinematicViscosity,
    double Prandtl,
    double ThermalConductivity,

    // Resultados Calculados
    double Reynolds,
    double Nusselt,
    double HeatTransferCoefficient,
    double HeatFlux                 
);