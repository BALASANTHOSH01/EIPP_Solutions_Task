import { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { setValidationErrors, clearValidationErrors } from "../store/userSlice";
import type { User, ValidationErrors } from "../types";

export const useRegistrationForm = (
  initialValues?: User,
  isUpdate: boolean = false
) => {
  const dispatch = useAppDispatch();
  const validationErrors = useAppSelector(
    (state) => state.users.validationErrors
  );

  const [formData, setFormData] = useState<User>(
    initialValues || {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
    }
  );

  const validateField = useCallback(
    (name: string, value: string): string => {
      switch (name) {
        case "firstName":
          if (!value.trim()) return "First Name is required.";
          if (value.length > 50)
            return "First Name must not exceed 50 characters.";
          return "";

        case "lastName":
          if (!value.trim()) return "Last Name is required.";
          if (value.length > 50)
            return "Last Name must not exceed 50 characters.";
          return "";

        case "email":
          if (!value.trim()) return "Email is required.";
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (!emailRegex.test(value))
            return "Please enter a valid email address.";
          return "";

        case "password":
          if (!isUpdate && !value) return "Password is required.";
          if (value && value.length < 8)
            return "Password must be at least 8 characters long.";
          return "";

        case "confirmPassword":
          if (!value.trim()) return "Please confirm your password.";
          if (formData.password && value !== formData.password)
            return "Passwords do not match.";
          return "";

        case "dateOfBirth":
          if (!value) return "Date of Birth is required.";
          const birthDate = new Date(value);
          const today = new Date();
          let age = today.getFullYear() - birthDate.getFullYear();
          if (
            birthDate.getMonth() > today.getMonth() ||
            (birthDate.getMonth() === today.getMonth() &&
              birthDate.getDate() > today.getDate())
          ) {
            age--;
          }
          if (age < 18) return "You must be at least 18 years old.";
          return "";

        default:
          return "";
      }
    },
    [formData.password, isUpdate]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));

      if (validationErrors[name as keyof ValidationErrors]) {
        const newErrors = { ...validationErrors };
        delete newErrors[name as keyof ValidationErrors];
        dispatch(setValidationErrors(newErrors));
      }
    },
    [dispatch, validationErrors]
  );

  const handleBlur = useCallback(
    (e: React.FocusEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      const error = validateField(name, value);
      if (error) {
        dispatch(setValidationErrors({ ...validationErrors, [name]: error }));
      }
    },
    [dispatch, validateField, validationErrors]
  );

  const validateForm = useCallback((): boolean => {
    const errors: ValidationErrors = {};
    Object.keys(formData).forEach((key) => {
      if (key !== "id") {
        const error = validateField(key, formData[key as keyof User] as string);
        if (error) {
          errors[key as keyof ValidationErrors] = error;
        }
      }
    });
    dispatch(setValidationErrors(errors));
    return Object.keys(errors).length === 0;
  }, [formData, validateField, dispatch]);

  const resetForm = useCallback(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      dateOfBirth: "",
    });
    dispatch(clearValidationErrors());
  }, [dispatch]);

  return {
    formData,
    setFormData,
    validationErrors,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
  };
};
