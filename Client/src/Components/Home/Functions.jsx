import React from 'react'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';



const Functions = () => {
    const FeatureData = [
        {
            Head: "HR",
            desc: "Lorem ipsum dolor sit amet consectetur. Eu massa magna tristique facilisis. Quisque condimentum volutpat duis morbi amet odio dolor nibh. Nibh metus in consectetur non diam dapibus. Et fusce proin egestas commodo. Justo morbi justo lacus ac nisi amet. Et duis a sed tortor nibh eu nullam. Vitae sit duis eleifend congue a egestas lacus. Massa arcu at aliquam leo erat felis metus id sapien. Neque pretium vulputate nisl venenatis neque consequat mi netus.",
            ICON:'./Functions/HR.png'
        },
        {
            Head: "HR",
            desc: "Lorem ipsum dolor sit amet consectetur. Eu massa magna tristique facilisis. Quisque condimentum volutpat duis morbi amet odio dolor nibh. Nibh metus in consectetur non diam dapibus. Et fusce proin egestas commodo. Justo morbi justo lacus ac nisi amet. Et duis a sed tortor nibh eu nullam. Vitae sit duis eleifend congue a egestas lacus. Massa arcu at aliquam leo erat felis metus id sapien. Neque pretium vulputate nisl venenatis neque consequat mi netus.",
            ICON:'./Functions/HR.png'
        },
        {
            Head: "HR",
            desc: "Lorem ipsum dolor sit amet consectetur. Eu massa magna tristique facilisis. Quisque condimentum volutpat duis morbi amet odio dolor nibh. Nibh metus in consectetur non diam dapibus. Et fusce proin egestas commodo. Justo morbi justo lacus ac nisi amet. Et duis a sed tortor nibh eu nullam. Vitae sit duis eleifend congue a egestas lacus. Massa arcu at aliquam leo erat felis metus id sapien. Neque pretium vulputate nisl venenatis neque consequat mi netus.",
            ICON:'./Functions/HR.png'
        },
        {
            Head: "HR",
            desc: "Lorem ipsum dolor sit amet consectetur. Eu massa magna tristique facilisis. Quisque condimentum volutpat duis morbi amet odio dolor nibh. Nibh metus in consectetur non diam dapibus. Et fusce proin egestas commodo. Justo morbi justo lacus ac nisi amet. Et duis a sed tortor nibh eu nullam. Vitae sit duis eleifend congue a egestas lacus. Massa arcu at aliquam leo erat felis metus id sapien. Neque pretium vulputate nisl venenatis neque consequat mi netus.",
            ICON:'./Functions/HR.png'
        },
        {
            Head: "HR",
            desc: "Lorem ipsum dolor sit amet consectetur. Eu massa magna tristique facilisis. Quisque condimentum volutpat duis morbi amet odio dolor nibh. Nibh metus in consectetur non diam dapibus. Et fusce proin egestas commodo. Justo morbi justo lacus ac nisi amet. Et duis a sed tortor nibh eu nullam. Vitae sit duis eleifend congue a egestas lacus. Massa arcu at aliquam leo erat felis metus id sapien. Neque pretium vulputate nisl venenatis neque consequat mi netus.",
            ICON:'./Functions/HR.png'
        },
        {
            Head: "HR",
            desc: "Lorem ipsum dolor sit amet consectetur. Eu massa magna tristique facilisis. Quisque condimentum volutpat duis morbi amet odio dolor nibh. Nibh metus in consectetur non diam dapibus. Et fusce proin egestas commodo. Justo morbi justo lacus ac nisi amet. Et duis a sed tortor nibh eu nullam. Vitae sit duis eleifend congue a egestas lacus. Massa arcu at aliquam leo erat felis metus id sapien. Neque pretium vulputate nisl venenatis neque consequat mi netus.",
            ICON:'./Functions/HR.png'
        }
    ]
    return (
        <div className='w-[100%] bg-white relative mb-24 overflow-x-hidden'>
            <div className='absolute w-[100%] md:w-[70%] bg-gray -z-0 h-[100%]'></div>
            <div className='flex flex-col md:flex-row  items-center py-12 md:py-20 gap-16'>
                <div className='lg:basis-[30%] xl:basis-[30%] relative z-10 w-[90%] md:w-auto md:ml-20'>
                    <h1 className='text-lg md:text-xl font-mont lg:text-2xl xl:text-4xl font-bold md:max-w-[70%] text-white mb-5 xl:mb-8'>Functionalities</h1>
                    <p className='font-para text-sm text-white'>Embark on a journey of innovation with our AI chatbot companions. From personalized customer interactions to seamless automation solutions, we're here to shape the future of communication, one conversation at a time.</p>
                </div>
                <div className='basis-[60%] w-[80%] md:w-[70%]'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={2}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 2500,
                            disableOnInteraction: false,
                        }}
                        modules={[Pagination, Autoplay]}
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
                            1200:{
                                slidesPerView: 3,
                                spaceBetween: 50,
                            }
                        }}
                        className="mySwiper my-4"
                    >
                        {FeatureData.map((item,index)=>(
                        <SwiperSlide>
                            <div className="bg-white rounded-lg flex flex-col gap-4 py-8 px-6 shadow-shadow2 items-center">
                                <img src={item.ICON} alt="" srcset="" className='w-[50px] h-[50px]' />
                                <h2 className='text-2xl font-mont text-gray font-bold'>{item.Head}</h2>
                                <p className='font-para text-xs md:text-sm'>{item.desc}</p>
                                <button className='bg-gray border-2 border-gray rounded-xl py-2 hover:bg-transparent hover:text-gray px-6 text-white text-lg ease-in-out duration-300'>Read More</button>
                            </div>
                        </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </div>

        </div>
    )
}

export default Functions