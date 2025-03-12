/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import CategoriesData from '../../Categories/CategoriesData/CategoriesData'

export default function SubHeader({ title, description, btnContent, getCategories }) {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="container mt-3 px-5">
        <div className="d-flex align-items-center justify-content-between">
          <div className="caption">
            <h5 className="title fs-5 mb-0">{title}</h5>
            <p className='fs-12 mt-0'>{description}</p>
          </div>
          {btnContent &&
            <button onClick={() => setShowModal(true)} className='btn greenMainBg px-3 fs-6 fw-bold py-1 text-white'>{btnContent}</button>
          }
        </div>
      </div>
      <CategoriesData type={'add'} show={showModal} onClose={() => setShowModal(false)} getCategories={getCategories}/>

    </>
  )
}
