import { useState } from "react";
import { Outlet } from "react-router-dom";
import Home from "../components/Home"; 

const ManagementLayout = () => {
  const [isCollapsed, setIsCollapsed] = useState(window.innerWidth > 1000 ? false : true);

  return (
    <div className="d-flex">
      <Home isCollapsed={isCollapsed} setIsCollapsed={setIsCollapsed} />

      <div 
        className={`main-content w-100 ${isCollapsed ? "collapsed" : ""}`} 
        style={{  marginLeft: isCollapsed ? '0px' : '65px',  }}
      >
        <Outlet />
      </div>
    </div>
  );
};

export default ManagementLayout;
