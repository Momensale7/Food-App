/* eslint-disable react/prop-types */
import React from 'react'
import mainchar from "../../../assets/images/mainchar.png"
export default function DeleteConfirmation({ 
  show, 
  onClose, 
  onConfirm, 
  message 
}) {
  if (!show) return null; 
  return (
    <>
      <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog" role="document">
                <div className="modal-content">
                    <div className="modal-header border-0 pb-0">
                      <div className="closeBtn ms-auto d-flex justify-content-center align-items-center">
                        <i className="fa fa-close  text-danger" onClick={onClose}></i>
                      </div>
                    </div>
                    <div className="modal-body pt-0 modalText">
                      <div className="text-center">
                        <img src={mainchar} className='w-50' alt="" />
                      </div>
                        <p className='fw-bold text-center mt-1'>{message}</p>
                        <span>are you sure you want to delete this item ? if you are sure just click on delete it</span>
                    </div>
                    <div className="modal-footer border-0">
                        <button type="button" className="btn border-danger text-danger" onClick={onConfirm}>
                            Delete This Item
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

