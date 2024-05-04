import React, { useContext, useEffect, useState } from 'react'
import EditForm from '../../Components/Blog/EditForm'
import PreviewBlog from '../../Components/Blog/PreviewBlog';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { TestimonalData } from '../../Data/Testimonial';
import {BlogData} from '../../Data/BlogData'
import { BaseURL } from '../../Data/BaseURL';
import { convertDateFormat } from '../../Context/DateFunction';
import AlertContext from '../../Context/Alert/AlertContext';

const EditBlog = () => {


  // const { state } = useLocation();
  // const {id} = state ;
  const { id } = useParams();
  const navigate= useNavigate()

  const alertcontext = useContext(AlertContext);
  const { showAlert } = alertcontext

  const [Title, setTitle] = useState(null);
  const [Image, setImage] = useState(null)
  const [Date, setDate] = useState(null)
  const [ImageSet, setImageSet] = useState(null)

  async function fetchBlog() {
    try {
      const response = await fetch(`${BaseURL}/getBlog/${id}`, {
        headers: {
          "AdminODSToken": sessionStorage.getItem('AdminODSToken')
        },
      });
      if (!response.ok) {
        showAlert('Failed to fetch blog', 'danger');
      }
      const data = await response.json();
      setTitle(data.blog.Title);
      setImage(data.blog.Image)
      setDate(convertDateFormat(data.blog.Date))
      // setJsonDetail(data.blog.DetailBlog)
    } catch (error) {
      console.error(error.message, 'danger');
    }
  }

  useEffect(() => {
    fetchBlog();
  }, []);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageSet(file)
    setImage(URL.createObjectURL(file));
  };

  const handleUpdate = async () => {
    try {
      const formData = new FormData();
      formData.append('Title', Title);
      formData.append('Date', Date);
      formData.append('blogimg', ImageSet);

      const response = await fetch(`${BaseURL}/updateBlog/${id}`, {
        method: 'PUT',
        headers: {
          "AdminODSToken": sessionStorage.getItem('AdminODSToken')
        },
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        navigate(`/admin-dashboard/blogs-Detail/${id}`)
        showAlert('Blog Updated successfully', 'success');
      } else {
        // Handle error
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };


  // const handleImageChange = (e) => {
  //   const file = e.target.files[0];
  //   // You can process the file here (e.g., upload to a server or display preview)
  //   setImage(URL.createObjectURL(file));
  // };


  return (
    <>
      <div className='flex flex-col lg:py-5 lg:px-6 p-2 lg:flex-row m-5 md:m-10 rounded-2xl shadow-boxshade'>
        <EditForm
          Title={Title}
          setTitle={setTitle}
          Date={Date}
          setDate={setDate}
          handleImageChange={handleImageChange}
          FormHeading = "Edit Form Design"
          handleUpdate={handleUpdate}
        />

        <div className='flex-col md:basis-[80%]'>
          <div className='mt-8 mx-4'>
            <button
              className={`py-3 px-10 rounded-3xl mb-4 text-base md:text-xl  bg-black text-white `}
            >
              Preview
            </button>
          </div>
          <PreviewBlog
            Title={Title}
            Image={Image}
            Date={Date}
          />
        </div>
      </div>
    </>
  )
}

export default EditBlog
