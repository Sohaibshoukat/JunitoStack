import React from 'react'

import AllBlogs from '../../Components/Blogs/AllBlogs'
import SideBlock from '../../Components/Blogs/SideBlock'

const Blog = () => {
  return (
    <>

      <div className='flex flex-row items-center justify-center py-20 md:py-32 relative'>
        <img src="./Images/image.png" alt="" className='absolute -z-10 -bottom-[90%] xl:-bottom-[80%] -left-[10%] w-[250px] md:w-[300px] lg:w-auto' />
        <img src="./Images/image.png" alt="" className='rotate-180 absolute -z-10 -top-[60%] -right-[10%] w-[250px]  md:w-[300px] lg:w-auto' />
        <div className='flex flex-col gap-4 md:gap-8 items-center justify-center w-[90%] md:w-auto'>
          <h1 className='text-primary font-head text-5xl md:text-6xl lg:text-7xl font-extrabold text-center'>our blog</h1>
          <p className='text-lg md:text-xl text-center xl:text-2xl font-light md:max-w-[80%] xl:max-w-[60%] font-Para'>Generate Questionnaires, and more by enhancing your marketing emails with compelling customization.</p>
          
        </div>
      </div>

      <div className='w-[95%] md:w-[90%] xl:w-[80%] m-auto mb-20'>
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="basis-[65%]">
            <AllBlogs />
          </div>
          <div className="basis-[30%] relative">
            <SideBlock />
          </div>
        </div>
      </div>

    </>
  )
}

export default Blog