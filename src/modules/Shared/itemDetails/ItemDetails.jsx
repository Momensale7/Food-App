import React, { useEffect } from 'react';
import { imgURL } from '../../services/api/apiConfig';
import staticImg from '../../../assets/images/staticUser.jpg';
import staticRecipe from '../../../assets/images/recipe.jpg'

export default function ItemDetails({ onClose, show, recipe, category, user }) {
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
                            <p className="text-dark-main h4">{recipe ? 'Recipe Details' : category ? "Category Details" : "User Details"}</p>
                            <div className="closeBtn ms-auto d-flex justify-content-center align-items-center">
                                <i className="fa fa-close text-danger" onClick={onClose}></i>
                            </div>
                        </div>

                        <div className="modal-body pt-0 modalText">
                            {recipe && (
                                <div className="recipeDetails text-dark-main">
                                    <div className="text-center">
                                        <img
                                            src={recipe?.imagePath ? imgURL + recipe?.imagePath : staticRecipe}
                                            alt={recipe?.name}
                                            className="modalImg"
                                        />
                                    </div>
                                    <p><span className='fw-bold text-dark-main'>Price:</span> {recipe?.name}</p>
                                    <p><span className='fw-bold text-dark-main'>Price:</span> {`${recipe?.price} $`}</p>
                                    <p><span className='fw-bold text-dark-main'>Description:</span> {recipe?.description}</p>
                                    <p><span className='fw-bold text-dark-main'>Categories:</span> {recipe?.category?.map(cat => cat?.name).join(', ')}</p>
                                    <p><span className='fw-bold text-dark-main'>Tag:</span> {recipe?.tag?.name}</p>
                                </div>
                            )}

                            {category && (
                                <div className="categoryDetails">
                                    <p><span className='fw-bold text-dark-main'>ID:</span> {category?.id}</p>
                                    <p><span className='fw-bold text-dark-main'>Name:</span> {category?.name}</p>
                                    <p><span className='fw-bold text-dark-main'>Creation Date:</span>  {new Date(category?.creationDate).toLocaleString('en-GB', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        hour12: true
                                    })}</p>
                                </div>
                            )}

                            {user && (
                                <div className="userDetails">
                                    <div className="text-center">
                                        <img
                                            src={user?.imagePath ? imgURL + user?.imagePath : staticImg}
                                            alt={user?.userName}
                                            className="w-25 rounded-circle"
                                        />
                                    </div>
                                    <p><span className='fw-bold text-dark-main'>ID:</span> {user?.id}</p>
                                    <p><span className='fw-bold text-dark-main'>Username:</span> {user?.userName}</p>
                                    <p><span className='fw-bold text-dark-main'>Email:</span> {user?.email}</p>
                                    <p><span className='fw-bold text-dark-main'>Country:</span> {user?.country}</p>
                                    <p><span className='fw-bold text-dark-main'>Phone:</span> {user?.phoneNumber}</p>
                                </div>
                            )}
                        </div>

                        <div className="modal-footer border-0">
                            <button type="button" className="btn border-danger text-danger" onClick={onClose}>
                                {recipe ? "Favourite" : "Close"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
