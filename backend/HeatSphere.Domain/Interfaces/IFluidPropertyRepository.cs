using HeatSphere.Domain.Entities;

namespace HeatSphere.Domain.Interfaces;

public interface IFluidPropertyRepository
{
    Task<List<FluidPropertyPoint>> GetPointsAsync(Guid fluidId);
}
