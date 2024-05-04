import React, { useEffect, useRef, useState } from 'react'
// import { FaCirclePlay } from "react-icons/fa6"
import '../../App.css'

const Banner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const whyUsRef = useRef(null);

    const handleScroll = () => {
        const top = whyUsRef.current.getBoundingClientRect().top;
        const isVisible = top < window.innerHeight;
        if (isVisible) {
            setIsVisible(isVisible);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    return (
        <>

            <div 
                className=" flex flex-col md:flex-row gap-16 md:gap-0 justify-between items-center xl:h-[120vh] 2xl:h-[100vh] h-[100%] relative pt-28 pb-16 md:pt-36 md:pb-11 2xl:py-0  FadeIn"
            >
                <div className='flex flex-col justify-center px-6 text-left gap-2 lg:gap-4 md:px-10 xl:px-20 m-auto md:w-1/2 '>
                    <h1 className=' text-gray text-base lg:text-lg xl:text-xl font-light font-head  mb-0 xl:mb-2'>Envisioning the Future</h1>
                    <h1 className=' text-gray text-2xl xl:text-3xl 2xl:text-4xl font-bold font-head  mb-0 xl:mb-2'>Crafting Tomorrow’s <br/> Ai Narrative</h1>
                    <p className=' text-black text-sm md:text-base xl:text-lg font-normal  font-Para'>Designed for forward thinking marketing agencies , this template encapsulates ai chatbots for different departments. </p>
                    <button className='text-white my-2 text-base lg:text-base font-para px-2 py-2 md:px-6 rounded-xl bg-gray hover:text-black hover:bg-transparent hover:border-gray border-2 w-fit border-gray duration-300 ease-in-out'>Explore AI Solutions</button>
                </div>
                <div 
                    className='relative md:w-1/2 flex flex-col items-center justify-center'
                >
                    <img src="./Banner/bgBanner.png" alt="" className='absolute z-0 h-auto lg:-top-20 2xl:-top-32 ' />
                    <img src="./Banner/HomeBg4.png" alt="" className='w-[90%] md:w-[80%] z-10' />
                    
                </div>
            </div>
           
        </>
    )
}

export default Banner