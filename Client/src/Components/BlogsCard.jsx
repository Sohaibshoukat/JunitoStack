import React from 'react'

const BlogsCard = ({ item, des }) => {
    return (
        <div className='flex flex-col bg-white group ease-in-out rounded-lg duration-300'
            style={{ boxShadow: "1px 1px 7.099999904632568px 0px #00000040" }}>
            <div className='basis-[55%] overflow-hidden rounded-tl-lg rounded-tr-lg'>
                <img src={item?.Image} alt="" className='group-hover:scale-[1.08] ease-in-out duration-300  w-[100%]' />
            </div>
            <div className='basis-[45%] py-4 px-8 flex flex-col justify-between'>
                <div>
                    <h3 className='font-Para text-xl font-semibold mb-4'>{item?.Date}</h3>
                    <h2 className='font-Para text-2xl font-bold'>{item?.Name}</h2>
                    {des &&
                        <p className='text-blak font-Para font-normal text-2xl'>{item?.Des}</p>
                    }
                </div>
                <button className='bg-black py-2 px-4 font-Para text-xl text-white hover:bg-accence hover:text-black rounded-lg duration-300 ease-in-out mt-8 mx-auto block'>Read More</button>
            </div>
        </div>
    )
}

export default BlogsCard