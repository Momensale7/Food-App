import axios from "axios"

export const baseURL= "https://upskilling-egypt.com:3006/api/v1"
export const puplicAxiosInstance =axios.create({
    baseURL
})
export const privateAxiosInstance =axios.create({
    baseURL,
    headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
})

export const USER_URLS={
    LOGIN:`/Users/Login`,
    REGISTER:`/Users/Register`,
    FORGET_PASS:`/Users/Reset/Request`,
    RESET_PASS:`/Users/Reset`,
    CHANGE_PASS:`/Users/ChangePassword`,
    GET_USER:(id)=>`/Users/USER/${id}`
}
export const RECIPES_URLS={
    RECIPES_LIST:`/Recipe`,
    DELETE_RECIPE:(id)=>`/Recipe/${id}`
}
export const CATEGORIES_URLS={
    CATEGORIES_LIST:`/Category`,
     DELETE_CATEGORY:(id)=>`/Category/${id}`
}