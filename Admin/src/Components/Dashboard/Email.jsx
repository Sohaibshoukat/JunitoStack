import React, { useContext, useEffect, useState } from 'react'
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';

const Email = () => {
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
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
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
        showAlert(data.message, "success");
        fetchEmails()
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
            <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Email</th>
            <th scope="col" class="px-2 md:px-6 py-1 md:py-3 text-left font-medium text-gray-500 uppercase">Subject</th>
          </thead>
          <tbody>
            {emails?.map((item, index) => (
              <tr className='text-white' key={index}>
                <td class="px-2 md:px-6 bg-gray my-3 py-1 md:py-3 font-normal text-left ">
                  <h2 className='w-max'>{item?.Subject}</h2>
                </td>
                <td class="px-2 md:px-6 bg-gray my-3 py-1 md:py-3 font-normal text-left ">
                  <h2 className='w-max'>{item?.Email}</h2>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Email