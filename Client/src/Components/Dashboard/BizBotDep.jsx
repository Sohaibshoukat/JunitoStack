import React, { useContext, useState } from 'react'
import { FaChevronDown } from 'react-icons/fa'
import BotDepContext from '../../Context/BotContaxt/BotDepContext'
import { useNavigate } from 'react-router-dom'

const BizBotDep = () => {

    const navigate = useNavigate()

    const departmentData = [
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
            head: "Startup",
            icon: "../../BotIcons/todo.png"
        },
        {
            head: "Sales",
            icon: "../../BotIcons/sales.png"
        },
        {
            head: "Agent",
            icon: "../../BotIcons/vertrieb.png"
        },
    ]

    const departcontext = useContext(BotDepContext);
    const { department, setdepartment } = departcontext

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
            {OpenModel &&
                <div className="border-2 border-[#DFDFDF] rounded-lg py-2 px-2 flex flex-col gap-2">
                    {departmentData.map((item, index) => (
                        <div
                            className={`flex flex-row py-2 px-4 gap-3 cursor-pointer hover:bg-gray hover:rounded-lg hover:text-white ease-in-out duration-300 ${department == item.head && " bg-gray rounded-lg text-white"} `}
                            onClick={() => {
                                setdepartment(item.head)
                                navigate("/dashboard/chatbot");
                            }}
                        >
                            <img src={item.icon} alt="" className='w-6 h-6' />
                            <h2 className='font-para'>{item.head}</h2>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}

export default BizBotDep