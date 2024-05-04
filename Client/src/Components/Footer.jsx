import React from 'react'
import { FaFacebook, FaInstagram, FaPhoneAlt, FaTwitter, FaYoutube } from 'react-icons/fa'
import { NavMenu } from '../Data/Navigation'
import { Link } from 'react-router-dom'
import { IoMdMail, IoMdPin } from 'react-icons/io'

FaInstagram

const Footer = () => {
    const SocialMedia = [
        {
            Title: "Facebook",
            Icon: FaFacebook,
            Link: ""
        },
        {
            Title: "Instagram",
            Icon: FaInstagram,
            Link: ""
        },
        {
            Title: "Twitter",
            Icon: FaTwitter,
            Link: ""
        }
    ]
    return (
        <>
            <div className='bg-gray mt-10 md:px-14 py-6 px-4'>
                <div className="md:w-[95%] m-auto">
                    <div className="flex flex-col xl:flex-row justify-between gap-10 lg:gap-20">
                        <div className='basis-[33.3333%]'>
                            <img src="./Logo2.png" alt="" className='w-[50px] md:w-[75px] h-auto mb-3 md:mb-5' />
                            <p className='text-white text-sm md:text-base font-light max-w-[90%] text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam numquam quia, alias iure ex omnis, quasi libero animi corporis in amet voluptas odit inventore quos officiis quo quod suscipit doloremque. Laborum commodi maxime fugiat?</p>
                        </div>
                        <div className="basis-[33.333%] text-white flex flex-row justify-between xl:flex-col gap-x-20">
                            <div className='flex flex-col gap-6 mb-8'>
                                <h2 className='text-lg md:text-xl font-extrabold font-para'>Quick Links</h2>
                                <div className="flex flex-col gap-2 md:gap-4">
                                    {NavMenu.map((item, index) => (
                                        <Link to={item.Link}>
                                            <h3 className='text-white text-sm md:text-base font-para font-light'>{item.Name}</h3>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                            <div className='flex flex-col gap-2 mb-8'>
                                <h2 className='text-lg md:text-xl font-extrabold font-para'>Follow Us</h2>
                                <div className="flex gap-2 md:gap-4">
                                    {SocialMedia.map((item, index) => (
                                        <a href={item.Link}>
                                            <item.Icon className='text-2xl md:text-3xl' />
                                        </a>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="md:basis-[33.3333%]  text-white">
                            <div className='flex flex-col gap-6 mb-8'>
                                <h2 className='text-lg md:text-xl font-extrabold font-para'>Contact Us</h2>
                                <div className="flex flex-col gap-6 font-para text-white text-lg">
                                    <div className="flex flex-row items-center gap-4 text-sm md:text-base">
                                        <IoMdMail className='text-xl' />
                                        SaulDesign@gmail.com
                                    </div>
                                    <div className="flex flex-row items-center gap-4 text-sm md:text-base">
                                        <FaPhoneAlt className='text-xl' />
                                        +123 456 789
                                    </div>
                                    <div className="flex flex-row items-center gap-4 text-sm md:text-base">
                                        <IoMdPin className='text-xl' />
                                        Paracelsusstrasse 7065084 Großgmain
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[100%] text-center py-2 text-xs  md:text-sm'>
                <p className='font-Para'>All rights reserved Junito 2024 ©</p>
            </div>
        </>
    )
}

export default Footer