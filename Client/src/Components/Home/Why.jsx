import React from 'react'
import { WhyUs } from '../../Data/Whatyougot'


const Why = () => {
    return (
        <div className='relative my-8'>
            <div className='w-[90%] md:w-[90%] xl:w-[80%] m-auto relative'>
                <h1 className='font-head text-center text-gray text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold'>Why JUNITO?</h1>
                <div className="py-8 md:py-16">
                    <div className='flex flex-col lg:flex-row justify-between gap-16'>
                        {WhyUs.map((item, index) => (
                            <>
                                <div className="relative basis-[30%]">
                                    <div className='w-[60%] h-[60%] absolute -top-3 -right-3 -z-10 rounded-2xl bg-gray'></div>
                                    <div className='w-[60%] h-[60%] absolute -bottom-3 -left-3 -z-10 rounded-2xl bg-gray'></div>
                                    <div className="flex relative flex-col justify-start  z-10 h-[100%] bg-white shadow-shadow rounded-2xl py-6 px-6 gap-10 items-start">
                                        <div className="relative rounded-xl bg-gray p-3">
                                            <item.Image className='text-white text-3xl' />
                                        </div>
                                        <div className='flex text-left justify-between flex-col gap-y-2 md:basis-[50%]'>
                                            <h1 className='text-base md:text-lg tracking-wide font-bold font-para'>{item.Heading}</h1>
                                            <p className=' text-sm md:text-base font-normal mb-4 font-para'>{item.Para}</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Why