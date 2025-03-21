import React, { useEffect, useState } from 'react';
import { privateAxiosInstance } from '../services/api/apiInstance';
import { CATEGORIES_URLS, RECIPES_URLS, USER_URLS } from '../services/api/apiConfig';
import { getLoginData } from '../services/utilit/utilities ';

export default function Overview() {
     const [admin, setAdmin] = useState(0);
      const [user, setUser] = useState(0);
      const [category, setCategory] = useState(0);
      const [recipe, setRecipe] = useState(0);
      const [loading, setLoading] = useState(true);
      const loginData = getLoginData();
    
      const getCategories = async () => {
        try {
          let response = await privateAxiosInstance.get(CATEGORIES_URLS.GET_CATEGORIES, {
            params: { pageSize: 1, pageNumber: 1 }
          });
          setCategory(response?.data?.totalNumberOfRecords);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
    
      const getRecipes = async () => {
        try {
          let response = await privateAxiosInstance.get(RECIPES_URLS.GET_RECIPES, {
            params: {
              pageNumber: 1,
              pageSize: 1
            }
          });
          setRecipe(response?.data?.totalNumberOfRecords);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
    
      const getUsers = async () => {
        try {
          let response = await privateAxiosInstance.get(USER_URLS.GET_USERS, {
            params: {
              groups: 2,
              pageNumber: 1,
              pageSize: 1
            }
          });
          setUser(response?.data?.totalNumberOfRecords);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
    
      const getAdmin = async () => {
        try {
          let response = await privateAxiosInstance.get(USER_URLS.GET_USERS, {
            params: {
              groups: 1,
              pageNumber: 1,
              pageSize: 1
            }
          });
          setAdmin(response?.data?.totalNumberOfRecords);
        } catch (error) {
          console.error('Error fetching categories:', error);
        }
      };
    
      useEffect(() => {
        const fetchData = async () => {
          await getCategories();
          await getRecipes();
          await getUsers();
          await getAdmin();
          setLoading(false);
        };
        fetchData();
      }, []);
  return (
    <>
      {loginData?.userGroup !== "SystemUser" &&
        <div className="container-fluid py-4">
          <h2 className="fw-bold mb-4">Dashboard Overview</h2>
          <div className="row g-4">
            {/* Admin Card */}
            <div className="col-sm-6 col-xl-3">
              <div className="card border-0 shadow h-100 stat-card">
                <div className="card-body">
                  {loading ? (
                    <>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-title"></div>
                      <div className="skeleton skeleton-circle"></div>
                      <div className="skeleton skeleton-progress"></div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted small">Total admin</p>
                          <h3 className="fw-bold text-primary">{admin}</h3>
                        </div>
                        <div className="bg-primary bg-opacity-10 p-3 rounded-circle">
                          <i className="fas fa-chart-bar text-primary fs-4"></i>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="progress stat-progress">
                          <div className="progress-bar bg-primary" role="progressbar"
                            style={{ width: `${(admin / 800) * 100}%` }}
                            aria-valuenow={admin}
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Users Card */}
            <div className="col-sm-6 col-xl-3">
              <div className="card border-0 shadow h-100 stat-card">
                <div className="card-body">
                  {loading ? (
                    <>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-title"></div>
                      <div className="skeleton skeleton-circle"></div>
                      <div className="skeleton skeleton-progress"></div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted small">Total Users</p>
                          <h3 className="fw-bold text-success">{user}</h3>
                        </div>
                        <div className="bg-success bg-opacity-10 p-3 rounded-circle">
                          <i className="fas fa-users text-success fs-4"></i>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="progress stat-progress">
                          <div className="progress-bar bg-success" role="progressbar"
                            style={{ width: `${(user / 800) * 100}%` }}
                            aria-valuenow={user}
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Categories Card */}
            <div className="col-sm-6 col-xl-3">
              <div className="card border-0 shadow h-100 stat-card">
                <div className="card-body">
                  {loading ? (
                    <>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-title"></div>
                      <div className="skeleton skeleton-circle"></div>
                      <div className="skeleton skeleton-progress"></div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted small">Total Categories</p>
                          <h3 className="fw-bold text-warning">{category}</h3>
                        </div>
                        <div className="bg-warning bg-opacity-10 p-3 rounded-circle">
                          <i className="fas fa-book-open text-warning fs-4"></i>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="progress stat-progress">
                          <div className="progress-bar bg-warning" role="progressbar"
                            style={{ width: `${(category / 100) * 100}%` }}
                            aria-valuenow={category}
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>

            {/* Recipes Card */}
            <div className="col-sm-6 col-xl-3">
              <div className="card border-0 shadow h-100 stat-card">
                <div className="card-body">
                  {loading ? (
                    <>
                      <div className="skeleton skeleton-text"></div>
                      <div className="skeleton skeleton-title"></div>
                      <div className="skeleton skeleton-circle"></div>
                      <div className="skeleton skeleton-progress"></div>
                    </>
                  ) : (
                    <>
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <p className="text-muted small">Total Recipes</p>
                          <h3 className="fw-bold text-danger">{recipe}</h3>
                        </div>
                        <div className="bg-danger bg-opacity-10 p-3 rounded-circle">
                          <i className="fas fa-utensils text-danger fs-4"></i>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="progress stat-progress">
                          <div className="progress-bar bg-danger" role="progressbar"
                            style={{ width: `${(recipe / 100) * 100}%` }}
                            aria-valuenow={recipe}
                            aria-valuemin="0"
                            aria-valuemax="100"></div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  )
}
