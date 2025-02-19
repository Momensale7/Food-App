import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import AuthLayout from './modules/Shared/AuthLayout/AuthLayout'
import Login from './modules/Authentication/Login/Login'
import Register from './modules/Authentication/Register/Register'
import ResetPass from './modules/Authentication/Reset-pass/ResetPass'
import ForgetPass from './modules/Authentication/Forget-pass/ForgetPass'
import VerifyAccount from './modules/Authentication/Verify-account/verifyAccount'
import NotFound from './modules/Shared/NotFound/NotFound'
import MasterLayout from './modules/Shared/MasterLayout/MasterLayout'
import Dashboard from './modules/Dashboard/Dashboard'
import RecipesList from './modules/Recipes/RecipesList/RecipesList'
import RecipesData from './modules/Recipes/RecipesData/RecipesData'
import CategoriesList from './modules/Categories/CategoriesList/CategoriesList'
import CategoriesData from './modules/Categories/CategoriesData/CategoriesData'
import UsersList from './modules/Users/UsersList/UsersList'
import { Bounce, ToastContainer } from 'react-toastify'

function App() {
  const routes = createBrowserRouter(
    [
      {
        path:"",
        element:<AuthLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<Login/>},
          {path:"login",element:<Login/>},
          {path:"register",element:<Register/>},
          {path:"forget-password",element:<ForgetPass/>},
          {path:"reset-password",element:<ResetPass/>},
          {path:"verify-account",element:<VerifyAccount/>},
        ]
      },
      {
        path:"/dashboard",
        element:<MasterLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<Dashboard/>},
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
