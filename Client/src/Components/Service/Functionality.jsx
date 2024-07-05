import React from 'react'

const Functionality = () => {

    const data=[
        {
            name:"Effizientere Arbeitsprozesse für KMUs und Selbständige",
            icon:"./Features/f21.png"
        },
        {
            name:"Moderne Arbeitsweisen dank New Work",
            icon:"./Features/f22.png"
        },
        {
            name:"Der JUNITO BizBot: Ihr digitaler Mitarbeiter",
            icon:"./Features/f23.png"
        },
        // {
        //     name:"Mehr unter www.junito.at oder buchen Sie sofort ein gratis Erstgespräch",
        //     icon:"./Features/f24.png"
        // },
    ]

    return (
        <div className='w-[90%] 2xl:w-[80%]  m-auto flex flex-col gap-8'>
            <div className="flex flex-col lg:flex-row gap-4 md:gap-8 items-center">
                <div className="flex flex-col gap-4 basis-[50%]">
                    <h1 className=' text-gray text-base mdtext-lg font-light uppercase font-para'>Lösungen                </h1>
                    <h1 className=' text-black text-xl md:text-2xl lg:text-3xl font-bold font-play'>Sie sind ein KMU oder Selbständiger und möchten effizienter arbeiten?                    </h1>
                </div>
                <p className='basis-[50%] font-para text-sm md:text-base text-black'>Mit JUNITO setzen Sie auf praxisnahe Beratung und intelligente Tools, die Ihre Geschäftsprozesse optimieren, Ihnen New Work näherbringen und Ihnen den Weg in die digitale Zukunft ebnen.                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 justify-between my-10 md:my-20">
                {data.map((item,index)=>(
                    <div className="basis-[25%] flex flex-col gap-4 items-center" key={index}>
                        <div className='bg-gray p-3 rounded-full w-fit'>
                            <img src={item.icon} alt="" className='w-[25px] h-[25px]' />
                        </div>
                        <h2 className='font-para text-gray text-sm md:text-base text-center lg:text-lg font-bold'>{item.name}</h2>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Functionality