import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FiSave } from 'react-icons/fi'
import { BaseURL } from '../../Data/BaseURL';
import { IoMdAdd } from 'react-icons/io'
import AlertContext from '../../Context/Alert/AlertContext';
import AddUserModel from '../../Components/Users/AddUserModel';

const UserAnalysis = () => {
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(""); // State for search query

  const [deleteDialogue, setDeleteDialogue] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [UserModel, setUserModel] = useState(false);

  const alertcontext = useContext(AlertContext);
  const { showAlert } = alertcontext

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      const response = await fetch(`${BaseURL}/getUsers`, {
        headers: {
          "AdminBizzToken": sessionStorage.getItem('AdminBizzToken')
        }
      });
      const data = await response.json();
      if (data.success) {
        setUserData(data.owners);
      } else {
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };

  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`${BaseURL}/deleteuser/${userId}`, {
        method: 'DELETE',
        headers: {
          "AdminBizzToken": sessionStorage.getItem('AdminBizzToken')
        }
      });
      const data = await response.json();
      if (data.success) {
        showAlert(data.message, 'success');
        fetchUserData();
      } else {
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };

  // Filtered user data based on search query
  const filteredUserData = userData.filter(user =>
    user?.owner?.FirstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user?.owner?.LastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user?.owner?.Email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user?.company?.CompanyName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openDeleteDialogue = (userId) => {
    setDeleteId(userId);
    setDeleteDialogue(true);
  };

  const handleConfirmDelete = () => {
    deleteUser(deleteId);
    setDeleteDialogue(false);
  };

  const handleCancelDelete = () => {
    setDeleteId(null);
    setDeleteDialogue(false);
  };
  return (
    <>
      {deleteDialogue && (
        <div className="fixed w-screen h-screen top-0 left-0 flex justify-center items-center">
          <div className="bg-black opacity-50 absolute z-10 w-full h-full"></div>
          <div className="bg-white font-Para py-4 px-6 rounded-2xl w-fit h-fit z-20">
            <h3 className="mb-4">Are you sure you want to delete this user?</h3>
            <div className="flex flex-row gap-4">
              <button
                className='border-2 border-gray py-2 px-4 rounded-lg bg-transparent font-Para'
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
              <button
                className='border-2 border-gray py-2 px-4 rounded-lg bg-red-500 text-white font-Para'
                onClick={handleConfirmDelete}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
      <AddUserModel UserModel={UserModel} setUserModel={setUserModel} fetchUserData={fetchUserData} />
      <div className='w-[95%] m-auto py-10'>
        <div className="flex flex-col gap-4 lg:flex-row justify-between font-Para lg:items-center">
          <div className="flex gap-2 md:gap-6 items-center">
            <h3 className='text-gray-400 text-sm md:text-lg font-medium'>Total {filteredUserData?.length} Users</h3>
          </div>
          <div className="flex gap-2">
            <button
              className='font-para items-center text-white gap-2 flex bg-[#E4AE44] border-2 border-[#E4AE44] font-semibold rounded-lg py-1 md:py-2 px-2 md:px-4 hover:bg-transparent ease-in-out duration-300 hover:text-[#E4AE44]'
              onClick={() => { setUserModel(true) }}
            >
              <IoMdAdd className='text-xl' />
              Add User
            </button>
            <div className="flex gap-3 items-center bg-slate-200 rounded-full py-2 px-4">
              <FaSearch className='text-gray-400 text-lg md:text-2xl' />
              <input
                type="text"
                placeholder='Search...'
                className='bg-transparent w-full text-sm md:text-lg border-none outline-none focus:outline-none focus:border-none active:outline-none '
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
              />
            </div>
          </div>
        </div>

        {userData?.length > 0 ? <div className='bg-transparent overflow-x-scroll font-Para w-full my-2 md:my-6'>
          <table className='max-w-[100vw] w-full overflow-x-scroll border-spacing-y-4 border-separate'>
            <thead>
              <tr>
                <th scope="col" className="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Company Name</th>
                <th scope="col" className="px-2 md:px-6 py-1 md:py-3 text-left w-[30%] font-medium text-gray-500 uppercase">Owner</th>
                <th scope="col" className="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Email</th>
                <th scope="col" className="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">SubUsers</th>
                <th scope="col" className="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Status</th>
                <th scope="col" className="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredUserData?.map((item, index) => (
                <tr className='text-white' key={index}>
                  <td className="px-2 md:px-6 rounded-l-2xl text-sm md:text-base bg-gray my-3 py-3 text-left ">
                    <div className={`w-max`}>
                      {item?.company?.CompanyName}
                    </div>
                  </td>
                  <td className="px-2 md:px-6 bg-gray my-3 text-base md:text-lg font-semibold py-3 text-left w-max min-w-[30%]">
                    <h2 className='w-max'>{item?.owner?.FirstName + ' ' + item?.owner?.LastName}</h2>
                  </td>
                  <td className="px-2 md:px-6 bg-gray my-3 py-1 md:py-3 font-normal text-left ">
                    <h2 className='w-max'>{item?.owner?.Email}</h2>
                  </td>
                  <td className="px-2 md:px-6 bg-gray my-3 py-1 md:py-3 text-left ">
                    {item.subusers.length > 0 ? (
                      <div className="flex gap-[-2px]">
                        {item.subusers.slice(0, 2).map((item2, index2) => (
                          <div className='w-8 h-8 rounded-full -ml-3 border-2 border-white flex items-center justify-center bg-gray-200' key={index2}>
                            {item2?.ProfilePhoto ? (
                              <img src={item2?.ProfilePhoto} alt="" className="w-full h-full rounded-full" />
                            ) : (
                              <span className="text-black font-semibold">
                                {item2?.FirstName?.charAt(0).toUpperCase()}
                              </span>
                            )}
                          </div>
                        ))}
                        {item.subusers.length > 2 && (
                          <div className='w-8 h-8 rounded-full text-gray bg-white -ml-3 border-2 border-gray flex items-center justify-center'>
                            +{item.subusers.length - 2}
                          </div>
                        )}
                      </div>
                    ) : (
                      <p className='font-Para font-semibold text-white'>0 Sub User</p>
                    )}
                  </td>
                  <td className={`text-gray-400 bg-gray text-left `}>
                    <h2 className={`w-max ${item?.owner?.Status === "Active" ? "bg-green-500" : "bg-red-500"} px-2 w-max md:px-6 py-1 md:py-2   rounded-lg`}>{item?.owner?.Status}</h2>
                  </td>
                  <td className="px-2 md:px-6 rounded-r-2xl text-gray-400 bg-gray my-3 py-1 md:py-3 text-left ">
                    <div
                      className="flex gap-2 items-center py-2 px-2 bg-[#D97706] w-fit rounded-lg cursor-pointer"
                      onClick={() => openDeleteDialogue(item.owner._id)}
                    >
                      <FiSave />
                      Delete
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> : <div className='flex justify-center'>
          <img src="../../Loading.gif" alt="Loading..." className='w-24 h-24' />
        </div>}
      </div>
    </>
  )
}

export default UserAnalysis;
