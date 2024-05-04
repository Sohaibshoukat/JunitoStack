import React, { useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'

const TODOCart = ({ item }) => {

    const [OpenSetting, setOpenSetting] = useState(false)

    return (
        <div className='border-2 font-para border-[#1C1D22]/10 py-4 px-6 rounded-xl bg-white'>
            <div className="flex flex-col gap-2 md:flex-row justify-between md:items-center mb-6">
                <h2 className='md:text-base font-bold'>{item.Head}</h2>
                <div className="flex items-center w-fit self-end gap-2">
                    <div
                        className={`
                            ${item.Potential == 'High' ? "bg-[#F0FDF4] border-[#00E58F] text-[#00E58F]"
                                : item.Potential == 'Medium' ? "bg-[#FBF1FF] border-[#884DFF] text-[#884DFF]" :
                                    "bg-[#FEF6E6] border-[#FF8900] text-[#FF8900]"} text-center text-sm w-full py-1 px-2 rounded-lg border-2`}
                    >
                        {item.Potential}
                    </div>
                    <div className="rounded-xl relative bg-white border-2 border-[#1C1D22]/30 p-1 h-fit" onClick={() => { setOpenSetting(!OpenSetting) }}>
                        <HiDotsHorizontal className='text-black text-lg' />
                        {OpenSetting && <div className="bg-white border-2 border-[#1C1D22]/10 -bottom-[100%] left-0 rounded-lg w-fit absolute py-1 px-2">
                            <p className='text-red-400 text-sm font-medium'>Delete</p>
                        </div>}
                    </div>
                </div>
            </div>
            <p className='my-2 text-[#a1a1a1] text-sm max-w-sm'>{item?.Des}</p>
            <div className="flex flex-row justify-between mt-6">
                <div className={`flex text-sm gap-1 font-medium bg-[#FFC5C5] border-[#DF0404] text-[#DF0404] py-1 px-2 rounded-lg border-2 items-center`}>
                    {item.Date}
                </div>
                <div className="flex gap-[-2px]">
                    {item.subUser.slice(0, 2).map((item2, index2) => (
                        <div className='w-8 h-8 rounded-full -ml-3 border-2 border-white' key={index2}>
                            <img src={item2.img} alt="" />
                        </div>
                    ))}
                    {item.subUser.length > 2 && (
                        <div className='w-8 h-8 rounded-full bg-white -ml-3 border-2 border-[#1C1D22]/30 flex items-center justify-center'>
                            +{item.subUser.length - 2}
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}

export default TODOCart