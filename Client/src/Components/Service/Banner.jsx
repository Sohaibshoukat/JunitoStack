import React from 'react'

const Banner = () => {
    return (
        <div className='relative h-[100%] z-10'>
            <div className="bg-gray w-[100%] h-[80%] md:h-[60%] absolute z-0">
                <img src="./Porp/circle1.png" alt="" className='absolute w-[200px] -bottom-[30%] md:-bottom-8 left-0' />
                <img src="./Porp/circle2.png" alt="" className='absolute w-[200px] top-8 right-0' />
            </div>
            <div className="relative z-10 pb-10 md:pb-20 pt-28 lg:pt-44">
                <div className="flex flex-col lg:flex-row justify-between gap-6 md:gap-12 2xl:gap-24 w-[90%] 2xl:w-[80%] mb-8 md:mb-12 lg:mb-24 m-auto">
                    <h1 className='basis-[50%] text-white font-bold font-play text-xl md:text-3xl 2xl:text-5xl'>We are <span className='textstyle'>always</span> there for all your needs</h1>
                    <p className='basis-[50%] font-para text-base md:text-lg text-white'>Welcome to the JUNITO Ai company where we provide you the Ai Chatbots for different departments like HR, Sales etc. Collaborate with us and find best services and engage your future with AI. we can provide you different features to associate with Ai.</p>
                </div>
                <div className='m-auto w-[90%] 2xl:w-[80%]'>
                    <img src="./Banner/servicebanner.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Banner