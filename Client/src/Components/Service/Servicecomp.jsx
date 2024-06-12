import React from 'react'
import {useNavigate} from "react-router-dom"
import Marquee from 'react-fast-marquee';

const Servicecomp = () => {

    const navigate = useNavigate()

    const service = [
        {
            head: "Human Resource",
            img: "./Service/HR.png"
        },
        {
            head: "Marketing",
            img: "./Service/Media.png"
        },
        {
            head: "Support",
            img: "./Service/Support.png"
        },
        {
            head: "Agentour",
            img: "./Service/Agentour.png"
        },
        {
            head: "Vertrieb",
            img: "./Service/Vertrib.png"
        },
        {
            head: "Startup",
            img: "./Service/Startup.png"
        },
        {
            head: "Assistent",
            img: "./Service/Assistent.png"
        }
    ]
    return (
        <div className="bg-gray w-[100%] py-20">
            <div className="w-[90%] m-auto flex flex-col lg:flex-row gap-10">
                <div className="flex flex-col gap-4 basis-[50%] text-white">
                    <h2 className='font-para textstyle text-2xl'>SERVICES</h2>
                    <p className='font-para text-sm md:text-base'>We are providing you a chat bot with multiple functionalities which covers many areas of fields and help you to become complete Ai platform to handle every task professionally.</p>
                    <p className='font-para text-xs md:text-sm'>Lorem ipsum dolor sit amet consectetur. Non euismod sed sed eu. Faucibus feugiat auctor quis sed at amet cras in. Pulvinar proin elementum ut vel. Vitae eget lacus</p>
                    <p className='font-para text-xs md:text-sm'>es malesuada condimentum pharetra. Morbi magna nunc dui lobortis aliquet ipsum ut. Enim eu vulputate eu lacinia rhoncus. Turpis vulputate id sed elementum morbi.</p>
                    <button 
                        className='text-sm md:text-base font-para py-1 px-6 text-gray font-bold w-fit bg-white border-2 border-white hover:bg-transparent hover:text-white ease-in-out duration-300'
                        onClick={()=>{navigate("/contact")}}
                    >
                        Contact Us
                    </button>
                </div>
                <div className="basis-[50%]">
                    <img src="./Banner/Service.png" alt="" className='w-[100%] md:w-[80%] m-auto' />
                </div>
            </div>
            <div className='mt-10'>
                <Marquee direction="right" speed={50} gradientWidth={500}>
                    {service.map((item, index) => (
                        <div className="border-2 w-[200px] md:w-[300px] h-[250px] flex flex-col justify-between gap-4  group border-white rounded-lg py-2 md:py-6 px-4 md:px-10 ml-4 md:ml-20" key={index}>
                            {/* <div className=""> */}
                                <img src={item.img} alt="" className='w-[70%] m-auto object-cover' />
                                <div className="flex flex-row items-center justify-between">
                                    <h2 className='font-para text-base md:text-lg text-white font-bold'>{item.head}</h2>
                                    <img src="./Porp/arrow2.png" alt="" className='group-hover:rotate-45 ease-in-out duration-300' />
                                </div>
                            {/* </div> */}
                        </div>
                    ))}
                </Marquee>
            </div>
        </div>
    )
}

export default Servicecomp