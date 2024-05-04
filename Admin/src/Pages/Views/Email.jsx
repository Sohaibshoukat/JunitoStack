import React, { useState, useEffect, useContext } from 'react';
import { FaSearch } from 'react-icons/fa';
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';

const Emails = () => {
  const [emails, setEmails] = useState([]);

  const alertcontext = useContext(AlertContext);
  const { showAlert } = alertcontext

  useEffect(() => {
    fetchEmails();
  }, []);

  const fetchEmails = async () => {
    try {
      const response = await fetch(`${BaseURL}/getEmails`, {
        method: 'GET', // GET method to fetch emails
        headers: {
          "AdminBizzToken": sessionStorage.getItem('AdminBizzToken')
        }
      });
      const data = await response.json();
      if (data.success) {
        setEmails(data.email); // Set the emails data in state
      } else {
        showAlert(data.message,'danger');
      }
    } catch (error) {
      showAlert(error.message,'danger');
    }
  };

  const handleStatusUpdate = async (id) => {
    try {
      const response = await fetch(`${BaseURL}/updateemail/${id}`, {
        method: 'PUT',
        headers: {
          "AdminBizzToken": sessionStorage.getItem('AdminBizzToken')
        }
      });
      const data = await response.json();
      if (data.success) {
        showAlert(data.message,"success");
        fetchEmails()
      } else {
        showAlert(data.message,'danger');
      }
    } catch (error) {
      showAlert(error.message,'danger');
    }
  };


  return (
    <div className='w-[95%] m-auto py-10'>
      <div className="flex flex-col gap-4 lg:flex-row justify-between font-Para lg:items-center">
        <div className="flex gap-2 md:gap-6 items-center">
          <h3 className='text-gray-400 text-sm md:text-lg font-medium'>Total {emails.length} Email</h3>
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
            <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">UserName</th>
            <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Subject</th>
            <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Email</th>
            <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Status</th>
          </thead>
          <tbody>
            {emails?.map((item, index) => (
              <tr className='text-white' key={index}>
                <td class="px-2 md:px-6 rounded-l-2xl text-sm md:text-base bg-gray my-3 py-3 text-left ">
                  <div className={`w-max`}>{item?.Company}</div>
                </td>
                <td class="px-2 md:px-6 bg-gray my-3 text-base md:text-lg font-semibold py-3 text-left w-max min-w-[30%]">
                  <h2 className='w-max'>{item?.Name}</h2>
                </td>
                <td class="px-2 md:px-6 bg-gray my-3 py-1 md:py-3 font-normal text-left ">
                  <h2 className='w-max'>{item?.Subject}</h2>
                </td>
                <td class="px-2 md:px-6 bg-gray my-3 py-1 md:py-3 font-normal text-left ">
                  <h2 className='w-max'>{item?.Email}</h2>
                </td>
                <td class="px-2 w-max md:px-6 rounded-r-2xl text-gray-400 bg-gray my-3 py-1 md:py-3 text-left ">
                  <h2 
                    className={`w-max ${item?.Status==="Active"? "bg-green-500 cursor-pointer" :"bg-red-500"} p-2 rounded-lg w-max `}
                    onClick={()=>{
                      if(item?.Status=="Active"){
                        handleStatusUpdate(item._id)
                      }
                    }}
                  >
                    {item?.Status}
                  </h2>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Emails;
