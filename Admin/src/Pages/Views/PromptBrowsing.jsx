import React from 'react'
import { useNavigate } from 'react-router-dom'

const PromptBrowsing = () => {
    const Department = [
        {
            Title: "HR",
            Des: "Get to know more about HR Prompts",
            Icon: "../assets/Bots/hr.png"
        },
        {
            Title: "Startup",
            Des: "Get to know more about Startup Prompts",
            Icon: "../assets/Bots/startup.png"
        },
        {
            Title: "Vertrieb",
            Des: "Get to know more about Vertrieb Prompts",
            Icon: "../assets/Bots/vertrieb.png"
        },
        {
            Title: "Support",
            Des: "Get to know more about Support Prompts",
            Icon: "../assets/Bots/support.png"
        },
        {
            Title: "Marketing",
            Des: "Get to know more about Marketing Prompts",
            Icon: "../assets/Bots/marketing.png"
        },
        {
            Title: "Sales",
            Des: "Get to know more about Sales Prompts",
            Icon: "../assets/Bots/sales.png"
        },
        {
            Title: "Agentur",
            Des: "Get to know more about Agentour Prompts",
            Icon: "../assets/Bots/agentor.png"
        },

    ]
    const navigate = useNavigate()
    return (
        <div className='grid grid-cols-1 mt-5 md:mt-10 mb-20 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 w-[90%] lg:w-[80%] m-auto'>
            {Department.map((item, index) => (
                <div className={`flex flex-row group items-center gap-3 font-para py-4 px-4 md:px-6 bg-gradientBot rounded-2xl shadow-shadow3 hover:bg-gradienthover ease-in-out duration-300`} key={index}>
                    <img src={item.Icon} alt="" className='w-16 h-16' />
                    <div className="flex flex-col text-gray group-hover:text-white gap-1 md:gap-2 ease-in-out duration-300">
                        <h2 className='text-lg md:text-2xl font-bold'>{item.Title}</h2>
                        <p className='text-sm md:text-sm'>{item.Des}</p>
                        <button 
                            className='bg-gray py-1 md:py-1 px-2 text-sm md:text-base md:px-4 rounded-lg border-2 border-gray text-white hover:bg-transparent hover:text-gray font-para ease-in-out duration-300 w-fit'
                            onClick={()=>{navigate(`/admin-dashboard/prompt-list/${item.Title}`)}}
                        >
                            Lets Go
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default PromptBrowsing