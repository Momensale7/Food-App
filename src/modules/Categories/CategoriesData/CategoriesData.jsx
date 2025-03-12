import React, { useEffect, useState } from 'react'
import { CATEGORIES_URLS, privateAxiosInstance, puplicAxiosInstance } from '../../services/urls/urls';
import { CATEGORY_VALIDATION } from '../../services/validation/validation';
import { useForm } from 'react-hook-form';
import { Bounce, toast } from 'react-toastify';

export default function CategoriesData({ show, onClose, categoryId, categoryName, type ,getCategories }) {
  let { register, formState: { errors, isSubmitting }, handleSubmit ,setValue } = useForm({defaultValues:{name:name}})
  const onSubmit = async (data) => {
    // console.log('hiiiiiii',data);
    
    try {
      
      if (type =="update"){
        var response = await privateAxiosInstance.put(CATEGORIES_URLS.UPDATE_CATEGORY(categoryId), data)
      }else{
      // eslint-disable-next-line no-redeclare
      var response = await puplicAxiosInstance.post(CATEGORIES_URLS.POST_CATEGORY, data)
      }
      toast.success(response?.data?.message || (type=="add"?"category added successfully":"category updated successfully"), {
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
      getCategories()
      onClose();
    } catch (error) {
      console.log(error);
      toast.error(`${error?.response?.data?.message || "faild to process"}`, {
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
  
  useEffect(()=>{
    setValue("name",categoryName)
    console.log("thid is name",name);
     
    // console.log(categoryId, categoryName ,type)
  },[categoryId, categoryName,type,show])
  if (!show) return null;

  return (
    <>
      <div className="modal categoryModal show d-flex align-items-center " tabIndex="-1" role="dialog">
        <div className="modal-dialog w-100 mt-5 pt-5 " role="document">
          <div className="modal-content">
            <div className="modal-header border-0 pb-5 align-items-center"> 
              <h5 className="modal-title text-dark-main">Add New Category</h5>
              <div className="closeBtn ms-auto d-flex justify-content-center align-items-center">
                <i className="fa fa-close  text-danger" onClick={onClose}></i>
              </div>
            </div>
            <div className="modal-body pt-0 modalText">
            <form onSubmit={handleSubmit(onSubmit)}>
                                  <div className="input-group mb-5">
                                    
                                    <input  {...register('name',CATEGORY_VALIDATION  )}
                                      type="text" className="form-control bg-light border-0 " placeholder="Category Name" aria-label="Category Name " aria-describedby="basic-addon1" />
                                    {errors.name && <p className="text-danger mb-2 rounded-1 w-100">{errors.name.message}</p>}
                                  </div>
                                  
                                  <div className="">
                                      <button className="btn greenMainBg text-white ms-auto d-block" disabled={isSubmitting}>
                                        {isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "Save"}
                                      </button>
                                    
                                  </div>
                                </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}



