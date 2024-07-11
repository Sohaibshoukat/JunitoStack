import React from 'react'
import { BsStars } from 'react-icons/bs'
import { TiTick } from "react-icons/ti";
import { useNavigate } from 'react-router-dom';


const Pricing = () => {

    const navigate = useNavigate()

    const PricingPlans = [
        {
            heading: "Pro-Plan (Jährliche Abrechnung)",
            Point: {
                head: "Maximale Ersparnis, maximale Leistung ",
                des: "Entscheiden Sie sich für unseren jährlichen Plan und sparen Sie die Kosten von zwei ganzen Monaten! Dieser Plan ist perfekt für Unternehmen, die bereit sind, ihr Engagement zu vertiefen und langfristig von kontinuierlichen Verbesserungen und Kosteneinsparungen zu profitieren. Die Mindestlaufzeit beträgt ein Jahr mit automatischer Verlängerung, es sei denn, Sie entscheiden sich vor Ablauf des Jahres dagegen."
            },
            price: 990,
            type: "Annually",
            term: "Abo mit jährlichen Zahlungen je (net price plus tax of the country where the order comes from). Erste Zahlung am (eine Woche nach Buchung). Für Privatkunden: Mindestlaufzeit 1 Jahr, dann jährlich kündbar Nach 2 Jahren monatlich kündbar. Für Gewerbe-kunden: Mindestlaufzeit 1 Jahr, dann immer Verlängerung um 1 Jahr, wenn nicht vor Ablauf gekündigt.",
            FeatureData: [
                "2-Monats-Rabatt auf den Jahresplan",
                "7000+ Prompts für über 1000 Unternehmensaufgaben",
                "Individuelle Antworten auf Basis Ihrer Unternehmensdaten",
                "7 verschiedene Businessbereiche zur Erfüllung all Ihrer Bedürfnisse",
                "1 kostenloser Sub-User inklusive",
                "To-Do-Liste zur Aufgabenverteilung",
                "Chat-Sharing mit anderen Sub-Usern",
                "Unbegrenzte Einladung von Mitarbeitern",
                "Tägliche Vorschläge für Prompts",
            ],
            best: false,
        },
        {
            heading: "JUNITO BizBot",
            description: "Der fortschrittlichste KMU-Assistent auf dem Markt. Mit über 1.000 bewährten Lösungen für HR, Marketing, Vertrieb und mehr. BizBot Plus ist die ultimative Erweiterung, um schneller und effizienter zu arbeiten.",
            Point: {
                head: "Freiheit und Flexibilität ",
                des: "Ideal für KMUs und Selbstständige, die eine flexible Lösung suchen. Genießen Sie die Vorteile von BizBot mit einer Mindestlaufzeit von nur drei Monaten. Nach der Einstiegsphase können Sie Ihren Plan jederzeit monatlich anpassen oder kündigen. Starten Sie ohne langfristige Verpflichtungen und steigern Sie sofort Ihre betriebliche Effizienz."
            },
            price: 99,
            type: "Monthly",
            term: "Abo mit monatlichen Zahlungen je (net price plus tax of the country where the order comes from). Erste Zahlung am (eine Woche nach Buchung). Mindestlaufzeit 3 Monate, dann monatlich kündbar.",
            FeatureData: [
                "7000+ Prompts für über 1000 Unternehmensaufgaben",
                "Individuelle Antworten auf Basis Ihrer Unternehmensdaten",
                "7 verschiedene Businessbereiche zur Erfüllung all Ihrer Bedürfnisse",
                "1 kostenloser Sub-User inklusive",
                "To-Do-Liste zur Aufgabenverteilung",
                "Chat-Sharing mit anderen Sub-Usern",
                "Unbegrenzte Einladung von Mitarbeitern",
                "Tägliche Vorschläge für Prompts",
            ],
            best: true,
        },
        {
            heading: "Team-Plan (Zusätzlicher User)",
            description: "Der fortschrittlichste KMU-Assistent auf dem Markt. Mit über 1.000 bewährten Lösungen für HR, Marketing, Vertrieb und mehr. BizBot Plus ist die ultimative Erweiterung, um schneller und effizienter zu arbeiten.",
            Point: {
                head: "Wachsen Sie gemeinsam ",
                des: "Erweitern Sie Ihr Tea m um zusätzliche BizBot-User, um die Zusammenarbeit und Produktivität zu maximieren. Nach der einfachen Zahlungsabwicklung können Sie sofort einen neuen User hinzufügen und diesen nahtlos in Ihre bestehenden Prozesse integrieren. Ideal für wachsende Teams, die eine skalierbare Lösung benötigen, um mit der Dynamik des Marktes Schritt zu halten."
            },
            price: 49,
            type: "Monthly",
            term: "Sofort fälliges Abo mit monatlichen Zahlungen je (net price plus tax of the country where the order comes from). Mindestlaufzeit 3 Monate, dann monatlich kündbar.",
            FeatureData: [
                "7000+ Prompts für über 1000 Unternehmensaufgaben",
                "Individuelle Antworten auf Basis Ihrer Unternehmensdaten",
                "7 verschiedene Businessbereiche zur Erfüllung all Ihrer Bedürfnisse",
                "1 kostenloser Sub-User inklusive",
                "To-Do-Liste zur Aufgabenverteilung",
                "Chat-Sharing mit anderen Sub-Usern",
                "Unbegrenzte Einladung von Mitarbeitern",
                "Tägliche Vorschläge für Prompts",
            ],
            best: false,
        },
    ]
    return (
        <div className='w-[95%] font-para lg:w-[90%] mx-auto my-10 flex flex-col items-center gap-8'>
            <h3 className='text-2xl lg:text-4xl font-para font-semibold text-gray text-center'>Preispläne BizBot</h3>
            <div className="flex lg:flex-row flex-col gap-6 justify-between items-start">
                {PricingPlans?.map((item, index) => (
                    <div className="border-8 border-gray rounded-xl shadow-shadowfaq h-full basis-[33.33%] " key={index}>
                        {item?.best && <div className="bg-gray py-4 font-para text-2xl font-medium text-center text-white flex gap-2 items-center justify-center">
                            Am beliebtesten
                            <BsStars />
                        </div>}
                        <div className="bg-white flex flex-col gap-1 rounded-t-xl w-full py-10 items-center justify-center font-para">
                            <h3 className='text-4xl flex justify-center items-center font-medium'>{item?.price}€<span className='text-[#636363] text-xl'>{item.type == "Monthly" ? "/Monat" : "/Jahr"}</span></h3>
                        </div>
                        <div className="bg-[#F5F5F5] rounded-b-xl py-6 px-6">
                            <div className="flex flex-col gap-2 mb-4 font-para">
                                <h2 className='text-base md:text-lg text-gray font-medium'>{item.Point.head}</h2>
                                <p className='text-sm lg:text-base'>{item.Point.des}</p>
                            </div>
                            <div className="flex flex-col gap-2">
                                {item.FeatureData?.map((item, index) => (
                                    <div className="flex gap-2 font-para items-center" key={index}>
                                        <div className="bg-gray p-[2px] rounded-full">
                                            <TiTick className='text-lg text-white' />
                                        </div>
                                        <h3>{item}</h3>
                                    </div>
                                ))}
                            </div>
                            <div className="flex flex-col gap-2 my-4 font-para">
                                <h2 className='text-lg text-gray font-medium'>Terms and Conditions:</h2>
                                <p>{item.term}</p>
                            </div>
                            <button
                                className='bg-gray rounded-lg font-para text-white text-lg font-medium py-2 w-full my-4 border-2 border-gray hover:bg-transparent hover:text-gray ease-in-out duration-300'
                                onClick={() => {
                                    navigate("/sign-up")
                                }}
                            >
                                Starten Sie jetzt!
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Pricing