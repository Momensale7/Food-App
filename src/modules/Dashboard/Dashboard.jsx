/* eslint-disable react/prop-types */
import React from 'react'
import Header from '../Shared/Header/Header'
import veganImg from '../../assets/images/vegan.png'
import RecipeHeader from '../Shared/RecipeHeader/RecipeHeader'

export default function Dashboard({ loginData }) {
  return (
    <>
      <Header title="Welcome" subTitle={loginData?.userName} description="This is a welcoming screen for the entry of the application , you can now see the options" image={veganImg} />
      <RecipeHeader title={"Fill the "}
        description={"you can now fill the meals easily using the table and form ,"}
        SubDescription={"click here and sill it with the table !"} 
        btnContent={"Fill Recipes"}
        routeTo={"/dashboard/recipes-data"} />
    </>
  )
}
