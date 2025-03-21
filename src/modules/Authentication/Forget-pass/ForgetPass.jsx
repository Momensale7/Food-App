import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Bounce, toast } from "react-toastify";
import { EMAIL_VALIDATION } from "../../services/validation/validation";
import { puplicAxiosInstance } from "../../services/api/apiInstance";
import { USER_URLS } from "../../services/api/apiConfig";

export default function ForgetPass() {
  let { register, formState: { errors,isSubmitting }, handleSubmit } = useForm()
  let navigate = useNavigate()
  const onSubmit = async (data) => {
    try {
      let response = await puplicAxiosInstance.post(USER_URLS.FORGET_PASS, data)
      // console.log(response);
      toast.success(response?.data?.message, );
      navigate('/reset-password',{state:{email:data.email}});

    } catch (error) {
      // console.log(error);
      toast.error(`${error?.response?.data?.message}`, );

    }
  }
 
  return (
  
<>
              <div className="title">
                <h3 className="h6">Forgot Your Password?</h3>
                <p className="text-muted fs-12">No worries! Please enter your email and we will send a password reset link </p>
              </div>
            <div>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="input-group mb-5">
                  <div className="input-group-text border-0">
                    <span className="  border-end border-secondry border-1 pe-2" id="basic-addon1">
                      <i className="fas fa-mobile text-secondary"></i>
                    </span>
                  </div>
                  <input {...register('email',EMAIL_VALIDATION  )}
                    type="email" className="form-control bg-light border-0 " placeholder="enter your email" aria-label="email" aria-describedby="basic-addon1" />
                  {errors.email && <p className="text-danger mb-2 rounded-1 w-100">{errors.email.message}</p>}
                </div>
                
                <div className="">
                    <button className="btn btn-success w-100 d-block" disabled={isSubmitting}>
                      {isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "submit"}
                    </button>
                  
                </div>
              </form>
            </div>
            
            </>
  )
}
