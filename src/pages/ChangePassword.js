import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faKey, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const ChangePassword = () => {
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showOldPassword, setShowOldPassword] = useState(false); // State to toggle old password visibility
  const [showNewPassword, setShowNewPassword] = useState(false); // State to toggle new password visibility
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // Loading state

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true when submitting the form
    setMessage(""); // Reset message before submission

    const response = await fetch(`${process.env.REACT_APP_API_URL}/management/change-password`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, oldPassword, newPassword }),
    });

    const data = await response.json();
    setMessage(data.message);
    setLoading(false); // Reset loading state after the request is complete
  };

  return (
    <div className="d-flex justify-content-center align-items-center mt-5">
      <div className="card p-4 shadow-lg d-flex flex-row">
        <div className="p-4" style={{ width: "300px" }}>
          <h3 className="text-center fw-bold">Change Password</h3>
          {message && <p className="text-info text-center">{message}</p>}
          <form onSubmit={handleChangePassword}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faUser} />
                </span>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">Old Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faKey} />
                </span>
                <input
                  type={showOldPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter old password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <span
                  className="input-group-text bg-white border-0"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowOldPassword(!showOldPassword)}
                >
                  <FontAwesomeIcon icon={showOldPassword ? faEye : faEyeSlash} className="text-muted" />
                </span>
              </div>
            </div>
            <div className="mb-3">
              <label className="form-label">New Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type={showNewPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter new password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <span
                  className="input-group-text bg-white border-0"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowNewPassword(!showNewPassword)}
                >
                  <FontAwesomeIcon icon={showNewPassword ? faEye : faEyeSlash} className="text-muted" />
                </span>
              </div>
            </div>
            <button type="submit" className="btn btn-dark w-100" disabled={loading}>
              {loading ? (
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
              ) : (
                "Change Password"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
