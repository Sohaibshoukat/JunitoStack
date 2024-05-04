import React from 'react'

const AboutText = () => {
    return (
        <div className='w-[90%] lg:w-[90%] m-auto bg-white shadow-shadow2 py-4 md:py-10 px-6 md:px-10'>
            <div className="flex flex-col lg:flex-row justify-between gap-6 items-center">
                <div className="basis-[60%]">
                    <div className="flex flex-col gap-2">
                        <h1 className=' text-black text-base md:text-lg xl:text-xl font-bold font-para'>Who we are</h1>
                        <h1 className=' text-gray text-xl md:text-2xl lg:text-3xl font-extrabold font-para  mb-0 xl:mb-2'>About us</h1>
                        <p
                            className=' text-black font-para text-sm md:text-base font-normal  mb-0 xl:mb-2'
                        >
                            Nullam ornare blandit urna, eu pulvinar elit faucibus eget. Sed justo mauris, ultricies eu urna at, gravida commodo mauris. Quisque ac felis ac sapien dictum gravida aliquet ac purus. Donec sit amet ex vel ex sollicitudin posuere at et metus.
                        </p>
                        <p
                            className=' text-black font-para text-sm md:text-base font-normal  mb-0 xl:mb-2'
                        >
                            Quisque ac felis ac sapien dictum gravida aliquet ac purus. Donec sit amet ex vel ex sollicitudin posuere at et metus. Duis sodales ligula nisi,
                        </p>
                        <p
                            className=' text-black font-para text-sm md:text-base font-normal  mb-0 xl:mb-2'
                        >
                            Donec sit amet ex vel ex sollicitudin posuere at et metus. Duis sodales ligula nisi, molestie lacinia ex rhoncus vel.
                        </p>
                        <button className='bg-[#1F2429] rounded-full px-5 my-2 py-2 w-fit font-para text-white font-bold text-base md:text-lg'>Read More</button>
                    </div>
                </div>
                <div className="basis-[40%] relative w-[100%]">
                    <div className='w-[60%] h-[60%] absolute -top-5 -right-2 xl:right-2 -z-0 rounded-2xl bg-gray'></div>
                    <div className='w-[60%] h-[60%] absolute -bottom-5 -left-2 xl:left-2 -z-0 rounded-2xl bg-gray'></div>
                    <img src="./Banner/HomeBg1.png" alt="" className='w-[90%] m-auto z-10 relative' />
                </div>
            </div>
        </div>
    )
}

export default AboutText