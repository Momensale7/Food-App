import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { puplicAxiosInstance } from '../../services/api/apiInstance'
import { USER_URLS } from '../../services/api/apiConfig'
import { Bounce, toast } from 'react-toastify'
import { CONFIRM_PASS_VALIDATION, COUNTRY_VALIDATION, EMAIL_VALIDATION, PASSWORD_VALIDATION, PHONE_VALIDATION, USERNAME_VALIDATION } from '../../services/validation/validation'

export default function Register() {
  let { register, formState: { errors, isSubmitting }, handleSubmit, trigger, watch } = useForm({ mode: "onChange" });
  let navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      let response = await puplicAxiosInstance.post(USER_URLS.REGISTER, data)
      // console.log(response);
      toast.success(`${response?.data?.message || "Account created successfully. A verification code has been sent to your email address."}`, {
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
      navigate('/verify-account', { state: { email: data.email } });
    } catch (error) {
      // console.log(error);
      toast.error(`${error?.response?.data?.message || "something went wrong"}`, {
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
  }
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const togglePasswordVisibility = (type) => {
    type == "confirm" ? setShowConfirmPassword(!showConfirmPassword) : setShowPassword(!showPassword);
  };
  const confirmPassword = watch('confirmPassword');
  const password = watch('password');
  useEffect(() => {
    if (confirmPassword) {
      trigger('confirmPassword');
    }
  }, [password, confirmPassword, trigger])
  return (
    <>
      <div className="title">
        <h3 className="h6">Register</h3>
        <p className="text-muted">Welcome Back! Please enter your details</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="row gx-5">
            <div className="col-md-6">
              <div className="input-group mb-3">
                <div className="input-group-text border-0">
                  <span className="  border-end border-secondry border-1 pe-2" id="basic-addon1">
                    <i className="fas fa-user text-secondary"></i>
                  </span>
                </div>
                <input {...register('userName', USERNAME_VALIDATION)}
                  type="text" className="form-control bg-light border-0 " placeholder="Enter userName" aria-label="userName" aria-describedby="basic-addon1" />
                {errors.userName && <p className="text-danger mb-2 rounded-1 w-100">{errors.userName.message}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group mb-3">
                <div className="input-group-text border-0">
                  <span className="  border-end border-secondry border-1 pe-2" id="basic-addon1">
                    <i className="fas fa-envelope text-secondary"></i>
                  </span>
                </div>
                <input {...register('email', EMAIL_VALIDATION)}
                  type="email" className="form-control bg-light border-0 " placeholder="Enter email" aria-label="email" aria-describedby="basic-addon1" />
                {errors.email && <p className="text-danger mb-2 rounded-1 w-100">{errors.email.message}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group mb-3">
                <div className="input-group-text border-0">
                  <span className="  border-end border-secondry border-1 pe-2" id="basic-addon1">
                    <i className="fas fa-globe text-secondary"></i>
                  </span>
                </div>
                <input {...register('country', COUNTRY_VALIDATION)}
                  type="text" className="form-control bg-light border-0 " placeholder="Country" aria-label="country" aria-describedby="basic-addon1" />
                {errors.country && <p className="text-danger mb-2 rounded-1 w-100">{errors.country.message}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group mb-3">
                <div className="input-group-text border-0">
                  <span className="  border-end border-secondry border-1 pe-2" id="basic-addon1">
                    <i className="fas fa-mobile text-secondary"></i>
                  </span>
                </div>
                <input {...register('phoneNumber', PHONE_VALIDATION)}
                  type="tel" className="form-control bg-light border-0 " placeholder="phoneNumber" aria-label="phone" aria-describedby="basic-addon1" />
                {errors.phoneNumber && <p className="text-danger mb-2 rounded-1 w-100">{errors.phoneNumber.message}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group mb-3">
                <div className="input-group-text border-0">
                  <span className="border-end border-secondry border-1 pe-2" id="basic-addon1">
                    <i className="fas fa-lock  text-secondary"></i>
                  </span>
                </div>
                <input {...register('password', PASSWORD_VALIDATION)}
                  type={showPassword ? "text" : "password"} className="form-control bg-light border-0" placeholder="password" aria-label="password" aria-describedby="basic-addon1" />
                <div className="input-group-text border-0">
                  <span className="border-0 pe-2" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                    <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </span>
                </div>
                {errors.password && <p className="text-danger mb-2 rounded-1 w-100">{errors.password.message}</p>}
              </div>
            </div>
            <div className="col-md-6">
              <div className="input-group mb-3">
                <div className="input-group-text border-0">
                  <span className="border-end border-secondry border-1 pe-2" id="basic-addon1">
                    <i className="fas fa-lock text-secondary"></i>
                  </span>
                </div>
                <input {...register('confirmPassword', CONFIRM_PASS_VALIDATION(password))}
                  type={showConfirmPassword ? "text" : "password"} className="form-control bg-light border-0" placeholder="Confirm New Password" aria-label="confirm password" aria-describedby="basic-addon1" />
                <div className="input-group-text border-0">
                  <span className="border-0 pe-2" onClick={() => togglePasswordVisibility("confirm")} style={{ cursor: 'pointer' }}>
                    <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                  </span>
                </div>
                {errors.confirmPassword && <p className="text-danger mb-2 rounded-1 w-100">{errors.confirmPassword.message}</p>}
              </div>
            </div>
          </div>

          <div className="links d-flex justify-content-end mb-3 mt-1">
            <Link to="/login" className="text-success text-decoration-none">Login Now?</Link>
          </div>
          <div className="">
            <button className="btn btn-success w-75 mx-auto d-block" disabled={isSubmitting}>
              {isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Reigster"}
            </button>

          </div>
        </form>
      </div>
    </>
  )
}

