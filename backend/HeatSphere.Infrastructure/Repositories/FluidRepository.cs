using HeatSphere.Application.Interfaces;
using HeatSphere.Domain.Entities;
using HeatSphere.Infrastructure.Persistence;
using Microsoft.EntityFrameworkCore;

namespace HeatSphere.Infrastructure.Repositories;

public class FluidRepository : IFluidRepository
{
    private readonly AppDbContext _context;

    public FluidRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<List<FluidPropertyPoint>> GetPropertyPointsByFluidIdAsync(Guid fluidId)
    {
        // Aqui vai o código de acesso ao banco que estava no seu serviço
        return await _context.FluidPropertyPoints
            .Where(p => p.FluidId == fluidId)
            .OrderBy(p => p.TemperatureK)
            .ToListAsync();
    }
}
