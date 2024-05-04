import React, { useState } from 'react'
import { FaCheck } from 'react-icons/fa';
import { FaTrash } from "react-icons/fa";
import { MdEditNote } from "react-icons/md";
import { SubscriptionPlanData } from '../../Data/SubscriptionPlan';
import Popup from './Popup';
import EditPopup from './EditPopup';

const Plans = () => {

    const [selected, setSelected] = useState("Monthly");
    const [Edit, setEdit] = useState(false);
    const [Trash, setTrash] = useState(false);
    const [QuestionBTN, setQuestionBTN] = useState(false);
    const [Id, setId] = useState([]);

    const EditFunc = (index) =>{
      
        setEdit(true);
        setId(index);
    }
   

    return (
        <>
            <div className='flex flex-col '>
                <div className='order-10 md:order-none w-[95%] md:w-[90%] xl:w-[90%] m-auto  py-6 xl:py-10' >


                    <div className=' grid w-[90%] md:w-auto m-auto justify-center items-center gap-y-8 gap-x-4 lg:gap-x-8 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                        {SubscriptionPlanData.map((item, index) => (
                            <div className={`border-t-[10px] md:border-t-[10px] border-b-[10px] border-x-[10px] ${item.Best ? "border-black" : "border-white"} rounded-lg relative ${item.Best ? "bg-black" : "bg-white"}  text-black h-full `} style={{ boxShadow: "1px 1px 7.800000190734863px 0px #00000040" }} >

                                <div className='rounded-3xl p-2 md:p-4'>
                                    <div className={`flex flex-row justify-end items-center gap-4 mb-3 md:mb-4 ${item.Best ? "text-white" : "text-black"}`}>
                                        <MdEditNote className='text-3xl cursor-pointer' onClick={()=>EditFunc(index)} />
                                        <FaTrash className='text-lg cursor-pointer' onClick={() => { setTrash(!Trash) }} />

                                    </div>
                                    <div className='flex flex-col sm:flex-row justify-between mb-2 md:mb-4'>
                                        <h2 className={`text-lg md:text-xl font-bold  font-Para ${item.Best ? "text-accence" : "text-black"} `}>{item.Name}</h2>
                                        <span className={`${item.PlanStatus ? "block" : " hidden"} ${item.Best ? "bg-[#ADFC32] text-black " : " bg-black text-white"} w-fit rounded-full py-1 px-2 sm:px-3 sm:py-2 font-Para text-xs font-bold block `}>{item.Plan}</span>
                                    </div>
                                    <div className='flex flex-row gap-2 mb-2 '>
                                        <h3 className={`text-3xl font-extrabold  font-Para  ${item.Best ? "text-white" : "text-black"}`}>
                                            ${selected == "Monthly" ? item.Pricing.Monthly : item.Pricing.Yearly}
                                        </h3>
                                        <p className={`font-Para text-[10px] font-bold  block  ${item.Best ? "text-white" : "text-black"}`}>monthly <br /> per person</p>

                                    </div>
                                    <p className='text-xs md:text-xs font-bold mb-2 md:mb-4 font-Para text-gray-500'>{item.Users}</p>

                                    <h2 className={`text-lg md:text-xl tracking-wider mb-2 md:mb-2 font-head ${item.Best ? "text-white" : "text-black"}`}>FEATURES:</h2>
                                    <p className='text-xs md:text-xs font-medium mb-2 md:mb-4 font-Para text-gray-500'>{item.FeatureHeading}</p>
                                    <div className='flex flex-col gap-3'>
                                        {item?.Features?.map((item2, index2) => (
                                            <div className='flex items-center font-Para gap-4 text-sm'>
                                                <FaCheck className='bg-accence p-1 rounded-full text-black bg-[#ADFC32]  text-xl' />
                                                <h4 className={`${item.Best ? "text-white" : "text-black"} `}>{item2}</h4>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className=" relative flex flex-col pb-6 px-3 md:px-6 mt-2">
                    <button
                        className={`py-2 px-4  rounded-lg w-full font-para text-xs sm:text-sm md:text-base font-bold bg-black text-white hover:bg-[#ADFC32] hover:text-black ease-in-out duration-300 `} onClick={() => { setQuestionBTN(!QuestionBTN) }}
                    >
                        + Add New Plan
                    </button>
                    <Popup handleclose={QuestionBTN} sethandleclose={setQuestionBTN} />
                    <EditPopup  handleclose={Edit} sethandleclose={setEdit} id={Id}/>
                    {/* <FaPlus className=' absolute top-[10px] left-[485px] text-base text-white' /> */}
                </div>

            </div>
        </>
    )
}

export default Plans
