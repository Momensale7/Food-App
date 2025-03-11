import { useEffect, useState } from "react";
import { imgURL, privateAxiosInstance, USER_URLS } from "../../services/urls/urls";
import { Bounce, toast } from "react-toastify";
import Header from "../../Shared/Header/Header";
import headerImg from '../../../assets/images/headerImg.png'
import SubHeader from "../../Shared/SubHeader/SubHeader";
import Loading from "../../Shared/Loading/Loading";
import staticImg from '../../../assets/images/staticUser.jpg'
import NoData from "../../Shared/NoData/NoData";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isLoading, setIsLoading] = useState()
  const getUsers = async () => {
    setIsLoading(true);
    try {
      let response = await privateAxiosInstance.get(USER_URLS.GET_USERS, {
        params: {
          pageNumber,
          pageSize
        }
      });
      // console.log(response.data.data);
      setUsers(response?.data?.data);
      setTotalPages(response?.data?.totalNumberOfPages);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUsers()
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
  const handleConfirmDelete = async () => {
    console.log('Deleting item with ID:', itemToDelete);
    try {
      let response = await privateAxiosInstance.delete(USER_URLS.DELETE_USER(itemToDelete),);
      toast.success(response?.data?.message || 'item deleted successfully', {
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
      getUsers();
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
        image={headerImg}
      />
      <SubHeader title={"Recipe Table Details"} description={"You can check all details"} btnContent={"Add New item"} />

      <div className="categories container ">
        <div className="table-responsive pt-5">
          {/* <table className="table min-w-1000">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">User Name</th>
                <th scope="col">Image</th>
                <th scope="col">Email</th>
                <th scope="col">country</th>
                <th scope="col">Phone</th>
                <th scope="col">action</th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? <tr><td colSpan={7}><Loading /></td></tr> :
                users.length > 0 ? users.map((user, index) => (
                  <tr key={index}>
                    <td>{user?.id}</td>
                    <td>{user?.userName}</td>
                    <td><img src={user?.imagePath? imgURL+ user?.imagePath : staticImg}
                     alt={user?.name} className='recipeImg' /></td>
                    <td>{user?.email}</td>
                    <td>{user?.country}</td>
                    <td>{user?.phoneNumber}</td>
                    <td>
                      <div className="dropdown">
                        <i className="fa fa-ellipsis-h" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu actionDropdown">
                          <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none"><i className="fa fa-eye greenMain mx-2"></i>View</a></li>
                          <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none"><i className="fa fa-edit greenMain mx-2"></i>Edit</a></li>
                          <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none" onClick={() => handleDeleteClick(user.id)}><i className="fa fa-trash greenMain mx-2"></i>Delete</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                )) : <tr><td colSpan={7}><NoData /></td></tr>}
            </tbody>
          </table> */}
        </div>

        {/* Pagination */}
        <nav aria-label="Page navigation example">
  <ul className="pagination justify-content-center">
    {/* Previous Button */}
    <li className={`page-item ${pageNumber === 1 ? 'disabled' : ''}`}>
      <button className="page-link" onClick={() => handlePageChange(pageNumber - 1)}>
        Previous
      </button>
    </li>

    {/* First Page (Always Visible) */}
    <li className={`page-item ${pageNumber === 1 ? 'active' : ''}`}>
      <button className="page-link" onClick={() => handlePageChange(1)}>1</button>
    </li>

    {/* Left Ellipsis */}
    {pageNumber > 6 && (
      <li className="page-item disabled">
        <span className="page-link">...</span>
      </li>
    )}

    {/* Dynamic Page Numbers (Excluding First and Last Page) */}
    {Array.from({ length: totalPages }, (_, i) => i + 1)
      .filter((num) => num !== 1 && num !== totalPages && num >= pageNumber - 3 && num <= pageNumber + 3)
      .map((num) => (
        <li key={num} className={`page-item ${pageNumber === num ? 'active' : ''}`}>
          <button className="page-link" onClick={() => handlePageChange(num)}>{num}</button>
        </li>
      ))}

    {/* Right Ellipsis */}
    {pageNumber < totalPages - 3 && (
      <li className="page-item disabled">
        <span className="page-link">...</span>
      </li>
    )}

    {/* Last Page (Always Visible) */}
    {totalPages > 1 && (
      <li className={`page-item ${pageNumber === totalPages ? 'active' : ''}`}>
        <button className="page-link" onClick={() => handlePageChange(totalPages)}>{totalPages}</button>
      </li>
    )}

    {/* Next Button */}
    <li className={`page-item ${pageNumber === totalPages ? 'disabled' : ''}`}>
      <button className="page-link" onClick={() => handlePageChange(pageNumber + 1)}>
        Next
      </button>
    </li>
  </ul>
</nav>

        <DeleteConfirmation
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
          message="Delete This user ?"
        />
      </div>
    </>
  )
}


