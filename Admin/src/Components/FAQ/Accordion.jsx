import React, { useContext, useEffect, useState } from 'react'
import { HiQuestionMarkCircle } from "react-icons/hi";
import { FaMinus, FaPlus } from 'react-icons/fa';
import { MdDelete, MdEditNote } from "react-icons/md";
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';

const Accordion = (
    {
        setQuestionBTN,
        FAQData,
        setEditBTN,
        setTabSelection,
        editID,
        fetchFAQs,
        seteditID,
    }
) => {

    const [currenttab, setcurrenttab] = useState(null);

    const alertcontext = useContext(AlertContext);
    const { showAlert } = alertcontext

    const handleDeleteFAQ = async (id) => {
        try {
            const response = await fetch(`${BaseURL}/deleteFAQ/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    "AdminBizzToken": sessionStorage.getItem('AdminBizzToken')
                }
            });
            const data = await response.json();
            if (response.ok) {
                showAlert('FAQ deleted successfully','success');
                fetchFAQs()
            } else {
                // Handle error
                showAlert(data.message,'danger');
            }
        } catch (error) {
            showAlert(error.message,'danger');
        }
    };


    return (
        <>
            <div className=" flex flex-col  px-3 md:px-6 py-4">
                {FAQData?.length > 0 && FAQData?.map((item, index) => (
                    <div
                        className={`
                                flex flex-col  ${currenttab == index ? 'bg-gray text-white' : 'bg-white text-gray'}
                                rounded-md my-2 py-2 px-5 cursor-pointer 
                                ease-in-out duration-300 
                        `}
                        style={{ boxShadow: "1px 1px 7.800000190734863px 0px #00000040" }}
                        key={index}
                        onClick={() => {
                            setTabSelection(index)
                        }}
                    >
                        <div
                            className={`text-left flex flex-row  justify-between items-center text-base md:text-xl xl:text-2xl font-semibold `}
                            onClick={() => {
                                if (currenttab === index) {
                                    setcurrenttab(null);
                                } else {
                                    setcurrenttab(index);
                                }
                            }}
                        >
                            <div className={`flex gap-x-4 items-center  `}>
                                <HiQuestionMarkCircle />
                                <h2 className='font-Para text-xs sm:text-sm md:text-lg font-semibold'>{item.Question}</h2>
                            </div>
                            <div className='flex flex-row items-center justify-center gap-3'>
                                <MdDelete 
                                    className='text-red text-xl' 
                                    onClick={()=>{
                                        handleDeleteFAQ(item._id)
                                    }}
                                />
                                <MdEditNote onClick={() => {
                                    setQuestionBTN(false)
                                    setEditBTN(true)
                                    seteditID(item._id)
                                }
                                } />
                                {currenttab !== index ? <FaPlus className='text-xs md:text-base' /> : <FaMinus className='text-xs md:text-base' />}
                            </div>
                        </div>
                        <div className={`${currenttab !== index ? 'hidden' : 'block'} text-xs sm:text-sm md:text-lg font-Para text-white text-justify font-normal pt-2 xl:pt-4 px-2 md:px-4 ease-in-out duration-300`}>
                            {currenttab === index && <p>
                                {item.Answer}
                            </p>}
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Accordion
