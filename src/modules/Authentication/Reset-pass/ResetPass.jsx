import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo_1.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export default function ResetPass() {
  const { register, formState: { errors }, handleSubmit, watch } = useForm();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/reset', data);
      // console.log(response);
      toast.success(response.data.message, {
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
      setIsLoading(false);
      navigate('/login');
    } catch (error) {
      // console.log(error);
      setIsLoading(false);
      toast.error(`${error.response.data.message}`, {
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

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const password = watch('password');

  return (
    <div className="Auth-container">
      <div className="container-fluid bg-overlay">
        <div className="row vh-100 align-items-center justify-content-center">
          <div className="col-8 col-md-5 bg-white px-5 py-3 rounded-3">
            <div>
              <div className="logo-container text-center ">
                <img className="w-50" src={logo} alt="logo" />
              </div>
              <div className="title">
                <h3 className="h6">Reset Password</h3>
                <p className="text-muted">Please enter your OTP or check your inbox</p>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <div className="input-group-text border-0">
                    <span className="border-end border-secondry border-1 pe-2" id="basic-addon1">
                      <i className="fas fa-envelope text-secondary"></i>
                    </span>
                  </div>
                  <input {...register('email', {
                    required: 'Email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    }
                  })}
                    type="email" className="form-control bg-light border-0" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" />
                  {errors.email && <p className="text-danger mb-2 rounded-1 w-100">{errors.email.message}</p>}
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-text border-0">
                    <span className="border-end border-secondry border-1 pe-2" id="basic-addon1">
                      <i className="fas fa-mobile text-secondary"></i>
                    </span>
                  </div>
                  <input {...register('seed', {
                    required: 'OTP is required',
                  })}
                    type="text" className="form-control bg-light border-0" placeholder="OTP" aria-label="otp" aria-describedby="basic-addon1" />
                  {errors.seed && <p className="text-danger mb-2 rounded-1 w-100">{errors.seed.message}</p>}
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-text border-0">
                    <span className="border-end border-secondry border-1 pe-2" id="basic-addon1">
                      <i className="fas fa-lock text-secondary"></i>
                    </span>
                  </div>
                  <input {...register('password', {
                    required: 'Password is required',
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message: "Must be 6+ chars, 1 uppercase, 1 lowercase, 1 digit & 1 special char",
                    }
                  })}
                    type={showPassword ? "text" : "password"} className="form-control bg-light border-0" placeholder="New Password" aria-label="password" aria-describedby="basic-addon1" />
                  <div className="input-group-text border-0">
                    <span className="border-0 pe-2" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                      <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                    </span>
                  </div>
                  {errors.password && <p className="text-danger mb-2 rounded-1 w-100">{errors.password.message}</p>}
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-text border-0">
                    <span className="border-end border-secondry border-1 pe-2" id="basic-addon1">
                      <i className="fas fa-lock text-secondary"></i>
                    </span>
                  </div>
                  <input {...register('confirmPassword', {
                    required: 'Confirm Password is required',
                    validate: value => value === password || 'Passwords do not match'
                  })}
                    type={showPassword ? "text" : "password"} className="form-control bg-light border-0" placeholder="Confirm New Password" aria-label="confirm password" aria-describedby="basic-addon1" />
                  <div className="input-group-text border-0">
                    <span className="border-0 pe-2" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                      <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                    </span>
                  </div>
                  {errors.confirmPassword && <p className="text-danger mb-2 rounded-1 w-100">{errors.confirmPassword.message}</p>}
                </div>
                <div className="">
                  <button className="btn btn-success w-100 d-block" disabled={isLoading}>
                    {isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Reset Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}