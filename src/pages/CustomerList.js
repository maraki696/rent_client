import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faPencilAlt, faTrashAlt, faSearch } from '@fortawesome/free-solid-svg-icons';

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [deleteCustomerId, setDeleteCustomerId] = useState(null);
  const [alert, setAlert] = useState({ type: '', message: '' });
  const [loading, setLoading] = useState(true); 
  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_API_URL}/customers`)
      .then(response => {
        setCustomers(response.data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching customers:', err);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const confirmDelete = (customer_id) => {
    setDeleteCustomerId(customer_id);
    setShowModal(true);
  };

  const handleDelete = () => {
    axios.delete(`${process.env.REACT_APP_API_URL}/delete/${deleteCustomerId}`)
      .then(() => {
        setAlert({ type: 'success', message: 'Customer deleted successfully!' });
        setCustomers(prev => prev.filter(customer => customer.customer_id !== deleteCustomerId));
      })
      .catch(err => {
        console.error('Error deleting customer:', err);
        setAlert({ type: 'danger', message: 'Failed to delete customer.' });
      });
    setShowModal(false);
  };

  const isEditPage = location.pathname.includes('/edit');
  const isDeletePage = location.pathname.includes('/delete');

  return (
    <div className="container regcontainer mycontain ">
      <h3 className="mb-3">Customer List</h3>

      {alert.message && (
        <div className={`alert alert-${alert.type} alert-dismissible fade show`} role="alert">
          {alert.message}
          <button type="button" className="btn-close" onClick={() => setAlert({ type: '', message: '' })}></button>
        </div>
      )}

      {/* Search Bar */}
      <div className="input-group mb-3 w-100 w-md-50 mx-auto">
        <input
          type="text"
          className="form-control"
          placeholder="Search customers..."
          aria-label="Search"
          value={search}
          onChange={handleSearchChange}
        />
        <span className="input-group-text">
          <FontAwesomeIcon icon={faSearch} />
        </span>
      </div>

      {/* Loading Spinner */}
      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "200px" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="table-responsive"  style={{ maxHeight: "500px", overflow: "auto", border: "1px solid #ddd" }}>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th className="d-none d-md-table-cell">Customer ID</th>
                <th>Customer Name</th>
                <th className="d-none d-md-table-cell">Phone Number</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {customers.filter(customer => {
                const fullName = `${customer.firstname} ${customer.lastname}`;
                return (
                  fullName.toLowerCase().includes(search.toLowerCase()) || 
                  customer.phonenumber.includes(search)
                );
              }).map(customer => (
                <tr key={customer.customer_id}>
                  <td className="d-none d-md-table-cell">{customer.customer_id}</td>
                  <td>{customer.firstname} {customer.lastname}</td>
                  <td className="d-none d-md-table-cell">{customer.phonenumber}</td>
                  <td>
                    {isEditPage ? (
                      <Link to={`/edit/${customer.customer_id}`} className="btn btn-outline-warning me-2">
                        <FontAwesomeIcon icon={faPencilAlt} /> Edit
                      </Link>
                    ) : isDeletePage ? (
                      <button onClick={() => confirmDelete(customer.customer_id)} className="btn btn-outline-danger">
                        <FontAwesomeIcon icon={faTrashAlt} /> Delete
                      </button>
                    ) : (
                      <>
                        <Link to={`/read/${customer.customer_id}`} className="btn btn-primary me-2">
                          <FontAwesomeIcon icon={faEye} /> View
                        </Link>
                        <Link to={`/edit/${customer.customer_id}`} className="btn btn-success me-2">
                          <FontAwesomeIcon icon={faPencilAlt} /> Edit
                        </Link>
                        <button onClick={() => confirmDelete(customer.customer_id)} className="btn btn-outline-danger">
                          <FontAwesomeIcon icon={faTrashAlt} /> Delete
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showModal && (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this customer?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-danger" onClick={handleDelete}>Yes, Delete</button>
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerList;
