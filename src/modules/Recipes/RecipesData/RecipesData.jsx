import React, { useEffect, useState } from 'react'
import Header from '../../Shared/Header/Header'
import headerImage from '../../../assets/images/headerImg.png'
import SubHeader from '../../Shared/SubHeader/SubHeader'
import RecipeHeader from '../../Shared/RecipeHeader/RecipeHeader'
import { Bounce, toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { REQUIRED_VALIDATION } from '../../services/validation/validation'
import { privateAxiosInstance, puplicAxiosInstance } from '../../services/api/apiInstance'
import { CATEGORIES_URLS, TAGS_URLS, RECIPES_URLS, imgURL } from '../../services/api/apiConfig'
import { useDropzone } from 'react-dropzone'
import Loading from '../../Shared/Loading/Loading'

export default function RecipesData() {
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    acceptedFiles
  } = useDropzone({
    accept: { 'image/*': [] },
    multiple: false,
    onDrop: (files) => {
      setValue('recipeImage', files[0], { shouldValidate: true });
    }
  });
  let { register, formState: { errors, isSubmitting }, handleSubmit, reset, setValue } = useForm()
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [updatedImg, setUpdatedImg] = useState(null)
  const params = useParams()
  const recipeId = params.recipeId

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()

      if (!data.recipeImage && updatedImg) {
        const response = await fetch(imgURL + updatedImg);
        const blob = await response.blob();

        const file = new File([blob], updatedImg.split('/').pop(), { type: blob.type });

        formData.append('recipeImage', file);
      } else {
        formData.append('recipeImage', data.recipeImage);
      }

      for (let key in data) {
        if (key !== 'recipeImage') {
          formData.append(key, data[key]);
        }
      }


      const response = recipeId ?
        await privateAxiosInstance.put(RECIPES_URLS.UPDATE_RECIPE(recipeId), formData, { headers: { 'Content-Type': 'multipart/form-data' } })
        : await privateAxiosInstance.post(RECIPES_URLS.ADD_RECIPE, formData, { headers: { 'Content-Type': 'multipart/form-data' } })

      toast.success(response?.data?.message || recipeId ? 'Recipe updated successfully!' : 'Recipe added successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      })
      reset()
      navigate('/dashboard/recipes')

    } catch (error) {
      console.error('Error adding recipe:', error)
      toast.error(error.response?.data?.message || recipeId ? 'faild to update recipe' : 'Failed to add recipe', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        transition: Bounce,
      })
    }
  }

  const getTags = async () => {
    try {
      let response = await puplicAxiosInstance.get(TAGS_URLS.GET_TAGS)
      setTags(response?.data)
    } catch (error) {
      console.error('Error fetching tags:', error)
    }
  }

  const getCategories = async () => {
    try {
      let response = await privateAxiosInstance.get(CATEGORIES_URLS.GET_CATEGORIES, {
        params: { pageSize: 10 }
      })
      console.log(response)
      setCategories(response?.data?.data)
    } catch (error) {
      console.error('Error fetching categories:', error)
    }
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true)
      await getCategories()
      await getTags()
      setIsLoading(false)
      if (recipeId) {
        const getRecipe = async () => {
          const response = await privateAxiosInstance.get(RECIPES_URLS.GET_RECIPE(recipeId));
          const recipe = response?.data
          console.log(recipe);

          setValue('name', recipe?.name)
          setValue('description', recipe?.description)
          setValue('tagId', recipe?.tag.id)
          setValue('price', recipe?.price)
          setValue('categoriesIds', recipe?.category?.[0].id)
          setUpdatedImg(recipe?.imagePath)
        }
        getRecipe();

      }
    })()
  }, [])

  return (
    <>
      <RecipeHeader
        title={recipeId ? "Edit the " : "Fill the "}
        description={"you can now fill the meals easily using the table and form ,"}
        SubDescription={"click here and sill it with the table !"}
        btnContent={"All Recipes"}
        routeTo={"/dashboard/recipes"} />
      <div className="container">
        <div className="text-muted mt-3 fs-6 px-3">{recipeId ? "Edit item" : "Add new item"}</div>
        <div className="px-5 mt-5">
          {isLoading && recipeId ? <Loading /> : <form onSubmit={handleSubmit(onSubmit)}>
            <div className="input-group mb-3">
              <input {...register('name', REQUIRED_VALIDATION("name"))}
                type="text" className="form-control bg-light border-0 " placeholder="recipe name" aria-label="email" aria-describedby="basic-addon1" />
              {errors.name && <p className="text-danger mb-2 rounded-1 w-100">{errors.name.message}</p>}
            </div>
            <div className="input-group mb-3" >
              <textarea {...register('description', REQUIRED_VALIDATION("description"))}
                className="form-control bg-light border-0 " placeholder="description" aria-label="description " aria-describedby="basic-addon1" />
              {errors.description && <p className="text-danger mb-2 rounded-1 w-100">{errors.description.message}</p>}
            </div>
            <div className="input-group mb-3">
              <select className='form-select bg-light' {...register('tagId', REQUIRED_VALIDATION("tagId"))} >
                <option value="">Tags</option>
                {tags?.map(({ id, name }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
              {errors.tagId && <p className="text-danger mb-2 rounded-1 w-100">{errors.tagId.message}</p>}
            </div>
            <div className="input-group mb-3">
              <input {...register('price', REQUIRED_VALIDATION("price"))}
                type="number" className="form-control bg-light border-0" placeholder="price" aria-label="price" aria-describedby="basic-addon1" />
              <div className="input-group-append">
                <span className="input-group-text border-0">$</span>
              </div>
              {errors.price && <p className="text-danger mb-2 rounded-1 w-100">{errors.price.message}</p>}
            </div>
            <div className="input-group mb-3">
              <select className='form-select bg-light' {...register('categoriesIds')}>
                <option value="">Cattegory</option>
                {categories?.map(({ id, name }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
              {errors.categoriesIds && <p className="text-danger mb-2 rounded-1 w-100">{errors.categoriesIds.message}</p>}
            </div>


            <div className="mb-3 customBorder p-2">
              <div
                {...getRootProps()}
                className={`form-control recipeHeader d-flex justify-content-center align-items-center text-center border-0  ${isDragActive ? 'bg-secondary bg-opacity-10' : ''}`}
                style={{ cursor: 'pointer', minHeight: '50px' }}
              >
                <input {...getInputProps()} />
                {
                  isDragActive
                    ? <p className="m-0">Drop the image here...</p>
                    : <div className='d-flex flex-column align-items-center'><i className='fa fa-upload'></i> <p className="m-0">Drag & Drop or <span className='greenMain'>Choose a Item Image </span>to Upload</p></div>
                }
              </div>
              <div className="text-center">
                {acceptedFiles.length > 0 ? (
                  <img
                    src={URL.createObjectURL(acceptedFiles[0])}
                    alt="Selected preview"
                    className='w-25 rounded'
                  />
                ) : updatedImg ? (
                  <img
                    src={imgURL + updatedImg}
                    alt="Current recipe"
                    className='w-25 rounded'
                  />
                ) : null}</div>
              {/* Show file name */}
              {acceptedFiles.length > 0 && (
                <p className="text-success mt-2 mb-0">
                  Selected file: {acceptedFiles[0].name}
                </p>
              )}

              {/* Validation error */}
              {errors.recipeImage && (
                <p className="text-danger mt-2 mb-0 rounded-1">{errors.recipeImage.message}</p>
              )}
            </div>

            <div className=" d-flex justify-content-end align-items-center mb-3" >
              <Link to={"/dashboard/recipes"} className='btn customBtn greenMain d-block'>Cancel</Link>
              <button className="btn greenMainBg text-white fw-bold d-block ms-3" disabled={isSubmitting}>
                {isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "save"}
              </button>
            </div>
          </form>}
        </div>
      </div>
    </>
  )
}