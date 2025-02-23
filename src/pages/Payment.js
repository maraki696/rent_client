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
    axios.get(`${process.env.REACT_APP_API_URL}/customers`).then((response) => {
      setCustomers(response.data);
      setLoading(false);
    }).catch(() => {
      setLoading(false);
    });
  }, []);

  const filteredCustomers = customers.filter((customer) =>
    `${customer.firstname} ${customer.lastname}`.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDateChange = (e, type) => {
    const selectedDate = e.target.value;
    if (!selectedDate) return;
    if (type === "start") setStartDate(selectedDate);
    else setEndDate(selectedDate);
  };

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
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/admin/login`, {
        username: adminUsername,
        password: adminPassword,
      });

      if (response.data.success) {
        setApproving(true);
        await axios.post(`${process.env.REACT_APP_API_URL}/approve_payment`, {
          customer_id: selectedCustomer.customer_id,
          start_date: startDate,
          end_date: endDate,
          amount: amount,
        });
        
        setMessage(`Payment approved for ${selectedCustomer.firstname} ${selectedCustomer.lastname}`);
        setCustomers(customers.map(c => c.customer_id === selectedCustomer.customer_id ? { ...c, payment_status: "Paid" } : c));
        setSelectedCustomer(null);
      } else {
        setMessage("Invalid username or password.");
      }
    } catch (error) {
      setMessage("Error during login or payment approval.");
    } finally {
      setLoggingIn(false);
      setApproving(false);
      setShowModal(false);
    }
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
            <div className="spinner-border text-dark" role="status"></div>
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
                  <button className="btn btn-dark btn-sm" onClick={() => handleSelectCustomer(customer)}>
                    Approve
                  </button>
                )}
              </li>
            ))}
          </ul>
        )}

        {selectedCustomer && (
          <div className="card mt-3 p-3">
            <h4 className="text-center">Approve Payment for {selectedCustomer.firstname} {selectedCustomer.lastname}</h4>
            <label>Start Date:</label>
            <input type="date" className="form-control" value={startDate} onChange={(e) => handleDateChange(e, "start")} />
            <label className="mt-2">End Date:</label>
            <input type="date" className="form-control" value={endDate} onChange={(e) => handleDateChange(e, "end")} />
            <label className="mt-2">Amount:</label>
            <input type="number" className="form-control" value={amount} onChange={(e) => setAmount(e.target.value)} />
            <div className="mt-3 d-flex justify-content-end gap-2">
              <button className="btn btn-dark" onClick={handleApprovePayment}>Confirm Approval</button>
              <button className="btn btn-secondary" onClick={() => setSelectedCustomer(null)}>Cancel</button>
            </div>
          </div>
        )}

        {showModal && (
          <div className="modal show d-block">
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Admin Login</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>
                <div className="modal-body">
                  <input type="text" className="form-control mb-2" placeholder="Username" value={adminUsername} onChange={(e) => setAdminUsername(e.target.value)} />
                  <input type="password" className="form-control" placeholder="Password" value={adminPassword} onChange={(e) => setAdminPassword(e.target.value)} />
                  {message && <div className="alert alert-danger mt-2">{message}</div>}
                </div>
                <div className="modal-footer">
                  <button className="btn btn-dark" onClick={handleAdminLogin}>{loggingIn ? "Logging in..." : "Approve"}</button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Payment;
