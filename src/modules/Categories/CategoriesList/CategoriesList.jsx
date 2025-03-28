import React, { useEffect, useState } from 'react';
import headerImage from '../../../assets/images/headerImg.png';
import Header from '../../Shared/Header/Header';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation';
import SubHeader from '../../Shared/SubHeader/SubHeader';
import NoData from '../../Shared/NoData/NoData';
import Loading from '../../Shared/Loading/Loading';
import { Bounce, toast } from 'react-toastify';
import CategoriesData from '../CategoriesData/CategoriesData';
import Pagination from '../../Shared/Pagination/Pagination';
import { privateAxiosInstance } from '../../services/api/apiInstance';
import { CATEGORIES_URLS } from '../../services/api/apiConfig';
import ItemDetails from "../../Shared/itemDetails/ItemDetails";

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToDeleteName, setItemToDeleteName] = useState(null);
  const [itemToUpdateName, setItemToUpdateName] = useState(null);
  const [itemToUpdateId, setItemToUpdateId] = useState(null);
  const [isloading, setIsLoading] = useState(false);
  const [name, setName] = useState(null)
  const [showITemDetails, setShowItemDetails] = useState(false)
  const [itemToView, setItemToView] = useState(null)

  const getCategories = async () => {
    setIsLoading(true);
    try {
      let response = await privateAxiosInstance.get(CATEGORIES_URLS.GET_CATEGORIES, {
        params: {
          name,
          pageNumber,
          pageSize
        }
      });
      setCategories(response?.data?.data);
      setTotalPages(response?.data?.totalNumberOfPages);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getCategories();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, pageNumber]);

  const handlePageChange = (newPageNumber) => {
    if (newPageNumber > 0 && newPageNumber <= totalPages) {
      setPageNumber(newPageNumber);
    }
  };
  const handleDeleteClick = (itemId, itemToDeleteName) => {
    setItemToDeleteName(itemToDeleteName)
    setItemToDelete(itemId);
    setShowModal(true);
  };
  const handleUpdateClick = (itemId, itemName) => {
    setItemToUpdateName(itemName);
    setItemToUpdateId(itemId);
    setShowUpdateModal(true);
  }
  const handleConfirmDelete = async () => {
    console.log('Deleting item with ID:', itemToDelete);
    try {
      let response = await privateAxiosInstance.delete(CATEGORIES_URLS.DELETE_CATEGORY(itemToDelete),);
      toast.success('item deleted successfully',);
      getCategories();
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`,);
      console.error('Error deleting categories:', error);
    }
    setShowModal(false);
  };
  const handleNameValue = (e) => {
    setName(e.target.value)
    setPageNumber(1)
  }
  return (
    <>
      <Header
        title="Categories"
        subTitle="items!"
        description="You can now add your items that any user can order it from the Application and you can edit"
        image={headerImage}
      />
      <SubHeader getCategories={getCategories}
        title={"Categories Table Details"}
        description={"You can check all details"}
        btnContent={"Add New Category"}
      />
      <div className="categories container ">

        <div className="input-group">
          <span className="input-group-text greenMain"><i className="fa fa-list"></i></span>
          <input type="search" className='form-control' placeholder='Enter category name' onInput={handleNameValue} />
        </div>
        <div className="table-responsive pt-4">
          <table className="table min-w-1000">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Name</th>
                <th scope="col">Creation Date</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {isloading ? <tr><td colSpan={4}><Loading /></td></tr> :
                categories.length > 0 ? categories.map((category, index) => (
                  <tr key={index}>
                    <td>{category?.id}</td>
                    <td>{category?.name}</td>
                    <td>
                      {new Date(category?.creationDate).toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true
                      })}
                    </td>
                    <td>
                      <div className="dropdown">
                        <i className="fa fa-ellipsis-h" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu actionDropdown " >
                          <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none" onClick={() => { setItemToView(category), setShowItemDetails(true) }}><i className="fa fa-eye greenMain mx-2"></i>View</a></li>
                          <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none" onClick={() => handleUpdateClick(category?.id, category?.name)} ><i className="fa fa-edit greenMain mx-2"></i>edit</a></li>
                          <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none" onClick={() => handleDeleteClick(category?.id, category?.name)} ><i className="fa fa-trash greenMain mx-2"></i>delete</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                )) : <tr> <td colSpan={4}><NoData /></td></tr>}
            </tbody>
          </table>
        </div>
        {/* Pagination */}
        <Pagination pageNumber={pageNumber} handlePageChange={handlePageChange} totalPages={totalPages} />
        <DeleteConfirmation
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
          message={`Delete This Category  ${itemToDeleteName} ?`}
        />
        <CategoriesData
          type={"update"}
          show={showUpdateModal}
          onClose={() => setShowUpdateModal(false)}
          categoryId={itemToUpdateId}
          getCategories={getCategories}
          categoryName={itemToUpdateName} />

        <ItemDetails category={itemToView} show={showITemDetails} onClose={() => setShowItemDetails(false)} />


      </div>
    </>
  );
}
