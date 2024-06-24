import React, { useContext, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import AlertContext from '../../../Context/Alert/AlertContext';
import { BaseURL } from '../../../Data/BaseURL';
import ChatContext from '../../../Context/ChatContaxt/ChatContext';
import { useNavigate, useParams } from 'react-router-dom';
import BotDepContext from '../../../Context/BotContaxt/BotDepContext';
import { trimToWords } from '../../../Data/UseFullFunction';

const PromptDetailModel = ({ PromptDetail, setPromptDetail, SelectedId }) => {

    const [Prompt, setPrompt] = useState(null)

    const { dep } = useParams();


    const navigate = useNavigate()

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const chatcontext = useContext(ChatContext);
    const { ChatsData, setChatsData } = chatcontext

    const departcontext = useContext(BotDepContext);
    const { setdepartment, department } = departcontext

    const [IsLoading, setIsLoading] = useState(false)


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

    const NewChatCreate = async (Query) => {
        setIsLoading(true)
        try {
            const NewData = []
            setdepartment(dep)

            const PlaceHolderResponse = await fetch(`${BaseURL}/api/chat/fillPlaceholders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({ message: Query, department: dep })
            });

            const placeholderdata = await PlaceHolderResponse.json()

            const askData = {
                query: placeholderdata.filledMessage,
                history: [],
                role: dep
            }

            const ChatResponse = await fetch(`${BaseURL}/api/chat/ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify(askData)
            });

            const AskDetail = await ChatResponse.json()

            NewData.push({
                Type: "User",
                Query: Query
            })

            NewData.push({
                Type: "BizBot",
                Query: AskDetail.response.content
            })

            setChatsData(NewData)

            const responseSaving = await fetch(`${BaseURL}/api/chat/createnewchat`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({
                    Title: trimToWords(Query),
                    Department: dep,
                    ChatConversation: NewData
                })
            });
            const data = await responseSaving.json();
            if (data.success) {
                setIsLoading(false)
                navigate(`/dashboard/c/${data?.Chat?._id}`)
            } else {
                setIsLoading(false)
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            setIsLoading(false)
            showAlert(error.message, 'danger');
        }
    }

    useEffect(() => {
        if (SelectedId) {
            fetchPrompt()
        }
    }, [SelectedId])

    return (
        <>
            {PromptDetail && Prompt &&
                <div className='fixed z-50 top-0 left-0 w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
                    {console.log(1234)}
                    <div className="bg-black/50 w-[100vw] h-[100vh] absolute z-30" onClick={() => { setPromptDetail(false) }}></div>
                    <div className='bg-gray rounded-2xl my-20 py-6 px-4 md:px-8 w-[95%] md:w-[90%] lg:w-[80%] xl:w-[70%] max-h-[95vh] overflow-y-scroll relative z-30 h-fit'>
                        <div className='flex-row pb-2 flex justify-end  items-end mb-5'>
                            <IoMdClose className='text-white text-4xl cursor-pointer' onClick={() => { setPromptDetail(false) }} />
                        </div>
                        <div className="flex flex-col font-para w-[90%] m-auto gap-4">
                            <h2 className='text-center font-bold text-white text-2xl'>{Prompt?.Name}</h2>
                            <div className="flex flex-col gap-6 md:flex-row justify-between">
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
                                <button
                                    className={`bg-white font-para text-lg border-2 border-white h-fit font-semibold rounded-lg py-2 px-4 ${IsLoading ? "opacity-30" : "hover:bg-transparent hover:text-white"} ease-in-out duration-300`}
                                    onClick={() => {
                                        setChatsData([])
                                        NewChatCreate(Prompt?.PromptsList[0]?.value)
                                    }}
                                >
                                    Try it now
                                </button>
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
                            {Prompt?.TipsList?.length > 0 && <div className="flex text-white flex-col gap-2">
                                <h2 className='text-lg font-bold'>Tips</h2>
                                <div className="flex flex-col gap-3">
                                    {Prompt?.TipsList?.map((tipdata, index) => (
                                        <div className="bg-[#D9D9D9] text-sm py-4 px-4 rounded-md" key={index}>
                                            <p className='text-gray'> <span className='font-bold text-base'>{index + 1}-</span>{tipdata?.value}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>}
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default PromptDetailModel