import React, { useState, useEffect } from "react";
import {  useParams  } from "react-router-dom";
import axios from "axios";


function Update() {
  const [data, setData] = useState({});
  const [message, setMessage] = useState(null); // Success/Error messages
  const { customer_id } = useParams();
  // const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/get_customer/${customer_id}`)
      .then((res) => {
        setData(res.data[0]);
      })
      .catch((err) =>
        setMessage({ type: "error", text: "Failed to fetch customer data." })
      );
  }, [customer_id]);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .put(`${process.env.REACT_APP_API_URL}/edit_customer/${customer_id}`, data)
      .then((res) => {
        setMessage({
          type: "success",
          text: "Customer data updated successfully!",
        });
        setTimeout(() => {
          setMessage(null);
        
        }, 2000);// Redirect after success
      })
      .catch((err) =>
        setMessage({ type: "error", text: "Failed to update customer data." })
      );
  }

  return (
    <div className="container mt-5">
      <div className="col-12 col-lg-8 p-4 border rounded bg-light mx-auto">
        <h1 className="text-center mb-4">Update Customer Data</h1>

        {/* Message Display */}
        {message && (
          <div
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-danger"
            }`}
            role="alert"
          >
            {message.text}
          </div>
        )}

      

        {/* FORM */}
        <form onSubmit={handleSubmit}>
          <div className="row">
            {/* Left Column */}
            <div className="col-md-6">
              <div className="form-group my-2">
                <label htmlFor="firstname">First Name</label>
                <input
                  value={data.firstname || ""}
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setData({ ...data, firstname: e.target.value })}
                />
              </div>

              <div className="form-group my-2">
                <label htmlFor="lastname">Last Name</label>
                <input
                  value={data.lastname || ""}
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setData({ ...data, lastname: e.target.value })}
                />
              </div>

              <div className="form-group my-2">
                <label htmlFor="phonenumber">Phone Number</label>
                <input
                  value={data.phonenumber || ""}
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setData({ ...data, phonenumber: e.target.value })}
                />
              </div>

              
              <div className="form-group my-2">
                <label htmlFor="roomsize_sq_m">Room Size (sq m)</label>
                <input
                  value={data.roomsize_sq_m || ""}
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setData({ ...data, roomsize_sq_m: e.target.value })
                  }
                />
              </div>

              <div className="form-group my-2">
                <label htmlFor="housenumber">House Number</label>
                <input
                  value={data.housenumber || ""}
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setData({ ...data, housenumber: e.target.value })}
                />
              </div>
            </div>

            {/* Right Column */}
            <div className="col-md-6">
              <div className="form-group my-2">
                <label htmlFor="paymentamountpermonth">Payment Per Month</label>
                <input
                  value={data.paymentamountpermonth || ""}
                  type="number"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setData({ ...data, paymentamountpermonth: e.target.value })
                  }
                />
              </div>

              <div className="form-group my-2">
                <label htmlFor="paymentamountperyear">Payment Per Year</label>
                <input
                  value={data.paymentamountperyear || ""}
                  type="number"
                  className="form-control"
                  required
                  onChange={(e) =>
                    setData({ ...data, paymentamountperyear: e.target.value })
                  }
                />
              </div>

              <div className="form-group my-2">
                <label htmlFor="rentdate">Rent Date</label>
                <input
  value={data.rentdate ? new Date(data.rentdate).toISOString().split("T")[0] : ""}
  type="date"
  className="form-control"
  required
  onChange={(e) => {
    const selectedDate = e.target.value;
    const fullDateTime = new Date(selectedDate).toISOString(); 
    setData({ ...data, rentdate: fullDateTime });
  }}
/>

              </div>

              <div className="form-group my-2">
                <label htmlFor="leaseexpiredate">Lease Expiry Date</label>
                <input
  value={data.leaseexpiredate ? new Date(data.leaseexpiredate).toISOString().split("T")[0] : ""}
  type="date"
  className="form-control"
  required
  onChange={(e) => {
    const selectedDate = e.target.value;
    const fullDateTime = new Date(selectedDate).toISOString(); // Store full date-time
    setData({ ...data, leaseexpiredate: fullDateTime });
  }}
/>


              </div>

              <div className="form-group my-2">
                <label htmlFor="floornumber">Floor Number</label>
                <input
                  value={data.floornumber || ""}
                  type="text"
                  className="form-control"
                  required
                  onChange={(e) => setData({ ...data, floornumber: e.target.value })}
                />
              </div>
            </div>
          </div>

          <div className="text-end mt-3">
            <button type="submit" className="btn btn-secondary w-25">
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Update;
