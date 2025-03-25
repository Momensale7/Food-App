import React, { useEffect, useState } from 'react';
import { privateAxiosInstance, puplicAxiosInstance } from '../services/api/apiInstance';
import { CATEGORIES_URLS, FAVOURITES_URLS, imgURL, TAGS_URLS } from '../services/api/apiConfig';
import { toast } from 'react-toastify';
import Loading from '../Shared/Loading/Loading';
import NoData from '../Shared/NoData/NoData';
import staticRecipe from '../../assets/images/recipe.jpg';
import Header from '../Shared/Header/Header';
import headerImage from '../../assets/images/headerImg.png';
import DeleteConfirmation from '../Shared/DeleteConfirmation/DeleteConfirmation';
import Pagination from '../Shared/Pagination/Pagination';

export default function Favourites() {
  const [favouriteList, setFavouriteList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToDeleteName, setItemToDeleteName] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(8);
  const [tags, setTags] = useState([]);
  const [name, setName] = useState("");
  const [tagId, setTagId] = useState(null);
  const [categoryId, setCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [view, setView] = useState('card');

  const getTags = async () => {
    try {
      let response = await puplicAxiosInstance.get(TAGS_URLS.GET_TAGS);
      setTags(response?.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getCategories = async () => {
    try {
      let response = await privateAxiosInstance.get(CATEGORIES_URLS.GET_CATEGORIES, {
        params: { pageSize: 10 }
      });
      setCategories(response?.data?.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const getFavourites = async () => {
    try {
      setLoading(true);
      const response = await privateAxiosInstance.get(FAVOURITES_URLS.GET_FAVOURITES, {
        params: {
          name,
          categoryId,
          tagId,
          pageNumber,
          pageSize
        }
      });
      console.log(response);
      setFavouriteList(response?.data?.data || []);
      setTotalPages(response?.data?.totalNumberOfPages);
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to get favourites');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteClick = (itemId, itemToDeleteName) => {
    setItemToDeleteName(itemToDeleteName);
    setItemToDelete(itemId);
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await privateAxiosInstance.delete(FAVOURITES_URLS.DELETE_FAVOURITE(itemToDelete));
      toast.success(response?.data?.message || 'Favourite deleted successfully');
      setShowModal(false);
      getFavourites();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to delete favourite');
    }
  };

  const handlePageChange = (newPageNumber) => {
    if (newPageNumber > 0 && newPageNumber <= totalPages) {
      setPageNumber(newPageNumber);
    }
  };

  const handleTagValue = (e) => {
    setTagId(e.target.value);
    setPageNumber(1);
  };

  const handleCategoryValue = (e) => {
    setCategoryId(e.target.value);
    setPageNumber(1);
  };

  const handleNameValue = (e) => {
    setName(e.target.value);
    setPageNumber(1);
  };

  useEffect(() => {
    getCategories();
    getTags();
    getFavourites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, tagId, categoryId, pageNumber]);

  useEffect(() => {
    getFavourites();
  }, []);

  return (
    <>
      <Header
        title="Recipes"
        subTitle="items!"
        description="You can now add your items that any user can order it from the Application and you can edit"
        image={headerImage}
      />
      <div className="categories container ">

        <div className="row  my-3">
          <div className="col-md-6">
            <input type="search" className='form-control' placeholder='Enter recipe name' onInput={handleNameValue} />
          </div>
          <div className="col-md-3 select-categories">
            <select className='form-select' onChange={handleCategoryValue}>
              <option value="">Category</option>
              {categories?.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </div>
          <div className="col-md-3 select-tag">
            <select className='form-select' onChange={handleTagValue}>
              <option value="">Tags</option>
              {tags?.map(({ id, name }) => (
                <option key={id} value={id}>{name}</option>
              ))}
            </select>
          </div>
        </div>
        <div className=" pe-5 container d-flex justify-content-end mb-3">
          <button className="btn me-2 border" onClick={() => setView('card')}>
            <i className={`fa-solid fa-grip-vertical ${view === 'card' ? 'greenMain' : 'text-dark-main'}`} ></i>
          </button>
          <button className="btn mx-0 border" onClick={() => setView('table')}>
            <i className={`fas fa-table ${view === 'table' ? 'greenMain' : 'text-dark-main'}`}></i>
          </button>
        </div>
        {loading ? <Loading /> :
          favouriteList.length === 0 ? <NoData /> :
            view === 'card' ? (
              <div className="row py-3 gx-5 gy-3 container px-5">
                {favouriteList.map(fav => (
                  <div key={fav.id} className="col-md-4">
                    <div className="card border-0 h-100 shadow-lg overflow-hidden position-relative">
                      <div className="position-relative">
                        <img
                          src={fav?.recipe?.imagePath ? imgURL + fav?.recipe?.imagePath : staticRecipe}
                          alt={fav?.recipe?.name}
                          className="card-img-top object-fit-cover imgCardTop"
                        />
                      </div>
                      <div className="card-body p-4 position-relative">

                        <div className="d-flex justify-content-between align-items-start mb-3">

                          <div>
                            <h5 className="card-title mb-1 fw-bold">{fav?.recipe?.name}</h5>
                            <small className="text-muted">
                              <i className="fas fa-tag me-2 greenMain"></i>
                              {fav?.recipe?.tag?.name}
                            </small>
                          </div>
                          <div className="position-relative recipe-action-icon">
                            <i className="fa fa-heart love-icon greenMain" onClick={() => handleDeleteClick(fav?.id, fav?.recipe?.name)}></i>
                            <span className="recipe-action-tooltip">Remove From Favourites</span>
                          </div>
                        </div>
                        <div className="position-relative description-container mb-4">
                          <p
                            className="card-text text-muted description-preview"
                            title={fav?.recipe?.description}
                          >
                            {fav?.recipe?.description?.split(' ').slice(0, 5).join(' ')}
                            {fav?.recipe?.description?.split(' ').length > 5 ? '...' : ''}
                          </p>

                        </div>
                        <div className="d-flex justify-content-between align-items-center">
                          <span className="badge bg-light text-dark shadow-sm">
                            {fav?.recipe?.category?.map(category => category?.name).join(', ')}
                          </span>
                          <span className="badge bg-success">{`$ ${fav?.recipe?.price}`}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (

              <div className=" table-responsive ">
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
                    {favouriteList.map((fav, index) => (
                      <tr key={fav.id}>
                        <td>{fav?.recipe?.name}</td>
                        <td><img src={fav?.recipe?.imagePath ? imgURL + fav?.recipe?.imagePath : staticRecipe}
                          alt={fav?.recipe?.name} className='recipeImg' /></td>
                        <td>{`${fav?.recipe?.price} $ `}</td>
                        <td>{fav?.recipe?.description}</td>
                        <td>{fav?.recipe?.category?.map(category => category?.name).join(', ')}</td>
                        <td>{fav?.recipe?.tag?.name}</td>
                        <td>
                          <i className="fa fa-heart love-icon greenMain" onClick={() => handleDeleteClick(fav?.id, fav?.recipe?.name)}></i></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

            )
        }
      </div>

      <Pagination pageNumber={pageNumber} handlePageChange={handlePageChange} totalPages={totalPages} />
      <DeleteConfirmation
        show={showModal}
        onClose={() => setShowModal(false)}
        onConfirm={handleConfirmDelete}
        message={`Delete This recipe ${itemToDeleteName} ?`}
      />
    </>
  );
}