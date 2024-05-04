import React from 'react'
import { useParams } from 'react-router-dom'

const DepartPrompt = ({PromptDetail, setPromptDetail}) => {

    const { dep } = useParams()

    const Detail = [
        {
            Name: "Klick Online Kurs Creator erstellt verkaufsfähige Inhalte",
            Type: "Instand Reply",
            Potential: "Premium",
            Kategory: "HR"
        },
        {
            Name: "Klick Online Kurs Creator erstellt verkaufsfähige Inhalte",
            Type: "Conversation",
            Potential: "High",
            Kategory: "Marketing"
        },
        {
            Name: "Klick Online Kurs Creator erstellt verkaufsfähige Inhalte",
            Type: "Conversation",
            Potential: "High",
            Kategory: "Marketing"
        },
        {
            Name: "Klick Online Kurs Creator erstellt verkaufsfähige Inhalte",
            Type: "Conversation",
            Potential: "High",
            Kategory: "Marketing"
        },
        {
            Name: "Klick Online Kurs Creator erstellt verkaufsfähige Inhalte",
            Type: "Conversation",
            Potential: "Low",
            Kategory: "Marketing"
        },
        {
            Name: "Klick Online Kurs Creator erstellt verkaufsfähige Inhalte",
            Type: "Conversation",
            Potential: "High",
            Kategory: "Marketing"
        },
        {
            Name: "Klick Online Kurs Creator erstellt verkaufsfähige Inhalte",
            Type: "Conversation",
            Potential: "High",
            Kategory: "Marketing"
        },
        {
            Name: "Klick Online Kurs Creator erstellt verkaufsfähige Inhalte",
            Type: "Conversation",
            Potential: "Medium",
            Kategory: "Marketing"
        }

    ]

    return (
        <div className='flex flex-col py-10 gap-6 w-[90%] md:w-[90%] m-auto overflow-y-scroll md:px-6'>
            <div className="bg-white rounded-lg shadow-shadow3 py-3 md:py-6 lg:py-10 px-3 md:px-6 lg:px-10">
                <h2 className='text-gray font-bold text-2xl'>Allgemein</h2>
                <div className="my-4">
                    <div class="relative overflow-x-scroll">
                        <table class="w-max text-sm font-para text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-base font-normal uppercase text-slate-300">
                                <tr>
                                    <th  class="px-auto md:px-6 py-2 md:py-4">
                                        #
                                    </th>
                                    <th  class="px-auto md:px-6 py-2 md:py-4">
                                        Name
                                    </th>
                                    <th  class="px-auto md:px-6 py-2 md:py-4">
                                        Type
                                    </th>
                                    <th  class="px-auto md:px-6 py-2 md:py-4">
                                        Potential
                                    </th>
                                    <th  class="px-auto md:px-6 py-2 md:py-4">
                                        Kategory
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Detail?.map((item, index) => (
                                    <tr 
                                        class="bg-white border-b font-normal text-base border-slate-200" 
                                        key={index}
                                        onClick={()=>{setPromptDetail(true)}}
                                    >
                                        <th class="px-auto md:px-6 py-2 md:py-4">
                                            {index}
                                        </th>
                                        <td class="px-auto md:px-6 py-2 md:py-4 min-w-max">
                                            {item.Name}
                                        </td>
                                        <td class="px-auto md:px-6 py-2 md:py-4">
                                            <div className={`${item.Type == 'Conversation' ? "bg-[#16C098]/30 border-[#00B087] text-[#008767]" : "bg-[#FEF6E6] border-[#FF8900] text-[#FF8900]"} text-center py-2 px-3 rounded-lg border-2`}>
                                                {item.Type}
                                            </div>
                                        </td>
                                        <td class="px-auto md:px-6 py-2 md:py-4">
                                            <div
                                                className={`
                                                    ${item.Potential == 'Premium' ? "bg-[#F0F9FF] border-[#0095FF] text-[#0095FF]"
                                                        : item.Potential == 'High' ? "bg-[#F0FDF4] border-[#00E58F] text-[#00E58F]"
                                                            : item.Potential == 'Medium' ? "bg-[#FBF1FF] border-[#884DFF] text-[#884DFF]" :
                                                                "bg-[#FEF6E6] border-[#FF8900] text-[#FF8900]"} text-center w-full py-2 px-3 rounded-lg border-2`}
                                            >
                                                {item.Potential}
                                            </div>
                                        </td>
                                        <td class="px-auto md:px-6 py-2 md:py-4">
                                            {item.Kategory}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-lg shadow-shadow py-10 px-10">
                <h2 className='text-gray font-bold text-2xl'>Allgemein</h2>
                <div className="my-4">
                    <div class="relative overflow-x-auto">
                        <table class="w-full text-sm font-para text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead class="text-base font-normal uppercase text-slate-300">
                                <tr>
                                    <th  class="px-6 py-3">
                                        #
                                    </th>
                                    <th  class="px-6 py-3">
                                        Name
                                    </th>
                                    <th  class="px-6 py-3">
                                        Type
                                    </th>
                                    <th  class="px-6 py-3">
                                        Potential
                                    </th>
                                    <th  class="px-6 py-3">
                                        Kategory
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {Detail?.map((item, index) => (
                                    <tr class="bg-white border-b font-normal text-base border-slate-200" key={index}>
                                        <th class="px-6 py-4">
                                            {index}
                                        </th>
                                        <td class="px-6 py-4">
                                            {item.Name}
                                        </td>
                                        <td class="px-6 py-4">
                                            <div className={`${item.Type == 'Conversation' ? "bg-[#16C098]/30 border-[#00B087] text-[#008767]" : "bg-[#FEF6E6] border-[#FF8900] text-[#FF8900]"} text-center py-2 px-3 rounded-lg border-2`}>
                                                {item.Type}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4 flex flex-row gap-2">
                                            <div
                                                className={`
                                                    ${item.Potential == 'Premium' ? "bg-[#F0F9FF] border-[#0095FF] text-[#0095FF]"
                                                        : item.Potential == 'High' ? "bg-[#F0FDF4] border-[#00E58F] text-[#00E58F]"
                                                            : item.Potential == 'Medium' ? "bg-[#FBF1FF] border-[#884DFF] text-[#884DFF]" :
                                                                "bg-[#FEF6E6] border-[#FF8900] text-[#FF8900]"} text-center w-full py-2 px-3 rounded-lg border-2`}
                                            >
                                                {item.Potential}
                                            </div>
                                        </td>
                                        <td class="px-6 py-4">
                                            {item.Kategory}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DepartPrompt