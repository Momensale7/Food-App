import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { getLoginData } from '../../services/utility/utilities';

export default function RecipeHeader({title, description, btnContent,routeTo,SubDescription }) {
  const loginData = getLoginData();

  return (
    <div className="mt-3 container ">
    <div className=" recipeHeader d-flex align-items-center justify-content-between px-5 py-4 rounded-3">
      <div className="caption">
        <h5 className="title fs-5 mb-0">{title} <span className='fs-3 greenMain'>Recipe</span><span> !</span></h5>
        <p className='fs-12 mt-0 mb-0 pb-0'>{description}</p>
        <p className='fs-12 mt-0 mb-0 pb-0'>{SubDescription}</p>
      </div>
      {
        loginData?.userGroup !== "SystemUser" && <Link to={routeTo} className='btn greenMainBg px-3 fs-6 fw-bold py-1 text-white'>{btnContent} <i className="fa fa-arrow-right ms-2"></i></Link>
      }
    </div>
  </div>
  )

}
/* eslint-disable react/prop-types */


 