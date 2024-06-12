import React from 'react'

const Partner = () => {
    const part=[
        {
            image:"./Partner/p1.png",
            name:"Sarah Aileah",
            postion:"Chief Creative Officer"
        },
        {
            image:"./Partner/p2.png",
            name:"Jonathan Leon",
            postion:"Chief Talent Officer"
        },
        {
            image:"./Partner/p3.png",
            name:"Dean Johaness",
            postion:"Chief Marketing Officer"
        },
    ]
  return (
    <div className="py-10 md:py-20 w-[90%] md:w-[70%] lg:w-[90%] 2xl:w-[80%] m-auto">
        <h1 className=' text-gray text-lg md:text-2xl lg:text-3xl text-center font-extrabold font-para  mb-4 xl:mb-10'>External Partners</h1>
        <div className="flex flex-col lg:flex-row justify-between mt-28 gap-24 lg:gap-8">
            {part.map((item,index)=>(
                <div className='basis-[30%] border-t-[30px] border-l-[30px] border-r-[30px] bg-gray border-gray flex flex-col' key={index}>
                        <div className="basis-[70%] relative min-h-[300px] z-0 w-[100%] bg-white">
                            <img src={item.image} alt="" className='absolute w-[100%] -scale-x-110 -translate-y-28 h-[413px] z-10' />
                        </div>
                        <div className="basis-[30%] py-2 flex text-white font-para flex-col gap-1 items-center bg-gray">
                            <h2 className='text-xl font-bold'>{item.name}</h2>
                            <p className='text-base font-light'>{item.postion}</p>
                        </div>
                </div>
            ))}
        </div>
    </div>
  )
}

export default Partner