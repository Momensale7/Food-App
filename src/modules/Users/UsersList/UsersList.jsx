import { useEffect, useState } from "react";
import { Bounce, toast } from "react-toastify";
import Header from "../../Shared/Header/Header";
import headerImg from '../../../assets/images/headerImg.png'
import SubHeader from "../../Shared/SubHeader/SubHeader";
import Loading from "../../Shared/Loading/Loading";
import staticImg from '../../../assets/images/staticUser.jpg'
import NoData from "../../Shared/NoData/NoData";
import DeleteConfirmation from "../../Shared/DeleteConfirmation/DeleteConfirmation";
import Pagination from "../../Shared/Pagination/Pagination";
import { privateAxiosInstance } from "../../services/api/apiInstance";
import { imgURL, USER_URLS } from "../../services/api/apiConfig";
import ItemDetails from "../../Shared/itemDetails/ItemDetails";

export default function UsersList() {
  const [users, setUsers] = useState([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageSize] = useState(8);
  const [totalPages, setTotalPages] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [itemToDeleteName, setItemToDeleteName] = useState(null);
  const [userName, setUserName] = useState(null);
  const [country, setCountry] = useState(null);
  const [email, setEmail] = useState(null);
  const [groups, setGroups] = useState(null);
  const [showITemDetails, setShowItemDetails] = useState(false)
  const [itemToView, setItemToView] = useState(null)


  const [isLoading, setIsLoading] = useState()
  const getUsers = async () => {
    setIsLoading(true);
    try {
      let response = await privateAxiosInstance.get(USER_URLS.GET_USERS, {
        params: {
          userName,
          country,
          email,
          groups,
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
  }, [pageNumber, userName, country, email, groups]);

  const handlePageChange = (newPageNumber) => {
    if (newPageNumber > 0 && newPageNumber <= totalPages) {
      setPageNumber(newPageNumber);
    }
  };
  const handleDeleteClick = (itemId, itemToDeleteName) => {
    setItemToDelete(itemId);
    setItemToDeleteName(itemToDeleteName);
    setShowModal(true);
  };
  const handleConfirmDelete = async () => {
    console.log('Deleting item with ID:', itemToDelete);
    try {
      let response = await privateAxiosInstance.delete(USER_URLS.DELETE_USER(itemToDelete),);
      toast.success(response?.data?.message || 'item deleted successfully',);
      getUsers();
    } catch (error) {
      toast.error(`${error?.response?.data?.message}`,);
      // console.error('Error deleting recipe:', error);
    }
    setShowModal(false);
  };
  const handleuserNameValue = (e) => {
    setUserName(e.target.value)
    setPageNumber(1)
  }
  const handleCountryValue = (e) => {
    setCountry(e.target.value)
    setPageNumber(1)
  }
  const handleEmailValue = (e) => {
    setEmail(e.target.value)
    setPageNumber(1)
  }
  const handleGroupsValue = (e) => {
    setGroups(e.target.value)
    setPageNumber(1)
  }

  return (
    <>
      <Header
        title="Users"
        subTitle="list!"
        description="You can now add your items that any user can order it from the Application and you can edit"
        image={headerImg}
      />
      <SubHeader title={"Users Table Details"} description={"You can check all details"} />

      <div className="categories container ">
        <div className="row gx-2 gy-2">
          <div className="col-6 col-lg-3">
            <div className="input-group">
              <span className="input-group-text greenMain"><i className="fa fa-user"></i></span>
              <input type="search" className='form-control' placeholder='Enter user name' onInput={handleuserNameValue} />
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="input-group">
              <span className="input-group-text greenMain"><i className="fa fa-globe"></i></span>
              <input type="search" className='form-control' placeholder='Enter country name' onInput={handleCountryValue} />
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="input-group">
              <span className="input-group-text greenMain"><i className="fa fa-envelope"></i></span>
              <input type="search" className='form-control' placeholder='Enter email' onInput={handleEmailValue} />
            </div>
          </div>
          <div className="col-6 col-lg-3">
            <div className="input-group">
              <span className="input-group-text greenMain"><i className="fa fa-users"></i></span>
              <select name="" id="" onChange={handleGroupsValue} className='form-control'>
                <option value="">Select group</option>
                <option value="1">admin</option>
                <option value="2">user</option>
              </select>
            </div>
          </div>
        </div>
        <div className="table-responsive pt-5">
          <table className="table min-w-1000">
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
                    <td><img src={user?.imagePath ? imgURL + user?.imagePath : staticImg}
                      alt={user?.name} className='recipeImg' /></td>
                    <td>{user?.email}</td>
                    <td>{user?.country}</td>
                    <td>{user?.phoneNumber}</td>
                    <td>
                      <div className="dropdown">
                        <i className="fa fa-ellipsis-h" data-bs-toggle="dropdown" aria-expanded="false"></i>
                        <ul className="dropdown-menu actionDropdown">
                          <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none" onClick={() => { setItemToView(user), setShowItemDetails(true) }}><i className="fa fa-eye greenMain mx-2"></i>View</a></li>
                          <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none"><i className="fa fa-edit greenMain mx-2"></i>Edit</a></li>
                          <li><a className="dropdown-item fs-12 text-dark-main text-decoration-none" onClick={() => handleDeleteClick(user?.id, user?.userName)}><i className="fa fa-trash greenMain mx-2"></i>Delete</a></li>
                        </ul>
                      </div>
                    </td>
                  </tr>
                )) : <tr><td colSpan={7}><NoData /></td></tr>}
            </tbody>
          </table>
        </div>

        <Pagination pageNumber={pageNumber} handlePageChange={handlePageChange} totalPages={totalPages} />
        <DeleteConfirmation
          show={showModal}
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmDelete}
          message={`Delete This user ${itemToDeleteName} ?`}
        />
        <ItemDetails user={itemToView} show={showITemDetails} onClose={() => setShowItemDetails(false)} />

      </div>
    </>
  )
}


