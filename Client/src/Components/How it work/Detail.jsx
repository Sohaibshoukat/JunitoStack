import React from 'react'
import { HowitData } from '../../Data/HowitWork'

const Detail = () => {
    return (
        <>
            <div className="w-[95%] md:w-[90%] lg:w-[80%] m-auto mb-20">
                <div className="flex flex-col gap-y-8">
                    {HowitData.map((item, index) => (
                        <>
                            {
                                item.Type == "Detail" ?
                                    <>
                                        <div className="flex flex-col gap-y-4">
                                            <h1 className='text-3xl md:text-4xl font-head '>{item?.Heading}</h1>
                                            <div className='relative how-it-item__content'>
                                                <span className='point point_start'></span>
                                                <p className='font-Para text-base md:text-lg'>{item?.Content}</p>
                                                <span className='point point_end'></span>
                                            </div>
                                            {item?.Image && <div>
                                                <img src={item.Image} alt="" />
                                            </div>}
                                        </div>
                                    </>
                                    : item.Type == "Image" ?
                                        <>
                                            <div className="flex flex-col gap-y-4">
                                                <h1 className='text-3xl md:text-4xl font-head'>{item?.Heading}</h1>
                                                <div className='mx-10 md:w-[90%] m-auto'>
                                                    <img src={item.Image} alt="" className='rounded-lg' />
                                                    <h2 className='text-base md:text-lg font-normal'>*{item?.note}</h2>
                                                </div>
                                            </div>
                                        </>
                                        : item.Type == "Steps" ?
                                            <>
                                                <div className="flex flex-col gap-y-4">
                                                    <h1 className='text-3xl md:text-4xl font-head '>{item?.Heading}</h1>
                                                    <div className='flex flex-col gap-y-0'>
                                                        {item?.Data.map((item2, index2) => (
                                                            <div className='relative step-item pb-20'>
                                                                <span className='step'>{index2 + 1}</span>
                                                                <div>
                                                                    <h2 className='text-xl md:text-2xl font-bold font-Para'>{item2.head}</h2>
                                                                    <p className='text-base md:text-lg font-normal font-Para mb-8'>{item2.des}</p>
                                                                    <div>
                                                                        <img src={item2.image} alt="" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>
                                            </>
                                            :
                                            <></>
                            }
                        </>
                    ))}
                </div>
                <div className="flex justify-center">
                    <button className='font-Para w-hit bg-accence rounded-lg text-xl md:text-xl font-bold py-2 px-6 hover:bg-primary hover:text-white duration-300 ease-in-out'>Create a Quiz</button>
                </div>
            </div>
        </>
    )
}

export default Detail