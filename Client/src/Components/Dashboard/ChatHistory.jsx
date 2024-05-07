import React, { useContext, useEffect, useState } from 'react'
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';
import HistoryContext from '../../Context/History/HistoryContext';
import { useNavigate } from 'react-router-dom';

const ChatHistory = () => {

    const navigate = useNavigate()

    const historyContext = useContext(HistoryContext);
    const { fetchHistory, History } = historyContext;

    useEffect(() => {
        fetchHistory()
    }, [])

    return (
        <div className='gradientbg py-4 px-6 rounded-2xl'>
            <h2 className='font-para text-white font-bold text-lg mb-4'>History</h2>
            <div className="flex flex-col gap-4">
                {History?.map((item, index) => (
                    <div
                        className="bg-white py-3 px-4 rounded-xl gap-4 flex flex-row justify-between items-start cursor-pointer"
                        key={index}
                        onClick={() => {
                            navigate(`/dashboard/c/${item?._id}`)
                        }}
                    >
                        <h3 className='text-sm font-para text-black'>{item.Title}</h3>
                        <img src={'../../Porp/Write.png'} alt="" className='w-4 h-4' />
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ChatHistory