import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo_1.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast } from "react-toastify";
// eslint-disable-next-line react/prop-types
export default function Login({saveLoginData}) {
  let { register, formState: { errors }, handleSubmit } = useForm()
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Login', data)
      // console.log(response);
      setIsLoading(true);
      toast.success('logged in successfully', {
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
      setIsLoading(false)
      localStorage.setItem('token',response?.data?.token)
      saveLoginData()
      navigate('/dashboard');
    } catch (error) {
      // console.log(error);
      setIsLoading(false)
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
  }
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
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
                <h3 className="h6">Log In</h3>
                <p className="text-muted">Welcome Back! Please enter your details</p>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-3">
                  <div className="input-group-text border-0">
                    <span className="  border-end border-secondry border-1 pe-2" id="basic-addon1">
                      <i className="fas fa-mobile text-secondary"></i>
                    </span>
                  </div>
                  <input {...register('email', {
                    required: 'email is required',
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    }
                  })}
                    type="email" className="form-control bg-light border-0 " placeholder="Enter email" aria-label="email" aria-describedby="basic-addon1" />
                  {errors.email && <p className="text-danger mb-2 rounded-1 w-100">{errors.email.message}</p>}
                </div>
                <div className="input-group mb-3">
                  <div className="input-group-text border-0">
                    <span className="border-end border-secondry border-1 pe-2" id="basic-addon1">
                      <i className="fas fa-lock  text-secondary"></i>
                    </span>
                  </div>
                  <input {...register('password', {
                    required: 'password is required',
                    pattern: {
                      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
                      message: "Must be 6+ chars, 1 uppercase, 1 lowercase, 1 digit & 1 special char",
                    }
                  })}
                    type={showPassword ? "text" : "password"} className="form-control bg-light border-0" placeholder="password" aria-label="password" aria-describedby="basic-addon1" />
                  <div className="input-group-text border-0">
                    <span className="border-0 pe-2" onClick={togglePasswordVisibility} style={{ cursor: 'pointer' }}>
                      <i className={showPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
                    </span>
                  </div>
                  {errors.password && <p className="text-danger mb-2 rounded-1 w-100">{errors.password.message}</p>}
                </div>
                <div className="links d-flex justify-content-between mb-3 mt-1">
                  <Link to="register" className="text-black text-decoration-none">Register Now?</Link>
                  <Link to="forget-password" className="text-success text-decoration-none">Forget Password?</Link>
                </div>
                <div className="">
                    <button className="btn btn-success w-100 d-block" disabled={isLoading}>
                      {isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Login"}
                    </button>
                  
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
