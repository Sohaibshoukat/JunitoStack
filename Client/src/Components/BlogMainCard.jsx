import React from 'react'

const BlogsMainCard = ({ item, des }) => {
    return (
        <div className='flex flex-col bg-white p-4 rounded-lg group'
            style={{ boxShadow: "1px 0px 24.299999237060547px 1px #00000040" }}>
            <div className='basis-[65%] overflow-hidden rounded-2xl md:basis-[55%]'>
                <img src={item.Image} alt="" className='md:h-[400px] object-cover group-hover:scale-[1.08] w-[100%] rounded-2xl duration-500 ease-in-out' />
            </div>
            <div className='basis-[30%] md:basis-[40%] md:px-4 py-4 xl:px-8'>
                <h3 className='font-Para text-base md:text-xl font-normal mb-2 xl:mb-4'>{item.Date}</h3>
                <h2 className='font-Para text-xl md:text-2xl xl:text-3xl font-bold mb-2 xl:mb-4'>{item.Name}</h2>
                {des &&
                    <p className='text-blak font-Para text-justify font-light text-sm md:text-lg xl:text-xl mb-2 xl:mb-6'>{item.Des}</p>
                }
                <button className='bg-black py-2 px-4 font-Para text-lg md:text-xl text-white float-right hover:bg-accence hover:text-black rounded-lg duration-300 ease-in-out mt-4 xl:mt-8'>Read More</button>
            </div>
        </div>
    )
}

export default BlogsMainCard