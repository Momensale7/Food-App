
export const baseURL= "https://upskilling-egypt.com:3006/api/v1"
export const imgURL="https://upskilling-egypt.com:3006/"


export const USER_URLS={
    LOGIN:`/Users/Login`,
    REGISTER:`/Users/Register`,
    FORGET_PASS:`/Users/Reset/Request`,
    RESET_PASS:`/Users/Reset`,
    CHANGE_PASS:`/Users/ChangePassword`,
    GET_USERS:`/Users`,
    VERIFY:`/Users/Verify`,
    DELETE_USER:(id)=>`/Users/${id}`,
    GET_USER:(id)=>`/Users/USER/${id}`
}
export const RECIPES_URLS={
    GET_RECIPES:`/Recipe`,
    ADD_RECIPE:`/Recipe`,
    DELETE_RECIPE:(id)=>`/Recipe/${id}`,
    GET_RECIPE:(id)=>`/Recipe/${id}`,
    UPDATE_RECIPE:(id)=>`/Recipe/${id}`
}
export const CATEGORIES_URLS={
    GET_CATEGORIES:`/Category`,
    POST_CATEGORY:`/Category`,
    UPDATE_CATEGORY:(id)=>`/Category/${id}`,
     DELETE_CATEGORY:(id)=>`/Category/${id}`
}
export const TAGS_URLS={
    GET_TAGS:`/tag`,
}
export const FAVOURITES_URLS = {
    GET_FAVOURITES:`/userRecipe`,
    ADD_FAVOURITE:`/userRecipe`,
    DELETE_FAVOURITE:(id)=>`/userRecipe/${id}`
}