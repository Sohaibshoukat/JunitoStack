import React, { useEffect, useRef, useState } from 'react'
// import { FaCirclePlay } from "react-icons/fa6"
import {useNavigate} from "react-router-dom"
import '../../App.css'

const Banner = () => {
    const [isVisible, setIsVisible] = useState(false);
    const whyUsRef = useRef(null);

    const navigate = useNavigate()

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
                className=" flex flex-col md:flex-row gap-16 md:gap-0 justify-between items-center xl:h-[120vh] 2xl:h-[100vh] h-[100%] relative pt-28 pb-16 md:pt-28 md:pb-11 2xl:py-0  FadeIn"
            >
                <div className='flex flex-col justify-center px-6 text-left gap-2 lg:gap-4 md:px-10 xl:px-20 md:w-1/2 '>
                    <h1 className=' text-gray text-base lg:text-lg xl:text-xl font-light font-head  mb-0 xl:mb-2'>Von täglichen Aufgaben bis hin zu komplexen Unternehmensstrategien</h1>
                    <h1 className=' text-gray text-2xl xl:text-3xl 2xl:text-4xl font-bold font-head  mb-0 xl:mb-2'>Revolutionieren Sie Ihr Business mit BizBot</h1>
                    <p className=' text-black text-sm md:text-base xl:text-lg font-normal  font-Para'>Entdecken Sie, wie BizBot durch KI-gesteuerte Lösungen die Art und Weise, wie Sie Geschäfte machen, verändern kann. Sparen Sie Zeit, reduzieren Sie Kosten und skalieren Sie Ihr Unternehmen ohne den Bedarf an zusätzlichen Ressourcen.</p>
                    <a 
                        className='text-white my-2 text-base lg:text-base font-para px-2 py-2 md:px-6 rounded-xl bg-gray hover:text-black hover:bg-transparent hover:border-gray border-2 w-fit border-gray duration-300 ease-in-out'
                        href='#function'
                    >
                        Entdecken Sie KI-Lösungen

                    </a>
                </div>
                <div 
                    className='relative md:w-1/2 flex flex-col items-center justify-center'
                >
                    <img src="./Banner/bgBanner.png" alt="" className='absolute z-0 h-auto  2xl:-top-32 ' />
                    <img src="./Banner/HomeBg4.png" alt="" className='w-[90%] md:w-[80%] z-10' />
                    
                </div>
            </div>
           
        </>
    )
}

export default Banner