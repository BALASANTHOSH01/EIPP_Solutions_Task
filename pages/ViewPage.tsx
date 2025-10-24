import React, { useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Container } from "../components/Layout/Container";
import { useAppDispatch, useAppSelector } from "../hooks/useRedux";
import { fetchUserById, clearCurrentUser } from "../store/userSlice";

const ViewPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { currentUser, loading, error } = useAppSelector(
    (state) => state.users
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchUserById(Number(id)));
    }
    return () => {
      dispatch(clearCurrentUser());
    };
  }, [id, dispatch]);

  if (loading) {
    return (
      <Container className="mt-5">
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
            style={{ width: "3rem", height: "3rem" }}
          >
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3 text-muted fs-5">Loading user details...</p>
        </div>
      </Container>
    );
  }

  if (error || !currentUser) {
    return (
      <Container className="mt-5">
        <div className="row justify-content-center">
          <div className="col-md-8 col-lg-6">
            <div className="alert alert-danger border-0 shadow-sm" role="alert">
              <h4 className="alert-heading">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>
                Error
              </h4>
              <p className="mb-0">{error || "User not found"}</p>
            </div>
            <div className="text-center">
              <button
                className="btn btn-primary btn-lg px-5"
                onClick={() => navigate("/")}
              >
                <i className="bi bi-arrow-left me-2"></i>
                Back to List
              </button>
            </div>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="mt-5 mb-5">
      <div className="row justify-content-center">
        <div className="col-md-10 col-lg-8">
          <div className="card border-0 shadow-lg rounded-4 overflow-hidden">
            {/* Card Header with Gradient */}
            <div className="card-header bg-gradient bg-primary text-white py-4 border-0">
              <div className="text-center">
                <div
                  className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-3"
                  style={{ width: "80px", height: "80px" }}
                >
                  <span className="text-primary fw-bold display-4">
                    {currentUser.firstName.charAt(0).toUpperCase()}
                    {currentUser.lastName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="card-title mb-1 fw-bold">
                  {currentUser.firstName} {currentUser.lastName}
                </h2>
                <p className="mb-0 opacity-75">
                  <i className="bi bi-envelope-fill me-2"></i>
                  {currentUser.email}
                </p>
              </div>
            </div>

            {/* Card Body */}
            <div className="card-body p-5">
              <h5 className="text-muted text-uppercase mb-4 fw-bold border-bottom pb-2">
                Personal Information
              </h5>

              <div className="row g-4">
                {/* First Name */}
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded-3 border border-light">
                    <label className="form-label text-muted small mb-1 fw-semibold">
                      <i className="bi bi-person-fill me-2 text-primary"></i>
                      FIRST NAME
                    </label>
                    <p className="mb-0 fs-5 fw-semibold text-dark">
                      {currentUser.firstName}
                    </p>
                  </div>
                </div>

                {/* Last Name */}
                <div className="col-md-6">
                  <div className="p-3 bg-light rounded-3 border border-light">
                    <label className="form-label text-muted small mb-1 fw-semibold">
                      <i className="bi bi-person-fill me-2 text-primary"></i>
                      LAST NAME
                    </label>
                    <p className="mb-0 fs-5 fw-semibold text-dark">
                      {currentUser.lastName}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="col-12">
                  <div className="p-3 bg-light rounded-3 border border-light">
                    <label className="form-label text-muted small mb-1 fw-semibold">
                      <i className="bi bi-envelope-fill me-2 text-primary"></i>
                      EMAIL ADDRESS
                    </label>
                    <p className="mb-0 fs-5 fw-semibold text-dark text-break">
                      {currentUser.email}
                    </p>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="col-12">
                  <div className="p-3 bg-light rounded-3 border border-light">
                    <label className="form-label text-muted small mb-1 fw-semibold">
                      <i className="bi bi-calendar-fill me-2 text-primary"></i>
                      DATE OF BIRTH
                    </label>
                    <p className="mb-0 fs-5 fw-semibold text-dark">
                      {new Date(currentUser.dateOfBirth).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </p>
                  </div>
                </div>

                {/* Age Badge */}
                <div className="col-12">
                  <div className="p-3 bg-info bg-opacity-10 rounded-3 border border-info border-opacity-25">
                    <label className="form-label text-info small mb-1 fw-semibold">
                      <i className="bi bi-person-badge-fill me-2"></i>
                      AGE
                    </label>
                    <p className="mb-0 fs-5 fw-semibold text-info">
                      {(() => {
                        const birthDate = new Date(currentUser.dateOfBirth);
                        const today = new Date();
                        let age = today.getFullYear() - birthDate.getFullYear();
                        const monthDiff =
                          today.getMonth() - birthDate.getMonth();
                        if (
                          monthDiff < 0 ||
                          (monthDiff === 0 &&
                            today.getDate() < birthDate.getDate())
                        ) {
                          age--;
                        }
                        return `${age} years old`;
                      })()}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Footer */}
            <div className="card-footer bg-light border-0 p-4">
              <div className="d-flex flex-column flex-md-row gap-3 justify-content-center">
                <Link
                  to={`/edit/${currentUser.id}`}
                  className="btn btn-warning btn-lg px-5 rounded-pill shadow-sm"
                >
                  <i className="bi bi-pencil-fill me-2"></i>
                  Edit User
                </Link>
                <button
                  type="button"
                  className="btn btn-outline-secondary btn-lg px-5 rounded-pill"
                  onClick={() => navigate("/")}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to List
                </button>
              </div>
            </div>
          </div>

       
        </div>
      </div>
    </Container>
  );
};

export default ViewPage;
