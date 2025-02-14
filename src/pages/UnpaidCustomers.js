import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles

const UnpaidCustomers = () => {
    const [unpaidCustomers, setUnpaidCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUnpaidCustomers();
    }, []);

    const fetchUnpaidCustomers = async () => {
        try {
            const response = await axios.get(`${process.env.REACT_APP_API_URL}/unpaid_customers`);
            setUnpaidCustomers(response.data);
        } catch (error) {
            console.error("Error fetching unpaid customers:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container regcontainer">
            <div className="card shadow-lg">
                <div className="card-body">
                    <h2 className="card-title text-center mb-2">Unpaid Customers</h2>
                    {loading ? (
                        <div className="text-center py-5">
                            <div className="spinner-border text-dark" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <div className="table-responsive"   style={{ maxHeight: "500px", overflow: "auto", border: "1px solid #ddd" }}>
                            <table className="table table-striped table-hover">
                                <thead className="table-dark">
                                    <tr>
                                        <th>Name</th>
                                        <th>Days Unpaid</th>
                                        <th>Amount Due (ETB)</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unpaidCustomers.length > 0 ? (
                                        unpaidCustomers.map((customer) => (
                                            <tr key={customer.customer_id}>
                                                <td>{customer.firstname} {customer.lastname}</td>
                                                <td className="text-danger fw-bold">{customer.days_unpaid}</td>
                                                <td>{customer.paymentamountpermonth}</td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="3" className="text-center py-3">No unpaid customers found.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default UnpaidCustomers;
