/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import { Bounce, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { CONFIRM_PASS_VALIDATION, PASSWORD_VALIDATION } from '../../services/validation/validation';
import logo from "../../../assets/images/logo_1.png";
import { privateAxiosInstance } from '../../services/api/apiInstance';
import { USER_URLS } from '../../services/api/apiConfig';


export default function ChangePass({ onClose, show }) {
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger,
    reset,
  } = useForm({ mood: "onchange" });
  const onSubmit = async (data) => {
    console.log(data);
    try {
      const response = await privateAxiosInstance.put(USER_URLS.CHANGE_PASS, data);
      // console.log(response);
      toast.success(response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      reset();
      onClose();

    } catch (error) {
      // console.log(error);
      toast.error(`${error?.response?.data?.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };



  const togglePasswordVisibility = (type) => {
    if (type === "confirm") setShowConfirmPassword(!showConfirmPassword);
    else if (type === "oldPassword") setShowOldPassword(!showOldPassword);
    else setShowNewPassword(!showNewPassword);
  };
  const confirmNewPassword = watch('confirmNewPassword');
  const newPassword = watch('newPassword');
  useEffect(() => {
    if (confirmNewPassword) {
      trigger('confirmNewPassword');
    }
  }, [newPassword, confirmNewPassword, trigger])
  const handleOverlayClick = (e) => {
    // Close only if the click is outside the modal-content
    if (! e.target.classList.contains('modal-body')) {
        onClose();
    }}
  if (!show) return null;

  return (
    <>
      <div className="modal show d-block d-flex align-items-center customLocation  " onClick={handleOverlayClick} tabIndex="-1" role="dialog">
        <div className="modal-dialog" role="document">
          <div className="modal-content passModal">
            {/* <div className="modal-header border-0 pb-0">
              <div className="closeBtn ms-auto d-flex justify-content-center align-items-center">
                <i className="fa fa-close  text-danger" onClick={onClose}></i>
              </div>
            </div> */}
            <div className="modal-body px-5 py-4 modalText " onClick={(e) => e.stopPropagation()}>
            <div className="logo-container text-center ">
                      <img className="w-50" src={logo} alt="logo" />
                    </div>
              <div className="title ps-3">
                <h3 className="h6 text-muted fw-bold te mb-0 pb-0">Change Your Password</h3>
                <p className="text-muted mt-0 pt-0">Enter your details below</p>
              </div>
              <div>
                <form onSubmit={handleSubmit(onSubmit)} className='changePassForm'>
                  <div className="input-group mb-3">
                    <div className="input-group-text border-0">
                      <span className="border-end border-secondry border-1 pe-2" id="basic-addon1">
                        <i className="fas fa-lock text-secondary"></i>
                      </span>
                    </div>
                    <input {...register('oldPassword', PASSWORD_VALIDATION)}
                      type={showOldPassword ? "text" : "password"} className="form-control bg-light border-0" placeholder="New Password" aria-label="password" aria-describedby="basic-addon1" />
                    <div className="input-group-text border-0">
                      <span className="border-0 pe-2" onClick={() => togglePasswordVisibility("oldPassword")} style={{ cursor: 'pointer' }}>
                        <i className={`text-secondary ${showOldPassword ? "fas fa-eye-slash" : "fas fa-eye"}`}></i>
                      </span>
                    </div>
                    {errors.oldPassword && <p className="fs-12 text-danger mb-2 rounded-1 w-100">{errors.oldPassword.message}</p>}
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-text border-0">
                      <span className="border-end border-secondry border-1 pe-2" id="basic-addon1">
                        <i className="fas fa-lock text-secondary"></i>
                      </span>
                    </div>
                    <input {...register('newPassword', PASSWORD_VALIDATION)}
                      type={showNewPassword ? "text" : "password"} className="form-control bg-light border-0" placeholder="New Password" aria-label="password" aria-describedby="basic-addon1" />
                    <div className="input-group-text border-0">
                      <span className="border-0 pe-2" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                      <i className={`text-secondary ${showNewPassword ? "fas fa-eye-slash" : "fas fa-eye"}`}></i>
                      </span>
                    </div>
                    {errors.newPassword && <p className="fs-12 text-danger mb-2 rounded-1 w-100">{errors.newPassword.message}</p>}
                  </div>
                  <div className="input-group mb-3">
                    <div className="input-group-text border-0">
                      <span className="border-end border-secondry border-1 pe-2" id="basic-addon1">
                        <i className="fas fa-lock text-secondary"></i>
                      </span>
                    </div>
                    <input {...register('confirmNewPassword', CONFIRM_PASS_VALIDATION(newPassword))}
                      type={showConfirmPassword ? "text" : "password"} className="form-control bg-light border-0 formGray" placeholder="Confirm New Password" aria-label="confirm password" aria-describedby="basic-addon1" />
                    <div className="input-group-text border-0">
                      <span className="border-0 pe-2" onClick={() => togglePasswordVisibility("confirm")} style={{ cursor: 'pointer' }}>
                      <i className={`text-secondary ${showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}`}></i>
                      </span>
                    </div>
                    {errors.confirmNewPassword && <p className="fs-12 text-danger mb-2 rounded-1 w-100">{errors.confirmNewPassword.message}</p>}
                  </div>
                  <div className="">
                    <button className="btn btn-success w-100 d-block" disabled={isSubmitting}>
                      {isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Reset Password"}
                    </button>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  )
}
