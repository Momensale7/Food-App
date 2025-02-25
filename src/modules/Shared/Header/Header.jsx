/* eslint-disable react/prop-types */
import React from 'react'
export default function Header({title,subTitle,description,image}) {
  return (
    <div className='container mt-3'>
      <div className="header-bg">
        <div className="row align-items-center justify-content-between">
          <div className="col-md-8">
          <div className="caption text-white">
            <h3 className='h1 fw-bold'>{title} <span className=' ms-1 h2 '>{subTitle}</span></h3>
            <p className=''>{description}</p>
          </div>
          </div>
          <div className="col-md-4 ">
          <div className="imgContainer ">
            <img src={image} className='img-fluid ms-auto d-block' alt="placeholder" />
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}
