import React from 'react'
import Accordion from '../Accordion'
import "./style.css"

const FAQ = () => {
    return (
        <>

            <div className='w-[95%] md:w-[90%] xl:w-[85%] m-auto py-14 lg:py-20'>
                <div className="text-center w-[100%] m-auto">
                    <h1 className='text-primary font-head text-3xl md:text-4xl lg:text-5xl font-bold text-center'>Frequently asked questions</h1>
                </div>
                <div className='flex flex-col lg:flex-row justify-between md:py-20 gap-8 relative'>
                    <img src="./Images/image.png" alt="" className='absolute -z-10  -right-[20%] top-0 bottom-0 w-[250px] md:w-[300px] lg:w-auto rotate-180' />
                    <div className="lg:basis-[55%]">
                        <Accordion />
                    </div>
                    <div className="lg:basis-[45%]">
                        <video class="w-full rounded-lg h-full" autoplay controls>
                            <source src="/docs/videos/flowbite.mp4" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>

        </>
    )
}

export default FAQ