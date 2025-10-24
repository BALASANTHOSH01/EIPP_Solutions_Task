import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark shadow"
      style={{
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      }}
    >
      <div className="container">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold fs-3 d-flex align-items-center"
          to="/"
        >
          <i className="bi bi-people-fill me-2"></i>
          <span>User Management</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto align-items-lg-center">
            <li className="nav-item">
              <Link
                className={`nav-link px-3 py-2 rounded ${
                  location.pathname === "/"
                    ? "bg-white text-primary fw-bold"
                    : "text-white"
                }`}
                to="/"
              >
                <i className="bi bi-list-ul me-2"></i>Users
              </Link>
            </li>
            <li className="nav-item ms-2">
              <Link
                className={`nav-link px-3 py-2 rounded ${
                  location.pathname === "/register"
                    ? "bg-white text-primary fw-bold"
                    : "text-white"
                }`}
                to="/register"
              >
                <i className="bi bi-person-plus-fill me-2"></i>Register
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
