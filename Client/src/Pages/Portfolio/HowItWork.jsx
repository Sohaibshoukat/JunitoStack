import React from 'react'
import Detail from '../../Components/How it work/Detail'

const HowItWork = () => {
  return (
    <>

      <div className='flex flex-row items-center justify-center py-20 md:py-32 relative'>
        <img src="./Images/image.png" alt="" className='absolute -z-10 -bottom-[90%] xl:-bottom-[80%] -left-[10%] w-[250px] md:w-[300px] lg:w-auto' />
        <img src="./Images/image.png" alt="" className='rotate-180 absolute -z-10 -top-[60%] -right-[10%] w-[250px]  md:w-[300px] lg:w-auto' />
        <div className='flex flex-col gap-4 md:gap-8 items-center justify-center w-[90%] md:w-auto'>
          <h1 className='text-primary font-head text-4xl md:text-5xl lg:text-6xl font-extrabold text-center'>Your Personalized Zero Party Inside!</h1>
          <p className='text-lg md:text-xl text-center xl:text-2xl font-light md:max-w-[80%] xl:max-w-[60%] font-Para'>Works in any Email Service Providers and Websites.</p>
        </div>
      </div>

<Detail/>

    </>
  )
}

export default HowItWork