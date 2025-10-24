// UserListPage.tsx
import React from "react";
import { Link } from "react-router-dom";
import { Container } from "../components/Layout/Container";
import { UserTable } from "../components/UserList/UserTable";
import { useUserList } from "../hooks/useUserList";

const UserListPage: React.FC = () => {
  const { users, loading, error, deleteId, handleDelete } = useUserList();

  return (
    <Container className="py-5">
      {/* Header Section */}
      <div className="row mb-4">
        <div className="col-12">
          <div className="bg-light p-3 p-lg-4 rounded-3 shadow-sm border">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center gap-3">
              {/* Title and subtitle */}
              <div>
                <h1 className="h4 h-lg-3 fw-bold text-primary d-flex align-items-center mb-1">
                  <i className="bi bi-people-fill me-2 fs-5"></i>
                  User Management
                </h1>
                <p className="text-muted mb-0" style={{ fontSize: "0.9rem" }}>
                  Manage and organize your users efficiently
                </p>
              </div>

              {/* Add New User Button */}
              <Link
                to="/register"
                className="btn btn-primary shadow-sm d-flex align-items-center px-4 py-2 flex-shrink-0"
                style={{ fontSize: "0.95rem", fontWeight: "600" }}
              >
                <i className="bi bi-person-plus-fill me-2"></i>
                Add New User
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show shadow-sm"
          role="alert"
        >
          <i className="bi bi-exclamation-triangle-fill me-2"></i>
          <strong>Error!</strong> {error}
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="alert"
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Loading State */}
      {loading && users.length === 0 ? (
        <div className="card border-0 shadow-sm">
          <div className="card-body text-center py-5">
            <div
              className="spinner-border text-primary mb-3"
              role="status"
              style={{ width: "3rem", height: "3rem" }}
            >
              <span className="visually-hidden">Loading...</span>
            </div>
            <h5 className="text-muted">Loading users...</h5>
          </div>
        </div>
      ) : (
        <UserTable users={users} onDelete={handleDelete} deleteId={deleteId} />
      )}
    </Container>
  );
};

export default UserListPage;
