import React from 'react'

const Features = () => {
    return (
        <div className='w-[100%] bg-gray'>
            <div className="w-[90%] md:w-[90%] xl:w-[85%] m-auto py-12 md:py-20">
                <div className="flex flex-col-reverse lg:flex-row justify-between items-center gap-20 lg:gap-5 2xl:gap-10">
                    <div className='basis-[50%] max-w-xl'>
                        <div className='bg-white relative pb-6 pt-14 px-6 md:px-8 rounded-lg'>
                            <div className="w-fit rounded-full bg-white p-1 absolute -top-[40px]">
                                <img src="./Features/Feature1.png" alt="" className='rounded-full w-20 h-20 ml-1' />
                            </div>
                            <h2 className='text-gray font-mont text-lg md:text-xl font-bold mb-5'>Broad Spectrum of Knowledge</h2>
                            <p className='font-para text-sm md:text-base text-[#0C111F]'>Unlock the power to address a wide range of business areas including HR, Marketing, Sales, and Assistance with our versatile tool. Designed to cater to the multifaceted needs of SMEs, our solution streamlines operations across various departments.</p>
                        </div>
                    </div>
                    <div className='lg:basis-[50%] xl:basis-[40%]'>
                        <h1 className='text-lg md:text-xl font-mont lg:text-2xl xl:text-3xl font-bold md:max-w-[70%] text-white mb-5 xl:mb-8'>Key Features</h1>
                        <p className='font-para text-sm md:text-base text-white xl:w-[80%]'>These are some of the features that you will get if you cooperate with us, of course there are many more.</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features