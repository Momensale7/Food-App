import React, { useState } from 'react'
import { Menu, MenuItem, Sidebar, SubMenu } from 'react-pro-sidebar'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import sideBarLogo from '../../../assets/images/sideLogo.png'
import ChangePass from '../../Authentication/Change-pass/Change-pass'

export default function SideBar() {
  const [collapsed, setCollapsed] = useState(false)
  const [showchangePass, setShowChangePass] = useState(false)

  // const activeItem = showchangePass ? "changePass" : null

  let navigate = useNavigate()
  const toggleCollapse = () => {
    setCollapsed(!collapsed)
  }
  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }
  const onClose = () => setShowChangePass(false)
  const menuItems = [
    { to: "/dashboard", icon: "fa-home", label: "Home" },
    { to: "users", icon: "fa-users", label: "Users" },
    { to: "recipes", icon: "fa-utensils", label: "Recipes" },
    { to: "categories", icon: "fa-list", label: "Categories" },
  ]
  return (
    <>
      <div className="sidebarContainer ">
        <Sidebar collapsed={collapsed} >
          <Menu>
            <MenuItem className='logoLi' onClick={toggleCollapse} icon={<img className={`${collapsed ? 'logocollapsed' : "ms-5"} sidebarlogo`} src={sideBarLogo}></img>}></MenuItem>
            {menuItems.map((item, index) => (
              <MenuItem key={index} className='mb-3' icon={<i className={`fa ${item.icon} text-white`}></i>} component={showchangePass?<Link to={item.to} end className='text-white' />:<NavLink to={item.to} end className='text-white' />}>
                {item.label}
              </MenuItem>
            ))}
            <MenuItem onClick={() => {
              setShowChangePass(true)
            }}
              icon={<i className='fa  fa-lock text-white'></i>}
              className={`text-white ${showchangePass ? "active" : ""}`}
            >Change Password</MenuItem>
            <MenuItem onClick={logout} icon={<i className='fa  fa-sign-out-alt text-white'></i>} className='text-white'> Log Out</MenuItem>
          </Menu>
        </Sidebar>
        <ChangePass onClose={() => setShowChangePass(false)} show={showchangePass} />
      </div>
    </>
  )
}
