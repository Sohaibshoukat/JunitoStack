import React, { useContext, useEffect, useState } from 'react'
import { FaSearch } from 'react-icons/fa'
import { FiSave } from 'react-icons/fi'
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';

const UserAnalysis = () => {

  const [userData, setUserData] = useState([]);

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
        setUserData(data.users);
      } else {
        showAlert(data.message,'danger');
      }
    } catch (error) {
      showAlert(error.message,'danger');
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
        fetchUserData()
      } else {
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };

  return (
    <div className='w-[95%] m-auto py-10'>
      <div className="flex flex-col gap-4 lg:flex-row justify-between font-Para lg:items-center">
        <div className="flex gap-2 md:gap-6 items-center">
          <h3 className='text-gray-400 text-sm md:text-lg font-medium'>Total {userData?.length} Users</h3>
        </div>
        <div className="flex gap-3 items-center bg-slate-200 rounded-full py-2 px-4">
          <FaSearch className='text-gray-400 text-lg md:text-2xl' />
          <input
            type="text"
            placeholder='Search...'
            className='bg-transparent text-sm md:text-lg border-none outline-none focus:outline-none focus:border-none active:outline-none '
          />
        </div>
      </div>
      <div className='bg-transparent overflow-x-scroll font-Para w-full my-2 md:my-6'>
        <table className='max-w-[100vw] w-full overflow-x-scroll border-spacing-y-4 border-separate'>
          <thead>
            <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Company Name</th>
            <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left w-[30%] font-medium text-gray-500 uppercase">Owner</th>
            <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Email</th>
            <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">SubUsers</th>
            <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Status</th>
            <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Action</th>
          </thead>
          <tbody>
            {userData?.map((item, index) => (
              <tr className='text-white' key={index}>
                <td class="px-2 md:px-6 rounded-l-2xl text-sm md:text-base bg-gray my-3 py-3 text-left ">
                  <div
                    className={`w-max`}
                  >
                    {item?.user?.CompanyName}
                  </div>
                </td>
                <td class="px-2 md:px-6 bg-gray my-3 text-base md:text-lg font-semibold py-3 text-left w-max min-w-[30%]">
                  <h2 className='w-max'>{item?.user?.FirstName+item?.user?.LastName}</h2>
                </td>
                <td class="px-2 md:px-6 bg-gray my-3 py-1 md:py-3 font-normal text-left ">
                  <h2 className='w-max'>{item?.user?.Email}</h2>
                </td>
                <td class="px-2 md:px-6 bg-gray my-3 py-1 md:py-3 text-left ">
                  <div className="flex gap-[-2px]">
                    {item.subusers.slice(0, 2).map((item2, index2) => (
                      <div className='w-8 h-8 rounded-full -ml-3 border-2 border-white' key={index2}>
                        <img src={item2.ProfilePhoto} alt="" />
                      </div>
                    ))}
                    {item.subusers.length > 2 && (
                      <div className='w-8 h-8 rounded-full text-gray bg-white -ml-3 border-2 border-gray flex items-center justify-center'>
                        +{item.subusers?.length - 2}
                      </div>
                    )}
                  </div>
                </td>
                <td class="px-2 w-max md:px-6 text-gray-400 bg-gray my-3 py-1 md:py-3 text-left ">
                  <h2 className={`w-max ${item?.user?.Status == "Active" ? "bg-green-500 " : "bg-red-500"} p-2 rounded-lg w-max`}>{item?.user?.Status}</h2>
                </td>
                <td class="px-2 md:px-6 rounded-r-2xl text-gray-400 bg-gray my-3 py-1 md:py-3 text-left ">
                  <div 
                    className="flex gap-2 items-center py-2 px-2 bg-[#D97706] w-fit rounded-lg cursor-pointer"
                    onClick={() => deleteUser(item.user._id)}
                  >
                    <FiSave />
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default UserAnalysis