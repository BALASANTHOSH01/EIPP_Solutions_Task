using Microsoft.AspNetCore.Mvc;
using UserRegistrationApi.DTOs;
using UserRegistrationApi.Services;
using UserRegistrationApi.Validators;
using FluentValidation;
using FluentValidation.Results;

namespace UserRegistrationApi.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly UserService _userService;
    private readonly IValidator<RegisterUserDto> _validator;

    public UsersController(UserService userService, IValidator<RegisterUserDto> validator)
    {
        _userService = userService;
        _validator = validator;
    }

    [HttpPost]
    public async Task<IActionResult> Register([FromBody] RegisterUserDto dto)
    {
        ValidationResult result = await _validator.ValidateAsync(dto);
        if (!result.IsValid)
        {
            var errors = result.Errors.Select(e => new { field = e.PropertyName, error = e.ErrorMessage });
            return BadRequest(new { errors });
        }

        try
        {
            var user = await _userService.RegisterAsync(dto);
            return Ok(new
            {
                message = "User registered successfully",
                user = new { user.Id, user.FirstName, user.LastName, user.Email, user.DateOfBirth, user.CreatedAt }
            });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "An error occurred while registering user" });
        }
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var users = await _userService.GetAllAsync();
        var safe = users.Select(u => new { u.Id, u.FirstName, u.LastName, u.Email, u.DateOfBirth, u.CreatedAt });
        return Ok(safe);
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(int id)
    {
        var user = await _userService.GetByIdAsync(id);
        Console.WriteLine("user Data: " + user.PasswordHash);
        return Ok(new
        {
            user.Id,
            user.FirstName,
            user.LastName,
            user.Email,
            user.DateOfBirth,
            user.CreatedAt,
            user.PasswordHash    
        });
    }


    [HttpPut("{id}")]
    public async Task<IActionResult> Update(int id, [FromBody] RegisterUserDto dto)
    {
        // Use validator in update mode
        var validator = new RegisterUserValidator(isUpdate: true);
        var result = await validator.ValidateAsync(dto);

        if (!result.IsValid)
        {
            var errors = result.Errors.Select(e => new { field = e.PropertyName, error = e.ErrorMessage });
            return BadRequest(new { errors });
        }

        try
        {
            var user = await _userService.UpdateAsync(id, dto);
            return Ok(new
            {
                message = "User updated successfully",
                user = new { user.Id, user.FirstName, user.LastName, user.Email, user.DateOfBirth, user.CreatedAt }
            });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "An error occurred while updating user" });
        }
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        try
        {
            await _userService.DeleteAsync(id);
            return Ok(new { message = "User deleted successfully" });
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(new { message = ex.Message });
        }
        catch (Exception)
        {
            return StatusCode(500, new { message = "An error occurred while deleting user" });
        }
    }
}