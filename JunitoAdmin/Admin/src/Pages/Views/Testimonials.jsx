import React, { useState, useEffect, useContext } from 'react';
import Testimonial from '../../Components/Testimonials/Testimonial';
import { MdDelete } from "react-icons/md";
import { FaPlusCircle } from "react-icons/fa";
import { MdOutlineModeEdit } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';

const Testimonials = () => {
  const alertcontext = useContext(AlertContext);
  const { showAlert } = alertcontext

  const [testimonials, setTestimonials] = useState([]);
  const [selectedTestimonial, setSelectedTestimonial] = useState(false);
  const [selectedId, setSelectedId] = useState(null);

  const navigate = useNavigate();

  const fetchTestimonials = async () => {
    try {
      const response = await fetch(`${BaseURL}/getTestimonials`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "AdminODSToken": sessionStorage.getItem('AdminODSToken')
        }
      });
      const data = await response.json();
      if (response.ok) {
        setTestimonials(data.testimonials);
      } else {
        showAlert( data.message,'danger');
      }
    } catch (error) {
      showAlert(error.message,'danger');
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);


  const handleDeleteTestimonial = async (id) => {
    try {
      const response = await fetch(`${BaseURL}/deleteTestimonial/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "AdminODSToken": sessionStorage.getItem('AdminODSToken')
        }
      });
      const data = await response.json();
      if (response.ok) {
        showAlert('Testimonial Deleted Successfully', 'success');
        fetchTestimonials();
        setSelectedTestimonial(false)
        setSelectedId(null)
      } else {
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };


  return (
    <div className='md:flex lg:py-10 p-2 m-5 md:m-10 rounded-2xl shadow-boxshade'>
      <div className='md:w-[80%] md:mx-4 flex flex-col gap-10'>
        {testimonials?.length>0  && testimonials?.map((item, index) => (
          <div
            onClick={() => {
              setSelectedId(item._id);
              setSelectedTestimonial(true);
            }}
            key={index}
          >
            <Testimonial
              author={item.Name}
              position={item.Position}
              company={item.Company}
              content={item.Description}
              title={item.Title}
              rating={item.Rating}
              Image={item.Profile}
              id={item._id}
              SelectedId={selectedId}
            />
          </div>
        ))}
      </div>

      <div className='flex-col p-4 md:border-l md:border-darkgray'>

        <div
          className='round bg-yellow inline-flex items-center m-auto lg:px-8 py-3 px-2 rounded-3xl hover:bg-[#E4A138] cursor-pointer'
          onClick={() => {
            navigate('/admin-dashboard/create-testimonial')
          }}
        >
          <div className='text-secondary font-bold mx-2 '>Add New</div>
          <FaPlusCircle className='text-secondary text-lg' />
        </div>

        <div className={`${selectedTestimonial ? 'block' : 'hidden'}`}>
          <div
            className='text-darkgray flex items-center m-2 font-bold hover:text-gray-500 cursor-pointer'
            onClick={() => {
              navigate('/admin-dashboard/edit-testimonial', { state: { id: selectedId } })
            }}
          >
            <MdOutlineModeEdit className='text-lg mx-2' />
            Edit
          </div>
          <div 
            className='text-darkgray flex items-center m-2 font-bold hover:text-gray-500 cursor-pointer'
            onClick={()=>{
              handleDeleteTestimonial(selectedId)
            }}
          >
            <MdDelete className='text-red text-xl mx-2' />
            Delete
          </div>
        </div>
      </div>
    </div>
  );
}

export default Testimonials;
