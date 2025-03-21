/* eslint-disable react/prop-types */
import React, { useState } from 'react'
import Header from '../Shared/Header/Header'
import veganImg from '../../assets/images/vegan.png'
import RecipeHeader from '../Shared/RecipeHeader/RecipeHeader'
import { getLoginData } from '../services/utility/utilities'

import Overview from '../Overview/Overview'

export default function Dashboard() {
 const loginData = getLoginData()
  return (
    <>
      <Header title="Welcome" subTitle={loginData?.userName} description="This is a welcoming screen for the entry of the application , you can now see the options" image={veganImg} />
      <RecipeHeader title={"Fill the "}
        description={"you can now fill the meals easily using the table and form ,"}
        SubDescription={"click here and sill it with the table !"} 
        btnContent={"Fill Recipes"}
        routeTo={"/dashboard/recipes-data/new-recipe"}
         />
         <Overview/>
        
    </>
  )
}
