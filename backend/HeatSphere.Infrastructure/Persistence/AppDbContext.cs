using HeatSphere.Domain.Common;
using Microsoft.EntityFrameworkCore;

namespace HeatSphere.Infrastructure.Persistence;

public sealed class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Note> Notes => Set<Note>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Note>(entity =>
        {
            entity.ToTable("notes");
            entity.HasKey(n => n.Id);
            entity.Property(n => n.Title).IsRequired().HasMaxLength(200);
            entity.Property(n => n.Subject).IsRequired().HasMaxLength(200);
            entity.Property(n => n.ContentMarkdown).HasColumnType("text");
            entity.Property(n => n.Tags).HasColumnType("text[]"); // array nativo do PostgreSQL
            entity.Property(n => n.CreatedAt).HasDefaultValueSql("now() at time zone 'utc'");
            entity.Property(n => n.UpdatedAt).HasDefaultValueSql("now() at time zone 'utc'");
        });
    }
}