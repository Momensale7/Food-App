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
import { privateAxiosInstance, puplicAxiosInstance } from '../../services/api/apiInstance';
import { CATEGORIES_URLS, FAVOURITES_URLS, imgURL, RECIPES_URLS, TAGS_URLS } from '../../services/api/apiConfig';
import { Link } from 'react-router-dom';
import ItemDetails from "../../Shared/itemDetails/ItemDetails";
import { getLoginData } from '../../services/utility/utilities';

export default function RecipesList() {
  const [recipes, setRecipes] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToDeleteName, setItemToDeleteName] = useState(null);
  const [isLoading, setIsLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [name, setName] = useState("")
  const [tagId, setTagId] = useState(null)
  const [categoryId, setCategoryId] = useState(null)
  const [categories, setCategories] = useState([])
  const [showITemDetails, setShowItemDetails] = useState(false)
  const [itemToView, setItemToView] = useState(null)
  const loginData = getLoginData();
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [itemToaddFavourite, setItemToAddFavourite] = useState(null);
  const [view, setView] = useState('table');

  const handleAddToFavouriteClick = (id) => {
    setShowConfirmModal(true);
    setItemToAddFavourite(id);
  };

  const handleConfirmAddToFavourite = (id) => {
    setShowConfirmModal(false);
    addToFavourite();
  };

  const handleCancelAddToFavourite = () => {
    setShowConfirmModal(false);
  };
  const addToFavourite = async () => {
    try {
      // Fetch the current favourites list
      const favouritesResponse = await privateAxiosInstance.get(FAVOURITES_URLS.GET_FAVOURITES, {
        params: {
          pageNumber: 1,
          pageSize: 30
        }
      });

      const favourites = favouritesResponse?.data?.data || [];
      const isAlreadyFavourite = favourites.some(fav => fav.recipe.id === itemToaddFavourite);

      if (isAlreadyFavourite) {
        toast.info('Recipe is already in favourites');
        return;
      }

      // Add to favourites if not already present
      const response = await privateAxiosInstance.post(FAVOURITES_URLS.ADD_FAVOURITE, { recipeId: itemToaddFavourite });
      console.log(response);
      toast.success(response?.data?.message || 'Recipe added to favourites successfully');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add recipe to favourites');
    }
  };



  const getTags = async () => {
    try {
      let response = await puplicAxiosInstance.get(TAGS_URLS.GET_TAGS)
      setTags(response?.data)

    } catch (error) {
      console.error('Error fetching categories:', error);

    }

  }
  const getCategories = async () => {
    try {
      let response = await privateAxiosInstance.get(CATEGORIES_URLS.GET_CATEGORIES, {
        params: { pageSize: 10 }
      })
      // console.log(response);
      setCategories(response?.data?.data);
    } catch (error) {
      console.error('Error fetching categories:', error);

    }

  }
  const getRecipes = async () => {
    setIsLoading(true);
    try {
      let response = await privateAxiosInstance.get(RECIPES_URLS.GET_RECIPES, {
        params: {
          name,
          categoryId,
          tagId,
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
  const handleTagValue = (e) => {
    setTagId(e.target.value)
    // console.log(e.target.value);
    setPageNumber(1)
  }
  const handleCategoryValue = (e) => {
    // console.log(e.target.value);
    setCategoryId(e.target.value)
    setPageNumber(1)
  }
  const handleNameValue = (e) => {
    setName(e.target.value)
    setPageNumber(1)
  }

  useEffect(() => {
    getCategories()
    getTags()
    getRecipes();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, tagId, categoryId, pageNumber]);

  const handlePageChange = (newPageNumber) => {
    if (newPageNumber > 0 && newPageNumber <= totalPages) {
      setPageNumber(newPageNumber);
    }
  };
  const handleDeleteClick = (itemId, itemToDeleteName) => {
    setItemToDeleteName(itemToDeleteName);
    setItemToDelete(itemId);
    setShowModal(true);
  };
  const handleConfirmDelete = async () => {
    // console.log('Deleting item with ID:', itemToDelete);
    try {
      let response = await privateAxiosInstance.delete(RECIPES_URLS.DELETE_RECIPE(itemToDelete),);
      toast.success('item deleted successfully',);
      getRecipes();
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`,);
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
      <SubHeader title={"Recipe Table Details"} description={"You can check all details"} btnContent={"Add New item"} routeTo={"/dashboard/recipes-data/new-recipe"} />
      <div className="categories container ">
        <div className="row gy-2">
          <div className="col-md-6">
            <div className="input-group">
              <span className="input-group-text greenMain"><i className="fa fa-utensils"></i></span>
              <input type="search" className='form-control' placeholder='Enter recipe name' onInput={handleNameValue} />
            </div>
          </div>
          <div className="col-md-3 select-categories">
            <div className="input-group">
              <span className="input-group-text greenMain"><i className="fa fa-list"></i></span>
              <select className='form-select' onChange={handleCategoryValue}>
                <option value="">Category</option>
                {categories?.map(({ id, name }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="col-md-3 select-tag">
            <div className="input-group">
              <span className="input-group-text greenMain"><i className="fa fa-tags"></i></span>
              <select className='form-select' onChange={handleTagValue}>
                <option value="">Tags</option>
                {tags?.map(({ id, name }) => (
                  <option key={id} value={id}>{name}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
        <div className=" d-flex justify-content-end  mt-3">
          <button className="btn me-2 border" onClick={() => setView('card')}>
            <i className={`fa-solid fa-grip-vertical ${view === 'card' ? 'greenMain' : 'text-dark-main'}`} ></i>
          </button>
          <button className="btn mx-0 border" onClick={() => setView('table')}>
            <i className={`fas fa-table ${view === 'table' ? 'greenMain' : 'text-dark-main'}`}></i>
          </button>
        </div>
        {view === 'table' ? (
          <div className="table-responsive pt-5">
            {/* Existing table code */}
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
                {isLoading ? <tr><td colSpan={7}><Loading /></td></tr> :
                  recipes.length > 0 ? recipes.map((recipe, index) => (
                    <tr key={index}>
                      <td>{recipe?.name}</td>
                      <td><img src={recipe?.imagePath ? imgURL + recipe?.imagePath : staticRecipe}
                        alt={recipe?.name} className='recipeImg' /></td>
                      <td>{`${recipe?.price} $ `}</td>
                      <td>{recipe?.description}</td>
                      <td>{recipe?.category?.map(category => category?.name).join(', ')}</td>
                      <td>{recipe?.tag?.name}</td>
                      <td>
                        <div className="dropdown">
                          <i className="fa fa-ellipsis-h" data-bs-toggle="dropdown" aria-expanded="false"></i>
                          <ul className="dropdown-menu actionDropdown">
                            <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none" onClick={() => { setItemToView(recipe), setShowItemDetails(true) }}><i className="fa fa-eye greenMain mx-2"></i>View</a></li>
                            {loginData?.userGroup === "SystemUser" && <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none text" onClick={() => { handleAddToFavouriteClick(recipe?.id) }}><i className="fa fa-heart greenMain mx-2"></i>Add to <span className='d-block mt-0 text-center'>favourites</span></a></li>}
                            {loginData?.userGroup !== "SystemUser" && <>
                              <li><Link to={`/dashboard/recipes-data/${recipe?.id}`} className="dropdown-item fs-12 text-dark-main text-decoration-none"><i className="fa fa-edit greenMain mx-2"></i>Edit</Link></li>
                              <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none" onClick={() => handleDeleteClick(recipe?.id, recipe?.name)}><i className="fa fa-trash greenMain mx-2"></i>Delete</a></li>
                            </>}
                          </ul>
                        </div>
                      </td>
                    </tr>
                  )) : <tr><td colSpan={7}><NoData /></td></tr>}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 mb-2 g-4 pt-5">
            {isLoading ? (
              <div className="w-50 mx-auto" >
                <Loading />
              </div>) : recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                  <div key={index} className="col">
                    <div className="card border-0 h-100 shadow-lg overflow-hidden position-relative">
                      <div className="position-relative">
                        <img
                          src={recipe?.imagePath ? imgURL + recipe?.imagePath : staticRecipe}
                          alt={recipe?.name}
                          className="card-img-top object-fit-cover imgCardTop"
                        />
                      </div>
                      <div className="card-body p-4 position-relative">
                        <div className="d-flex justify-content-between align-items-start mb-3">
                          <div>
                            <h5 className="card-title mb-1 fw-bold">{recipe?.name}</h5>
                            <small className="text-muted">
                              <i className="fas fa-tag me-2 greenMain"></i>
                              {recipe?.tag?.name}
                            </small>
                          </div>
                          <div className="d-flex gap-2 recipe-actions">
                            {/* View Details Icon */}
                            <div className="position-relative recipe-action-icon">
                              <i
                                className="fa fa-eye greenMain cursor-pointer"
                                onClick={() => { setItemToView(recipe), setShowItemDetails(true) }}
                              />
                              <span className="recipe-action-tooltip">View Details</span>
                            </div>

                            {loginData?.userGroup === "SystemUser" && (
                              <div className="position-relative recipe-action-icon">
                                <i
                                  className="fa fa-heart greenMain cursor-pointer"
                                  onClick={() => { handleAddToFavouriteClick(recipe?.id) }}
                                />
                                <span className="recipe-action-tooltip">Add to Favourites</span>
                              </div>
                            )}

                            {loginData?.userGroup !== "SystemUser" && (
                              <>
                                <div className="position-relative recipe-action-icon">
                                  <Link to={`/dashboard/recipes-data/${recipe?.id}`}>
                                    <i className="fa fa-edit greenMain cursor-pointer" />
                                  </Link>
                                  <span className="recipe-action-tooltip">Edit Recipe</span>
                                </div>

                                <div className="position-relative recipe-action-icon">
                                  <i
                                    className="fa fa-trash greenMain cursor-pointer"
                                    onClick={() => handleDeleteClick(recipe?.id, recipe?.name)}
                                  />
                                  <span className="recipe-action-tooltip">Delete Recipe</span>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="position-relative description-container mb-4">
                          <p
                            className="card-text text-muted description-preview"
                            title={recipe?.description}
                          >
                            {recipe?.description?.split(' ').slice(0, 5).join(' ')}
                            {recipe?.description?.split(' ').length > 5 ? '...' : ''}
                          </p>

                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge bg-light text-dark shadow-sm">
                            {recipe?.category?.map(category => category?.name).join(', ')}
                          </span>
                          <span className="badge bg-success">{`$ ${recipe?.price}`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
              <div className="col-12 text-center"><NoData /></div>
            )}
          </div>
        )}
        {showConfirmModal && (
          <div className="modal show d-block" tabIndex="-1" role="dialog">
            <div className="modal-dialog modal-dialog-centered" role="document">
              <div className="modal-content border-0 shadow-lg rounded-lg overflow-hidden">
                <div className="modal-header bg-gradient-primary border-0 py-3">
                  <h5 className="modal-title text-white fw-bold">Confirm Add to Favourite</h5>
                  <div className="closeBtn ms-auto d-flex justify-content-center align-items-center">
                    <div className="rounded-circle favCls bg-white p-1 d-flex justify-content-center align-items-center bg-transparent">
                      <i className="fa fa-close text-danger" onClick={() => setShowConfirmModal(false)}></i>
                    </div>
                  </div>
                </div>

                <div className="modal-body text-center py-4">
                  <div className="mb-3">
                    <i className="fa fa-heart text-danger fa-3x mb-3 pulse-animation"></i>
                  </div>
                  <p className="mb-0 fw-medium">Are you sure you want to add this recipe to your favourites?</p>
                </div>

                <div className="modal-footer border-0 justify-content-center gap-2 pb-4">
                  <button type="button" className="btn btn-outline-secondary px-4 rounded-pill" onClick={handleCancelAddToFavourite}>
                    Cancel
                  </button>
                  <button type="button" className="btn border border-1 border-danger px-4 rounded-pill shadow-sm" onClick={handleConfirmAddToFavourite}>
                    <i className="fa fa-heart me-2"></i>Add to Favourites
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Pagination */}
        <Pagination pageNumber={pageNumber} handlePageChange={handlePageChange} totalPages={totalPages} />

        <DeleteConfirmation
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
          message={`Delete This recipe ${itemToDeleteName} ?`}
        />
        <ItemDetails recipe={itemToView} show={showITemDetails} onClose={() => setShowItemDetails(false)} />
      </div>
    </>
  )
}

