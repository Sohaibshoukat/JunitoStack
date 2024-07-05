import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';

const Features = () => {
    const FeatureData = [
        {
            Head: "Über 1000 vordefinierte Aufgaben: ",
            desc: "BizBot bietet maßgeschneiderte Unterstützung für über 1000 verschiedene Geschäftsaufgaben – von HR bis Marketing, alles zugänglich über eine benutzerfreundliche Oberfläche.",
        },
        {
            Head: "KI-gesteuertes Lernen: ",
            desc: "Dank fortschrittlichem maschinellem Lernen wird BizBot mit jeder Interaktion schlauer – optimiert Ihre Prozesse und bietet zunehmend präzisere Lösungen.",
        },
        {
            Head: "Vollständige Personalisierung: ",
            desc: "BizBot passt sich Ihrem Unternehmen an. Durch das Hochladen Ihrer eigenen Unterlagen lernt der Bot genau auf Ihre Bedürfnisse zugeschnittene Lösungen zu bieten.",
        },
        {
            Head: "Sofort einsatzbereit: ",
            desc: "Starten Sie sofort mit unserem einfachen Setup und sehen Sie, wie BizBot Ihre Effizienz von Tag eins an steigert.",
        },
    ]
    return (
        <div className='w-[100%] bg-gray'>
            <div className="w-[90%] md:w-[90%] xl:w-[85%] m-auto py-12 md:py-20">
                <div className="flex flex-col lg:flex-row justify-between items-center gap-20 lg:gap-5 2xl:gap-10">
                    <div className='lg:basis-[50%] xl:basis-[40%]'>
                        <h1 className='text-lg md:text-xl font-mont lg:text-2xl xl:text-3xl font-bold md:max-w-[70%] text-white mb-5 xl:mb-8'>Der BizBot überzeugt</h1>
                        <h1 className='text-lg md:text-xl font-mont lg:text-2xl xl:text-3xl font-bold md:max-w-[70%] text-white mb-5 xl:mb-8'>Funktionsbereich</h1>
                        <p className='font-para text-sm md:text-base text-white xl:w-[80%]'>Sie verdienen den besten Mitarbeiter, der gar keiner ist:</p>
                    </div>
                    <div className='basis-[50%] w-[80%] md:w-[50%]'>
                        <Swiper
                            slidesPerView={1}
                            spaceBetween={10}
                            pagination={{
                                clickable: true,
                            }}
                            autoplay={{
                                delay: 2500,
                                disableOnInteraction: false,
                              }}
                            modules={[Autoplay, Pagination]}
                            className="mySwiper"
                        >
                            {FeatureData.map((item, index) => (
                                <SwiperSlide className='h-auto'>
                                    <div className='bg-white relative pb-6 pt-14 my-10 px-6 md:px-8 rounded-lg'>
                                        <div className="w-fit rounded-full bg-white z-[99999] p-1 absolute -top-[40px]">
                                            <img src="./Features/Feature1.png" alt="" className='rounded-full w-20 h-20 ml-1' />
                                        </div>
                                        <h2 className='text-gray font-mont text-lg md:text-xl font-bold mb-5'>{item.Head}</h2>
                                        <p className='font-para text-sm md:text-base text-[#0C111F]'>{item.desc}</p>
                                    </div>
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Features