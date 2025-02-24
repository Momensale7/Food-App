/* eslint-disable react/prop-types */
import React from 'react'
import { Navigate } from 'react-router-dom'

export default function ProtectedRoute({loginData,children}) {
    if (localStorage.getItem('token')) return children
  else return <Navigate to='/login'/> 
}
