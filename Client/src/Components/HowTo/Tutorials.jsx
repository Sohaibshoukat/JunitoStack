import React from 'react'
import { FaPlay } from "react-icons/fa6";
import { FaCircle } from "react-icons/fa";



const Tutorials = () => {
    return (
        <>
            <div className='relative'>
                <img src="./Images/image.png" alt="" className='absolute -z-10 -bottom-[50%] -left-[10%] w-[250px] md:w-[300px] lg:w-auto' />
                <img src="./Images/image.png" alt="" className='rotate-180 absolute -z-10 -top-[60%] -right-[10%] w-[250px]  md:w-[300px] lg:w-auto' />
                <div className='flex flex-row items-center justify-center py-14 md:py-24 xl:py-32 relative'>
                    <h1 className='text-primary font-head text-3xl sm:text-3xl font-extrabold md:text-6xl uppercase text-center'>BEGIN WITH TUTORIALS, THRIVE <br /> WITH OUR SUPPORT!</h1>
                </div>
                <div
                    className='flex gap-10 md:gap-0 w-[95%] md:w-[90%] lg:w-[80%] xl:w-[70%] m-auto flex-col md:flex-row justify-between'
                >
                    <div className='order-10 md:order-none rounded-lg md:rounded-l-lg md:rounded-r-none bg-primary flex justify-center items-center hover:cursor-pointer basis-[50%]'>
                        <div className='py-20 flex justify-center items-center relative'>
                            <FaCircle className='text-gray-500 text-7xl relative' />
                            <FaPlay className='text-accence absolute text-2xl ' />
                        </div>
                    </div>
                    <div
                        class="md:py-20 gap-2 md:gap-5 p-6 bg-white border border-gray-200 rounded-lg md:rounded-r-lg md:rounded-l-none flex flex-col justify-center items-center basis-[50%]"
                        style={{ boxShadow: "1px 1px 7.800000190734863px 0px #00000040" }}
                    >
                        <h5 class="md:mb-2 text-2xl md:text-2xl lg:text-4xl font-extrabold tracking-tight text-primary text-center uppercase font-head ">How to create Email Countdown question?</h5>
                        <p class="mb-3 font-para font-normal text-primary text-base md:text-base lg:text-lg text-justify">Lorem ipsum dolor sit amet consectetur. Imperdiet nisi quam hendrerit sapien. Volutpat nullam libero suscipit leo a. Donec proin egestas egestas nullam egestas turpis volutpat. Consectetur in tellus quisque lacus consequat amet sagittis.</p>
                        <div className='text-center'>
                            <button className='inline-flex items-center px-6 py-2 text-lg md:text-xl font-bold   text-center text-white bg-primary rounded-xl hover:bg-accence hover:text-primary  duration-300 ease-in-out'>Watch Tutorial</button>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Tutorials
