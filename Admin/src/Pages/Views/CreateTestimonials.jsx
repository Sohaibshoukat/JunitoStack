import React, { useContext, useState } from 'react'
import EditForm from '../../Components/Testimonials/EditForm';
import PreviewTestimonial from '../../Components/Testimonials/PreviewTestimonial';
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';
import { useNavigate } from 'react-router-dom'

const CreateTestimonials = () => {
  const [title, setTitle] = useState("");
  const [Name, setName] = useState('');
  const [description, setdescription] = useState('')
  const [Company, setCompany] = useState('');
  const [position, setposition] = useState('');
  const [rating, setrating] = useState('')
  const [Image, setImage] = useState('')
  const [ImageSet, setImageSet] = useState(null)

  const alertcontext = useContext(AlertContext);
  const { showAlert } = alertcontext

  const navigate = useNavigate()

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageSet(file)
    setImage(URL.createObjectURL(file));
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('Title', title);
      formData.append('Rating', rating);
      formData.append('Name', Name);
      formData.append('Company', Company);
      formData.append('Position', position);
      formData.append('Description', description);
      formData.append('testiomnialimg', ImageSet);

      const response = await fetch(`${BaseURL}/createTestimonial`, {
        method: 'POST',
        headers: {
          "AdminODSToken": sessionStorage.getItem('AdminODSToken')
        },
        body: formData
      });
      const data = await response.json();
      if (response.ok) {
        navigate('/admin-dashboard/testimonials')
        showAlert('Testimonial created successfully', 'success');
      } else {
        // Handle error
        showAlert(data.message, 'danger');
      }
    } catch (error) {
      showAlert(error.message, 'danger');
    }
  };


  return (


    // Editing
    <div className='flex flex-col lg:py-5 lg:px-6 p-2 lg:flex-row m-5 md:m-10 rounded-2xl shadow-boxshade'>
      <EditForm
        title={title}
        setTitle={setTitle}
        Name={Name}
        setName={setName}
        description={description}
        setdescription={setdescription}
        Company={Company}
        setCompany={setCompany}
        position={position}
        setposition={setposition}
        rating={rating}
        setrating={setrating}
        Image={Image}
        setImage={setImage}
        handleImageChange={handleImageChange}
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
        <PreviewTestimonial
          author={Name}
          position={position}
          company={Company}
          content={description}
          title={title}
          rating={rating}
          Image={Image}
        />
      </div>
    </div>

  )
}

export default CreateTestimonials;