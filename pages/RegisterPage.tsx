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
      <Container className="py-3 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card border-0 shadow">
              {/* Card Header */}
              <div className="card-header bg-primary text-white py-3 py-md-4 border-0">
                <h2 className="mb-0 text-center fw-bold h4 h-md-3">
                  <i className="bi bi-person-plus-fill me-2"></i>
                  Register New User
                </h2>
                <p
                  className="text-center mb-0 mt-2 small d-none d-sm-block"
                  style={{ opacity: 0.9 }}
                >
                  Fill in the details below to create a new user account
                </p>
              </div>

              <div className="card-body p-3 p-md-4 p-lg-5">
                <form onSubmit={handleSubmit} noValidate>
                  {/* Personal Information Section */}
                  <div className="mb-2">
                    <div className="row g-3">
                      <div className="col-12 col-md-6">
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
                      <div className="col-12 col-md-6">
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
                      <div className="col-12 col-md-6">
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
                      <div className="col-12 col-md-6">
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
                      <div className="col-12 col-md-12">
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
                  <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 gap-sm-3 mt-4 pt-3 pt-md-4 border-top">
                    <button
                      type="button"
                      className="btn btn-outline-secondary px-4 py-2 order-2 order-sm-1"
                      onClick={() => navigate("/")}
                      style={{ fontSize: "0.95rem" }}
                    >
                      <i className="bi bi-x-circle me-2"></i>
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn btn-primary px-4 px-sm-5 py-2 order-1 order-sm-2"
                      disabled={loading}
                      style={{ fontSize: "0.95rem", fontWeight: "600" }}
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
                          <i className="bi bi-check-circle me-2"></i>
                          Register User
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
