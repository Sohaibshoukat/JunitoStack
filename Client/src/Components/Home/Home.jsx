import React from 'react'
import Banner from '../../Components/Home/Banner'
import About from '../../Components/Home/About'
import Functions from '../../Components/Home/Functions'
import Why from '../../Components/Home/Why'
// import Testimonial from '../../Components/Home/Testimonial'
import Features from '../../Components/Home/Features'

// import Blogs from '../../Components/Home/Blogs'

const Home = () => {
  return (
    <>
      <Banner />

      <Features />

      <About />


      <Functions />

      <About />
      
      <Why />



      {/* 


      <Testimonial />


      <div className='flex flex-col justify-center my-16 md:my-32 relative'>
        <img src="./Images/image.png" alt="" className='absolute -z-10 top-[5%] -left-[10%] w-[250px] md:w-[300px] lg:w-auto' />
        <div className="mb-10 text-center">
          <h1 className='text-5xl md:text-5xl lg:text-6xl font-head  font-extrabold lg:leading-[4rem] mb-4'>Start Free Then <br /> Grow With Us</h1>
        </div>
      </div>
      <div className='pb-20'>
        <Blogs />
      </div> */}
    </>
  )
}

export default Home