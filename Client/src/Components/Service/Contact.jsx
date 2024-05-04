import React from 'react'
import { Link } from 'react-router-dom'

const Contact = () => {
    return (
        <div className='bg-gray rounded-xl py-10 md:py-20 px-6 md:px-10 lg:px-20 2xl:px-40 w-[90%]  xl:w-[85%] m-auto'>
            <div className="flex flex-col md:flex-row justify-between gap-10">
                <div className="basis-[60%] flex flex-col gap-3 md:gap-6 justify-between">
                    <h2 className='font-mont textstyle text-lg md:text-xl lg:text-2xl xl:text-3xl'>/Contact us</h2>
                    <h1 className='font-play text-xl md:text-2xl xl:text-4xl text-white mb-2'>Have you decided to work on a project with us?</h1>
                    <Link to={'/contact'}>
                        <div className='relative flex gap-4 items-center group'>
                            <div className='bg-white w-[50px] h-[50px] lg:w-[75px] lg:h-[75px] rounded-full absolute -top-2 lg:-top-4 z-0 -left-2'></div>
                            <h3 className='font-play text-xl md:text-2xl lg:text-3xl text-white relative z-10 gradienttext font-bold'>Let’s talk!</h3>
                            <img src="./Porp/arrow.png" alt="" className='group-hover:translate-x-4 ease-in-out duration-300' />
                        </div>
                    </Link>
                </div>
                <div className="basis-[40%]">
                    <img src="./Banner/CTBanner.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Contact