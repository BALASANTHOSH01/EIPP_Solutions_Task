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
        <div className="col">
          <div className="d-flex justify-content-between align-items-center bg-light p-4 rounded-3 shadow-sm border">
            <div>
              <h1 className="mb-1 fw-bold text-primary">
                <i className="bi bi-people-fill me-2"></i>User Management
              </h1>
              <p className="text-muted mb-0 small">
                Manage your users efficiently
              </p>
            </div>
            <Link to="/register" className="btn btn-primary btn-lg shadow-sm">
              <i className="bi bi-person-plus-fill me-2"></i>Add New User
            </Link>
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
