import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function Read() {
  const [data, setData] = useState(null);
  const { customer_id } = useParams();
  const navigate = useNavigate(); 

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/get_customer/${customer_id}`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setData(res.data[0]); 
        } else {
          setData(null); 
        }
      })
      .catch((err) => console.log("Error fetching customer:", err));
  }, [customer_id]);

  return (
    <div className="modal fade show d-block" tabIndex="-1" role="dialog">
      <div className="modal-dialog modal-lg" role="document">
        <div className="modal-content">
          <div className="modal-header bg-secondary text-white">
            <h5 className="modal-title">Customer Details</h5>
            <button
              type="button"
              className="btn-close text-white"
              onClick={() => navigate(-1)} 
            >
              <FontAwesomeIcon icon={faTimes} />
            </button>
          </div>
          <div className="modal-body">
            {data ? (
              <ul className="list-group">
                <li className="list-group-item"><b>ID:</b> {data.customer_id}</li>
                <li className="list-group-item"><b>Name:</b> {data.firstname} {data.lastname}</li>
                <li className="list-group-item"><b>TIN Number:</b> {data.tinnumber}</li>
                <li className="list-group-item"><b>Phone:</b> {data.phonenumber}</li>
           
                <li className="list-group-item"><b>Room Size:</b> {data.roomsize_sq_m} m²</li>
                <li className="list-group-item"><b>House Number:</b> {data.housenumber}</li>
                <li className="list-group-item"><b>Monthly Payment:</b> {data.paymentamountpermonth}ETB</li>
                <li className="list-group-item"><b>Yearly Payment:</b> {data.paymentamountperyear}ETB</li>
                <li className="list-group-item"><b>Rent Date:</b> {data.rentdate}</li>
                <li className="list-group-item"><b>Lease Expiry:</b> {data.leaseexpiredate}</li>
                <li className="list-group-item"><b>Floor Number:</b> {data.floornumber}</li>
              </ul>
            ) : (
              <p className="text-center">Loading customer details or no data found...</p>
            )}
          </div>
          <div className="modal-footer">
            <button className="btn btn-secondary" onClick={() => navigate(-1)}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Read;
