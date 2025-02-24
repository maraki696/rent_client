import React, { useEffect, useState } from "react";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSort, faSearch } from "@fortawesome/free-solid-svg-icons";
import "bootstrap/dist/css/bootstrap.min.css";

const PaymentTable = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortConfig, setSortConfig] = useState({ key: null, direction: "asc" });

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/payments`);
                setPayments(response.data);
            } catch (error) {
                console.error("Error fetching payments:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchPayments();
    }, []);

    const handleSort = (key) => {
        let direction = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });

        const sortedData = [...payments].sort((a, b) => {
            if (key.includes("date")) {
                return direction === "asc"
                    ? new Date(a[key]) - new Date(b[key])
                    : new Date(b[key]) - new Date(a[key]);
            } else {
                return direction === "asc"
                    ? a[key].toString().localeCompare(b[key].toString())
                    : b[key].toString().localeCompare(a[key].toString());
            }
        });

        setPayments(sortedData);
    };

    const formatDate = (date) => {
        if (!date) return "N/A";
        return new Date(date).toLocaleDateString("en-GB"); // Format: DD/MM/YYYY
    };

    const filteredPayments = payments.filter(payment =>
        `${payment.firstname} ${payment.lastname}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (payment.customeremail || "").toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mt-4">
            <h2 className="mb-3">Payment Records</h2>

            <div className="input-group mb-3">
                <span className="input-group-text"><FontAwesomeIcon icon={faSearch} /></span>
                <input
                    type="text"
                    className="form-control"
                    placeholder="Search by name or email..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {loading ? (
                <div className="text-center">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <div className="table-responsive" style={{ maxHeight: "500px", overflow: "auto", border: "1px solid #ddd" }}>
                    <table className="table table-striped table-bordered text-center">
                        <thead className="table-dark">
                            <tr>
                                <th onClick={() => handleSort("firstname")} className="sortable">
                                    Customer <FontAwesomeIcon icon={faSort} />
                                </th>
                                <th onClick={() => handleSort("amount")} className="sortable d-none d-sm-table-cell">
                                    Amount <FontAwesomeIcon icon={faSort} />
                                </th>
                                <th onClick={() => handleSort("paymentdate")} className="sortable">
                                    Payment Date <FontAwesomeIcon icon={faSort} />
                                </th>
                                <th className="d-none d-sm-table-cell">Start Date</th>
                                <th className="d-none d-sm-table-cell">End Date</th>
                                <th onClick={() => handleSort("payment_status")} className="sortable">
                                    Status <FontAwesomeIcon icon={faSort} />
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredPayments.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center">No payments found</td>
                                </tr>
                            ) : (
                                filteredPayments.map((payment) => (
                                    <tr key={payment.payment_id}>
                                        <td>{payment.firstname} {payment.lastname}</td>
                                        <td className="d-none d-sm-table-cell">${payment.amount}</td>
                                        <td>{formatDate(payment.paymentdate)}</td>
                                        <td className="d-none d-sm-table-cell">{formatDate(payment.startdate)}</td>
                                        <td className="d-none d-sm-table-cell">{formatDate(payment.enddate)}</td>
                                        <td className={payment.payment_status === "Paid" ? "text-success" : "text-danger"}>
                                            {payment.payment_status}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PaymentTable;
