import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock, faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const AdminChangePassword = () => {
  const [username, setUsername] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [message, setMessage] = useState("");



  const handleChangePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/change-password`, {
        username,
        currentPassword,
        newPassword,
      });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Password change failed");
    }
  };

  return (
    <div className="ms-5 d-flex justify-content-center align-items-center vh-100">
      <div className="card p-4 shadow-lg d-flex flex-row">
        <div className="p-4" style={{ width: "300px" }}>
          <h3 className="text-center fw-bold">Change Admin Password</h3>
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
              <label className="form-label">Current Password</label>
              <div className="input-group">
                <span className="input-group-text">
                  <FontAwesomeIcon icon={faLock} />
                </span>
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Enter current password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  required
                />
                <span
                  className="input-group-text bg-white border-0"
                  style={{ cursor: "pointer" }}
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                >
                  <FontAwesomeIcon icon={showCurrentPassword ? faEye : faEyeSlash} className="text-muted" />
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
            <button type="submit" className="btn btn-dark w-100">
              Change Password
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminChangePassword;