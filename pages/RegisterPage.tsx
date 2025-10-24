// RegisterPage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container } from "../components/Layout/Container";
import { InputField } from "../components/Form/InputField";
import { Toast } from "../components/Reusable/Toast";
import { useRegistrationForm } from "../hooks/useRegistrationForm";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { createUser, clearError } from "../store/userSlice";

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector((state) => state.users);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const {
    formData,
    validationErrors,
    handleChange,
    handleBlur,
    validateForm,
    resetForm,
  } = useRegistrationForm();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) {
      setToastMessage("Please fill in all required fields correctly");
      setToastType("error");
      setShowToast(true);
      return;
    }

    try {
      await dispatch(createUser(formData)).unwrap();
      setToastMessage("User registered successfully!");
      setToastType("success");
      setShowToast(true);
      resetForm();

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err: any) {
      let message = "An unexpected error occurred. Please try again.";

      if (err?.message?.includes("Network"))
        message = "Network error. Please check your connection.";
      else if (err?.status === 500)
        message = "Server error. Please try again later.";
      else if (err?.message) message = err.message;

      setToastMessage(message);
      setToastType("error");
      setShowToast(true);
    }
  };

  const handleToastClose = () => {
    setShowToast(false);
    if (error) {
      dispatch(clearError());
    }
  };

  return (
    <>
      <Container className="py-5">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card border-0 shadow-lg">
              {/* Card Header */}
              <div
                className="card-header text-white py-4 border-0"
                style={{
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              >
                <h2 className="mb-0 text-center fw-bold">
                  <i className="bi bi-person-plus-fill me-2"></i>
                  Register New User
                </h2>
                <p className="text-center mb-0 mt-2 opacity-75">
                  Fill in the details below to create a new user account
                </p>
              </div>

              <div className="card-body p-4 p-md-5">
                <form onSubmit={handleSubmit} noValidate>
                  {/* Personal Information Section */}
                  <div className="mb-2">
                    <h5 className="text-primary mb-3 pb-2 border-bottom">
                      <i className="bi bi-person-badge me-2"></i>Personal
                      Information
                    </h5>
                    <div className="row g-3">
                      <div className="col-md-6">
                        <InputField
                          label="First Name"
                          name="firstName"
                          type="text"
                          value={formData.firstName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={validationErrors.firstName}
                          placeholder="Enter first name"
                          required
                          maxLength={50}
                        />
                      </div>
                      <div className="col-md-6">
                        <InputField
                          label="Last Name"
                          name="lastName"
                          type="text"
                          value={formData.lastName}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={validationErrors.lastName}
                          placeholder="Enter last name"
                          required
                          maxLength={50}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Contact Information Section */}
                  <div className="mb-2">
                    
                    <InputField
                      label="Email Address"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={validationErrors.email}
                      placeholder="example@email.com"
                      required
                    />
                  </div>

                  {/* Security Section */}
                  <div className="mb-2">

                    <div className="row g-3">
                      <div className="col-md-6">
                        <InputField
                          label="Password"
                          name="password"
                          type="password"
                          value={formData.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={validationErrors.password}
                          placeholder="Enter password"
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <InputField
                          label="Confirm Password"
                          name="confirmPassword"
                          type="password"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={validationErrors.confirmPassword}
                          placeholder="Confirm password"
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Additional Information Section */}
                  <div className="mb-2">
                 
                    <div className="row">
                      <div className="col-md-12">
                        <InputField
                          label="Date of Birth"
                          name="dateOfBirth"
                          type="date"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={validationErrors.dateOfBirth}
                          required
                          max={new Date().toISOString().split("T")[0]}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="d-flex flex-column flex-md-row justify-content-end gap-3 mt-5 pt-3 border-top">
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-lg px-4"
                      onClick={() => navigate("/")}
                    >
                      <i className="bi bi-x-circle me-2"></i>Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg px-5"
                      disabled={loading}
                      style={{
                        background:
                          "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                        border: "none",
                      }}
                    >
                      {loading ? (
                        <>
                          <span
                            className="spinner-border spinner-border-sm me-2"
                            role="status"
                            aria-hidden="true"
                          ></span>
                          Submitting...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>Register
                          User
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Toast
        message={toastMessage}
        type={toastType}
        show={showToast}
        onClose={handleToastClose}
      />
    </>
  );
};

export default RegisterPage;
