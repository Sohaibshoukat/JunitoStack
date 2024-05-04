import React, { useState } from 'react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';

const PromptsSlider = ({Model,setModel}) => {


    const FeatureData = [
        {
            desc: "Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  ",
            ICON: '../Prompt/img1.png'
        },
        {
            desc: "Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  ",
            ICON: '../Prompt/img1.png'
        },
        {
            desc: "Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  ",
            ICON: '../Prompt/img1.png'
        },
        {
            desc: "Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  ",
            ICON: '../Prompt/img1.png'
        },
        {
            desc: "Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  ",
            ICON: '../Prompt/img1.png'
        },
        {
            desc: "Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  ",
            ICON: '../Prompt/img1.png'
        },
        {
            desc: "Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  ",
            ICON: '../Prompt/img1.png'
        },
        {
            desc: "Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  ",
            ICON: '../Prompt/img1.png'
        },
        {
            desc: "Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  ",
            ICON: '../Prompt/img1.png'
        },
        {
            desc: "Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  ",
            ICON: '../Prompt/img1.png'
        },
        {
            desc: "Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  ",
            ICON: '../Prompt/img1.png'
        }
    ]

    return (
        <>

            <div className='w-[95%] md:w-[90%] m-auto'>
                <Swiper
                    slidesPerView={1}
                    spaceBetween={2}
                    navigation={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    modules={[Autoplay, Navigation]}
                    breakpoints={{
                        640: {
                            slidesPerView: 1,
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 40,
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                        },
                        1200: {
                            slidesPerView: 3,
                            spaceBetween: 50,
                        }
                    }}
                    className="mySwiper my-4 mb-6"
                >
                    {FeatureData.map((item, index) => (
                        <SwiperSlide className=''>
                            <div className='w-[80%] lg:w-[100%] relative m-auto' onClick={()=>{setModel(true)}}>
                                <img src={item.ICON} alt="" srcset="" className='rounded-2xl' />
                                <div className="bg-white rounded-lg absolute bottom-0 text-sm flex flex-col gap-4 py-2 md:py-2 px-3 md:px-2 w-[] shadow-shadow2 items-center">
                                    <p className='font-para text-sm'>{item.desc}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </>
    )
}

export default PromptsSlider