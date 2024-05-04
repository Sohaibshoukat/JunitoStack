import React, { useState } from 'react'
import { IoMdPricetags } from "react-icons/io";
import { PricingPlan } from '../../Data/CardData';
import { FaCheck } from 'react-icons/fa';

const Plans = () => {
    const [selected, setSelected] = useState("Monthly");

    const toggleSelected = (item) => {
        setSelected(item);
    };
    return (
        <div className='w-[95%] md:w-[90%] xl:w-[80%] m-auto  py-6 xl:py-8'>
            <p className='text-center mb-8 font-Para font-medium mx-10 hidden md:block'>No credit card required. Cancel any time. All taxes included.</p>
            <div className='flex justify-center items-center m-auto w-[50%] lg:w-[30%] xl:w-[20%] border-2 border-black bg-black rounded-full text-xl md:text-2xl font-bold text-white p-1 mb-10 md:mb-20'>
                <div
                    className={`cursor-pointer h-[100%] basis-[50%] font-para md:font-Para text-center px-2 py-2 md:px-6 ${selected == "Monthly" && "bg-white text-black  rounded-full bounceleft"} duration-300 ease-in-out`}
                    onClick={() => { toggleSelected("Monthly") }}
                >
                    <h1 className='text-xs sm:text-sm md:text-lg '>Monthly</h1>
                </div>
                <div
                    className={`cursor-pointer flex gap-2 basis-[50%] font-para md:font-para px-1 md:px-2 py-2 justify-center items-center ${selected == "Annualy" && "bg-white  text-black  rounded-full bounceright"} duration-300 ease-in-out`}
                    onClick={() => { toggleSelected("Annualy") }}
                >
                    <h1 className='text-xs sm:text-sm md:text-lg'>Annualy</h1>

                </div>
            </div>

            <div className='grid w-[90%] md:w-auto m-auto justify-center items-center gap-y-8 gap-x-4 lg:gap-x-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                {PricingPlan.map((item, index) => (
                    <div className={`border-t-[30px] md:border-t-[40px] border-b-[20px] border-x-[20px] ${item.Best ? "border-black" : "border-white"} rounded-lg relative ${item.Best ? "bg-black" : "bg-white"}  text-black h-full shadow-xl hover:-translate-y-3 hover:shadow-2xl duration-300 ease-in-out`}>

                        <div className='rounded-3xl p-2 md:p-4'>
                            <div className='flex flex-row justify-between mb-4 md:mb-8'>
                                <h2 className={`text-xl md:text-2xl font-bold  font-Para ${item.Best ? "text-accence" : "text-black"} `}>{item.Name}</h2>
                                <span className={`${item.PlanStatus? "block": " hidden"} ${item.Best ? "bg-accence text-black " : " bg-black text-white"} rounded-full  px-3 py-2 font-Para text-xs font-bold block md:hidden`}>{item.Plan}</span>
                            </div>
                            <div className='flex flex-row gap-2 mb-2 md:mb-6 '>
                                <h3 className={`text-3xl font-extrabold  font-Para  ${item.Best ? "text-white" : "text-black"}`}>
                                    ${selected == "Monthly" ? item.Pricing.Monthly : item.Pricing.Yearly}
                                </h3>
                                <p className={`font-Para text-[10px] font-medium  block md:hidden ${item.Best? "text-white": "text-black"}`}>monthly <br /> per person</p>
                                
                            </div>
                            <p className='text-xs md:text-xs font-bold mb-2 md:mb-8 font-Para text-gray-500'>{item.Users}</p>
                            <button
                                className={`py-3 px-4 rounded-lg w-full font-para mb-4 text-sm font-bold  border-2 border-black hover:bg-black hover:border-[#ADFC32] hover:text-white duration-300 ease-in-out ${item.Best ? "bg-accence  text-black " : "bg-black text-white"} `}
                            >
                                {item.BtnText}
                            </button>
                            <button
                                className={`py-3 px-4 rounded-lg w-full font-para mb-4 text-sm font-bold text-black bg-white border-2 border-black hover:bg-accence hover:border-[#ADFC32] hover:text-black duration-300 ease-in-out `}
                            >
                                {item.Btn2Text}
                            </button>
                            <h2 className={`text-lg md:text-xl tracking-wider mb-2 md:mb-4 font-head ${item.Best ? "text-white" : "text-black"}`}>FEATURES:</h2>
                            <p className='text-xs md:text-xs font-medium mb-2 md:mb-4 font-Para text-gray-500'>{item.FeatureHeading}</p>
                            <div className='flex flex-col gap-3'>
                                {item?.Features?.map((item2, index2) => (
                                    <div className='flex items-center font-Para gap-4 text-md'>
                                        <FaCheck className='bg-accence p-1 rounded-full text-black text-2xl' />
                                        <h4 className={`${item.Best ? "text-white" : "text-black"} `}>{item2}</h4>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Plans