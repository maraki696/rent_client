import React, { useState } from "react";
import axios from "axios";
// import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faPhone,  faIdCard, faHome, faMoneyBillWave, faCalendarAlt, faLayerGroup } from "@fortawesome/free-solid-svg-icons"; // Import icons

function Register() {
  const [values, setValues] = useState({
    firstname: "",
    lastname: "",
    tinnumber: "",
    phonenumber: "",
    customeremail: "",
    roomsize_sq_m: "",
    housenumber: "",
    paymentamountpermonth: "",
    paymentamountperyear: "",
    rentdate: "",
    leaseexpiredate: "",
    floornumber: "",
  });

  const [message, setMessage] = useState(null); // Success/Error message state
  const [loading, setLoading] = useState(false); // Loading state for the button

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true); // Start loading spinner

    axios
      .post(`${process.env.REACT_APP_API_URL}/register`, values)
      .then((res) => {
        setMessage({ type: "success", text: "Customer registered successfully!" });
        setValues({ 
          firstname: "", lastname: "", tinnumber: "", phonenumber: "",
          roomsize_sq_m: "", housenumber: "", paymentamountpermonth: "",
          paymentamountperyear: "", rentdate: "", leaseexpiredate: "", floornumber: "",
        });
      })
      .catch((err) => {
        setMessage({ type: "danger", text: "Error occurred while registering customer." });
      })
      .finally(() => {
        setLoading(false); // Stop loading spinner
        setTimeout(() => setMessage(null), 3000);
      });
  };

  const handleCancel = () => {
    setValues({
      firstname: "",
      lastname: "",
      tinnumber: "",
      phonenumber: "",
      roomsize_sq_m: "",
      housenumber: "",
      paymentamountpermonth: "",
      paymentamountperyear: "",
      rentdate: "",
      leaseexpiredate: "",
      floornumber: "",
    });
  };
  return (
    <div className="container  regcontainer w-75">
      <h2 className="mb-4 text-start title">Register Customer</h2>

      {/* Success/Error Message */}
      {message && (
  <div
    className={`alert alert-${message.type} text-center`}
    style={{
      position: "fixed",
      bottom: "20px", // Position at the bottom
      left: "50%",
      transform: "translateX(-50%)",
      zIndex: "1050", // Ensure it appears above everything
      width: "80%",
      maxWidth: "400px", // Prevent it from being too wide
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
    }}
  >
    {message.text}
  </div>
)}


      <form onSubmit={handleSubmit} className="row g-2">
        {/* First Name */}
        <div className="col-md-6">
          <label htmlFor="firstname" className="form-label">First Name</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
            <input
              type="text"
              className="form-control"
              required
              value={values.firstname}
              onChange={(e) => setValues({ ...values, firstname: e.target.value })}
            />
          </div>
        </div>

        {/* Last Name */}
        <div className="col-md-6">
          <label htmlFor="lastname" className="form-label">Last Name</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faUser} /></span>
            <input
              type="text"
              className="form-control"
              required
              value={values.lastname}
              onChange={(e) => setValues({ ...values, lastname: e.target.value })}
            />
          </div>
        </div>

        {/* Tin Number */}
        <div className="col-md-6">
          <label htmlFor="tinnumber" className="form-label">Tin Number</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faIdCard} /></span>
            <input
              type="text"
              className="form-control"
              required
              value={values.tinnumber}
              onChange={(e) => setValues({ ...values, tinnumber: e.target.value })}
            />
          </div>
        </div>

        {/* Phone Number */}
        <div className="col-md-6">
          <label htmlFor="phonenumber" className="form-label">Phone Number</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faPhone} /></span>
            <input
              type="text"
              className="form-control"
              required
              value={values.phonenumber}
              onChange={(e) => setValues({ ...values, phonenumber: e.target.value })}
            />
          </div>
        </div>

      

        {/* Room Size */}
        <div className="col-md-6">
          <label htmlFor="roomsize_sq_m" className="form-label">Room Size (m²)</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faLayerGroup} /></span>
            <input
              type="text"
              className="form-control"
              required
              value={values.roomsize_sq_m}
              onChange={(e) => setValues({ ...values, roomsize_sq_m: e.target.value })}
            />
          </div>
        </div>

        {/* House Number */}
        <div className="col-md-6">
          <label htmlFor="housenumber" className="form-label">House Number</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faHome} /></span>
            <input
              type="text"
              className="form-control"
              required
              value={values.housenumber}
              onChange={(e) => setValues({ ...values, housenumber: e.target.value })}
            />
          </div>
        </div>

        {/* Payment Per Month */}
        <div className="col-md-6">
          <label htmlFor="paymentamountpermonth" className="form-label">Payment Per Month</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faMoneyBillWave} /></span>
            <input
              type="number"
              className="form-control"
              required
              value={values.paymentamountpermonth}
              onChange={(e) => setValues({ ...values, paymentamountpermonth: e.target.value })}
            />
          </div>
        </div>

        {/* Payment Per Year */}
        <div className="col-md-6">
          <label htmlFor="paymentamountperyear" className="form-label">Payment Per Year</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faMoneyBillWave} /></span>
            <input
              type="number"
              className="form-control"
              required
              value={values.paymentamountperyear}
              onChange={(e) => setValues({ ...values, paymentamountperyear: e.target.value })}
            />
          </div>
        </div>

        {/* Rent Date */}
        <div className="col-md-6">
          <label htmlFor="rentdate" className="form-label">Rent Date</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faCalendarAlt} /></span>
            <input
              type="date"
              className="form-control"
              required
              value={values.rentdate}
              onChange={(e) => setValues({ ...values, rentdate: e.target.value })}
            />
          </div>
        </div>

        {/* Lease Expire Date */}
        <div className="col-md-6">
          <label htmlFor="leaseexpiredate" className="form-label">Lease Expire Date</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faCalendarAlt} /></span>
            <input
              type="date"
              className="form-control"
              required
              value={values.leaseexpiredate}
              onChange={(e) => setValues({ ...values, leaseexpiredate: e.target.value })}
            />
          </div>
        </div>

        {/* Floor Number */}
        <div className="col-md-6">
          <label htmlFor="floornumber" className="form-label">Floor Number</label>
          <div className="input-group">
            <span className="input-group-text"><FontAwesomeIcon icon={faLayerGroup} /></span>
            <input
              type="text"
              className="form-control"
              required
              value={values.floornumber}
              onChange={(e) => setValues({ ...values, floornumber: e.target.value })}
            />
          </div>
        </div>

       {/* Form Buttons */}
       <div className="col-md-12 mt-3 text-end">
          <button type="submit" className="btn btn-dark" disabled={loading}>
            {loading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
          <button type="button" onClick={handleCancel} className="btn btn-secondary ms-2">
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default Register;
