import React, { useEffect, useState } from 'react'
import EditForm from '../../Components/FormDesign/EditForm'
import PreviewForm from '../../Components/FormDesign/PreviewForm';
import { useLocation } from 'react-router-dom';
import {FormDesignData} from '../../Data/FormDesignData'

const EditFormDesign = () => {

  
  const { state } = useLocation();
  const {id} = state ;


  const [Title, setTitle] = useState(null);
  const [Image, setImage] = useState(null)
  const [Category, setCategory] = useState(null)

  useEffect(() => {
    FormDesignData.map((item, index) => {
      if (index == id) {
        setImage(item.image)
      }
    })

  }, [])

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    // You can process the file here (e.g., upload to a server or display preview)
    setImage(URL.createObjectURL(file));
  };


  return (
    <>
    <div className='flex flex-col lg:py-5 lg:px-6 p-2 lg:flex-row m-5 md:m-10 rounded-2xl shadow-boxshade'>
      <EditForm
        Title={Title}
        setTitle={setTitle}
        Category={Category}
        setCategory={setCategory}
        handleImageChange={handleImageChange}
        FormHeading = "Edit Form Design"
      />

      <div className='flex-col md:basis-[80%]'>
        <div className='mt-8 mx-4'>
          <button
            className={`py-3 px-10 rounded-3xl mb-4 text-base md:text-xl  bg-black text-white `}
          >
            Preview
          </button>
        </div>
        <PreviewForm
          Title={Title}
          Image={Image}
          Category={Category}
        />
      </div>
    </div>
  </>
  )
}

export default EditFormDesign
