import React, { useContext, useState, useEffect } from 'react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from 'swiper/react';
import BotDepContext from '../../Context/BotContaxt/BotDepContext';
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';
import { trimToWords } from '../../Data/UseFullFunction';
import PromptDetailModel from './PromptDetail/PromptDetailModel';

const PromptsSlider = ({ Model, setModel, setSelectedID }) => {

    const departcontext = useContext(BotDepContext);
    const { department } = departcontext;

    const aletContext = useContext(AlertContext);
    const { showAlert } = aletContext;

    const [featureData, setFeatureData] = useState([]);
    // const [Model, setModel] = useState(false)


    const fetchPrompts = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/company/promptsrandom/${department}`);
            if (response.ok) {
                const data = await response.json();
                setFeatureData(data.map(item => ({
                    _id: item._id,
                    desc: item.Name,
                    ICON: item.Image
                })));
                console.log(data)
            } else {
                showAlert('Failed to fetch prompts', 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        fetchPrompts();
    }, [department]);


    return (
        <>

            <div className='w-[95%] md:w-[90%] m-auto'>
                {featureData.length > 0 && <Swiper
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
                    {featureData.map((item, index) => (
                        <SwiperSlide key={index}>
                            <div className='w-[80%] lg:w-[100%] relative m-auto cursor-pointer'
                                onClick={() => {
                                    console.log(item._id)
                                    setSelectedID(item._id)
                                    setModel(true)
                                }}
                            >
                                <img src={`${BaseURL}/src${item.ICON}`} alt="" className='rounded-2xl h-[250px] md:h-[300px] w-[100%]' />
                                <div className="bg-white rounded-lg absolute bottom-0 text-sm flex flex-col gap-4 py-2 md:py-2 px-3 md:px-2 w-[] shadow-shadow2 items-center">
                                    <p className='font-para text-sm'>{item.desc}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>}
            </div>
        </>
    );
};

export default PromptsSlider;
