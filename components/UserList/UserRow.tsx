// UserRow.tsx
import React from "react";
import { Link } from "react-router-dom";
import type { User } from "../../types/index";

interface UserRowProps {
  user: User;
  onDelete: (id: number) => void;
  isDeleting: boolean;
  isEven?: boolean;
}

export const UserRow: React.FC<UserRowProps> = ({
  user,
  onDelete,
  isDeleting,
}) => {
  // Safely get initials with fallback
  const getInitials = () => {
    const firstInitial = user.firstName?.charAt(0)?.toUpperCase() || "";
    const lastInitial = user.lastName?.charAt(0)?.toUpperCase() || "";
    return firstInitial + lastInitial || "U";
  };

  return (
    <tr className="border-bottom">
      <td className="ps-4 py-3">
        <div className="d-flex align-items-center">
          <div
            className="rounded-circle bg-primary text-white d-flex align-items-center justify-content-center me-3"
            style={{
              width: "40px",
              height: "40px",
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            {getInitials()}
          </div>
          <div>
            <div className="fw-semibold text-dark">
              {user.firstName || ""} {user.lastName || ""}
            </div>
          </div>
        </div>
      </td>
      <td className="py-3">
        <i className="bi bi-envelope-fill text-muted me-2"></i>
        <span className="text-muted">{user.email}</span>
      </td>
      <td className="py-3">
        <div className="d-flex justify-content-center gap-2">
          <Link
            to={`/view/${user.id}`}
            className="btn btn-sm btn-info text-white"
            aria-label={`View ${user.firstName} ${user.lastName}`}
            title="View Details"
          >
            <i className="bi bi-eye-fill me-1"></i>View
          </Link>
          <Link
            to={`/edit/${user.id}`}
            className="btn btn-sm btn-warning text-white"
            aria-label={`Edit ${user.firstName} ${user.lastName}`}
            title="Edit User"
          >
            <i className="bi bi-pencil-fill me-1"></i>Edit
          </Link>
          <button
            onClick={() => user.id && onDelete(user.id)}
            className="btn btn-sm btn-danger"
            disabled={isDeleting}
            aria-label={`Delete ${user.firstName} ${user.lastName}`}
            title="Delete User"
          >
            {isDeleting ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-1"
                  role="status"
                  aria-hidden="true"
                ></span>
                Deleting...
              </>
            ) : (
              <>
                <i className="bi bi-trash-fill me-1"></i>Delete
              </>
            )}
          </button>
        </div>
      </td>
    </tr>
  );
};
