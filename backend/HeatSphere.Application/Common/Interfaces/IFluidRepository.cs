using HeatSphere.Domain.Entities;

namespace HeatSphere.Application.Interfaces;

public interface IFluidRepository
{
    // A única coisa que o serviço precisa é pegar a lista de pontos
    Task<List<FluidPropertyPoint>> GetPropertyPointsByFluidIdAsync(Guid fluidId);
}
