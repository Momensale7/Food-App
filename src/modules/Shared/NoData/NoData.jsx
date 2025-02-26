import React from 'react'
import mainChar from '../../../assets/images/mainchar.png'
export default function NoData() {
  return (
    <>
      <div className="container d-flex justify-content-center align-items-center w-100" >
      <div className=" text-center">
        <img src={mainChar} alt="no data" />
        <p className='text-dark-main fw-bold'>No Data !</p>
      </div>
      </div>
    </>
  )
}
