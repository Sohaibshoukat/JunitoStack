import React from 'react'

const BusinessArea = ({ setActiveStep, handleChange, formData }) => {
    const Department = [
        {
            Title: "HR",
            Icon: "../assets/Bots/hr.png"
        },
        {
            Title: "Startup",
            Icon: "../assets/Bots/startup.png"
        },
        {
            Title: "Vertrieb",
            Icon: "../assets/Bots/vertrieb.png"
        },
        {
            Title: "Support",
            Icon: "../assets/Bots/support.png"
        },
        {
            Title: "Marketing",
            Icon: "../assets/Bots/marketing.png"
        },
        {
            Title: "Sales",
            Icon: "../assets/Bots/sales.png"
        },
        {
            Title: "Agentour",
            Icon: "../assets/Bots/agentor.png"
        },

    ]

    return (
        <div className='flex flex-col gap-6'>
            <div className="flex flex-col pb-6 w-full gap-2 border-b-2 border-lightgray">
                <h2 className='font-subhead text-xl font-bold'>Business Area</h2>
                <p>First please select Business Area .</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {Department.map((item, index) => (
                    <div
                        className={`bg-white py-4 px-4 rounded-xl ${formData.Department == item.Title && "border-2 border-gray"} shadow-shadow2 flex flex-col gap-4`}
                        onClick={() => { handleChange("Department", item.Title) }}
                        key={index}
                    >
                        <img src={item.Icon} alt="" className='w-12 h-12' />
                        <h2 className='text-gray text-lg font-medium font-Para'>{item.Title}</h2>
                    </div>
                ))}
            </div>
            <button
                onClick={() => { 
                    if(formData.Department!==""){
                        setActiveStep(2) 
                    }
                }}
                className='bg-gray rounded-xl py-2 px-4 border-2 my-4 border-gray text-white hover:bg-transparent hover:text-gray ease-in-out duration-300'
            >
                Next
            </button>
        </div>
    )
}

export default BusinessArea