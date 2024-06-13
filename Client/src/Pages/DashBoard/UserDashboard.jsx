import React, { useContext, useEffect, useState } from 'react'
import DashBoardNav from '../../Components/Dashboard/DashboardNav'
import { FiChevronDown } from 'react-icons/fi';
import { Link, Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Views/Home';
import FAQ from './Views/FAQ';
import User from './Views/User';
import Prompts from './Views/Prompts';
import DepartPrompt from './Views/DepartPrompt';
import SharedChat from './Views/SharedChat';
import ToDos from './Views/ToDos';
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';
import ProfilePage from './Views/Profile';
import Setting from './Views/Setting';
import Main from './Views/ProfileMain';



const UserDashboard = () => {

    const navigate = useNavigate()

    const [UserData, setUserData] = useState(null)
    const [Profile, setProfile] = useState(false)

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    useEffect(() => {
        if (localStorage.getItem("auth-token")) {
            return;
        } else {
            navigate("/login")
        }
    }, [])

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/user/getuser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('auth-token')
                }
            });


            const data = await response.json();
            if (data.success) {
                setUserData(data.userData);
            } else {
                showAlert(data.message || 'Failed to fetch user data', 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        fetchUserData()
    }, [])



    return (
        <>
            <div className='flex flex-row h-[100vh] w-[100vw] overflow-hidden'>

                {/* SideBar */}
                <div className='lg:basis-[15%] xl:basis-[18%] w-[15%]'>
                    <DashBoardNav />
                </div>



                <div className='font-poppins w-[85%]'>
                    <div className='flex flex-row text-custom-black justify-between items-center shadow-md p-2 '>
                        <h1 className='lg:text-xl md:text-lg sm:text-base font-bold'>Dashboard</h1>
                        <div className="flex flex-row items-center gap-2 cursor-pointer relative" onClick={() => { setProfile(!Profile) }}>
                            <img src={UserData?.ProfilePhoto ? `${BaseURL}/${UserData?.ProfilePhoto}` : "../Porp/User.png"} alt="" className='w-6 h-6 md:w-10 md:h-10 rounded-full' />
                            <div className="flex font-para text-gray flex-col">
                                <h2 className='text-base font-bold'>{UserData?.FirstName + " " + UserData?.LastName}</h2>
                                <p className='text-sm hidden md:block'>{UserData?.Email}</p>
                            </div>
                            {Profile && <div className="flex rounded-xl z-[999999999] right-0 w-[100%] flex-col gap-2 bg-white absolute bottom-[-700%] md:bottom-[-350%] xl:bottom-[-250%] shadow-2xl  font-para text-lg font-medium py-2 px-4">
                                <Link to={"/dashboard/setting/"}>
                                    <h3>Profile</h3>
                                </Link>
                                <Link to={"/dashboard/setting/password"}>
                                    <h3>Setting</h3>
                                </Link>
                                <Link to={"/dashboard/setting/company"}>
                                    <h3>Company</h3>
                                </Link>
                                <h3
                                    onClick={() => {
                                        localStorage.removeItem("auth-token")
                                        navigate('/')
                                    }}
                                >
                                    SignOut
                                </h3>
                            </div>}
                        </div>
                    </div>

                    <div className='bg-[#fafbfc] w-[100%] min-h-[100vh] max-h-[100vh] overflow-y-scroll'>
                        <Routes>
                            <Route path="/" element={<Home />}></Route>
                            <Route path="/faq" element={<FAQ />}></Route>
                            <Route path="/users" element={<User />}></Route>
                            <Route path="/prompts-browsing" element={<Prompts />}></Route>
                            <Route path="/shared" element={<SharedChat />}></Route>
                            <Route path="/to-do" element={<ToDos />}></Route>
                            <Route path="/setting/*" element={<Main />}></Route>
                            <Route path="/prompts-browsing/:dep" element={<DepartPrompt />}></Route>
                        </Routes>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UserDashboard;