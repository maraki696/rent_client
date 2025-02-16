import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUserShield,
  faEye,
  faPencilAlt,
  faTrashAlt,
  faUser,
  faBars,
  faTimes,
  faTable,
  faUserPlus,
  faKey,
  faSignOutAlt,
  faExclamationTriangle,
} from "@fortawesome/free-solid-svg-icons";
import avatar from "../assets/b.jpg";
import { Link } from "react-router-dom";

function AdminDashboard() {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth <= 1000);
  useEffect(() => {
    const handleResize = () => {
      setIsCollapsed(window.innerWidth <= 1000);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const handleLinkClick = () => {
    if (window.innerWidth <= 1000) {
      setIsCollapsed(true);
    }
  };
  return (
    <div className="d-flex">
    
      <div
        className={`navitems pt-3 fixed-top ${
          isCollapsed ? "collapsed" : "expanded"
        } shadow-sm`}
        style={{ width: isCollapsed ? "60px" : "250px" }}
      >
        <div
          className="text-end  text-white p-2 cursor-pointer"
          onClick={() => setIsCollapsed(!isCollapsed)}
         
        >
          <FontAwesomeIcon icon={isCollapsed ? faBars : faTimes} />
        </div>
       
        {!isCollapsed && (
          <img
            src={avatar}
            className="mb-4 mx-auto rounded-pill d-block"
            alt="Admin"
            width="80"
            height="80"
          />
        )}
     
        <ul className="list-unstyled px-0 text-center">
          {[
            { to: "/admin/register", icon: faUser, text: "Register Customer" },
            { to: "/admin/view", icon: faEye, text: "View Customer" },
            {
              to: "/admin/edit",
              icon: faPencilAlt,
              text: "Update Customer Info",
            },
            { to: "/admin/delete", icon: faTrashAlt, text: "Delete Customer" },
            {
              to: "/admin/payment",
              icon: faUserShield,
              text: "Approve Payment",
            },
            {
              to: "/admin/unpaid",
              icon: faExclamationTriangle,
              text: "Unpaid Customers",
            },
            {
              to: "/admin/paymenttable",
              icon: faTable,
              text: "Payment History",
            },
            {
              to: "/admin/create_account",
              icon: faUserPlus,
              text: "Create New Account",
            },
            {
              to: "/admin/change_password",
              icon: faKey,
              text: "Change Password",
            },
            { to: "/", icon: faSignOutAlt, text: "Log Out" },
          ].map(({ to, icon, text }) => (
            <li key={to}>
              <Link
                to={to}
                className="text-decoration-none text-white d-flex align-items-center p-2"
                onClick={handleLinkClick}
              >
                <FontAwesomeIcon
                  icon={icon}
                  className={isCollapsed ? "ms-2" : "me-2"}
                />
                {!isCollapsed && text}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div
        className="content w-100"
        style={{
          marginLeft: isCollapsed ? "60px" : "250px",
          paddingTop: isCollapsed ? "200px" : "160px", 

          transition: "margin-left 0.3s ease-in-out",
        }}
      >
       
       <div className="dashboard text-center p-3">
  <h1 className="fs-2 m-0 text-white d-flex align-items-center justify-content-center">
    <div className="text" />
    <FontAwesomeIcon icon={faUserShield} className="me-2 icon" />
    <span className="ms-2 d-none d-sm-inline">Admin Dashboard</span>
    <span className="ms-2 d-inline d-sm-none">Admin</span>
  </h1>
</div>

      </div>
    </div>
  );
}

export default AdminDashboard;
