/* eslint-disable react/prop-types */
import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { getLoginData } from '../../services/utility/utilities'

export default function ProtectedRoute({children}) {
  const { pathname } =  useLocation()
  const loginData = getLoginData()
  if (!localStorage.getItem('token')) return <Navigate to='/login'/>

  if (loginData?.userGroup === 'SystemUser' && 
      (pathname === '/dashboard/categories' || pathname === '/dashboard/users')) {
    return <Navigate to='/dashboard'/>
  }
  
  if (loginData?.userGroup !== 'SystemUser' && pathname === '/dashboard/favs') {
    return <Navigate to='/dashboard'/>
  }
  
  return children;
  
}
