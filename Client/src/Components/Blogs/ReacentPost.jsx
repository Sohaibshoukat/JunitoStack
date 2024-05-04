import React from 'react'
import { BlogsData } from '../../Data/Blogs'

const ReacentPost = () => {
    return (
        <div className='flex flex-col gap-4'>
            <h2 className='font-head text-3xl mb-4'>Recent Post</h2>
            <div className='flex flex-col gap-4'>
                {BlogsData.map((item, index) => (
                    <div className="flex gap-2 items-center justify-between">
                        <div className='basis-[33.3%]'>
                            <img src={item.Image} alt="" className='w-[100%] h-[100%] rounded-lg' />
                        </div>
                        <div className='basis-[65%]'>
                            <h3 className='font-Para text-base font-normal mb-2'>{item.Date}</h3>
                            <h2 className='font-Para text-base font-bold'>{item.Name}</h2>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default ReacentPost