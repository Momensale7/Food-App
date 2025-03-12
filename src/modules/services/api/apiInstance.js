import axios from "axios"
import { baseURL } from "./apiConfig"

export const puplicAxiosInstance =axios.create({
    baseURL
})

export const privateAxiosInstance =axios.create({
    baseURL,
    headers:{Authorization:`Bearer ${localStorage.getItem('token')}`}
})