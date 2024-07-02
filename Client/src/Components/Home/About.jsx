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
                        <h2 className='text-gray font-bold text-xl md:text-2xl font-mont lg:text-3xl xl:text-4xl mb-4'>JUNITO – Ihr Partner für die Zukunft der Arbeitswelt</h2>
                        <p className='text-black text-xs md:text-sm xl:text-base font-para mb-2'>Bei JUNITO sind wir stolz darauf, KMUs in Österreich, Deutschland und der Schweiz mit modernster Technologie zu unterstützen. Mit unserer umfassenden Erfahrung und einem tiefen Verständnis für die Bedürfnisse kleiner und mittlerer Unternehmen, bieten wir maßgeschneiderte Lösungen, die Ihr Geschäft voranbringen. Besuchen Sie uns auf junito.at für weitere Informationen.</p>
                    </div>

                </div>
            </div>
        </div>
    )
}

export default About