import React, { useContext, useEffect, useState } from 'react'
import Nav from '../Components/Nav'
import { FiChevronDown } from 'react-icons/fi';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Views/Home';
import UserAnalysis from './Views/UserAnalysis';
import Features from './Views/Features';
import FAQ from './Views/FAQ';
import Blogs from './Views/Blogs';
import Testimonials from './Views/Testimonials';
import AdminProfile from './Views/AdminProfile';
import Setting from './Views/Settings';
import EditTestimonial from './Views/EditTestimonial';
import CreateTestimonials from './Views/CreateTestimonials';
import EditBlog from './Views/EditBlog';
import CreateBlog from './Views/CreateBlog';
import IntegrationGuides from './Views/IntegrationGuides';
import CreateIntegrationGuides from './Views/CreateIntegrationGuides';
import AddBlogDetail from './Views/AddBlogDetail';
import EditIntegrationGuides from './Views/EditIntegrationGuides';
import FormDesign from './Views/FormDesign';
import CreateFormDesign from './Views/CreateFormDesign';
import EditFormDesign from './Views/EditFormDesign';
import AlertContext from '../Context/Alert/AlertContext';
import AddGuideDetail from './Views/AddGuideDetail';
import Emails from './Views/Email';
import Prompt from './Views/Prompt';
import { BaseURL } from '../Data/BaseURL';


const AdminDashboard = () => {
    const navigate = useNavigate()
    useEffect(() => {
        if (sessionStorage.getItem('AdminBizzToken')) {
            return;
        } else {
            navigate('/Login')
        }
    }, [])

    const [Profile, setProfile] = useState(false)

    const alertcontext = useContext(AlertContext);
    const { showAlert } = alertcontext

    const [AdminData, setAdminData] = useState(null)

    const fetchAdminData = async () => {
        try {
            const response = await fetch(`${BaseURL}/getadmin`, {
                headers: {
                    "AdminBizzToken": sessionStorage.getItem('AdminBizzToken')
                }
            });
            const data = await response.json();
            if (response.ok) {
                setAdminData(data.adminData);
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        fetchAdminData()
    }, [])


    return (
        // overflow-hidden
        <div className='flex flex-row h-[100vh] overflow-hidden '>

            {/* SideBar */}
            <div className='md:basis-[45%] xl:basis-[20%]'>
                <Nav />
            </div>



            <div className='font-poppins w-full overflow-scroll'>
                <div className='flex flex-row bg-white text-custom-black justify-between items-center shadow-md py-4 px-4 '>
                    <h1 className='lg:text-2xl text-gray md:text-xl font-Para sm:text-lg font-bold'>Dashboard</h1>
                    <div className='flex flex-row items-center relative px-2 md:px-5' onClick={() => { setProfile(!Profile) }}>
                        <img src={AdminData?.ProfilePhoto ? `http://localhost:5000/${AdminData.ProfilePhoto}` : "../Owner.png"} className='h-10 w-10 md:w-12 md:h-12 mx-2 rounded-full' />
                        <h1 className='md:text-xl sm:text-base'>{AdminData?.Name}</h1>
                        <FiChevronDown className='mx-2' />
                        {Profile &&
                            <div className='absolute w-fit flex flex-col gap-2 font-Para text-lg font-medium right-[-20px] bottom-[-200%] shadow-shadow2 bg-white rounded-2xl py-2 px-6'>
                                <Link 
                                    to={"/admin-dashboard/admin-profile"}
                                    className='cursor-pointer'
                                >
                                    <h2>Profile</h2>
                                </Link>
                                <h2
                                    className='cursor-pointer'
                                    onClick={() => {
                                        sessionStorage.removeItem('AdminBizzToken')
                                        navigate('/login')
                                    }}
                                >
                                    LogOut
                                </h2>
                            </div>
                        }
                    </div>
                </div>

                <div className='pb-20 overflow-y-scroll overflow-x-hidden h-[100%]'>
                    {/* Routes Here */}
                    <Routes>
                        <Route
                            path='/'
                            element={<Home />}
                        />
                        <Route
                            path='/prompts'
                            element={<Prompt />}
                        />
                        <Route
                            path='/user-analysis'
                            element={<UserAnalysis />}
                        />
                        <Route
                            path='/emails'
                            element={<Emails />}
                        />
                        <Route
                            path='/features'
                            element={<Features />}
                        />
                        <Route
                            path='/FAQ'
                            element={<FAQ />}
                        />
                        <Route
                            path='/form-design'
                            element={<FormDesign />}
                        />
                        <Route
                            path='/create-form-design'
                            element={<CreateFormDesign />}
                        />
                        <Route
                            path='/edit-form-design'
                            element={<EditFormDesign />}
                        />
                        <Route
                            path='/blogs'
                            element={<Blogs />}
                        />
                        <Route
                            path='/create-blogs'
                            element={<CreateBlog />}
                        />
                        <Route
                            path='/edit-blogs/:id'
                            element={<EditBlog />}
                        />
                        <Route
                            path='/integration-guides'
                            element={<IntegrationGuides />}
                        />
                        <Route
                            path='/create-integration-guides'
                            element={<CreateIntegrationGuides />}
                        />
                        <Route
                            path='/edit-integration-guides/:id'
                            element={<EditIntegrationGuides />}
                        />

                        <Route
                            path='/blogs-Detail/:id'
                            element={<AddBlogDetail />}
                        />
                        <Route
                            path='/guide-Detail/:id'
                            element={<AddGuideDetail />}
                        />
                        <Route
                            path='/Settings'
                            element={<Setting />}
                        />
                        <Route
                            path='/admin-profile'
                            element={<AdminProfile />}
                        />
                        <Route
                            path='/testimonials'
                            element={<Testimonials />}
                        />
                        <Route
                            path='/edit-testimonial'
                            element={<EditTestimonial />}
                        />
                        <Route
                            path='/create-testimonial'
                            element={<CreateTestimonials />}
                        />
                    </Routes>
                </div>
            </div>

        </div>
    )
}

export default AdminDashboard;