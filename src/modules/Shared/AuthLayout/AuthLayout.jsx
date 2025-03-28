import React, { use } from 'react'
import { Outlet, useLocation } from 'react-router-dom'
import logo from "../../../assets/images/logo_1.png";

export default function AuthLayout() {
  const {pathname} =useLocation();
  return (
    <div>
         <div className="Auth-container">
            <div className="container-fluid bg-overlay">
              <div className="row vh-100 align-items-center justify-content-center">
                <div className={`col-10 ${pathname=='/register'?'col-md-6 mt-5':'col-md-5'} bg-white px-5 py-3 rounded-3`}>
                  <div>
                    <div className="logo-container text-center ">
                      <img className="w-50" src={logo} alt="logo" />
                    </div>
                  </div>
                  <Outlet/>
                </div>
              </div>
            </div>
          </div>
    </div>
  )
}
