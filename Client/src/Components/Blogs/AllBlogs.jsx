import React, { useState } from 'react'
import { BlogsData } from '../../Data/Blogs'
import BlogsMainCard from '../BlogMainCard'
import ReacentPost from './ReacentPost'
import { IoMdSearch } from 'react-icons/io'

const AllBlogs = () => {

    const [Page, setPage] = useState(0)

    const PageData=[
        1,2,"Next"
    ]
    return (
        <div>
            <div className='flex lg:hidden justify-between items-center bg-white py-2 px-4 rounded-lg mb-10'
                style={{ boxShadow: "1px 0px 24.299999237060547px 1px #00000040" }}>
                <input type="text" placeholder='Search' className='bg-transparent bg-none text-xl md:text-2xl font-Para' />
                <IoMdSearch className='text-3xl font-bold' />
            </div>
            <div className="flex flex-col gap-8">
                {BlogsData.map((item, index) => (
                    <BlogsMainCard item={item} des={true} key={index} />
                ))}
            </div>
            <div className='flex flex-row justify-center my-6'>
                {PageData.map((item,index)=>(
                    <div 
                        className={`
                            ${Page==index?'bg-black  text-white':"bg-transparent"} border-2 border-black py-1 px-2 
                            md:py-2 md:px-4 text-xl md:text-xl font-Para  cursor-pointer ease-in-out duration-300 
                            ${item=='Next' &&'rounded-tr-xl rounded-br-xl'} ${index==0 &&'rounded-tl-xl rounded-bl-xl'}
                        `} 
                        onClick={()=>{setPage(index)}}
                    >
                            {item}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AllBlogs