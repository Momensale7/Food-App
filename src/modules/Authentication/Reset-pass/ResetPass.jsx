import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { puplicAxiosInstance, USER_URLS } from "../../services/urls/urls";
import { CONFIRM_PASS_VALIDATION, EMAIL_VALIDATION, OTP_VALIDATION, PASSWORD_VALIDATION } from "../../services/validation/validation";

export default function ResetPass() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { state } = useLocation()
  const { 
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    watch,
    trigger
   }= useForm({ defaultValues: {email:state?.email} }, { mood: "onchange" });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await puplicAxiosInstance.post(USER_URLS.RESET_PASS, data);
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
      navigate('/login');
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
        <h3 className="h6">Reset Password</h3>
        <p className="text-muted">Please enter your OTP or check your inbox</p>
      </div>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-group mb-3">
            <div className="input-group-text border-0">
              <span className="border-end border-secondry border-1 pe-2" id="basic-addon1">
                <i className="fas fa-envelope text-secondary"></i>
              </span>
            </div>
            <input {...register('email', EMAIL_VALIDATION)}
              type="email" className="form-control bg-light border-0" placeholder="Email" aria-label="email" aria-describedby="basic-addon1" />
            {errors.email && <p className="text-danger mb-2 rounded-1 w-100">{errors.email.message}</p>}
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text border-0">
              <span className="border-end border-secondry border-1 pe-2" id="basic-addon1">
                <i className="fas fa-mobile text-secondary"></i>
              </span>
            </div>
            <input {...register('seed', OTP_VALIDATION)}
              type="text" className="form-control bg-light border-0" placeholder="OTP" aria-label="otp" aria-describedby="basic-addon1" />
            {errors.seed && <p className="text-danger mb-2 rounded-1 w-100">{errors.seed.message}</p>}
          </div>
          <div className="input-group mb-3">
            <div className="input-group-text border-0">
              <span className="border-end border-secondry border-1 pe-2" id="basic-addon1">
                <i className="fas fa-lock text-secondary"></i>
              </span>
            </div>
            <input {...register('password', PASSWORD_VALIDATION)}
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
            <input {...register('confirmPassword', CONFIRM_PASS_VALIDATION(password))}
              type={showConfirmPassword ? "text" : "password"} className="form-control bg-light border-0" placeholder="Confirm New Password" aria-label="confirm password" aria-describedby="basic-addon1" />
            <div className="input-group-text border-0">
              <span className="border-0 pe-2" onClick={() => togglePasswordVisibility("confirm")} style={{ cursor: 'pointer' }}>
                <i className={showConfirmPassword ? "fas fa-eye-slash" : "fas fa-eye"}></i>
              </span>
            </div>
            {errors.confirmPassword && <p className="text-danger mb-2 rounded-1 w-100">{errors.confirmPassword.message}</p>}
          </div>
          <div className="">
            <button className="btn btn-success w-100 d-block" disabled={isSubmitting}>
              {isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Reset Password"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}