import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const Feature2 = () => {
    const Data = [
        {
            head: "Chatbot recommended prompts",
            des: "Chatbot page should have recommended prompts as well as an option to search from the existing prompts, when the user selects the prompts, it should be automatically pasted to the chat area and if there are some information need to fill, first it will check from the database and fill itself and if not, available it gets from user."
        },
        {
            head: "Main topic of prompt appears",
            des: "In the search bar, there will be main topic of prompt appears, if the user clicks on more option for that prompt a pop up appears which have all of the details that the user can scroll and check."
        },
        {
            head: "Option to categories the chat into different categories",
            des: "Moreover, there will be option to categories the chat into different categories. The categories names are unnamed + 7 categories like HR, Marketing, Sales etc. Unnamed contains all the chats which is not categories yet."
        }
    ]
    return (
        <div className=' w-[100%] py-10'>
            <div className="flex flex-col items-center gap-2 mb-8">
                <h1 className=' text-gray text-sm md:text-base xl:text-lg font-medium font-para'>Become one of us!</h1>
                <h1 className=' text-gray text-xl md:text-2xl lg:text-3xl font-extrabold font-para  mb-0 xl:mb-2'>Features</h1>
                <p
                    className=' text-gray font-para text-sm md:text-base font-normal text-center max-w-[90%] lg:max-w-[60%]  mb-0 xl:mb-2'
                >
                    Nullam ornare blandit urna, eu pulvinar elit faucibus eget. Sed justo mauris, ultricies eu urna at, gravida commodo mauris. Quisque ac felis ac sapien dictum gravida aliquet ac purus. Donec sit amet ex vel ex sollicitudin posuere at et metu
                </p>
            </div>
            <div className="hidden lg:flex flex-row gap-2 2xl:gap-4 w-[95%] 2xl:w-[90%] m-auto">
                {Data.map((item, index) => (
                    <div className="flex bg-gray rounded-2xl py-6 px-6 flex-col gap-2 basis-[33.33%]">
                        <div className="flex flex-row gap-2">
                            <h1 className='text-[#EAEAEA] text-4xl font-bold font-para'>{index}</h1>
                            <h2 className='text-white font-para font-bold text-lg 2xl:text-xl'>{item.head}</h2>
                        </div>
                        <p className='text-white font-para text-xs 2xl:text-sm'>{item.des}</p>
                    </div>
                ))}
            </div>
            <div className="block lg:hidden w-[95%] m-auto">
                <Swiper
                    slidesPerView={1}
                    spaceBetween={2}
                    pagination={{
                        clickable: true,
                    }}
                    modules={[Autoplay ,Pagination]}
                    className="mySwiper my-4"
                >
                    {Data.map((item, index) => (
                        <SwiperSlide className='h-auto'>
                            <div className="flex bg-gray h-[100%] rounded-2xl py-6 px-6 flex-col gap-2 basis-[33.33%]">
                                <div className="flex flex-row gap-2">
                                    <h1 className='text-[#EAEAEA] text-2xl font-bold font-para'>{index+1}</h1>
                                    <h2 className='text-white font-para font-bold text-lg'>{item.head}</h2>
                                </div>
                                <p className='text-white font-para text-sm 2xl:text-base'>{item.des}</p>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

            </div>
        </div>
    )
}

export default Feature2