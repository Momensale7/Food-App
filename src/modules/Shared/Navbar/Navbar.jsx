/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import avatar from '../../../assets/images/avatar.jpg'
import { jwtDecode } from 'jwt-decode';
import { getLoginData } from '../../services/utility/utilities';
import { baseURL } from '../../services/api/apiConfig';
export default function Navbar() {
  const loginData = getLoginData();

  return (
    <div className="container pt-3">
    <nav className="navbar navbar-expand-lg bg-body-tertiary mt-2 border-0 p-0 rounded-2">
  <div className="container-fluid rounded-2 ">
    <button className="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavDropdown">
      <ul className="navbar-nav ms-auto  text-dark-main">
        <li className="nav-item d-flex align-items-center">
          <img src={loginData?.imagePath?baseURL+loginData?.imagePath:avatar} alt="Profile" className="profile-image ms-1" />
          <a className="nav-link fs-12 text-dark-main" aria-current="page" href="#">{loginData?.userName}</a>
        </li>
        <li className="nav-item dropdown">
          <a className="nav-link fs-12 dropdown-toggle text-dark-main" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          </a>
          {/* <ul className="dropdown-menu">
            <li><a className="dropdown-item" href="#">Action</a></li>
          </ul> */}
        </li>
        <li className="nav-item ">
          <a className="nav-link text-dark-main fs-12" aria-current="page" ><i className="fa fa-bell"></i></a>
        </li>
      </ul>
    </div>
  </div>
</nav>
    </div>
  )
}
