import React, { useContext, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import AlertContext from '../../../Context/Alert/AlertContext';
import { BaseURL } from '../../../Data/BaseURL';

const PromptDetailModel = ({ PromptDetail, setPromptDetail, SelectedId }) => {

    const [Prompt, setPrompt] = useState(null)

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const fetchPrompt = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/company/promptdetail/${SelectedId}`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            const data = await response.json();
            if (response.ok) {
                setPrompt(data.Prompt)
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        if (SelectedId) {
            fetchPrompt()
        }
    }, [SelectedId])

    return (
        <>
            {PromptDetail && Prompt &&
                <div className='fixed z-50 top-0 left-0 w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
                    <div className="bg-black/50 w-[100vw] h-[100vh] absolute z-30" onC5lick={() => { setPromptDetail(false) }}></div>
                    <div className='bg-gray rounded-2xl my-20 py-6 px-4 md:px-8 w-[95%] md:w-[90%] lg:w-[80%] xl:w-[70%] max-h-[95vh] overflow-y-scroll relative z-30 m-auto h-fit'>
                        <div className='flex-row pb-2 flex justify-end  items-end mb-5'>
                            <IoMdClose className='text-white text-4xl' onClick={() => { setPromptDetail(false) }} />
                        </div>
                        <div className="flex flex-col font-para w-[90%] m-auto gap-4">
                            <h2 className='text-center font-bold text-white text-2xl'>{Prompt?.Name}</h2>
                            <div className="flex flex-col gap-2">
                                <div className="flex flex-row gap-2 items-center">
                                    <h2 className='text-white font-medium'>Category</h2>
                                    <div
                                        className='bg-[#FEF6E6] w-fit text-sm border-[#FF8900] text-[#FF8900] text-center py-1 px-3 rounded-lg border-2'
                                    >
                                        {Prompt?.Category}
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <h2 className='text-white font-medium'>Potential</h2>
                                    <div
                                        className='bg-[#F0F9FF] text-sm border-[#0095FF] text-[#0095FF] w-fit text-center py-1 px-3 rounded-lg border-2'
                                    >
                                        {Prompt?.Potential}
                                    </div>
                                </div>
                                <div className="flex flex-row gap-2 items-center">
                                    <h2 className='text-white font-medium'>Type</h2>
                                    <div
                                        className='bg-[#FEF6E6] text-sm w-fit border-[#FF8900] text-[#FF8900] text-center py-1 px-3 rounded-lg border-2'
                                    >
                                        {Prompt?.Type}
                                    </div>
                                </div>
                            </div>
                            <div className="flex text-white flex-col gap-2">
                                <h2 className='text-lg font-bold'>Uber</h2>
                                <p className='text-sm'>
                                    {Prompt?.Info}
                                </p>
                            </div>
                            <div className="flex text-white flex-col gap-2">
                                <h2 className='text-lg font-bold'>Prompts</h2>
                                <div className="flex flex-col gap-3">
                                    {Prompt?.PromptsList?.map((promptdata, index) => (
                                        <div className="bg-[#D9D9D9] text-sm py-4 px-4 rounded-md" key={index}>
                                            <p className='text-gray'> <span className='font-bold text-base'>{index + 1}-</span>{promptdata?.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex text-white flex-col gap-2">
                                <h2 className='text-lg font-bold'>Tips</h2>
                                <div className="flex flex-col gap-3">
                                    {Prompt?.TipsList?.map((tipdata, index) => (
                                        <div className="bg-[#D9D9D9] text-sm py-4 px-4 rounded-md" key={index}>
                                            <p className='text-gray'> <span className='font-bold text-base'>{index + 1}-</span>{tipdata?.value}</p>
                                        </div>
                                    ))}
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