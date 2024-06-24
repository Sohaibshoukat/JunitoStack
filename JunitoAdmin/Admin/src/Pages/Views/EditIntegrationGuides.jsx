import React, { useContext, useEffect, useState } from 'react'
import EditForm from '../../Components/IntegrationGuide/EditForm'
import PreviewCard from '../../Components/IntegrationGuide/PreviewCard';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { cardsData } from '../../Data/CardsData';
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';


const EditIntegrationGuides = () => {

    const { id } = useParams();
    const navigate = useNavigate()

    const alertcontext = useContext(AlertContext);
    const { showAlert } = alertcontext

    const [Title, setTitle] = useState(null);
    const [Image, setImage] = useState(null)
    const [Description, setDescription] = useState(null)
    const [ImageSet, setImageSet] = useState(null)

    async function fetchBlog() {
        try {
            const response = await fetch(`${BaseURL}/getguide/${id}`, {
                headers: {
                    "AdminODSToken": sessionStorage.getItem('AdminODSToken')
                },
            });
            if (!response.ok) {
                showAlert('Failed to fetch Guide', 'danger');
            }
            const data = await response.json();
            setTitle(data.guide.Title);
            setImage(data.guide.Image)
            setDescription(data.guide.Description)
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
            formData.append('Description', Description);
            formData.append('guideimg', ImageSet);

            const response = await fetch(`${BaseURL}/updateguide/${id}`, {
                method: 'PUT',
                headers: {
                    "AdminODSToken": sessionStorage.getItem('AdminODSToken')
                },
                body: formData
            });
            const data = await response.json();
            if (data.success) {
                navigate(`/admin-dashboard/guide-Detail/${id}`)
                showAlert('Guide Updated successfully', 'success');
            } else {
                // Handle error
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };


    return (
        <>
            <div className='flex flex-col lg:py-5 lg:px-6 p-2 lg:flex-row m-5 md:m-10 rounded-2xl shadow-boxshade'>
                <EditForm
                    FormTitle="Edit Form Design"
                    Title={Title}
                    setTitle={setTitle}
                    Description={Description}
                    setDescription={setDescription}
                    Image={Image}
                    setImage={setImage}
                    handleImageChange={handleImageChange}
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
                    <PreviewCard
                        title={Title}
                        content={Description}
                        Image={Image}
                    />
                </div>
            </div>
        </>
    )
}

export default EditIntegrationGuides
