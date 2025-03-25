import React, { useEffect, useState } from 'react';
import { FAVOURITES_URLS, imgURL } from '../../services/api/apiConfig';
import staticImg from '../../../assets/images/staticUser.jpg';
import staticRecipe from '../../../assets/images/recipe.jpg';
import { privateAxiosInstance } from '../../services/api/apiInstance';
import { toast } from 'react-toastify';
import { getLoginData } from '../../services/utility/utilities';

export default function ItemDetails({ onClose, show, recipe, category, user }) {
  const loginData = getLoginData();
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const addToFavourite = async (recipeId) => {
    try {
      const favouritesResponse = await privateAxiosInstance.get(FAVOURITES_URLS.GET_FAVOURITES, {
        params: {
          pageNumber: 1,
          pageSize: 30
        }
      });
  
      const favourites = favouritesResponse?.data?.data || [];
      const isAlreadyFavourite = favourites.some(fav => fav.recipe.id === recipeId);
  
      if (isAlreadyFavourite) {
        toast.info('Recipe is already in favourites');
        return;
      }
  
      const response = await privateAxiosInstance.post(FAVOURITES_URLS.ADD_FAVOURITE, { recipeId });
      console.log(response);
      toast.success(response?.data?.message || 'Recipe added to favourites successfully');
      onClose();
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to add recipe to favourites');
    }
  };

  const handleAddToFavouriteClick = () => {
    setShowConfirmModal(true);
  };

  const handleConfirmAddToFavourite = () => {
    setShowConfirmModal(false);
    addToFavourite(recipe?.id);
  };

  const handleCancelAddToFavourite = () => {
    setShowConfirmModal(false);
  };

  useEffect(() => {
    console.log(recipe, category, user);
  }, [recipe, category, user]);

  if (!show) return null;

  return (
    <>
      <div className="modal show d-block" tabIndex="-1" role="dialog">
        <div className="modal-dialog mt-5 pt-5" role="document">
          <div className="modal-content">
            <div className="modal-header border-0 pb-1">
              <h5 className="fw-bold text-dark-main"><i className="fa fa-folder-open me-2"></i> {recipe ? 'Recipe Details' : category ? "Category Details" : "User Details"}</h5>

              <div className="closeBtn ms-auto d-flex justify-content-center align-items-center">
                <i className="fa fa-close text-danger" onClick={onClose}></i>
              </div>
            </div>

            <div className="modal-body pt-0 modalText">
  {recipe && (
    <div className="recipeDetails text-dark-main p-3 rounded-md shadow-sm bg-white">
      <div className="text-center mb-3">
        <img
          src={recipe?.imagePath ? imgURL + recipe?.imagePath : staticRecipe}
          alt={recipe?.name}
          className="modalImg rounded shadow"
        />
      </div>
      <h5 className="text-center fw-bold"><i className="fa fa-utensils me-2"></i>{recipe?.name}</h5>
<p><i className="fa fa-dollar-sign me-2"></i><span className='fw-bold'>Price:</span> {`${recipe?.price} $`}</p>
<p><i className="fa fa-info-circle me-2"></i><span className='fw-bold'>Description:</span> {recipe?.description}</p>
<p><i className="fa fa-list me-2"></i><span className='fw-bold'>Categories:</span> {recipe?.category?.map(cat => cat?.name).join(', ')}</p>
<p><i className="fa fa-tag me-2"></i><span className='fw-bold'>Tag:</span> {recipe?.tag?.name}</p>
    </div>
  )}

  {category && (
    <div className="categoryDetails p-3 rounded-md shadow-sm bg-white mt-3">
<p><i className="fa fa-id-badge me-2"></i><span className='fw-bold'>ID:</span> {category?.id}</p>
<p><i className="fa fa-tag me-2"></i><span className='fw-bold'>Name:</span> {category?.name}</p>
<p><i className="fa fa-calendar-alt me-2"></i><span className='fw-bold'>Creation Date:</span>  
  {new Date(category?.creationDate).toLocaleString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })}
</p>
    </div>
  )}

  {user && (
    <div className="userDetails p-3 rounded-md shadow-sm bg-white mt-3">
      <div className="text-center mb-3">
        <img
          src={user?.imagePath ? imgURL + user?.imagePath : staticImg}
          alt={user?.userName}
          className="w-25 rounded-circle shadow-sm"
        />
      </div>
      <h5 className="text-center fw-bold"><i className="fa fa-user me-2"></i>{user?.userName}</h5>
<p><i className="fa fa-id-badge me-2"></i><span className='fw-bold'>ID:</span> {user?.id}</p>
<p><i className="fa fa-envelope me-2"></i><span className='fw-bold'>Email:</span> {user?.email}</p>
<p><i className="fa fa-globe me-2"></i><span className='fw-bold'>Country:</span> {user?.country}</p>
<p><i className="fa fa-phone me-2"></i><span className='fw-bold'>Phone:</span> {user?.phoneNumber}</p>
    </div>
  )}
</div>


            <div className="modal-footer border-0">
              <button type="button" className="btn border-danger text-danger" onClick={() => { recipe && loginData?.userGroup === "SystemUser" ? handleAddToFavouriteClick() : onClose() }}>
                {recipe && loginData?.userGroup === "SystemUser" ? "Add to Favourite" : "Close"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {showConfirmModal && (
       <div className="modal show d-block" tabIndex="-1" role="dialog">
       <div className="modal-dialog modal-dialog-centered" role="document">
         <div className="modal-content border-0 shadow-lg rounded-lg overflow-hidden">
           <div className="modal-header bg-gradient-primary border-0 py-3">
             <h5 className="modal-title text-white fw-bold">Confirm Add to Favourite</h5>
             <div className="closeBtn ms-auto d-flex justify-content-center align-items-center">
               <div className="rounded-circle favCls bg-white p-1 d-flex justify-content-center align-items-center bg-transparent">
                 <i className="fa fa-close text-danger" onClick={onClose}></i>
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
    </>
  );
}