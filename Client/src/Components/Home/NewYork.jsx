import React from 'react'
import { FaVideo } from 'react-icons/fa6'

const NewYork = () => {


    return (
        <div className='bg-white w-[100vw] py-10 md:py-20'>
            <div className='w-[90%] md:w-[90%] xl:w-[85%] m-auto'>
                <div className='flex flex-col lg:flex-row justify-between gap-y-16 gap-x-6 lg:items-center'>

                    <div className='xl:basis-[45%] md:basis-[50%] lg:w-[50%] flex flex-col items-center'>
                        <h2 className='text-gray font-bold text-xl md:text-xl font-mont lg:text-2xl xl:text-3xl mb-4'>New Work Coaching - SMEs rethought</h2>
                        <button className='flex flex-row bg-transparent border-2 m-auto my-4 rounded-xl text-gray font-bold text-sm md:text-base font-para border-gray items-center  justify-center gap-2 py-2 px-6 hover:bg-gray hover:text-white ease-in-out duration-300'>
                            <FaVideo />
                            Available Online
                        </button>
                        <p className='text-black text-sm md:text-base text-left self-start xl:text-base font-para mb-2'>Especially for owners and managers | Shape the future...</p>
                        <div className='flex flex-row justify-center gap-6'>
                            <p className='text-gray text-sm md:text-base xl:text-lg font-para mb-2'>4 hours</p>
                            <p className='text-gray text-sm md:text-base xl:text-lg font-para mb-2'>€500</p>
                        </div>
                        <button className='bg-gray m-auto border-2 border-gray rounded-xl py-2 hover:bg-transparent hover:text-gray px-6 text-white text-lg ease-in-out duration-300'>Request Booking</button>
                    </div>
                    <div className='xl:basis-[50%] md:basis-[50%] lg:w-[50%] w-[100%] relative'>
                        <div className='w-[60%] h-[60%] absolute -top-2 right-4 xl:right-8 -z-0 rounded-2xl bg-gray'></div>
                        <div className='w-[60%] h-[60%] absolute -bottom-2 left-4 xl:left-8 -z-0 rounded-2xl bg-gray'></div>
                        <img src="./Banner/NewYork.png" alt="" className='w-[90%] m-auto z-10 relative' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NewYork