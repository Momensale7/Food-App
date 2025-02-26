import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './modules/Shared/AuthLayout/AuthLayout'
import Login from './modules/Authentication/Login/Login'
import Register from './modules/Authentication/Register/Register'
import ResetPass from './modules/Authentication/Reset-pass/ResetPass'
import ForgetPass from './modules/Authentication/Forget-pass/ForgetPass'
import NotFound from './modules/Shared/NotFound/NotFound'
import MasterLayout from './modules/Shared/MasterLayout/MasterLayout'
import Dashboard from './modules/Dashboard/Dashboard'
import RecipesList from './modules/Recipes/RecipesList/RecipesList'
import RecipesData from './modules/Recipes/RecipesData/RecipesData'
import CategoriesList from './modules/Categories/CategoriesList/CategoriesList'
import CategoriesData from './modules/Categories/CategoriesData/CategoriesData'
import UsersList from './modules/Users/UsersList/UsersList'
import { Bounce, ToastContainer } from 'react-toastify'
import VerifyAccount from './modules/Authentication/Verify-account/VerifyAccount'
import { jwtDecode } from 'jwt-decode'
import { useEffect, useState } from 'react'
import ProtectedRoute from './modules/Shared/ProtectedRoute/ProtectedRoute'

function App() {
  const [loginData,setLoginData]=useState(null);
  let saveLoginData= () => {
    let encodedToken= localStorage.getItem('token')
      let decodedToken= jwtDecode(encodedToken)
      setLoginData(decodedToken)
      console.log(loginData);
  }
  
  useEffect(()=>{
    if(localStorage.getItem('token')){
      saveLoginData();
    } 
  },[])
  const routes = createBrowserRouter(
    [
      {
        path:"",
        element:<AuthLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<Login saveLoginData={saveLoginData}/>},
          {path:"login",element:<Login saveLoginData={saveLoginData}/>},
          {path:"register",element:<Register/>},
          {path:"forget-password",element:<ForgetPass/>},
          {path:"reset-password",element:<ResetPass/>},
          {path:"verify-account",element:<VerifyAccount/>},
        ]
      },
      {
        path:"/dashboard",
        element:<ProtectedRoute loginData={loginData}><MasterLayout loginData={loginData}/></ProtectedRoute>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<Dashboard loginData={loginData} />},
          {path:"recipes",element:<RecipesList/>},
          {path:"recipes-data",element:<RecipesData/>},
          {path:"categories",element:<CategoriesList/>},
          {path:"category",element:<CategoriesData/>},
          {path:"users",element:<UsersList/>},
        ]
      }
    ]
  )
  return (
    <>
  <RouterProvider router={routes}></RouterProvider>
  <ToastContainer
position="top-center"
autoClose={5000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick={false}
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="light"
transition={Bounce}
/>
    </>
  )
}

export default App