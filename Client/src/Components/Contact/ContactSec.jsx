import React, { useContext } from 'react'
import ContactForm from './ContactForm'
import { FaArrowRight } from 'react-icons/fa'

const ContactSec = () => {


    const Dataset = [
        "Fill out the support form",
        "You wait, we'll get started",
        "Get your solution"
    ]

    return (
        <div className={`relative h-auto  w-[90%] md:w-[95%] xl:w-[90%] m-auto my-20`}>
            <h1 className='text-lg md:text-2xl font-mont lg:text-3xl xl:text-4xl font-bold text-center text-gray mb-5 xl:mb-14'>Contact Us</h1>
            <div className={`bg-white p-2 md:p-4 shadow-shadow2 rounded-2xl`}>
                <div className={`bg-white rounded-2xl py-14 px-2 md:px-6`}>
                    <div className="flex flex-col xl:flex-row gap-20 justify-between">
                        <div className="basis-[40%]">
                            <ContactForm />
                        </div>
                        <div className="basis-[60%] flex flex-col gap-8 justify-between">
                            <div className={`flex text-black flex-col gap-8`}>
                                <h2 className='font-mont text-lg md:text-xl lg:text-2xl font-bold text-gray'>3 steps to solutions</h2>
                                <div className="flex flex-col md:flex-row gap-2 text-white">
                                    {Dataset.map((item, index) => (
                                        <div
                                            className={` group basis-[33.333%] hover:basis-[45%] hover:shadow-2xl p-[2px] rounded-2xl  ease-in-out duration-500`}
                                            key={index}
                                        >
                                            <div className={`bg-gray py-6 px-4 h-[100%] rounded-2xl`}>
                                                <div className="flex flex-col gap-4 h-[100%]">
                                                    <h2 className='font-mont font-bold text-base md:text-lg lg:text-xl'>0{index + 1}</h2>
                                                    <h1 className='font-para text-sm md:text-base lg:text-lg'>{item}</h1>
                                                    <FaArrowRight className="text-white text-xl opacity-0 group-hover:opacity-100 ease-in-out duration-300 self-end justify-self-end" />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="bg-gray text-white rounded-2xl px-4">
                                <div className="flex flex-col-reverse md:flex-row items-center justify-between">
                                    <div className="basis-[60%] py-8">
                                        <h2 className=' font-head text-lg md:text-xl lg:text-2xl font-bold mb-4'>Special Request?</h2>
                                        <p className='font-para text-sm md:text-base lg:text-lg font-normal'>Is your page not accessible or is displayed completely incorrectly?</p>
                                        <p className='font-para text-sm md:text-base lg:text-lg font-normal'>Then call us directly!</p>
                                    </div>
                                    <div className="basis-[50%] -mt-10 md:-mt-20">
                                        <img src="./Owner.png" alt="" className='w-[100%] h-[100%]' />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ContactSec