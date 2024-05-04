import React, { useContext, useEffect, useState } from 'react'
import { FiSave } from 'react-icons/fi'
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';

const User = () => {

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
            fetchUserData()
          } else {
            showAlert(data.message, 'danger');
          }
        } catch (error) {
          showAlert(error.message, 'danger');
        }
      };


    return (
        <div className='m-auto my-2 md:my-6'>
            <div className='bg-transparent border-2 border-gray rounded-2xl overflow-x-auto font-Para w-full'>
                <table className='max-w-[100vw] w-full overflow-x-scroll border-spacing-y-4 border-separate'>
                    <thead>
                        <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Company</th>
                        <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Owner</th>
                        <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">SubUser</th>
                        <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Status</th>
                        <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Action</th>
                    </thead>
                    <tbody>
                        {userData?.map((item, index) => (
                            <tr className='text-white'>
                                <td class="px-2 md:px-6 text-sm md:text-base bg-gray my-3 py-3 text-left ">
                                    <div
                                        className={`w-max`}
                                    >
                                        {item?.user?.CompanyName}
                                    </div>
                                </td>
                                <td class="px-2 md:px-6 bg-gray my-3 text-base md:text-lg font-semibold py-3 text-left w-max min-w-[30%]">
                                    <h2 className='w-max'>{item?.user?.FirstName + item?.user?.LastName}</h2>
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
                                <td class="px-2 md:px-6 text-gray-400 bg-gray my-3 py-1 md:py-3 text-left ">
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

export default User