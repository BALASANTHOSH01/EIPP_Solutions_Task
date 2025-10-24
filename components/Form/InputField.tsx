import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface InputFieldProps {
  label: string;
  name: string;
  type: string;
  value: string | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
  maxLength?: number;
  max?: string;
  disableField?: boolean;
}

export const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  type,
  value,
  onChange,
  onBlur,
  error,
  placeholder,
  required = false,
  maxLength,
  max,
  disableField = false,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  
  const isPasswordField = type === "password";
  const inputType = isPasswordField && showPassword ? "text" : type;


  const shouldShowInvalidClass =
    error && type !== "password" && type !== "date";

  return (
    <div className="mb-3">
      <div className="d-flex justify-content-between align-items-center mb-2">
        <label htmlFor={name} className="form-label fw-semibold mb-0 text-dark">
          {label} {required && <span className="text-danger">*</span>}
        </label>
        {disableField && (
          <span className="badge bg-danger bg-opacity-10 text-danger border border-danger">
            <i className="bi bi-lock-fill me-1"></i>Not editable
          </span>
        )}
      </div>

      <div className="position-relative">
        {/* Input field */}
        <input
          type={inputType}
          className={`form-control form-control-lg ${
            shouldShowInvalidClass
              ? "is-invalid border-danger"
              : "border-secondary"
          } ${disableField ? "bg-light" : ""}`}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
          placeholder={placeholder}
          maxLength={maxLength}
          max={max}
          aria-describedby={error ? `${name}-error` : undefined}
          aria-invalid={error ? "true" : "false"}
          disabled={disableField}
          style={{
            paddingRight: isPasswordField ? "3rem" : "0.75rem",
            fontSize: "0.95rem",
            transition: "all 0.2s ease-in-out",
          }}
        />

        {/* Eye Icon for password only fields */}
        {isPasswordField && (
          <button
            type="button"
            className="position-absolute border-0 bg-transparent p-2 rounded-circle"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={-1}
            style={{
              top: "50%",
              right: "0.5rem",
              transform: "translateY(-50%)",
              cursor: "pointer",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor =
                "rgba(108, 117, 125, 0.1)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
            title={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <FaEyeSlash size={18} color="#6c757d" />
            ) : (
              <FaEye size={18} color="#6c757d" />
            )}
          </button>
        )}
      </div>

      {/* Error message BELOW the input */}
      {error && (
        <div
          id={`${name}-error`}
          className="d-flex align-items-center mt-2 text-danger"
          style={{ fontSize: "0.875rem" }}
        >
          <i className="bi bi-exclamation-circle-fill me-2"></i>
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};
