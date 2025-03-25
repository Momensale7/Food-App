import React from 'react'
import logo from '../../../assets/images/logo_1.png'
import layout from '../../../assets/images/Vector.png'
import notFound from '../../../assets/images/404.png'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <div className="vh-100 position-relative overflow-hidden">

    <div className='px-5'>
      <div className="logoNotFound py-2 ">
        <img src={logo} alt="logo" className='img-fluid' />
      </div>
      <div className="caption  mt-5 px-3 position-relative z-3">
        <p className='mb-0 text-dark-main fs-3 fw-bold'>Oops. </p>
        <p className='mb-0 greenMain fw-bold mb-0 pb-0'>Page not found  </p>
        <p className='mb-0 text-dark-main fs-12 fw-bold mt-0 pt-0'>... </p>
        <p className='mb-0 text-dark-main fs-14  mt-0 pt-0'>This Page doesn’t exist or was removed!</p>
        <p className='mb-0 text-dark-main fs-14 mt-0 pt-0'> We suggest you  back to home.</p>
        <Link to={'/dashboard'} className='btn w-250 greenMainBg text-white px-4  py-2 d-flex align-items-center mt-3 justify-content-center'>
          <i className="fas fa-arrow-left"></i>
          <div className="ms-2">
            <span className='d-block fs-14' >Back To</span>
            <span className='d-block fs-14' >Home</span>
          </div>
        </Link >
           </div>
        <img src={layout} alt="layout" className='vectorNotfound'/>   
        <img src={notFound} alt="404" className='position-absolute bottom-0 notFound d-none d-md-inline'/>   
    </div>

    </div>
  )
}
