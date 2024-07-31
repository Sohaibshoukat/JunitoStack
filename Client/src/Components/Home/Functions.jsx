import React, { useContext, useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Pagination,Navigation } from 'swiper/modules';
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';
import { trimTo35Words, trimToWords } from '../../Data/UseFullFunction';



const Functions = () => {

    const FeatureData = [
        {
            Head: "HR",
            desc: "Von der Erstellung von Stellenbeschreibungen bis zur Entwicklung von Mitarbeiterentwicklungsplänen – BizBot übernimmt Ihre HR-Aufgaben effizient und zuverlässig.",
            ICON: './Functions/HR.png'
        },
        {
            Head: "Marketing",
            desc: "Definieren Sie effektive Strategien, führen Sie Keyword-Recherchen durch und erstellen Sie Contentpläne für Social Media – BizBot unterstützt Sie in allen Marketingfragen.",
            ICON: './Functions/Social.png'
        },
        {
            Head: "Support",
            desc: "Schnelle und effiziente Kundenbetreuung rund um die Uhr – BizBot sorgt für zufriedene Kunden und entlastet Ihr Support-Team.",
            ICON: './Functions/Support.png'
        },
        {
            Head: "Startup",
            desc: "Skalieren Sie Ihr Geschäft mit Leichtigkeit. BizBot hilft Ihnen, Ihre Prozesse zu optimieren und Ihre Ziele zu erreichen.",
            ICON: './Functions/HR.png'
        },
        {
            Head: "Vertrieb",
            desc: "Entwickeln Sie überzeugende Vertriebsstrategien und formulieren Sie ansprechende Angebote, die Ihre Wettbewerber übertreffen – mit BizBot sind Sie immer einen Schritt voraus.",
            ICON: './Functions/HR.png'
        },
        {
            Head: "Agentur",
            desc: "Ob kreative Kampagnen oder detaillierte Berichte – BizBot unterstützt Agenturen bei der Umsetzung ihrer Projekte.",
            ICON: './Functions/HR.png'
        },
        {
            Head: "Assistenz",
            desc: "Verwalten Sie Ihre Termine, organisieren Sie Ihre E-Mails und behalten Sie den Überblick über wichtige Aufgaben – BizBot ist Ihr digitaler Assistent.",
            ICON: './Functions/HR.png'
        }
    ]
    return (
        <div className='w-[100%] bg-white relative mb-24 overflow-x-hidden'>
            <div className='absolute w-[100%] md:w-[70%] bg-gray -z-0 h-[100%]'></div>
            <div className='flex flex-col md:flex-row  items-center py-12 md:py-20 gap-16'>
                <div className='lg:basis-[30%] xl:basis-[30%] relative z-10 w-[90%] md:w-auto md:ml-20'>
                    <h1 className='text-lg md:text-xl font-mont lg:text-2xl xl:text-4xl font-bold md:max-w-[70%] text-white mb-5 xl:mb-8'>BizBot, Ihr vielseitiger Helfer                    </h1>
                    <p className='font-para text-sm text-white'>BizBot unterstützt Sie in allen wichtigen Geschäftsbereichen und sorgt dafür, dass Ihre Abläufe reibungslos und effizient funktionieren. Von HR über Marketing bis hin zum Vertrieb – BizBot deckt fast alle Bedürfnisse ab und passt sich flexibel an Ihre spezifischen Anforderungen an.                    </p>
                </div>
                <div className='basis-[60%] w-[80%] md:w-[60%]'>
                    <Swiper
                        slidesPerView={1}
                        spaceBetween={10}
                        pagination={{
                            clickable: true,
                        }}
                        autoplay={{
                            delay: 5000,
                            disableOnInteraction: false,
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