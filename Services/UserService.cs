using UserRegistrationApi.Data;
using UserRegistrationApi.DTOs;
using UserRegistrationApi.Models;
using UserRegistrationApi.Utils;
using Microsoft.EntityFrameworkCore;

namespace UserRegistrationApi.Services;

public class UserService
{
    private readonly AppDbContext _db;
    public UserService(AppDbContext db) => _db = db;

    public async Task<User> RegisterAsync(RegisterUserDto dto, CancellationToken ct = default)
    {
        var exists = await _db.Users.AnyAsync(u => u.Email == dto.Email, ct);
        if (exists) throw new InvalidOperationException("Email already registered");

        var user = new User
        {
            FirstName = dto.FirstName.Trim(),
            LastName = dto.LastName.Trim(),
            Email = dto.Email.Trim().ToLowerInvariant(),
            // PasswordHash = PasswordHasher.Hash(dto.Password),
            PasswordHash = dto.Password, // development only
            DateOfBirth = dto.DateOfBirth,
            CreatedAt = DateTime.UtcNow
        };

        _db.Users.Add(user);
        await _db.SaveChangesAsync(ct);

        return user;
    }

    public async Task<List<User>> GetAllAsync(CancellationToken ct = default) =>
        await _db.Users.AsNoTracking().ToListAsync(ct);

    public async Task<User> GetByIdAsync(int id, CancellationToken ct = default)
    {
        var user = await _db.Users.FindAsync(new object[] { id }, ct);
        if (user == null) throw new KeyNotFoundException($"User with ID {id} not found");
        return user;
    }

    public async Task<User> UpdateAsync(int id, RegisterUserDto dto, CancellationToken ct = default)
    {
        var user = await _db.Users.FindAsync(new object[] { id }, ct);
        if (user == null) throw new KeyNotFoundException($"User with ID {id} not found");

        // Check if email is being changed and if it's already taken by another user
        if (user.Email != dto.Email.Trim().ToLowerInvariant())
        {
            var emailExists = await _db.Users.AnyAsync(u => u.Email == dto.Email && u.Id != id, ct);
            if (emailExists) throw new InvalidOperationException("Email already registered");
        }

        user.FirstName = dto.FirstName.Trim();
        user.LastName = dto.LastName.Trim();
        user.Email = dto.Email.Trim().ToLowerInvariant();
        user.DateOfBirth = dto.DateOfBirth;

        // Only update password if provided
        if (!string.IsNullOrEmpty(dto.Password))
        {
            user.PasswordHash = PasswordHasher.Hash(dto.Password);
        }

        await _db.SaveChangesAsync(ct);
        return user;
    }

    public async Task DeleteAsync(int id, CancellationToken ct = default)
    {
        var user = await _db.Users.FindAsync(new object[] { id }, ct);
        if (user == null) throw new KeyNotFoundException($"User with ID {id} not found");

        _db.Users.Remove(user);
        await _db.SaveChangesAsync(ct);
    }
}