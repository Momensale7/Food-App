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
import { CATEGORIES_URLS, TAGS_URLS, RECIPES_URLS } from '../../services/api/apiConfig'

export default function RecipesData() {
  let { register, formState: { errors, isSubmitting }, handleSubmit, reset, setValue } = useForm()
  const [tags, setTags] = useState([])
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()
  const params = useParams()
  const recipeId =params.recipeId

  const onSubmit = async (data) => {
    try {
      const formData = new FormData()
      for (let key in data) {
        if (key === "recipeImage") {
          if (data.recipeImage && data.recipeImage[0]) {
            formData.append('recipeImage', data.recipeImage[0])
          }
        }
        else formData.append(key, data[key]) // FIXED
      }
      console.log(formData);
      
      const response =  recipeId?
      await privateAxiosInstance.put(RECIPES_URLS.UPDATE_RECIPE(recipeId), formData, {headers: {'Content-Type': 'multipart/form-data'}})
    : await privateAxiosInstance.post(RECIPES_URLS.ADD_RECIPE, formData, {headers: {'Content-Type': 'multipart/form-data'}})

      // Handle successful response
      toast.success('Recipe added successfully!', {
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
      toast.error(error.response?.data?.message || 'Failed to add recipe', {
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
    (async ()=>{
   
        await getCategories()
         await getTags()
      
       if (recipeId) {
          const getRecipe=async ()=>{
               const response =await privateAxiosInstance.get(RECIPES_URLS.GET_RECIPE(recipeId));
               const recipe =response?.data
               setValue('name', recipe?.name)
               setValue('description', recipe?.description)
               setValue('tagId', recipe?.tag.id)
               setValue('price', recipe?.price)
               setValue('categoriesIds', recipe?.category?.[0].id)
             }
             getRecipe();
       
       }
     })()
  }, [])

  return (
    <>
      <RecipeHeader
        title={recipeId? "Edit the ":"Fill the "}
        description={"you can now fill the meals easily using the table and form ,"}
        SubDescription={"click here and sill it with the table !"}
        btnContent={"All Recipes"}
        routeTo={"/dashboard/recipes"} />
      <div className="container">
        <div className="text-muted mt-3 fs-3">{recipeId? "Edit item":"Add new item"}</div>
        <div className="px-5 mt-5">
          <form onSubmit={handleSubmit(onSubmit)}>
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
                type="number" className="form-control bg-light border-0 " placeholder="price" aria-label="price" aria-describedby="basic-addon1" />
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
            <div className="input-group mb-3">
              <input type="file" className="form-control bg-light" placeholder='upload image' {...register('recipeImage')} />
              {errors.recipeImage && <p className="text-danger mb-2 rounded-1 w-100">{errors.recipeImage.message}</p>}
            </div>

            <div className=" d-flex justify-content-end align-items-center mb-3" >
              <Link to={"/dashboard/recipes"} className='btn customBtn greenMain d-block'>Cancel</Link>
              <button className="btn greenMainBg text-white fw-bold d-block ms-3" disabled={isSubmitting}>
                {isSubmitting ? <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> : "save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}