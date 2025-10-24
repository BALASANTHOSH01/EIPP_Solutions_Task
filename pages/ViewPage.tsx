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
      <Container className="py-3 py-md-5">
        <div className="card border-0 shadow">
          <div className="card-body text-center py-5">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-muted">Loading user details...</h5>
          </div>
        </div>
      </Container>
    );
  }

  if (error || !currentUser) {
    return (
      <Container className="py-3 py-md-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8">
            <div className="card border-0 shadow">
              <div className="card-body p-3 p-md-4">
                <div className="alert alert-danger border-0 mb-4" role="alert">
                  <h4 className="alert-heading">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    Error
                  </h4>
                  <p className="mb-0">{error || "User not found"}</p>
                </div>
                <div className="text-center">
                  <button
                    className="btn btn-primary px-4 py-2"
                    onClick={() => navigate("/")}
                    style={{ fontSize: "0.95rem", fontWeight: "600" }}
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
  }

  return (
    <Container className="py-3 py-md-5">
      <div className="row justify-content-center">
        <div className="col-12 col-md-10 col-lg-8">
          <div className="card border-0 shadow">
            {/* Card Header */}
            <div className="card-header bg-primary text-white py-3 py-md-4 border-0">
              <div className="text-center">
                <div
                  className="bg-white rounded-circle d-inline-flex align-items-center justify-content-center mb-2 mb-md-3"
                  style={{ width: "60px", height: "60px" }}
                >
                  <span className="text-primary fw-bold fs-3">
                    {currentUser.firstName.charAt(0).toUpperCase()}
                    {currentUser.lastName.charAt(0).toUpperCase()}
                  </span>
                </div>
                <h2 className="mb-1 fw-bold h4 h-md-3">
                  {currentUser.firstName} {currentUser.lastName}
                </h2>
                <p
                  className="mb-0 small d-none d-sm-block"
                  style={{ opacity: 0.9 }}
                >
                  <i className="bi bi-envelope-fill me-2"></i>
                  {currentUser.email}
                </p>
              </div>
            </div>

            {/* Card Body */}
            <div className="card-body p-3 p-md-4 p-lg-5">
              <div className="row g-3">
                {/* First Name */}
                <div className="col-12 col-md-6">
                  <div className="p-3 bg-light rounded border border-light">
                    <label className="form-label text-muted small mb-1 fw-semibold">
                      <i className="bi bi-person-fill me-2 text-primary"></i>
                      FIRST NAME
                    </label>
                    <p className="mb-0 fs-6 fw-semibold text-dark">
                      {currentUser.firstName}
                    </p>
                  </div>
                </div>

                {/* Last Name */}
                <div className="col-12 col-md-6">
                  <div className="p-3 bg-light rounded border border-light">
                    <label className="form-label text-muted small mb-1 fw-semibold">
                      <i className="bi bi-person-fill me-2 text-primary"></i>
                      LAST NAME
                    </label>
                    <p className="mb-0 fs-6 fw-semibold text-dark">
                      {currentUser.lastName}
                    </p>
                  </div>
                </div>

                {/* Email */}
                <div className="col-12">
                  <div className="p-3 bg-light rounded border border-light">
                    <label className="form-label text-muted small mb-1 fw-semibold">
                      <i className="bi bi-envelope-fill me-2 text-primary"></i>
                      EMAIL ADDRESS
                    </label>
                    <p className="mb-0 fs-6 fw-semibold text-dark text-break">
                      {currentUser.email}
                    </p>
                  </div>
                </div>

                {/* Date of Birth */}
                <div className="col-12 col-md-6">
                  <div className="p-3 bg-light rounded border border-light">
                    <label className="form-label text-muted small mb-1 fw-semibold">
                      <i className="bi bi-calendar-fill me-2 text-primary"></i>
                      DATE OF BIRTH
                    </label>
                    <p className="mb-0 fs-6 fw-semibold text-dark">
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
                <div className="col-12 col-md-6">
                  <div className="p-3 bg-light rounded border border-light">
                    <label className="form-label text-muted small mb-1 fw-semibold">
                      <i className="bi bi-person-badge-fill me-2 text-primary"></i>
                      AGE
                    </label>
                    <p className="mb-0 fs-6 fw-semibold text-dark">
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

              {/* Buttons */}
              <div className="d-flex flex-column flex-sm-row justify-content-end gap-2 gap-sm-3 mt-4 pt-3 pt-md-4 border-top">
                <button
                  type="button"
                  className="btn btn-outline-secondary px-4 py-2 order-2 order-sm-1"
                  onClick={() => navigate("/")}
                  style={{ fontSize: "0.95rem" }}
                >
                  <i className="bi bi-arrow-left me-2"></i>
                  Back to List
                </button>
                <Link
                  to={`/edit/${currentUser.id}`}
                  className="btn btn-primary px-4 px-sm-5 py-2 order-1 order-sm-2"
                  style={{ fontSize: "0.95rem", fontWeight: "600" }}
                >
                  <i className="bi bi-pencil-fill me-2"></i>
                  Edit User
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default ViewPage;
