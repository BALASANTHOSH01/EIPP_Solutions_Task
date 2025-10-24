// EditPage.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container } from "../components/Layout/Container";
import { InputField } from "../components/Form/InputField";
import { Toast } from "../components/Reusable/Toast";
import { useRegistrationForm } from "../hooks/useRegistrationForm";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import {
  updateUser,
  fetchUserById,
  clearCurrentUser,
  clearError,
} from "../store/userSlice";

const EditPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser, loading, error } = useAppSelector(
    (state) => state.users
  );
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState<"success" | "error">("success");

  const {
    formData,
    setFormData,
    validationErrors,
    handleChange,
    handleBlur,
    validateForm,
  } = useRegistrationForm(currentUser || undefined, true);

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(Number(id)));
    }
    return () => {
      dispatch(clearCurrentUser());
    };
  }, [id, dispatch]);

  useEffect(() => {
    if (currentUser) {
      setFormData({
        firstName: currentUser.firstName || "",
        lastName: currentUser.lastName || "",
        email: currentUser.email || "",
        password: currentUser.password,
        confirmPassword: currentUser.password,
        dateOfBirth: currentUser.dateOfBirth
          ? new Date(currentUser.dateOfBirth).toISOString().split("T")[0]
          : "",
      });
    }
  }, [currentUser, setFormData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const errorMessages = Object.values(validationErrors).join("\n");
      setToastMessage(errorMessages || "Please fix the validation errors");
      setToastType("error");
      setShowToast(true);
      return;
    }

    try {
      const payload = { ...formData };
      if (!payload.password) delete payload.password;
      if (!payload.confirmPassword) delete payload.confirmPassword;

      await dispatch(updateUser({ ...payload, id: Number(id) })).unwrap();
      setToastMessage("User updated successfully!");
      setToastType("success");
      setShowToast(true);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err: any) {
      setToastMessage(err.message || "Failed to update user");
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

  if (loading && !currentUser) {
    return (
      <Container className="py-5">
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-muted">Loading user data...</h5>
          </div>
        </div>
      </Container>
    );
  }

  console.log("currentUser :", currentUser);

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
                  <i className="bi bi-pencil-square me-2"></i>
                  Edit User Details
                </h2>
                <p className="text-center mb-0 mt-2 opacity-75">
                  Update user information below
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
                    
                    <InputField
                      label="Password"
                      name="password"
                      type="text"
                      value={formData.password || ""}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={validationErrors.password}
                      placeholder="Enter new password"
                      disableField
                    />
                  </div>

                  {/* Additional Information Section */}
                  <div className="mb-2">
              
                    <div className="row">
                      <div className="col-md-12">
                        <InputField
                          label="Date of Birth"
                          name="dateOfBirth"
                          type="date"
                          value={
                            formData.dateOfBirth
                              ? new Date(formData.dateOfBirth)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
                          onChange={handleChange}
                          onBlur={handleBlur}
                          error={validationErrors.dateOfBirth}
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
                          Updating...
                        </>
                      ) : (
                        <>
                          <i className="bi bi-check-circle me-2"></i>Update User
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

export default EditPage;
