import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserShield,
  faUserAlt,
} from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";
import f2Image from "../assets/illustration-1.webp";

function BasePage() {
  return (
    <div
      className="base container-fluid bg-light-secondary min-vh-100 d-flex flex-column align-items-center justify-content-center">
      <div className="banner text-center p-5 mb-5 rounded-3 shadow-lg w-100">
        <h1 className="display-5 fw-bold overflow-hidden">
          Welcome to{" "}
          <span className="text-warning">Werkamba Rent Management System</span>
        </h1>
        <p className="fs-5">
          Manage your property rentals efficiently and securely, at your
          fingertips.
        </p>
      </div>

      <div className="row w-100 d-flex justify-content-center align-items-center text-center">
        <div className="col-md-6 d-flex flex-column align-items-center">
          <div className="mb-4 text-warning" style={{ fontSize: "4rem" }}>
            <FontAwesomeIcon icon={faHome} />
          </div>

          <Link
            to="/admin/login"
            className="btn btn-dark btn-lg w-75 mb-3 d-flex align-items-center justify-content-center gap-2 shadow"
          >
            <FontAwesomeIcon icon={faUserShield} /> Admin Login
          </Link>
          <Link
            to="/management/login"
            className="btn btn-secondary btn-lg w-75 d-flex align-items-center justify-content-center gap-2 shadow"
          >
            <FontAwesomeIcon icon={faUserAlt} /> User Login
          </Link>
        </div>

        <div className="col-md-6 d-none d-md-flex justify-content-center">
          <img src={f2Image}
            alt="Illustration"
            className="img-fluid rounded "/>
        </div>
      </div>
    </div>
  );
}

export default BasePage;
