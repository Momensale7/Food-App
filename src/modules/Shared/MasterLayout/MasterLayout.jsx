/* eslint-disable react/prop-types */
import React from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../Navbar/Navbar'
import Header from '../Header/Header'
import SideBar from '../Sidebar/Sidebar'

export default function MasterLayout({loginData}) {
  
  return (
    <>
    <div className="d-flex">
      <div className=''>
      <SideBar/>
      </div>
    <div className='w-100 bg-danger'>
      <Navbar loginData={loginData}/>
      <Header/>
      <Outlet/>
    </div>
    <div><div>
      <div>
        
      </div>
    </div>

    </div>
    </div>
    </>
  )
}
