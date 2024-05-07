import React, { useContext, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import BotDepContext from '../../Context/BotContaxt/BotDepContext'

const BizBotDep = () => {

    const department = [
        {
            head: "HR",
            icon: "../../BotIcons/hr.png"
        },
        {
            head: "Marketing",
            icon: "../../BotIcons/marketing.png"
        },
        {
            head: "Vertrieb",
            icon: "../../BotIcons/vertrieb.png"
        },
        {
            head: "Support",
            icon: "../../BotIcons/support.png"
        },
        {
            head: "ToDos",
            icon: "../../BotIcons/todo.png"
        },
        {
            head: "Sales",
            icon: "../../BotIcons/sales.png"
        },
    ]

    const departcontext = useContext(BotDepContext);
    const {setdepartment} =departcontext

    const [OpenModel, setOpenModel] = useState(false)

    return (
        <div className='flex flex-col'>
            <div
                className="bg-white font-para text-base items-center rounded-lg shadow-shadow2 flex flex-row justify-between py-2 px-4"
                onClick={() => { setOpenModel(!OpenModel) }}
            >
                <h2 className='font-bold'>BizBot GPTs</h2>
                <FaChevronDown className='text-lg' />
            </div>
            {OpenModel && <div className="border-2 border-[#DFDFDF] rounded-lg py-2 px-2 flex flex-col bg-">
                {department.map((item, index) => (
                    <div 
                        className="flex flex-row py-2 px-4 gap-3"
                        onClick={()=>{setdepartment(item.head)}}
                    >
                        <img src={item.icon} alt="" className='w-6 h-6' />
                        <h2 className='text-black font-para'>{item.head}</h2>
                    </div>
                ))}
            </div>}
        </div>
    )
}

export default BizBotDep