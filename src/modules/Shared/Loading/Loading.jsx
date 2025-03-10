import React from 'react'
import logo from  "../../../assets/images/sideLogo.png"
export default function Loading() {
  return (
    <div>
        <div className="loading d-flex justify-content-center align-items-center">
            <div className="loading__container">
            <img src={logo} alt="logo" className='w-75 mt-0 pt-0' />
            <p className='greenMain fs-3 mt-0 pt-0'>loading ...</p>
            </div>
        </div>
    </div>
  )
}
