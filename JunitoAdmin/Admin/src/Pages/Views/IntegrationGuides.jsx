import React, { useContext, useEffect, useState } from 'react'
import { MdDelete } from "react-icons/md";
import { IoMdAdd } from "react-icons/io";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import Cards from '../../Components/IntegrationGuide/Cards.jsx';
import { cardsData } from '../../Data/CardsData.js';
import { BaseURL } from '../../Data/BaseURL.js';
import AlertContext from '../../Context/Alert/AlertContext.jsx';

const IntegrationGuides = () => {

  // const navigate = useNavigate()
  // const [Selected, setSelected] = useState(null)
  // const [ID, setID] = useState(null)

  const [guides, setGuides] = useState([]); // State to store fetched blogs
  const [selected, setSelected] = useState(false);
  const [selectedID, setSelectedID] = useState(null);
  const navigate = useNavigate();

  const alertcontext = useContext(AlertContext);
  const { showAlert } = alertcontext

  async function fetchBlogs() {
    try {
      const response = await fetch(`${BaseURL}/getGuide`,{
        headers: {
          "AdminODSToken": sessionStorage.getItem('AdminODSToken')
      },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch blogs');
      }
      const data = await response.json();
      setGuides(data.guide);
    } catch (error) {
      console.error('Error fetching blogs:', error);
    }
  }

  useEffect(() => {
    fetchBlogs();
  }, []); 

  const handleDeleteblog = async (id) => {
    try {
      const response = await fetch(`${BaseURL}/deleteGuide/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "AdminODSToken": sessionStorage.getItem('AdminODSToken')
        }
      });
      const data = await response.json();
      if (response.ok) {
        showAlert('Guide Deleted Successfully', 'success');
        fetchBlogs();
        setSelected(false)
        setSelectedID(null)
      } else {
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };


  return (
    <>
      <div className='flex flex-col-reverse xl:flex-row lg:py-10 p-2 m-5 md:m-10 rounded-2xl shadow-boxshade ' >

        <div className='lg:w-[80%]  overflow-y-auto mx-auto lg:px-4 px-2'>
          <div className='pb-24'>
            <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8'>
              {guides?.map((card, index) => (
                <div onClick={() => {
                  setSelected(true)
                  setSelectedID(card._id)
                }}
                  key={index}
                >
                  <Cards  cardData={card} SelectedID={selectedID} IDIndex={card._id}/>
                </div>
              ))}
            </div>

          </div>
        </div>

        <div className='flex-col mx-auto p-4 xl:border-l md:w-[40%] xl:w-[20%] md:border-darkgray'>
          <div 
            className='bg-[#4DB678] cursor-pointer flex justify-between items-center rounded-3xl pl-5 pr-2 h-19  hover:bg-[#2d6f49] my-4' 
            onClick={() => {
              navigate('/admin-dashboard/create-integration-guides')
            }}
          >
            <div className='text-secondary font-bold lg:text-base text-xl sm:text-sm my-3 ml-4'>Ceate New</div>
            <IoMdAdd className='text-secondary font-bold md:text-lg text-xl p-2 my-1 bg-[#2A6B45] rounded-full h-full w-10' />
          </div>
          <div className={`${selected ? "block" : "hidden"}`}>
            <div 
              className={`bg-[#285F86] cursor-pointer flex justify-between items-center rounded-3xl pl-5 pr-2 h-19  hover:bg-[#30546c] my-4 `} 
              onClick={() => {
                navigate(`/admin-dashboard/edit-integration-guides/${selectedID}`)
              }}
            >
              <div className='text-secondary font-bold lg:text-base text-xl sm:text-sm my-3 ml-4'>Edit</div>
              <MdOutlineModeEdit className='text-secondary font-bold md:text-lg text-xl p-2 my-1  bg-[#1C95EB] rounded-full h-full w-10' />
            </div>
            <div 
              onClick={()=>{handleDeleteblog(selectedID)}}
              className=' text-[#979797] flex items-center m-2 font-bold hover:text-gray-600 cursor-pointer'
            >
              <MdDelete className='text-red text-xl mx-2' />
              Delete
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default IntegrationGuides
