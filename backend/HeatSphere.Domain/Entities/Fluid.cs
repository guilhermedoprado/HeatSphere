namespace HeatSphere.Domain.Entities;

public class Fluid
{
    // Mude de 'private set' para 'init' (permite inicializar no HasData e mantém seguro depois)
    public Guid Id { get; init; }
    public string Name { get; init; } = string.Empty; // Inicialize para evitar warning CS8618

    public List<FluidPropertyPoint> Properties { get; private set; } = new();

    protected Fluid() { }

    public Fluid(Guid id, string name)
    {
        Id = id;
        Name = name;
    }
}