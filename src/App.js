import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ManagementLayout from "./layouts/ManagementLayout";
import AdminLayout from "./layouts/AdminLayout";
import Login from "./components/Login";
import AdminLogin from "./components/Adminlogin";
import Register from "./pages/Register";
import View from "./pages/View";
import Update from "./pages/Update";
import Read from "./pages/Read";
import Payment from "./pages/Payment";
import PaymentTable from "./pages/PaymentTable";
import CustomerList from "./pages/CustomerList";
import CreateAccount from "./pages/CreateAccount";
import ChangePassword from "./pages/ChangePassword";
import BasePage from "./components/BasePage";
import AdminCreateAccount from "./pages/AdminCreateAccount";
import AdminChangePassword from "./pages/AdminChangePassword";
import UnpaidCustomers from "./pages/UnpaidCustomers";
import ProtectedRoute from './components/ProtectedRoute';  // import the ProtectedRoute component
import './styles/bootstrap.css';
import './styles/style.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<BasePage />} />
        
        {/* Login Routes */}
        <Route path="/management/login" element={<Login />} />
        <Route path="/management/Create_account" element={<CreateAccount />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        

        <Route path="/edit/:customer_id" element={<Update />} />
         
          <Route path="/read/:customer_id" element={<Read />} />

        
        {/* Management Routes (Protected) */}
        <Route path="/management/*" element={<ProtectedRoute roleRequired="management"><ManagementLayout /></ProtectedRoute>}>
 <Route path="register" element={<Register />} />
         
          <Route path="view" element={<View />} />
          <Route path="edit" element={<CustomerList />} />
          <Route path="delete" element={<CustomerList />} />
          <Route path="change_password" element={<ChangePassword />} />
        </Route>

        {/* Admin Routes (Protected) */}
        <Route path="/admin/*" element={<ProtectedRoute roleRequired="admin"><AdminLayout /></ProtectedRoute>}>
          <Route path="register" element={<Register />} />
          <Route path="view" element={<View />} />
          <Route path="edit" element={<CustomerList />} />
          <Route path="delete" element={<CustomerList />} />
          <Route path="payment" element={<Payment />} />
          <Route path="paymenttable" element={<PaymentTable />} />
          <Route path="change_password" element={<AdminChangePassword />} />
          <Route path="unpaid" element={<UnpaidCustomers />} />  
                <Route path="create_account" element={<AdminCreateAccount />} />
        </Route>
        
        {/* Admin Account Management Routes */}

      </Routes>
    </Router>
  );
}

export default App;
