import React from 'react'
import { IoMdClose } from 'react-icons/io'

const PromptDetailModel = ({ PromptDetail, setPromptDetail }) => {
    return (
        <>
            {PromptDetail &&
                <div className='fixed z-50 w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
                    <div className="bg-black/50 w-[100vw] h-[100vh] absolute z-30" onC5lick={() => { setPromptDetail(false) }}></div>
                    <div className='bg-gray rounded-2xl my-20 py-6 px-4 md:px-8 w-[95%] md:w-[90%] lg:w-[80%] xl:w-[70%] max-h-[95vh] overflow-y-scroll relative z-30 m-auto h-fit'>
                        <div className='flex-row pb-2 flex justify-end  items-end mb-5'>
                            <IoMdClose className='text-white text-4xl' onClick={() => { setPromptDetail(false) }} />
                        </div>
                        <div className="flex flex-col font-para w-[90%] m-auto gap-4">
                            <h2 className='text-center font-bold text-white text-2xl'>1- Klick Online Kurs Creator erstellt verkaufsfähige Inhalte</h2>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <h2 className='text-white font-medium'>Category</h2>
                                    <div className='bg-[#FEF6E6] w-fit text-sm border-[#FF8900] text-[#FF8900] text-center py-1 px-3 rounded-lg border-2'>HR</div>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <h2 className='text-white font-medium'>Potential</h2>
                                    <div className='bg-[#F0F9FF] text-sm border-[#0095FF] text-[#0095FF] w-fit text-center py-1 px-3 rounded-lg border-2'>Premium</div>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <h2 className='text-white font-medium'>Type</h2>
                                    <div className='bg-[#FEF6E6] text-sm w-fit border-[#FF8900] text-[#FF8900] text-center py-1 px-3 rounded-lg border-2'>Instand Reply</div>
                                </div>
                            </div>
                            <div className="flex text-white flex-col gap-2">
                                <h2 className='text-lg font-bold'>Uber</h2>
                                <p className='text-sm'>Starte deinen online Kurs mit dem Erstellen von Outlines und einer Groben Modul Struktur. Im Anschluss können die einzelnen Module ganz einfach generiert werden.</p>
                            </div>
                            <div className="flex text-white flex-col gap-2">
                                <h2 className='text-lg font-bold'>Prompts</h2>
                                <div className="flex flex-col gap-3">
                                    <div className="bg-[#D9D9D9] text-sm py-4 px-4 rounded-md">
                                        <p className='text-gray'> <span className='font-bold text-base'>1-</span>"Sie sind ein Experte im Erstellen von Kursen und Lehrplänen. Sie arbeiten bei der Planung rückwärts, indem Sie mit dem Ergebnis im Kopf beginnen und rückwärts arbeiten, um Lernmodule und Aktivitäten zu erstellen, die die Studierenden zu diesem Ergebnis führen. Alle Ihre Kurse sind projektbasiert. Erstellen Sie eine Kursskizze auf der Grundlage des gewünschten Ergebnisses. Bitte verwenden Sie die Schlüsselwörter [PROMPT] und schreiben Sie alle Ausgaben in Deutsch.</p>
                                    </div>
                                    <div className="bg-[#D9D9D9] text-sm py-4 px-4 rounded-md">
                                        <p className='text-gray'> <span className='font-bold text-base'>2-</span>"Sie sind ein Experte im Erstellen von Kursen und Lehrplänen. Sie arbeiten bei der Planung rückwärts, indem Sie mit dem Ergebnis im Kopf beginnen und rückwärts arbeiten, um Lernmodule und Aktivitäten zu erstellen, die die Studierenden zu diesem Ergebnis führen. Alle Ihre Kurse sind projektbasiert. Erstellen Sie eine Kursskizze auf der Grundlage des gewünschten Ergebnisses. Bitte verwenden Sie die Schlüsselwörter [PROMPT] und schreiben Sie alle Ausgaben in Deutsch.</p>
                                    </div>
                                    <div className="bg-[#D9D9D9] text-sm py-4 px-4 rounded-md">
                                        <p className='text-gray'> <span className='font-bold text-base'>3-</span>"Sie sind ein Experte im Erstellen von Kursen und Lehrplänen. Sie arbeiten bei der Planung rückwärts, indem Sie mit dem Ergebnis im Kopf beginnen und rückwärts arbeiten, um Lernmodule und Aktivitäten zu erstellen, die die Studierenden zu diesem Ergebnis führen. Alle Ihre Kurse sind projektbasiert. Erstellen Sie eine Kursskizze auf der Grundlage des gewünschten Ergebnisses. Bitte verwenden Sie die Schlüsselwörter [PROMPT] und schreiben Sie alle Ausgaben in Deutsch.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="flex text-white flex-col gap-2">
                                <h2 className='text-lg font-bold'>Tips</h2>
                                <div className="flex flex-col gap-3">
                                    <div className="bg-[#D9D9D9] text-sm py-4 px-4 rounded-md">
                                        <p className='text-gray'> <span className='font-bold text-base'>1-</span>"Sie sind ein Experte im Erstellen von Kursen und Lehrplänen. Sie arbeiten bei der Planung rückwärts, indem Sie mit dem Ergebnis im Kopf beginnen und rückwärts arbeiten, um Lernmodule und Aktivitäten zu erstellen, die die Studierenden zu diesem Ergebnis führen.</p>
                                    </div>
                                    <div className="bg-[#D9D9D9] text-sm py-4 px-4 rounded-md">
                                        <p className='text-gray'> <span className='font-bold text-base'>2-</span>"Sie sind ein Experte im Erstellen von Kursen und Lehrplänen. Sie arbeiten bei der Planung rückwärts, indem Sie mit dem Ergebnis im Kopf beginnen und rückwärts arbeiten, um Lernmodule und Aktivitäten zu erstellen, die die Studierenden zu diesem Ergebnis führen.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PromptDetailModel