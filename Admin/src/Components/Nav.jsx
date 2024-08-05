import React from 'react';
import { FaChartPie, FaRegQuestionCircle, FaUserPlus } from "react-icons/fa";
import { IoBag, IoCartOutline } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { Link, useNavigate } from 'react-router-dom';
import {RiCoupon2Line} from 'react-icons/ri'
import { PiSignOut } from "react-icons/pi"


const Nav = () => {
    const navigate = useNavigate()

    const tabs = [
        {
            name: 'Dashboard',
            Icon: FaChartPie,
            link: '/admin-dashboard/',
        },
        {
            name: 'Prompts',
            Icon: IoCartOutline,
            link: '/admin-dashboard/prompts',
        },
        {
            name: 'Registered User',
            Icon: FaUserPlus,
            link: '/admin-dashboard/user-analysis',
        },
        {
            name: 'Emails',
            Icon: IoBag,
            link: '/admin-dashboard/emails',
        },
        {
            name: "FAQ's",
            Icon: FaRegQuestionCircle,
            link: '/admin-dashboard/FAQ',
        },
        {
            name: 'Settings',
            Icon: IoMdSettings,
            link: '/admin-dashboard/Settings',
        },
        {
            name:"Profile",
            Icon:IoMdSettings,
            link:"/admin-dashboard/admin-profile"
        }
    ];

    return (
        <div className={`flex-col bg-white xl:h-full  px-2 pt-1 md:pt-2 w-[100%] h-[100vh] items-center shadow-md`}>
            <div className="flex gap-2 items-center pb-2 md:pb-4 md:px-6">
                <img className='w-14' src="../Logo.png" />
                <h2 className='hidden lg:block font-head text-3xl font-semibold text-gray'>Junito</h2>
            </div>
            <ul className='flex flex-col gap-4 overflow-y-scroll max-h-[80vh]'>
                {tabs.map((tab, index) => (
                    <Link key={index} to={tab.link}>
                        <li>
                            <div
                                className={`
                                    inline-flex w-full px-4 py-4 gap-4 items-center text-custom-gray 
                                    group  ease-in-out duration-300 hover:bg-gray hover:rounded-2xl hover:text-white
                                    ${location.pathname === tab.link ? 'bg-gray rounded-xl text-white shadow-2xl' : 'text-gray'}
                                `}>
                                <tab.Icon className='text-2xl' />
                                <div className={`hidden md:block font-Para text-lg `}>
                                    {tab.name}
                                </div>
                            </div>
                        </li>
                    </Link>
                ))}
                <li>
                    <div
                        className={`
                                    inline-flex w-full px-4 py-4 gap-4 items-center text-custom-gray text-gray
                                    group  ease-in-out duration-300 hover:bg-gray hover:rounded-2xl hover:text-white     
                                `}
                        onClick={() => {
                            sessionStorage.removeItem('AdminBizzToken')
                            navigate('/login')
                        }}
                    >
                        <PiSignOut className='text-2xl' />
                        <div className={`hidden md:block font-Para text-lg `}>
                            Sign Out
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Nav;