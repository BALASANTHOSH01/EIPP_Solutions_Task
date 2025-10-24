import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <nav
      className="navbar navbar-expand-lg navbar-dark bg-primary shadow"
      style={{ minHeight: "70px" }}
    >
      <div className="container py-2">
        {/* Brand */}
        <Link
          className="navbar-brand fw-bold d-flex align-items-center text-white"
          to="/"
          style={{ fontSize: "1.3rem" }}
        >
          <i
            className="bi bi-people-fill me-2"
            style={{ fontSize: "1.5rem" }}
          ></i>
          <span className="d-none d-sm-inline">User Management</span>
          <span className="d-inline d-sm-none">Users</span>
        </Link>

        {/* Toggler */}
        <button
          className="navbar-toggler border-0 px-3 py-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
          style={{ fontSize: "1.2rem" }}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Nav Links */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                className={`nav-link px-4 py-2 rounded my-1 my-lg-0 d-flex align-items-center ${
                  location.pathname === "/"
                    ? "bg-white text-primary fw-semibold"
                    : "text-white"
                }`}
                to="/"
                style={{ fontSize: "1rem" }}
              >
                <i
                  className="bi bi-list-ul me-2"
                  style={{ fontSize: "1.1rem" }}
                ></i>
                <span>Users</span>
              </Link>
            </li>
            <li className="nav-item ms-lg-2">
              <Link
                className={`nav-link px-4 py-2 rounded my-1 my-lg-0 d-flex align-items-center ${
                  location.pathname === "/register"
                    ? "bg-white text-primary fw-semibold"
                    : "text-white"
                }`}
                to="/register"
                style={{ fontSize: "1rem" }}
              >
                <i
                  className="bi bi-person-plus-fill me-2"
                  style={{ fontSize: "1.1rem" }}
                ></i>
                <span>Register</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
