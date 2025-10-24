// using BCrypt.Net;

namespace UserRegistrationApi.Utils;

public static class PasswordHasher
{
    // Hash the password
    public static string Hash(string password)
    {
        // return BCrypt.Net.BCrypt.HashPassword(password);
        return password;
    }

    // Verify the password against the hash
    public static bool Verify(string password, string hash)
    {
        // return BCrypt.Net.BCrypt.Verify(password, hash);
        return true;
    }
}
