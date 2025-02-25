/* eslint-disable react/prop-types */
import React from 'react'
import Header from '../Shared/Header/Header'
import veganImg from '../../assets/images/vegan.png'

export default function Dashboard({loginData}) {
  return (
    <>
      <Header title="Welcome" subTitle={loginData?.userName} description="This is a welcoming screen for the entry of the application , you can now see the options" image={veganImg} />  
    </>
  )
}
