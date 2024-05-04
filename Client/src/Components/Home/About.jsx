import React from 'react'

const About = () => {


    return (
        <div className='bg-white w-[100vw] py-10 md:py-20'>
            <div className='w-[90%] md:w-[90%] xl:w-[85%] m-auto'>
                <div className='flex flex-col-reverse lg:flex-row justify-between gap-y-16 gap-x-6 lg:items-center'>
                    <div className='xl:basis-[50%] md:basis-[50%] lg:w-[50%] w-[100%]'>
                        <img src="./Banner/BannerAbout.png" alt="" className='w-[80%] m-auto' />
                    </div>
                    <div className='xl:basis-[45%] md:basis-[50%] lg:w-[50%]'>
                        <h2 className='text-gray font-bold text-xl md:text-2xl font-mont lg:text-3xl xl:text-4xl mb-4'>About us</h2>
                        <p className='text-black text-xs md:text-sm xl:text-base font-para mb-2'>Lorem ipsum dolor sit amet consectetur. Tempus amet placerat senectus tincidunt quis hendrerit proin et. Ipsum tempor euismod enim pulvinar iaculis auctor turpis nulla. Accumsan tortor massa metus enim lobortis aliquam egestas vel tellus. Augue porta non cursus mi condimentum quam. Sit quam donec odio quam dolor elementum elementum aliquet aliquam. Senectus tempor turpis euismod malesuada velit.</p>
                        <p className='text-black text-xs md:text-sm xl:text-base font-para'>Vulputate adipiscing pharetra pretium turpis justo orci nisl sagittis egestas. Ultrices volutpat dolor vitae amet justo in placerat quis scelerisque. A nunc volutpat amet molestie sit. Mattis molestie tristique lorem porta mattis leo neque. Sagittis lorem in tincidunt morbi viverra congue dictumst. Mattis mi nunc non dignissim morbi etiam.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default About