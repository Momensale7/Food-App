import React from 'react'
import Header from '../../Shared/Header/Header'
import headerImage from '../../../assets/images/headerImg.png'
import SubHeader from '../../Shared/SubHeader/SubHeader'
import RecipeHeader from '../../Shared/RecipeHeader/RecipeHeader'

export default function RecipesData() {
  return (
    <>
      <RecipeHeader 
      title={"Fill the "} 
      description={"you can now fill the meals easily using the table and form ,"} 
      SubDescription={"click here and sill it with the table !"} 
      btnContent={"All Recipes"}
       routeTo={"/dashboard/recipes"} />


    </>
  )
}
