import React from 'react'
import ContactComp from '../../Components/Contact/ContactComp'
import Nav from '../../Components/Nav'
import Footer from '../../Components/Footer'

const Contact = () => {
    return (
        <>
            <Nav />
            <div
                className=" flex flex-col md:flex-row gap-16 md:gap-0 justify-between items-center xl:h-[90vh] 2xl:h-[90vh] h-[100%] relative pt-28 pb-16 md:pt-36 md:pb-11 2xl:py-0  FadeIn"
            >
                <div className='flex flex-col justify-center px-6 text-left gap-2 lg:gap-4 md:px-10 xl:px-20 m-auto md:w-1/2 '>
                    <h1 className=' text-gray text-sm md:text-lg xl:text-xl font-light font-para  mb-0 xl:mb-2'>FAST BUSINESS SUPPORT</h1>
                    <h1 className=' text-gray text-xl md:text-2xl lg:text-3xl xl:text-4xl font-extrabold font-mont  mb-0 xl:mb-2'>Grow beyond yourself professionally  by Contact Us and get our business related services.</h1>
                </div>
                <div
                    className='relative md:w-1/2 flex flex-col items-center justify-center'
                >
                    <img src="./Banner/BannerContact.png" alt="" className='w-[70%]' />

                </div>
            </div>

            <ContactComp />

            <Footer />
        </>
    )
}

export default Contact