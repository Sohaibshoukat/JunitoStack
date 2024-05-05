import React, { useEffect, useState } from 'react'
import DashBoardNav from '../../Components/Dashboard/DashboardNav'
import { FiChevronDown } from 'react-icons/fi';
import { Route, Routes, useNavigate } from 'react-router-dom'
import Home from './Views/Home';
import FAQ from './Views/FAQ';
import User from './Views/User';
import Prompts from './Views/Prompts';
import DepartPrompt from './Views/DepartPrompt';
import SharedChat from './Views/SharedChat';
import ToDos from './Views/ToDos';



const UserDashboard = () => {

    const navigate = useNavigate()
    

    useEffect(() => {
      if(localStorage.getItem("auth-token")){
        return;
      }else{
        navigate("/login")
      }
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
                        <div className="flex flex-row items-center gap-2">
                            <img src="../Porp/User.png" alt="" className='w-6 h-6 md:w-10 md:h-10 rounded-full' />
                            <div className="flex font-para text-gray flex-col">
                                <h2 className='text-base font-bold'>Musfiq</h2>
                                <p className='text-sm hidden md:block'>User@gmail.com</p>
                            </div>
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
                            <Route path="/prompts-browsing/:dep" element={<DepartPrompt/>}></Route>
                        </Routes>
                    </div>
                </div>

            </div>
        </>
    )
}

export default UserDashboard;