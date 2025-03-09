import React, { useEffect, useState } from 'react';
import headerImage from '../../../assets/images/headerImg.png';
import Header from '../../Shared/Header/Header';
import DeleteConfirmation from '../../Shared/DeleteConfirmation/DeleteConfirmation';
import SubHeader from '../../Shared/SubHeader/SubHeader';
import NoData from '../../Shared/NoData/NoData';
import { privateAxiosInstance, CATEGORIES_URLS } from '../../services/urls/urls';

export default function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(5);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const getCategories = async () => {
    try {
      let response = await privateAxiosInstance.get(CATEGORIES_URLS.CATEGORIES_LIST, {
        params: {
          pageNumber,
          pageSize
        }
      });
      setCategories(response.data.data);
      setTotalPages(response.data.totalNumberOfPages);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    getCategories();
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
      let response = await privateAxiosInstance.delete(CATEGORIES_URLS.DELETE_CATEGORY(itemToDelete),);
      getCategories();
    } catch (error) {
      console.error('Error deleting categories:', error);
    }
    setShowModal(false);
};

  return (
    <>
      <Header
        title="Categories"
        subTitle="items!"
        description="You can now add your items that any user can order it from the Application and you can edit"
        image={headerImage}
      />
      <SubHeader title={"Categories Table Details"} description ={"You can check all details"} btnContent={"Add New Category"}/>
      <div className="categories container ">
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
            {categories.length >0? categories.map((category, index) => (
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
                    hour12: false
                  })}
                </td>
                <td>
                  <div className="dropdown">
                    <i className="fa fa-ellipsis-h" data-bs-toggle="dropdown" aria-expanded="false"></i>
                    <ul className="dropdown-menu actionDropdown " >
                      <li><a className="dropdown- fs-12 text-dark-main text-decoration-none" ><i className="fa fa-eye greenMain mx-2"></i>view</a></li>
                      <li><a className="dropdown- fs-12 text-dark-main text-decoration-none" ><i className="fa fa-edit greenMain mx-2"></i>edit</a></li>
                      <li><a className="dropdown- fs-12 text-dark-main text-decoration-none" onClick={()=>handleDeleteClick(category.id)} ><i className="fa fa-trash greenMain mx-2"></i>delete</a></li>
                    </ul>
                  </div>
                </td>
              </tr>
            )): <tr> <td colSpan={4}><NoData/></td></tr> }
          </tbody>
        </table>
            </div>
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
                message="Delete This Category ?"
            />
      </div>
    </>
  );
}
