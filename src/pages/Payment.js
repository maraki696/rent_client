import React, { useState, useEffect } from "react";
import axios from "axios";
import { faSearch, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "bootstrap/dist/css/bootstrap.min.css";

const Payment = () => {
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [amount, setAmount] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [adminUsername, setAdminUsername] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [approving, setApproving] = useState(false);
  const [loggingIn, setLoggingIn] = useState(false);

  useEffect(() => {
    axios.get(${process.env.REACT_APP_API_URL}/customers).then((response) => {
      setCustomers(response.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  // Scroll to the approval form when it becomes visible
  useEffect(() => {
    if (selectedCustomer) {
      const formElement = document.getElementById("approve-payment-form");
      formElement?.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [selectedCustomer]);

  const filteredCustomers = customers.filter((customer) =>
    ${customer.firstname} ${customer.lastname}.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSelectCustomer = (customer) => {
    setSelectedCustomer(customer);
    setStartDate("");
    setEndDate("");
    setAmount("");
  };

  const handleApprovePayment = () => {
    if (selectedCustomer && startDate && endDate && amount) {
      setShowModal(true);
    } else {
      alert("Please fill in all fields before approving payment.");
    }
  };

  const handleAdminLogin = async () => {
    setLoggingIn(true);
    try {
      const response = await axios.post(${process.env.REACT_APP_API_URL}/admin/login, {
        username: adminUsername,
        password: adminPassword,
      });

      if (response.data.success) {
        setApproving(true);
        axios
          .post(${process.env.REACT_APP_API_URL}/approve_payment, {
            customer_id: selectedCustomer.customer_id,
            start_date: startDate,
            end_date: endDate,
            amount: amount,
          })
          .then(() => {
            setMessage(Payment approved for ${selectedCustomer.firstname} ${selectedCustomer.lastname});
            setSelectedCustomer(null);
            setCustomers(customers.map(c => c.customer_id === selectedCustomer.customer_id ? { ...c, payment_status: "Paid" } : c));
          })
          .catch((error) => {
            console.error("Error approving payment:", error);
            setMessage("Error approving payment.");
          })
          .finally(() => {
            setApproving(false);
            setShowModal(false);
          });

      } else {
        setMessage("Invalid username or password.");
      }
    } catch (error) {
      console.error("Error during admin login:", error);
      setMessage("Error during login.");
    }
    setLoggingIn(false);
  };

  return (
    <div className="container regcontainer">
      <div className="card shadow p-4">
        <h2 className="text-center mb-3">Approve Rent Payments</h2>

        <div className="input-group mb-3">
          <span className="input-group-text bg-dark text-white">
            <FontAwesomeIcon icon={faSearch} />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search customer..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        {loading ? (
          <div className="text-center">
            <div className="spinner-border text-dark" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <ul className="list-group customer-list">
            {filteredCustomers.map((customer) => (
              <li key={customer.customer_id} className="list-group-item d-flex justify-content-between align-items-center">
                {customer.firstname} {customer.lastname}
                {customer.payment_status === "Paid" ? (
                  <span className="badge bg-success p-2">
                    <FontAwesomeIcon icon={faCheckCircle} /> Paid
                  </span>
                ) : (
                  <button className="btn btn-dark btn-sm " onClick={() => handleSelectCustomer(customer)}>
                    Approve
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {selectedCustomer && (
          <div className="card mt-3 p-3" id="approve-payment-form">
            <h4 className="text-center">Approve Payment for {selectedCustomer.firstname} {selectedCustomer.lastname}</h4>
            <label>Start Date:</label>
            <input type="date" className="form-control" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
            <label className="mt-2">End Date:</label>
            <input type="date" className="form-control" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
            <label className="mt-2">Amount:</label>
            <input type="number" className="form-control" placeholder="Enter payment amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <div className="mt-3 d-flex justify-content-end gap-2">
              <button className="btn btn-dark" onClick={handleApprovePayment}>
                {approving ? <span className="spinner-border spinner-border-sm"></span> : "Confirm Approval"}
              </button>
              <button className="btn btn-secondary" onClick={() => setSelectedCustomer(null)}>Cancel</button>
            </div>
          </div>
        )}
      </div>

      {showModal && (
        <div className="modal show d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Approve</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>Username</label>
                  <input type="text" className="form-control" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} />
                </div>
                <div className="mb-3">
                  <label>Password</label>
                  <input type="password" className="form-control" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                </div>
                {message && <div className="alert alert-danger mt-3">{message}</div>}
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="btn btn-dark" onClick={handleAdminLogin}>
                  {loggingIn ? <span className="spinner-border spinner-border-sm"></span> : "Approve"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Payment;





               
