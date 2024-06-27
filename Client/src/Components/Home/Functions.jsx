import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';
import { trimTo35Words, trimToWords } from '../../Data/UseFullFunction';



const Functions = () => {

    const [HR, setHR] = useState()
    const [Marketing, setMarketing] = useState()
    const [Startup, setStartup] = useState()
    const [Vertrieb, setVertrieb] = useState()
    const [SupportData, setSupportData] = useState()
    const [Assistent, setAssitent] = useState()

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const fetchPrompts = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/company/random`);
            if (response.ok) {
                const data = await response.json();
                setHR(data.HR?.PromptsList[0]?.value)
                setMarketing(data.Marketing?.PromptsList[0]?.value)
                setStartup(data.Startup?.PromptsList[0]?.value)
                setVertrieb(data.Vertrieb?.PromptsList[0]?.value)
                setSupportData(data.Support?.PromptsList[0]?.value)
                setAssitent(data?.Agentour?.PromptsList[0]?.value)
            } else {
                showAlert('Failed to fetch prompts', 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        fetchPrompts();
    }, []);

    const FeatureData = [
        {
            Head: "HR",
            desc: HR,
            ICON: './Functions/HR.png'
        },
        {
            Head: "Marketing",
            desc: Marketing,
            ICON: './Functions/Social.png'
        },
        {
            Head: "Support",
            desc: SupportData,
            ICON: './Functions/Support.png'
        },
        {
            Head: "Startup",
            desc: Startup,
            ICON: './Functions/HR.png'
        },
        {
            Head: "Vertrieb",
            desc: Vertrieb,
            ICON: './Functions/HR.png'
        },
        {
            Head: "Agent",
            desc: "Lorem ipsum dolor sit amet consectetur. Eu massa magna tristique facilisis. Quisque condimentum volutpat duis morbi amet odio dolor nibh. Nibh metus in consectetur non diam dapibus. Et fusce proin egestas commodo. Justo morbi justo lacus ac nisi amet. Et duis a sed tortor nibh eu nullam. Vitae sit duis eleifend congue a egestas lacus. Massa arcu at aliquam leo erat felis metus id sapien. Neque pretium vulputate nisl venenatis neque consequat mi netus.",
            ICON: './Functions/HR.png'
        },
        {
            Head: "Assistent",
            desc: "Lorem ipsum dolor sit amet consectetur. Eu massa magna tristique facilisis. Quisque condimentum volutpat duis morbi amet odio dolor nibh. Nibh metus in consectetur non diam dapibus. Et fusce proin egestas commodo. Justo morbi justo lacus ac nisi amet. Et duis a sed tortor nibh eu nullam. Vitae sit duis eleifend congue a egestas lacus. Massa arcu at aliquam leo erat felis metus id sapien. Neque pretium vulputate nisl venenatis neque consequat mi netus.",
            ICON: './Functions/HR.png'
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
                <div className='basis-[60%] w-[80%] md:w-[60%]'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        breakpoints={{
                            640: {
                                slidesPerView: 1,
                                spaceBetween: 20,
                            },
                            768: {
                                slidesPerView: 1.5,
                                spaceBetween: 40,
                            },
                            1024: {
                                slidesPerView: 2.5,
                                spaceBetween: 50,
                            },
                        }}
                        modules={[Autoplay, Pagination]}
                        className="mySwiper"
                    >
                        {FeatureData.map((item, index) => (
                            <SwiperSlide className='h-auto'>
                                <div className="bg-white rounded-lg flex flex-col gap-4 py-8 px-6 h-full justify-between shadow-shadow2 items-center">
                                    <div className="flex flex-col items-center gap-4">
                                        <img src={item.ICON} alt="" srcset="" className='w-[50px] h-[50px]' />
                                        <h2 className='text-2xl font-mont text-gray font-bold'>{item.Head}</h2>
                                        {item?.desc !== "" && <p className='font-para text-xs md:text-sm'>{trimTo35Words(item?.desc)}</p>}
                                    </div>
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