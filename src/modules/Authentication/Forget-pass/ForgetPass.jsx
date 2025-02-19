import { Link, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo_1.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Bounce, toast } from "react-toastify";

export default function ForgetPass() {
  let { register, formState: { errors }, handleSubmit } = useForm()
  let navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      let response = await axios.post('https://upskilling-egypt.com:3006/api/v1/Users/Reset/Request', data)
      console.log(response);
      setIsLoading(true);
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
      setIsLoading(false)
      navigate('/reset-password');

    } catch (error) {
      // console.log(error);
      setIsLoading(false)
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
  }
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
                <h3 className="h6">Forgot Your Password?</h3>
                <p className="text-muted fs-12">No worries! Please enter your email and we will send a password reset link </p>
              </div>
            </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-5">
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
                    type="email" className="form-control bg-light border-0 " placeholder="enter your email" aria-label="email" aria-describedby="basic-addon1" />
                  {errors.email && <p className="text-danger mb-2 rounded-1 w-100">{errors.email.message}</p>}
                </div>
                
                <div className="">
                    <button className="btn btn-success w-100 d-block" disabled={isLoading}>
                      {isLoading ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "submit"}
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
