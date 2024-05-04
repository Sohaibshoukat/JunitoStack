import React from 'react'
import { TestimonalData } from '../../Data/Testimonial'
import Rating from '@mui/material/Rating';
import { styled } from '@mui/material/styles';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from "swiper/react";


import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const StyledRating = styled(Rating)({
    '& .MuiRating-iconFilled': {
        color: '#ADFC32',
    }
});

const Testimonial = () => {
    return (
        <div className="w-[100%] md:w-[90%] xl:w-[80%] m-auto my-1">
            <h1 className='text-3xl md:text-4xl font-head lg:text-5xl font-bold text-center md:max-w-[70%] m-auto lg:mb-20 xl:mb-20'>Slice List is approved by industry leaders</h1>
            <div className="hidden md:grid grid-cols-1 lg:grid-cols-2 gap-6">
                {TestimonalData.map((item, index) => (
                    <div className='bg-black group hover:bg-white hover:shadow-2xl ease-in-out duration-300 shadow-lg w-[100%] py-10 px-8 md:py-10 md:px-10 m-auto' key={index}>
                        <StyledRating
                            name="customized-color"
                            readOnly
                            defaultValue={item.rating}
                            className='mb-5 md:mb-6 '
                        />
                        <h1 className='text-white group-hover:text-black ease-in-out duration-300 lg:text-3xl xl:text-4xl font-bold mb-3 font-head'>{item.heading}</h1>
                        <p className='text-white group-hover:text-black ease-in-out duration-300 text-base md:text-base mb-10'>{item.desc}</p>
                        <div className='flex flex-row gap-4'>
                            <img src={item.image} alt="" className='w-[50px] h-[50px] md:w-[75px] md:h-[75px] rounded-[50%]' />
                            <div className='flex flex-col gap-0 text-white ease-in-out duration-300 group-hover:text-black justify-center'>
                                <h2 className='text-xl md:text-2xl font-bold font-head'>{item.name}</h2>
                                <h3 className='text-lg md:text-lg font-light'>{item.position} @{item.company}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className='md:hidden mt-10 mb-5 m-auto'>
                <Swiper
                    spaceBetween={30}
                    // pagination={{
                    //     clickable: true,
                    // }}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay]}
                    className="h-fit py-8 md:py-16 px-5 md:px-10"
                >
                    {TestimonalData.map((item, index) => (
                        <SwiperSlide key={index} className='m-auto'>
                            <div className='bg-black shadow-2xl w-[100%] py-6 px-8 md:py-10 md:px-10 m-auto' key={index}>
                                <StyledRating
                                    name="customized-color"
                                    readOnly
                                    defaultValue={item.rating}
                                    className='mb-3 md:mb-6 '
                                />
                                <h1 className='text-white text-xl lg:text-3xl xl:text-4xl font-bold mb-3 font-head'>{item.heading}</h1>
                                <p className='text-white text-sm md:text-base mb-5 md:mb-10'>{item.desc}</p>
                                <div className='flex flex-row gap-4'>
                                    <img src={item.image} alt="" className='w-[50px] h-[50px] md:w-[75px] md:h-[75px] rounded-[50%]' />
                                    <div className='flex flex-col gap-0 text-white  text-left'>
                                        <h2 className='text-lg md:text-2xl font-bold font-head'>{item.name}</h2>
                                        <h3 className='text-base md:text-lg font-light'>{item.position} @{item.company}</h3>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
            <div className='flex flex-col justify-center items-center py-4 md:py-16'>
                <button className='bg-black text-white font-Para rounded-lg px-4 py-2 text-xl font-semibold text-center hover:bg-accence hover:text-black duration-300 ease-in-out'>Start gathering zero party data</button>
            </div>
        </div>
    )
}

export default Testimonial

{/*  */ }