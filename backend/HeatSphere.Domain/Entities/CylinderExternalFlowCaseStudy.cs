using HeatSphere.Domain.Entities;

public class CylinderExternalFlowCaseStudy
{
    public Guid Id { get; private set; }
    public string Name { get; private set; } = string.Empty;

    // Inputs
    public double Diameter { get; private set; }
    public double Velocity { get; private set; }
    public double FluidTemperature { get; private set; }
    public double SurfaceTemperature { get; private set; }

    // Propriedades do Fluido (Snapshot do momento do cálculo)
    public double KinematicViscosity { get; private set; }
    public double Prandtl { get; private set; }
    public double ThermalConductivity { get; private set; }

    // Outputs
    public double FilmTemperature { get; private set; }
    public double Reynolds { get; private set; }
    public double Nusselt { get; private set; }
    public double HeatTransferCoefficient { get; private set; }
    public double HeatFlux { get; private set; }

    // Construtor
    public CylinderExternalFlowCaseStudy(string name, double diameter, double velocity, double fluidTemp, double surfaceTemp)
    {
        Id = Guid.NewGuid();
        Name = name;
        Diameter = diameter;
        Velocity = velocity;
        FluidTemperature = fluidTemp;
        SurfaceTemperature = surfaceTemp;

        // Regra de Domínio imediata
        FilmTemperature = (fluidTemp + surfaceTemp) / 2.0;
    }

    // Método Calculate recebe as propriedades já interpoladas
    public void Calculate(FluidPropertyPoint interpolatedProps)
    {
        // 1. Armazena o snapshot das propriedades usadas
        KinematicViscosity = interpolatedProps.KinematicViscosity;
        Prandtl = interpolatedProps.Prandtl;
        ThermalConductivity = interpolatedProps.ThermalConductivity;

        // 2. Reynolds
        Reynolds = (Velocity * Diameter) / KinematicViscosity;

        // 3. Nusselt (Churchill-Bernstein)
        if (Reynolds * Prandtl >= 0.2)
        {
            double term1 = 0.62 * Math.Pow(Reynolds, 0.5) * Math.Pow(Prandtl, 1.0 / 3.0);
            double term2 = Math.Pow(1 + Math.Pow(0.4 / Prandtl, 2.0 / 3.0), 0.25);
            double term3 = Math.Pow(1 + Math.Pow(Reynolds / 282000.0, 5.0 / 8.0), 0.8);

            Nusselt = 0.3 + (term1 / term2) * term3;
        }
        else
        {
            Nusselt = 0.0; // Ou lançar exceção de fora do range
        }

        // 4. Coeficiente h
        HeatTransferCoefficient = (Nusselt * ThermalConductivity) / Diameter;

        // 5. Fluxo de Calor q" = h * (Ts - Tinf)
        // Nota: Incropera define q = h(Ts - Tinf) para resfriamento. Se for aquecimento, sinal inverte.
        // Vamos usar magnitude ou convenção padrão.
        HeatFlux = HeatTransferCoefficient * (SurfaceTemperature - FluidTemperature);
    }
}
