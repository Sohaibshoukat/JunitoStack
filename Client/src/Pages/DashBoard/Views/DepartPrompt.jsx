import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import AlertContext from '../../../Context/Alert/AlertContext';
import { BaseURL } from '../../../Data/BaseURL';
import PromptDetailModel from '../../../Components/Dashboard/PromptDetail/PromptDetailModel';

const DepartPrompt = () => {

    const [PromptDetail, setPromptDetail] = useState(false)
    const [prompts, setPrompts] = useState([]);
    const [SelectedId, setSelectedId] = useState(null)

    const { dep } = useParams()


    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    useEffect(() => {
        if (dep) {
            fetchPromptsByDepartment();
        }
    }, [dep]);

    const fetchPromptsByDepartment = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/company/prompts/${dep}`);
            const data = await response.json();
            if (response.ok) {
                setPrompts(data.Prompts);
            } else {
                showAlert(data.message || 'Error Getting Prompts', "danger")
            }
        } catch (error) {
            showAlert(error.message, "danger")
        }
    };

    return (
        <>
            <PromptDetailModel PromptDetail={PromptDetail} setPromptDetail={setPromptDetail} SelectedId={SelectedId} />

            <div className='flex flex-col py-10 gap-6 w-[90%] md:w-[90%] m-auto overflow-y-scroll md:px-6'>
                {prompts.map((item, index) => (
                    <div className="bg-white rounded-lg shadow-shadow2 py-3 md:py-4 lg:py-6 px-3 md:px-3 lg:px-6" key={index}>
                        <h2 className='text-gray font-bold text-2xl'>{item?.Type}</h2>
                        <div className="my-4">
                            <div class="relative overflow-x-auto">
                                <table class="w-full text-sm font-para text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                    <thead class="text-base font-normal uppercase text-slate-300">
                                        <tr>
                                            <th class="px-auto md:px-6 py-2 md:py-4">
                                                #
                                            </th>
                                            <th class="px-auto md:px-6 py-2 md:py-4">
                                                Name
                                            </th>
                                            <th class="px-auto md:px-6 py-2 md:py-4">
                                                Type
                                            </th>
                                            <th class="px-auto md:px-6 py-2 md:py-4">
                                                Potential
                                            </th>
                                            <th class="px-auto md:px-6 py-2 md:py-4">
                                                Kategory
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {item?.List?.map((item2, index2) => (
                                            <tr
                                                class="bg-white border-b font-normal text-base border-slate-200"
                                                key={index}
                                                onClick={() => { 
                                                    setSelectedId(item2._id)
                                                    setPromptDetail(true) 
                                                }}
                                            >
                                                <th class="px-auto md:px-6 py-2 md:py-4">
                                                    {index2}
                                                </th>
                                                <td class="px-auto md:px-6 py-2 md:py-4 min-w-max">
                                                    {item2.Name}
                                                </td>
                                                <td class="px-auto md:px-6 py-2 md:py-4">
                                                    <div className={`${item2.Type == 'Conversation' ? "bg-[#16C098]/30 border-[#00B087] text-[#008767]" : "bg-[#FEF6E6] border-[#FF8900] text-[#FF8900]"} text-center py-2 px-3 rounded-lg border-2`}>
                                                        {item2.Type}
                                                    </div>
                                                </td>
                                                <td class="px-auto md:px-6 py-2 md:py-4">
                                                    <div
                                                        className={`
                                                                ${item2.Potential == 'Premium' ? "bg-[#F0F9FF] border-[#0095FF] text-[#0095FF]"
                                                                : item2.Potential == 'High' ? "bg-[#F0FDF4] border-[#00E58F] text-[#00E58F]"
                                                                    : item2.Potential == 'Medium' ? "bg-[#FBF1FF] border-[#884DFF] text-[#884DFF]" :
                                                                        "bg-[#FEF6E6] border-[#FF8900] text-[#FF8900]"} text-center w-full py-2 px-3 rounded-lg border-2`}
                                                    >
                                                        {item2.Potential}
                                                    </div>
                                                </td>
                                                <td class="px-auto md:px-6 py-2 md:py-4">
                                                    {item2.Category}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                ))}
                {/* <div className="bg-white rounded-lg shadow-shadow3 py-3 md:py-6 lg:py-10 px-3 md:px-6 lg:px-10">
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
            </div> */}

            </div>
        </>
    )
}

export default DepartPrompt