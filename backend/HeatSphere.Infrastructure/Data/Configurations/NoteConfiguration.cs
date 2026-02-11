using HeatSphere.Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace HeatSphere.Infrastructure.Data.Configurations;

public class NoteConfiguration : IEntityTypeConfiguration<Note>
{
    public void Configure(EntityTypeBuilder<Note> builder)
    {
        builder.ToTable("notes");

        builder.HasKey(n => n.Id);

        builder.Property(n => n.Title)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(n => n.Subject)
            .IsRequired()
            .HasMaxLength(200);

        builder.Property(n => n.ContentMarkdown)
            .HasColumnType("text");

        builder.Property(n => n.BriefDefinition)
            .HasMaxLength(500)
            .HasDefaultValue(string.Empty);

        builder.Property(n => n.SortOrder)
            .HasDefaultValue(0);

        // Configuração específica do PostgreSQL para arrays
        builder.Property(n => n.Tags)
            .HasColumnType("text[]");

        builder.Property(n => n.CreatedAt)
            .HasDefaultValueSql("now() at time zone 'utc'");

        builder.Property(n => n.UpdatedAt)
            .HasDefaultValueSql("now() at time zone 'utc'");
    }
}
