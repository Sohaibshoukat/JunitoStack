import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { IoBag, IoChatboxEllipsesOutline, IoHome, IoLogOutOutline } from "react-icons/io5";
import { FaRobot } from "react-icons/fa6";
import { FaRegQuestionCircle, FaUserPlus } from "react-icons/fa";
import { SiGooglesheets } from 'react-icons/si';

const DashboardNav = () => {
    const navigate = useNavigate()
    const location = useLocation()

    const tabs = [
        {
            name: 'Dashboard',
            Icon: IoHome,
            link: '/dashboard/',
        },
        {
            name: 'ChatBot',
            Icon: FaRobot,
            link: '/dashboard/chatbot',
        },
        {
            name: 'Prompts',
            Icon: SiGooglesheets,
            link: '/dashboard/prompts-browsing',
        },
        {
            name: 'users',
            Icon: FaUserPlus,
            link: '/dashboard/users',
        },
        {
            name: 'To-do List',
            Icon: IoBag,
            link: '/dashboard/to-do',
        },
        {
            name: "Shared Chats",
            Icon: IoChatboxEllipsesOutline,
            link: '/dashboard/shared',
        },
        {
            name: 'FAQ',
            Icon: FaRegQuestionCircle,
            link: '/dashboard/faq',
        }
    ];

    return (
        <div className={`flex-col bg-primary xl:h-full  px-2 pt-2 md:pt-4 w-[100%] h-[100vh] items-center shadow-md `}>
            <div className="flex gap-2 items-center pb-2 md:pb-4 md:px-6">
                <img className='w-14' src="../Logo.png" />
                <h2 className='hidden lg:block font-head text-3xl font-semibold text-gray'>Junito</h2>
            </div>
            <ul className='flex flex-col gap-2 md:gap-4 overflow-y-scroll max-h-[90vh]'>
                {tabs.map((tab, index) => (
                    <Link key={index} to={tab.link}>
                        {tab.name == "Prompts" ?
                            <li>
                                <div
                                    className={`
                                inline-flex w-full px-2 md:px-4 py-2 md:py-3 gap-4 items-center text-darkgray justify-center lg:justify-start
                                group  ease-in-out duration-300 hover:bg-accence hover:rounded-2xl hover:text-primary
                                ${location.pathname.includes('prompts') ? 'bg-gray rounded-2xl text-white shadow-2xl' : 'text-gray'}
                            `}>
                                    <tab.Icon className='text-lg md:text-xl' />
                                    <div className={`hidden lg:block mb-0 font-para text-base `}>
                                        {tab.name}
                                    </div>
                                </div>
                            </li>
                            : <li>
                                <div
                                    className={`
                                    inline-flex w-full px-2 md:px-4 py-2 md:py-3 gap-4 items-center text-darkgray justify-center lg:justify-start
                                    group  ease-in-out duration-300 hover:bg-accence hover:rounded-2xl hover:text-primary
                                    ${location.pathname === tab.link ? 'bg-gray rounded-2xl text-white shadow-2xl' : 'text-gray'}
                                `}>
                                    <tab.Icon className='text-lg md:text-xl' />
                                    <div className={`hidden lg:block mb-0 font-para text-base `}>
                                        {tab.name}
                                    </div>
                                </div>
                            </li>}
                    </Link>
                ))}
                <li>
                    <div
                        className={`
                            inline-flex w-full px-2 md:px-4 py-2 md:py-3 gap-4 items-center text-darkgray text-gray justify-center lg:justify-start
                            group  ease-in-out duration-300 hover:bg-accence hover:rounded-2xl hover:text-primary
                        `}
                    >
                        <IoLogOutOutline className='text-lg md:text-xl' />
                        <div className={`hidden lg:block font-Para text-lg `}>
                            logOut
                        </div>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default DashboardNav;