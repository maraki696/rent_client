import { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminDashboard from "../components/AdminDashboard"; 


const AdminLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth > 1000 ? false : true);

  return (
    <div className="d-flex">
      <AdminDashboard isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />
      <div 
        className={`main-content w-100 ${isCollapsed ? "collapsed" : ""}`}
        style={{marginLeft: isCollapsed ? '0px' : '40px'}}
      >
<Outlet /> 
      </div>
    </div>
  );
};

export default AdminLayout;
