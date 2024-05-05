import React, { useState } from 'react'
import { NavMenu } from '../Data/Navigation'
import { Link } from 'react-router-dom'
import { FaUserCircle } from "react-icons/fa";
import { IoMdMenu } from "react-icons/io"
import { IoClose } from "react-icons/io5"

const Nav = () => {
    const [MobileMenu, setMobileMenu] = useState(false)
    const [display, setDisplay] = useState(false)
    return (
        <>
            <div className="bg-white shadow-xl flex fixed z-50 flex-row justify-between items-center px-6 md:px-14 w-[100vw]">
                <div className='md:basis-[25%]'>
                    <Link to={"/"} onClick={() => {
                        setDisplay(true);
                        setTimeout(() => {
                            setDisplay(false)
                        }, 50);
                    }}>
                        <img src="../Logo.png" alt="" className='w-[50px] md:w-[75px] h-[auto]' />
                    </Link>
                </div>
                <div className={`${display && 'hidden'} hidden xl:flex gap-4 basis-[50%] justify-center`}>
                    {NavMenu.map((item, index) => (
                        <Link to={item.Link} onClick={() => {
                            setDisplay(true);
                            setTimeout(() => {
                                setDisplay(false)
                            }, 50);
                        }}>
                            <h1 
                                className={`
                                    font-extrabold text-base py-2 px-4 hover:bg-accence font-para hover:text-primary ease-in-out duration-300 rounded-lg 
                                    ${window.location.pathname === item.Link ? "bg-gray text-white" : "text-black"}`
                                }
                            >
                                {item.Name}
                            </h1>
                        </Link>
                    ))}
                </div>
                <div className='hidden xl:block basis-[25%] '>
                    <Link to={"/login"}>
                        <div className='
                            bg-gray float-right font-para text-white flex items-center gap-2 py-2 px-4 text-base w-fit rounded-lg font-bold
                            hover:bg-accence  duration-300 ease-in-out
                        '>
                            <FaUserCircle className='text-xl' />
                            Login/Register
                        </div>
                    </Link>
                </div>
                <div className='xl:hidden'>
                    <IoMdMenu className='text-3xl text-gray font-extrabold' onClick={() => { setMobileMenu(true) }} />
                </div>
            </div>
            <div className={`${MobileMenu ? 'block RightOpenanimation' : 'hidden'} fixed z-50 xl:hidden top-0 bottom-0 left-0 right-0`}>
                <div className="bg-black/40 z-0 absolute left-0 top-0 right-0 bottom-0" onClick={() => { setMobileMenu(false) }}></div>
                <div className='z-10 relative bg-gray w-[70%] md:w-[50%] h-[100%] py-4 px-6 md:py-6 md:px-8'>
                    <IoClose className='absolute top-[0.75rem] md:top-[1.5rem] right-[15px] text-white text-4xl font-extrabold' onClick={() => { setMobileMenu(false) }} />
                    <div className="flex flex-col h-[100%]">
                        <div className='mb-20'>
                            <Link to={"/"} onClick={() => { setMobileMenu(false) }}>
                                <img src="./Logo2.png" alt="" className='w-[50px] h-[auto]' />
                            </Link>
                        </div>
                        <div className='flex flex-col h-[100%] justify-between mb-4'>
                            <div className={`flex flex-col gap-2 justify-center`}>
                                {NavMenu.map((item, index) => (
                                    <Link to={item.Link} onClick={() => { setMobileMenu(false) }}>
                                        <h1 className={` font-para text-white font-extrabold text-base py-2 px-4 hover:bg-accence hover:text-primary ease-in-out duration-300 rounded-lg ${window.location.pathname == item.Link && "bg-accence text-primary"}`}>{item.Name}</h1>
                                    </Link>
                                ))}
                            </div>
                            <div className='xl:hidden md:block'>
                                <Link to={"/login"}>
                                    <div className='
                                    bg-white text-black flex items-center gap-2 py-2 px-4 lg:py-4 lg:px-6 text-base w-fit rounded-lg font-extrabold
                                    hover:bg-accence font-para  duration-300 ease-in-out
                                    '>
                                        <FaUserCircle className='text-xl' />
                                        Login/Register
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav