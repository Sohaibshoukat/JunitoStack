import React from 'react'

import Plans from '../../Components/Pricing/Plans'
import FAQ from '../../Components/Pricing/FAQ'


const Pricing = () => {
  return (
    <>
      <div className='flex flex-row items-center justify-center pt-20 md:pt-32 relative'>
        <img src="./Images/image.png"alt="" className='absolute -z-10 -bottom-[90%] xl:-bottom-[80%] -left-[10%] w-[250px] md:w-[300px] lg:w-auto' />
        <img src="./Images/image.png" alt="" className='rotate-180 absolute -z-10 -top-[60%] -right-[10%] w-[250px]  md:w-[300px] lg:w-auto' />
        <div className='flex flex-col gap-4 md:gap-8 items-center justify-center w-[90%] md:w-auto'>
          <h1 className='text-primary text-3xl md:text-4xl lg:text-6xl font-extrabold text-center font-head'>Leap from Free to Phenomenal: <br className='hidden md:block' /> Grow with Us!</h1>
        </div>
      </div>

      <Plans />

      <FAQ />
    </>
  )
}

export default Pricing