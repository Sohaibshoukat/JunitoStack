import React from 'react'
import { useNavigate } from "react-router-dom"

const AboutText = () => {
    const navigate = useNavigate()
    return (
        <div className='w-[90%] lg:w-[90%] m-auto bg-white shadow-shadow2 py-4 md:py-10 px-6 md:px-10'>
            <div className="flex flex-col lg:flex-row justify-between gap-6 items-center">
                <div className="basis-[60%]">
                    <div className="flex flex-col gap-2">
                        <h1 className=' text-black text-base md:text-lg xl:text-xl font-bold font-para'>Über Uns                        </h1>
                        <h1 className=' text-gray text-xl md:text-2xl lg:text-3xl font-extrabold font-para  mb-0 xl:mb-2'>Unser Ziel für KMUs: Der Weg zur Unabhängigkeit</h1>
                        <p
                            className=' text-black font-para text-sm md:text-base font-normal  mb-0 xl:mb-2'
                        >
                            Stellen Sie sich eine Welt vor, in der Ihr KMU durch Digitalisierung und Prozessoptimierung floriert – ohne immer auf teure externe Beratungen angewiesen zu sein. Mit unserem BizBot geben wir Ihnen die Werkzeuge an die Hand, um selbstständig komplexe Geschäftsprozesse zu meistern und gleichzeitig erhebliche Kosten zu sparen.
                        </p>
                        <h1 className=' text-gray text-xl md:text-2xl lg:text-3xl font-extrabold font-para  mb-0 xl:mb-2'>Unsere Vision:                        </h1>
                        <p
                            className=' text-black font-para text-sm md:text-base font-normal  mb-0 xl:mb-2'
                        >
                            Wir bei JUNITO sind überzeugt, dass wahre Unabhängigkeit und Erfolg aus der Fähigkeit resultieren, interne Stärken zu nutzen und zu entfalten. Der BizBot ist nicht nur ein digitales Tool, sondern Ihr Partner in der Transformation. Er ermöglicht es, Ihnen repetitive Aufgaben zu erleitern, Ressourcen effizienter zu nutzen und sich auf das Wesentliche zu konzentrieren – das Wachstum Ihres Unternehmens.
                        </p>
                        <h1 className=' text-gray text-xl md:text-2xl lg:text-3xl font-extrabold font-para  mb-0 xl:mb-2'>Unser Versprechen:</h1>
                        <p
                            className=' text-black font-para text-sm md:text-base font-normal  mb-0 xl:mb-2'
                        >
                            Mit dem BizBot an Ihrer Seite, wird Ihr KMU in der Lage sein, die Herausforderungen der digitalen Transformation eigenständig zu meistern. Kein unnötiger Aufwand mehr für teure Berater – nur klare, präzise und sofort umsetzbare Lösungen. Werden Sie Teil der Revolution und entfesseln Sie das volle Potenzial Ihres Unternehmens mit JUNITO und dem BizBot.
                        </p>
                        <button
                            className='bg-[#1F2429] rounded-full px-5 my-2 py-2 w-fit font-para text-white font-bold text-base md:text-lg'
                            onClick={() => {
                                navigate('/contact')
                            }}
                        >
                            Kontakt
                        </button>
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