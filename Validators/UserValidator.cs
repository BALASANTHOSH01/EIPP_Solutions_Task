using FluentValidation;
using UserRegistrationApi.DTOs;
using System;

namespace UserRegistrationApi.Validators
{
    public class RegisterUserValidator : AbstractValidator<RegisterUserDto>
    {
        public RegisterUserValidator(bool isUpdate = false)
        {
            RuleFor(x => x.FirstName)
                .NotEmpty().WithMessage("First name is required")
                .MaximumLength(50).WithMessage("First name must not exceed 50 characters");

            RuleFor(x => x.LastName)
                .NotEmpty().WithMessage("Last name is required")
                .MaximumLength(50).WithMessage("Last name must not exceed 50 characters");

            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required")
                .EmailAddress().WithMessage("Invalid email format");


            // Registration scenario
            if (!isUpdate)
            {
                RuleFor(x => x.Password)
                    .NotEmpty().WithMessage("Password is required")
                    .MinimumLength(8).WithMessage("Password must be at least 8 characters");

                RuleFor(x => x.ConfirmPassword)
                    .NotEmpty().WithMessage("Confirm password is required")
                    .Equal(x => x.Password).WithMessage("Passwords must match");
            }
            else // Update scenario
            {
                RuleFor(x => x.Password)
                    .MinimumLength(8).WithMessage("Password must be at least 8 characters")
                    .When(x => !string.IsNullOrEmpty(x.Password)); 

                RuleFor(x => x.ConfirmPassword)
                    .Equal(x => x.Password)
                    .When(x => !string.IsNullOrEmpty(x.Password)); 
            }



            RuleFor(x => x.DateOfBirth)
                .Must(BeAtLeast18)
                .WithMessage("User must be at least 18 years old");
        }

        private bool BeAtLeast18(DateTime dob)
        {
            var today = DateTime.Today;
            var age = today.Year - dob.Year;
            if (dob.Date > today.AddYears(-age)) age--;
            return age >= 18;
        }
    }
}
