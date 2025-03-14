import React, { useEffect, useState } from 'react';
import headerImage from '../../../assets/images/headerImg.png';
import Header from '../../Shared/Header/Header';
import axios from 'axios';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation';
import SubHeader from '../../Shared/SubHeader/SubHeader';
import NoData from '../../Shared/NoData/NoData';
import Loading from '../../Shared/Loading/Loading';
import staticRecipe from '../../../assets/images/recipe.jpg';
import { Bounce, toast } from 'react-toastify';
import Pagination from '../../Shared/Pagination/Pagination';
import { privateAxiosInstance } from '../../services/api/apiInstance';
import { imgURL, RECIPES_URLS } from '../../services/api/apiConfig';

export default function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToDeleteName, setItemToDeleteName] = useState(null);
  const [isLoading,setIsLoading]= useState()
  const getRecipes = async () => {
    setIsLoading(true);
    try {
      let response = await privateAxiosInstance.get(RECIPES_URLS.GET_RECIPES, {
        params: {
          pageNumber,
          pageSize
        }
      });
      // console.log(response.data.data);
      setRecipes(response?.data?.data);
      setTotalPages(response?.data?.totalNumberOfPages);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    setIsLoading(false);  
  };

  useEffect(() => {
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageNumber]);

  const handlePageChange = (newPageNumber) => {
    if (newPageNumber > 0 && newPageNumber <= totalPages) {
      setPageNumber(newPageNumber);
    }
  };
  const handleDeleteClick = (itemId,itemToDeleteName) => {
    setItemToDeleteName(itemToDeleteName);
    setItemToDelete(itemId);
    setShowModal(true);
};
  const handleConfirmDelete = async() => {
    console.log('Deleting item with ID:', itemToDelete);
    try {
      let response = await privateAxiosInstance.delete(RECIPES_URLS.DELETE_RECIPE(itemToDelete),);
       toast.success('item deleted successfully', {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: false,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                    transition: Bounce,
                  });
      getRecipes();
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
      // console.error('Error deleting recipe:', error);
    }
    setShowModal(false);
};
  return (
    <>
      <Header
        title="Recipes"
        subTitle="items!"
        description="You can now add your items that any user can order it from the Application and you can edit"
        image={headerImage}
      />
            <SubHeader title={"Recipe Table Details"} description ={"You can check all details"} btnContent={"Add New item"} routeTo={"/dashboard/recipes-data"}/>
      
      <div className="categories container ">
      <div className="table-responsive pt-5">
  <table className="table min-w-1000">
    <thead>
      <tr>
        <th scope="col">Name</th>
        <th scope="col">Image</th>
        <th scope="col">Price</th>
        <th scope="col">Description</th>
        <th scope="col">Category</th>
        <th scope="col">Tag</th>
        <th scope="col"></th>
      </tr>
    </thead>
    <tbody>
      {isLoading?<tr><td colSpan={7}><Loading /></td></tr>:
      recipes.length > 0 ? recipes.map((recipe, index) => (
        <tr key={index}>
          <td>{recipe?.name}</td>
          <td><img src={recipe?.imagePath ? imgURL+recipe?.imagePath : staticRecipe} 
          alt={recipe?.name} className='recipeImg' /></td>
          <td>{`${recipe?.price} $ `}</td>
          <td>{recipe?.description}</td>
          <td>{recipe?.category?.map(category => category?.name).join(', ')}</td>
          <td>{recipe?.tag?.name}</td>
          <td>
            <div className="dropdown">
              <i className="fa fa-ellipsis-h" data-bs-toggle="dropdown" aria-expanded="false"></i>
              <ul className="dropdown-menu actionDropdown">
                <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none"><i className="fa fa-eye greenMain mx-2"></i>View</a></li>
                <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none"><i className="fa fa-edit greenMain mx-2"></i>Edit</a></li>
                <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none" onClick={() => handleDeleteClick(recipe?.id,recipe?.name)}><i className="fa fa-trash greenMain mx-2"></i>Delete</a></li>
              </ul>
            </div>
          </td>
        </tr>
      )) : <tr><td colSpan={7}><NoData /></td></tr>}
    </tbody>
  </table>
</div>

        {/* Pagination */}
               <Pagination pageNumber={pageNumber} handlePageChange={handlePageChange} totalPages={totalPages}/>
       
        <DeleteConfirmation
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                message={`Delete This recipe ${itemToDeleteName} ?`}
            />
      </div>
    </>
  )
}

