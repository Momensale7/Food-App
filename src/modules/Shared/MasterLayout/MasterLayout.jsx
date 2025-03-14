/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import SideBar from '../Sidebar/Sidebar';

export default function MasterLayout({ loginData }) {
  const [collapsed, setCollapsed] = useState(window.innerWidth <= 900); 

  return (
    <div className="d-flex">
      {/* Pass collapsed state and toggle function to Sidebar */}
      <SideBar collapsed={collapsed} setCollapsed={setCollapsed} />
      
      {/* Adjust mainContent margin dynamically */}
      <div className={`mainContent ${collapsed ? 'collapsed' : ''}`}>
        <Navbar loginData={loginData} />
        <Outlet />
      </div>
    </div>
  );
}
