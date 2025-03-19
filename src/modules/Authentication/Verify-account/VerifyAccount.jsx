import React from 'react'
import { EMAIL_VALIDATION, OTP_VALIDATION } from '../../services/validation/validation';
import { useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { puplicAxiosInstance } from '../../services/api/apiInstance';
import { USER_URLS } from '../../services/api/apiConfig';
import { Bounce, toast } from 'react-toastify';

export default function VerifyAccount() {
  const { state } = useLocation()
  const { 
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
   }= useForm({ defaultValues: {email:state?.email} }, { mood: "onChange" });
  const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await puplicAxiosInstance.put(USER_URLS.VERIFY, data);
      // console.log(response);
      toast.success(response?.data?.message || "Account veified successfully", {
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
      navigate('/login', { state: { email: data.email } });
    } catch (error) {
      // console.log(error);
      toast.error(`${error?.response?.data?.message ||"somthing went wrong"}`, {
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

  return (
    <>
      <div className="title">
        <h3 className="h6"> Verify Account</h3>
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
            <input {...register('code', OTP_VALIDATION)}
              type="text" className="form-control bg-light border-0" placeholder="OTP" aria-label="otp" aria-describedby="basic-addon1" />
            {errors.seed && <p className="text-danger mb-2 rounded-1 w-100">{errors.seed.message}</p>}
          </div>
           <div className="">
            <button className="btn btn-success w-100 d-block" disabled={isSubmitting}>
              {isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Send"}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
