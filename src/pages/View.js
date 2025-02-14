import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import 'bootstrap/dist/css/bootstrap.min.css';

function View() {
  const [data, setData] = useState([]);
  const [deleted, setDeleted] = useState(true);
  const [loading, setLoading] = useState(true);
  const [floorFilter, setFloorFilter] = useState('All');

  useEffect(() => {
    if (deleted) {
      setDeleted(false);
      setLoading(true);
      axios.get(`${process.env.REACT_APP_API_URL}/customers`)
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    }
  }, [deleted]);

  // Filter customers by floor number
  const filteredData = floorFilter === 'All' 
    ? data 
    : data.filter(customer => customer.floornumber === floorFilter);

  return (
    <div className="container regcontainer">
      <h3 className="text-start mb-3">Customer Table</h3>

      {/* Floor Filter Dropdown */}
      <div className="mb-3 d-flex justify-content-start">
  <label className="fw-bold me-1 mt-1">Filter by Floor:</label>
  <div className="col-8 col-sm-6 col-md-3"> 
    <select
      className="form-select w-100"
      value={floorFilter}
      onChange={(e) => setFloorFilter(e.target.value)}
    >
      <option value="All">All Floors</option>
      <option value="Basement">Basement</option>
      <option value="Ground">Ground</option>
      {[...Array(7)].map((_, index) => (
        <option key={index + 1} value={`${index + 1}`}>{index + 1}</option>
      ))}
    </select>
  </div>
</div>


      {/* Show Loading Spinner While Fetching Data */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center " style={{ height: "200px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        // Scrollable Table Wrapper
        <div className="table-responsive " style={{ maxHeight: "500px", overflow: "auto", border: "1px solid #ddd" }}>
          <table className="table table-striped table-hover">
            <thead className="table-dark">
              <tr>
                <th>Customer Name</th>
                <th className="d-none d-md-table-cell">Tin Number</th>
                <th className="d-none d-md-table-cell">Phone Number</th>
                <th className="d-none d-md-table-cell">House Number</th>
                <th className="d-none d-md-table-cell">Payment Per Month</th>
                <th className="d-none d-md-table-cell">Floor Number</th>
                <th className="d-none d-md-table-cell">Payment Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((customer) => (
                <tr key={customer.customer_id}>
                  <td>{`${customer.firstname} ${customer.lastname}`}</td>
                  <td className="d-none d-md-table-cell">{customer.tinnumber}</td>
                  <td className="d-none d-md-table-cell">{customer.phonenumber}</td>
                  <td className="d-none d-md-table-cell">{customer.housenumber}</td>
                  <td className="d-none d-md-table-cell">{customer.paymentamountpermonth}</td>
                  <td className="d-none d-md-table-cell">{customer.floornumber}</td>

                  {/* Payment Status with Icons */}
                  <td className="d-none d-md-table-cell">
                    {customer.payment_status === "Paid" ? (
                      <span className="badge bg-success text-white">
                        <FontAwesomeIcon icon={faCheckCircle} className="me-2" />
                        Paid
                      </span>
                    ) : (
                      <span className="badge bg-danger text-white">
                        <FontAwesomeIcon icon={faTimesCircle} className="me-2" />
                        Unpaid
                      </span>
                    )}
                  </td>

                  {/* Actions */}
                  <td>
                    <Link className="text-success mx-1" to={`/read/${customer.customer_id}`}>
                      View More...
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default View;
