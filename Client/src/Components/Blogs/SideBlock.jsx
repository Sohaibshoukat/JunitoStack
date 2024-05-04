import React from 'react'
import ReacentPost from './ReacentPost'
import { IoMdSearch } from 'react-icons/io'

const SideBlock = () => {
    return (
        <div className='flex flex-col gap-10'>
            <div className='lg:flex hidden justify-between items-center bg-white py-2 px-4 rounded-lg '
                style={{ boxShadow: "1px 0px 24.299999237060547px 1px #00000040" }}>
                <input type="text" placeholder='Search' className='bg-transparent outline-none active:outline-none text-2xl font-Para' />
                <IoMdSearch className='text-3xl font-bold'/>
            </div>
            <div
                className='bg-white p-4 rounded-lg'
                style={{ boxShadow: "1px 0px 24.299999237060547px 1px #00000040" }}
            >
                <ReacentPost />
            </div>
            <div
                className='bg-black py-8 px-6 rounded-lg flex flex-col gap-2 text-white'
                style={{ boxShadow: "1px 0px 24.299999237060547px 1px #00000040" }}
            >
                <h2 className='font-Para text-3xl font-bold'>Contact Us</h2>
                <p className='font-Para text-lg font-normal mb-6'>We are here to help you! Tell us how we can help and we’ll get in touch within next 24hrs</p>
                <button className='py-3 w-[100%] border-2 text-2xl font-bold border-white hover:bg-white hover:text-black font-Para rounded-xl ease-in-out duration-300'>Contact us</button>
            </div>
        </div>
    )
}

export default SideBlock