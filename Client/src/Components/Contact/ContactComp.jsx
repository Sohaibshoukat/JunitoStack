import React from 'react'
import { FaFacebookF, FaInstagram, FaPhoneAlt, FaTwitter } from 'react-icons/fa'
import { IoMdMail, IoMdPin } from 'react-icons/io'
import ContactForm2 from './ContactForm2'

const ContactComp = () => {
    return (
        <>
            <div className="bg-gray w-[90%] m-auto rounded-2xl py-4 md:py-8 px-4 md:px-8">
                <div className="flex lg:flex-row flex-col gap-10 justify-between">
                    <div className="basis-[40%] flex flex-col gap-10">
                        <h1 className='text-white font-para text-xl md:text-2xl lg:text-3xl font-bold'>
                            Let’s discuss on something <span className='text-black'>cool</span> together
                        </h1>

                        <div className="flex flex-col gap-6 font-para text-white text-sm md:text-lg">
                            <div className="flex flex-row items-center gap-4">
                                <IoMdMail className='text-2xl' />
                                SaulDesign@gmail.com
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <FaPhoneAlt className='text-2xl' />
                                +123 456 789
                            </div>
                            <div className="flex flex-row items-center gap-4">
                                <IoMdPin className='text-2xl' />
                                123 Street 456 House
                            </div>
                        </div>

                        <div className='flex gap-4'>
                            <div className='text-white p-2 hover:bg-white bg-transparent hover:text-gray rounded-full ease-in-out duration-300'>
                                <FaFacebookF className='text-2xl' />
                            </div>
                            <div className='text-white p-2 hover:bg-white bg-transparent hover:text-gray rounded-full ease-in-out duration-300'>
                                <FaInstagram className='text-2xl' />
                            </div>
                            <div className='text-white p-2 hover:bg-white bg-transparent hover:text-gray rounded-full ease-in-out duration-300'>
                                <FaTwitter className='text-2xl' />
                            </div>
                        </div>
                    </div>
                    <div className="basis-[60%]">
                        <ContactForm2/>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ContactComp