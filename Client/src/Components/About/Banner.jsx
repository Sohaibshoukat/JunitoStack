import React from 'react'

const Banner = () => {
  return (
    <>
      <div
        className="flex z-10 flex-col lg:flex-row gap-16 lg:gap-0 justify-between items-center xl:h-[120vh] 2xl:h-[100vh] h-[100%] pt-28 pb-16 md:pt-36 md:pb-11 2xl:py-0  FadeIn relative"
      >
        <div className='absolute -z-0 lg:block hidden  top-[45%] left-[25%]'>
          <img src="./Banner/Banner1.png" alt="" />
        </div>
        <div className='flex flex-col justify-center px-6 text-left gap-2 z-10 relative lg:gap-4 md:px-10 xl:px-20 m-auto lg:w-1/2 '>
          <img src="./Banner/Banner2.png" alt="" className='absolute -top-[10%] md:-top-[20%] left-[30%] w-[150px] md:w-[200px]' />
          <h1 className=' text-gray text-xl md:text-2xl xl:text-3xl font-bold font-para  mb-0 xl:mb-2'>Thomas Schwabl - FOUNDER</h1>
          <p
            className=' text-black font-para text-sm md:text-base font-normal  mb-0 xl:mb-2'
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin consectetur justo quis euismod vehicula. Quisque diam dui, imperdiet et hendrerit in, accumsan tempus erat.
          </p>
          <p
            className=' text-black font-para text-sm md:text-base font-normal  mb-0 xl:mb-2'
          >
            Nullam ornare blandit urna, eu pulvinar elit faucibus eget. Sed justo mauris, ultricies eu urna at, gravida commodo mauris. Quisque ac felis ac sapien dictum gravida aliquet ac purus. Donec sit amet ex vel ex sollicitudin posuere at et metus. Duis sodales ligula nisi, molestie lacinia ex rhoncus vel.
          </p>
          <p
            className=' text-black font-para text-sm md:text-base font-normal  mb-0 xl:mb-2'
          >
            Nullam ornare blandit urna, eu pulvinar elit faucibus eget. Sed justo mauris, ultricies eu urna at, gravida commodo mauris. Quisque ac felis ac sapien dictum gravida aliquet ac purus. Donec sit amet ex vel ex sollicitudin posuere at et metus. Duis sodales ligula nisi, molestie lacinia ex rhoncus vel.
          </p>
        </div>
        <div
          className='relative lg:w-1/2 flex flex-col items-center justify-center z-10 bg-[#dfe1fa] lg:bg-transparent'
        >
          <img src="./Banner/OwnerAbout.png" alt="" className='w-[70%]  hidden lg:block' />
          <img src="./Banner/OwnerAbout2.png" alt="" className='block lg:hidden' />

        </div>
      </div>
    </>
  )
}

export default Banner