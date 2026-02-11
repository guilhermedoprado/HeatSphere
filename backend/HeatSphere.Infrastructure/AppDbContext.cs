using HeatSphere.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace HeatSphere.Infrastructure.Persistence;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Note> Notes => Set<Note>();
    public DbSet<Fluid> Fluids => Set<Fluid>();
    public DbSet<FluidPropertyPoint> FluidPropertyPoints => Set<FluidPropertyPoint>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        base.OnModelCreating(modelBuilder); // calls base
    }
}