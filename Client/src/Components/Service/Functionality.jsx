import React from 'react'

const Functionality = () => {

    const data=[
        {
            name:"To-Do List",
            icon:"./Features/f21.png"
        },
        {
            name:"Prompt Browsing",
            icon:"./Features/f22.png"
        },
        {
            name:"Owner",
            icon:"./Features/f23.png"
        },
        {
            name:"Sub User",
            icon:"./Features/f24.png"
        },
    ]

    return (
        <div className='w-[90%] 2xl:w-[80%]  m-auto flex flex-col gap-8'>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-8 items-center">
                <div className="flex flex-col gap-4 basis-[50%]">
                    <h1 className=' text-gray text-base mdtext-lg font-light font-para'>FUNCTIONALITIES</h1>
                    <h1 className=' text-black text-xl md:text-2xl lg:text-3xl font-bold font-play'>Where our functionalities add value to your product</h1>
                </div>
                <p className='basis-[50%] font-para text-sm md:text-base text-black'>Helping companies & individuals identify key solutions for their target markets. We boost their ability to create products. Our business model saves clients time and money. Don't reinvent the wheel.</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 justify-between my-10 md:my-20">
                {data.map((item,index)=>(
                    <div className="basis-[25%] flex flex-col gap-4 items-center" key={index}>
                        <div className='bg-gray p-3 rounded-full w-fit'>
                            <img src={item.icon} alt="" className='w-[25px] h-[25px]' />
                        </div>
                        <h2 className='font-para text-gray text-base md:text-xl text-center lg:text-2xl font-bold'>{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Functionality