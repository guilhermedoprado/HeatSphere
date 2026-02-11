namespace HeatSphere.Domain.Entities;

public class FluidPropertyPoint
{
    public Guid Id { get; set; }        
    public Guid FluidId { get; set; }   

    public double TemperatureK { get; set; }
    public double Density { get; set; }
    public double SpecificHeatAtConstantPressure { get; set; }
    public double DynamicViscosity { get; set; }
    public double KinematicViscosity { get; set; }
    public double ThermalConductivity { get; set; }
    public double ThermalDiffusivity { get; set; }
    public double Prandtl { get; set; }
}
