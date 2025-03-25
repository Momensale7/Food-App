import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../assets/images/logo_1.png";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { EMAIL_VALIDATION, PASSWORD_VALIDATION } from "../../services/validation/validation";
import { puplicAxiosInstance } from "../../services/api/apiInstance";
import { USER_URLS } from "../../services/api/apiConfig";
// eslint-disable-next-line react/prop-types
export default function Login() {
  const { state } = useLocation()
  let { register, formState: { errors,isSubmitting }, handleSubmit } = useForm({defaultValues: { email:state?.email }}, { mode: "onChange" });
  let navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      let response = await puplicAxiosInstance.post(USER_URLS.LOGIN, data)
      // console.log(response);
      toast.success('logged in successfully', );
      localStorage.setItem('token', response?.data?.token)
      navigate('/dashboard');
    } catch (error) {
      // console.log(error);
      toast.error(`${error?.response?.data?.message}`, );

    }
  }
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <>
      <div className="title">
        <h3 className="h6">Log In</h3>
        <p className="text-muted">Welcome Back! Please enter your details</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-3">
            <div className="input-group-text border-0">
              <span className="  border-end border-secondry border-1 pe-2" id="basic-addon1">
                <i className="fas fa-mobile text-secondary"></i>
              </span>
            </div>
            <input {...register('email', EMAIL_VALIDATION)}
              type="email" className="form-control bg-light border-0 " placeholder="Enter email" aria-label="email" aria-describedby="basic-addon1" />
            {errors.email && <p className="text-danger mb-2 rounded-1 w-100">{errors.email.message}</p>}
          </div>
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
          <div className="links d-flex justify-content-between mb-3 mt-1">
            <Link to="/register" className="text-black text-decoration-none">Register Now?</Link>
            <Link to="/forget-password" className="text-success text-decoration-none">Forget Password?</Link>
          </div>
          <div className="">
            <button className="btn btn-success w-100 d-block" disabled={isSubmitting}>
              {isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Login"}
            </button>

          </div>
        </form>
      </div>
    </>
  )
}
