// UserTable.tsx
import React from "react";
import { UserRow } from "./UserRow";
import type { User } from "../../types/index";

interface UserTableProps {
  users: User[];
  onDelete: (id: number) => void;
  deleteId: number | null;
}

export const UserTable: React.FC<UserTableProps> = ({
  users,
  onDelete,
  deleteId,
}) => {
  console.log("users Data :", users);

  return (
    <div className="card border-0 shadow">
      <div className="card-header bg-dark text-white py-3">
        <h5 className="mb-0">
          <i className="bi bi-table me-2"></i>User Directory
        </h5>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th className="py-3 ps-4 fw-semibold text-uppercase small">
                  <i className="bi bi-person me-2 text-primary"></i>User Name
                </th>
                <th className="py-3 fw-semibold text-uppercase small">
                  <i className="bi bi-envelope me-2 text-primary"></i>Email
                </th>
                <th className="py-3 text-center fw-semibold text-uppercase small">
                  <i className="bi bi-gear me-2 text-primary"></i>Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={3} className="text-center py-5">
                    <div className="text-muted">
                      <i className="bi bi-inbox display-1 d-block mb-3 opacity-25"></i>
                      <h5 className="mb-2">No users found</h5>
                      <p className="small">
                        Get started by adding your first user
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                users.map((user, index) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onDelete={onDelete}
                    isDeleting={deleteId === user.id}
                    isEven={index % 2 === 0}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
      {users.length > 0 && (
        <div className="card-footer bg-light text-muted small py-3">
          <i className="bi bi-info-circle me-2"></i>
          Showing {users.length} {users.length === 1 ? "user" : "users"}
        </div>
      )}
    </div>
  );
};
