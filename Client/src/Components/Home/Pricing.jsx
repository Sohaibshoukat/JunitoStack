import React from 'react'
import { BsStars } from 'react-icons/bs'
import { TiTick } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';


const Pricing = () => {

    const navigate = useNavigate()
    
    const FeatureData = [
        "7000+ Prompts für über 1000 Unternehmensaufgaben",
        "Individuelle Antworten auf Basis Ihrer Unternehmensdaten",
        "7 verschiedene Businessbereiche zur Erfüllung all Ihrer Bedürfnisse",
        "1 kostenloser Sub-User inklusive",
        "50€ pro Monat für jeden zusätzlichen Sub-User",
        "To-Do-Liste zur Aufgabenverteilung",
        "Chat-Sharing mit anderen Sub-Usern",
        "Unbegrenzte Einladung von Mitarbeitern",
        "Tägliche Vorschläge für Prompts",
    ]
    return (
        <div className='w-[90%] font-para lg:w-[80%] mx-auto my-10 flex flex-col items-center gap-8'>
            <h3 className='text-2xl lg:text-4xl font-para font-semibold text-gray text-center'>Unser Preismodell            </h3>
            <div className="basis-[45%] border-8 border-gray rounded-xl shadow-shadowfaq ">
                <div className="bg-gray py-4 font-para text-2xl font-medium text-center text-white flex gap-2 items-center justify-center">
                Am beliebtesten
                    <BsStars />
                </div>
                <div className="bg-white flex flex-col gap-1 rounded-t-xl w-full py-10 items-center justify-center font-para">
                    <h3 className='text-4xl flex justify-center items-center font-medium'>99€<span className='text-[#636363] text-xl'>/Monat</span></h3>
                    <h3 className='font-para text-lg text-gray font-medium'>oder</h3>
                    <h3 className='text-2xl flex justify-center items-center font-medium'>999€<span className='text-[#636363] text-base'>/Jahr                    </span></h3>
                </div>
                <div className="bg-[#F5F5F5] rounded-b-xl py-6 px-6">
                    <div className="flex flex-col gap-2">
                        {FeatureData?.map((item, index) => (
                            <div className="flex gap-2 font-para items-center" key={index}>
                                <div className="bg-gray p-[2px] rounded-full">
                                    <TiTick className='text-lg text-white' />
                                </div>
                                <h3>{item}</h3>
                            </div>
                        ))}
                    </div>
                    <button 
                        className='bg-gray rounded-lg font-para text-white text-lg font-medium py-2 w-full my-4 border-2 border-gray hover:bg-transparent hover:text-gray ease-in-out duration-300'
                        onClick={()=>{
                            navigate("/sign-up")
                        }}
                    >
                        Starten Sie jetzt!
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Pricing