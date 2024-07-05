import React, { useState } from 'react'
import Nav from '../../Components/Nav'
import Footer from '../../Components/Footer'
import { useNavigate, useParams } from 'react-router-dom'

const SelectPlan = () => {
    const navigate = useNavigate()
    const [selectedPlan, setSelectedPlan] = useState(null);
    const { id } = useParams()

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
        }
    ]

    return (
        <>
            <Nav />
            <div className="flex items-center justify-center py-32 container mx-auto">
                <div className="mx-auto px-12 flex flex-col gap-6 items-center">
                    <div className="flex lg:flex-row flex-col justify-center gap-10">
                        {PricingPlans?.map((item, index) => (
                            <label
                                key={index}
                                className={`cursor-pointer basis-[50%] shadow-2xl font-para w-full h-auto ${selectedPlan === index ? 'bg-white text-gray-500' : 'bg-gray text-white'}`}
                            >
                                <input
                                    type="radio"
                                    className="peer sr-only"
                                    name="pricing"
                                    onChange={() => setSelectedPlan(index)}
                                />
                                <div className="rounded-md p-5 ring-2 ring-transparent transition-all hover:shadow peer-checked:ring-gray shadow-shadow3 peer-checked:ring-offset-2 h-full flex flex-col justify-between gap-6">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between">
                                            <p className="text-lg font-semibold uppercase text-gray-500 dark:text-gray-400">{item.heading}</p>
                                            <div>
                                                <svg className="text-gray-500 dark:text-gray-400" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="m10.6 13.8l-2.175-2.175q-.275-.275-.675-.275t-.7.3q-.275.275-.275.7q0 .425.275.7L9.9 15.9q.275.275.7.275q.425 0 .7-.275l5.675-5.675q.275-.275.275-.675t-.3-.7q-.275-.275-.7-.275q-.425 0-.7.275ZM12 22q-2.075 0-3.9-.788q-1.825-.787-3.175-2.137q-1.35-1.35-2.137-3.175Q2 14.075 2 12t.788-3.9q.787-1.825 2.137-3.175q1.35-1.35 3.175-2.138Q9.925 2 12 2t3.9.787q1.825.788 3.175 2.138q1.35 1.35 2.137 3.175Q22 9.925 22 12t-.788 3.9q-.787 1.825-2.137 3.175q-1.35 1.35-3.175 2.137Q14.075 22 12 22Z" /></svg>
                                            </div>
                                        </div>
                                        <div className="flex items-end text-lg justify-between">
                                            <p className="font-bold">{item.price}€ {item.type == "Monthly" ? "/Monat" : "/Jahr"}</p>
                                        </div>
                                        <div className="flex flex-col gap-2 font-para">
                                            <h3 className='font-medium text-lg'>{item.Point.head}</h3>
                                            <p>{item.Point.des}</p>
                                        </div>
                                        <div className="flex flex-col gap-2 font-para">
                                            <h3 className='font-medium text-lg'>Terms & Condition</h3>
                                            <p>{item.term}</p>
                                        </div>
                                    </div>
                                    {selectedPlan === index && (
                                        <button
                                            className='bg-gray py-2 px-6 rounded-xl border-2 border-gray'
                                            onClick={() => { navigate(`/checkout/${id}/${item.type}`) }}
                                        >
                                            Continue
                                        </button>
                                    )}
                                </div>
                            </label>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default SelectPlan
