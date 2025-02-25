import React, { useEffect, useState } from 'react';
import headerImage from '../../../assets/images/headerImg.png';
import Header from '../../Shared/Header/Header';
import axios from 'axios';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation';

export default function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const getRecipes = async () => {
    try {
      let response = await axios.get('https://upskilling-egypt.com:3006/api/v1/recipe', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        },
        params: {
          pageNumber,
          pageSize
        }
      });
      console.log(response.data.data);
      setRecipes(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
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
  const handleDeleteClick = (itemId) => {
    setItemToDelete(itemId);
    setShowModal(true);
};
  const handleConfirmDelete = async() => {
    console.log('Deleting item with ID:', itemToDelete);
    try {
      let response = await axios.delete(`https://upskilling-egypt.com:3006/api/v1/recipe/${itemToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      getRecipes();
    } catch (error) {
      console.error('Error deleting recipe:', error);
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
      <div className="categories container mt-2 ">
        <table className="table rounded-3 ">
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
            {recipes.map((recipe, index) => (
              <tr key={index}>
                <td>{recipe?.name}</td>
                <td><img src={'https://upskilling-egypt.com:3006/'+recipe?.imagePath} alt={recipe?.name} className='recipeImg' /></td>
                <td>{recipe?.price}</td>
                <td>{recipe?.description}</td>
                <td>{recipe?.category?.map((category)=>(category.name))}</td>
                <td>{recipe?.tag?.name}</td>
                <td>
                  <div className="dropdown">
                    <i className="fa fa-ellipsis-h"data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul className="dropdown-menu actionDropdown">
                      <li><a className="dropdown- fs-12 text-dark-main text-decoration-none" ><i className="fa fa-eye greenMain mx-2"></i>view</a></li>
                      <li><a className="dropdown- fs-12 text-dark-main text-decoration-none" ><i className="fa fa-edit greenMain mx-2"></i>edit</a></li>
                      <li><a className="dropdown- fs-12 text-dark-main text-decoration-none" onClick={()=>handleDeleteClick(recipe.id)} ><i className="fa fa-trash greenMain mx-2"></i>delete</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pagination */}
        <nav aria-label="Page navigation example">
          <ul className="pagination justify-content-center">
            <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber - 1)}
              >
                Previous
              </button>
            </li>
            {Array.from({ length: totalPages }, (_, i) => (
              <li key={i} className={`page-item ${pageNumber === i + 1 ? 'active' : ''}`}>
                <button
                  className="page-link"
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              </li>
            ))}
            <li className={`page-item ${pageNumber === totalPages ? 'disabled' : ''}`}>
              <button
                className="page-link"
                onClick={() => handlePageChange(pageNumber + 1)}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
        <DeleteConfirmation
                show={showModal}
                onClose={() => setShowModal(false)}
                onConfirm={handleConfirmDelete}
                message="Delete This recipe ?"
            />
      </div>
    </>
  )
}

