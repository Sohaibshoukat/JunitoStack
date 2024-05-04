import React, { useContext, useEffect, useState } from 'react'
import EditForm from '../../Components/Blog/EditForm'
import PreviewBlog from '../../Components/Blog/PreviewBlog';
import { useLocation, useNavigate } from 'react-router-dom';
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';


const CreateBlog = () => {

  const { state } = useLocation();
  const id = state ? state.id : null;

  const alertcontext = useContext(AlertContext);
  const { showAlert } = alertcontext


  const [Title, setTitle] = useState(null);
  const [Image, setImage] = useState(null)
  const [Date, setDate] = useState(null)
  const [ImageSet, setImageSet] = useState(null)

  const navigate = useNavigate()


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageSet(file)
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('Title', Title);
      formData.append('Date', Date);
      formData.append('blogimg', ImageSet);

      const response = await fetch(`${BaseURL}/createBlog`, {
        method: 'POST',
        headers: {
          "AdminODSToken": sessionStorage.getItem('AdminODSToken')
        },
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        navigate(`/admin-dashboard/blogs-Detail/${data.Blog._id}`)
        showAlert('Blog created successfully', 'success');
      } else {
        // Handle error
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };


  return (
    <div className='flex flex-col lg:py-5 lg:px-6 p-2 lg:flex-row m-5 md:m-10 rounded-2xl shadow-boxshade'>
      <EditForm
        Title={Title}
        setTitle={setTitle}
        Date={Date}
        setDate={setDate}
        handleImageChange={handleImageChange}
        FormHeading="Create Blog Preview"
        handleSubmit={handleSubmit}
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
          Date={Date}
          Image={Image}
        />
      </div>
    </div>

  )
}

export default CreateBlog
