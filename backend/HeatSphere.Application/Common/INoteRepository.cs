using HeatSphere.Domain.Common;

namespace HeatSphere.Application.Common;

public interface INoteRepository
{
    Task<Note?> GetByIdAsync(Guid id, CancellationToken ct = default);
    Task<IReadOnlyList<Note>> GetAllAsync(CancellationToken ct = default);
    Task AddAsync(Note note, CancellationToken ct = default);
    void Update(Note note);
    void Delete(Note note);
    Task SaveChangesAsync(CancellationToken ct = default);
}