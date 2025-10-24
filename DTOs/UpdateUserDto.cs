public class UpdateUserDto
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Password { get; set; } 
    public string? ConfirmPassword { get; set; } 
    public DateTime DateOfBirth { get; set; }
}
