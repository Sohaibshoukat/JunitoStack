import React, { useContext, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import AlertContext from '../../Context/Alert/AlertContext'
import ChatContext from '../../Context/ChatContaxt/ChatContext'
import BotDepContext from '../../Context/BotContaxt/BotDepContext'
import { BaseURL } from '../../Data/BaseURL'
import { trimToWords } from '../../Data/UseFullFunction'

const PromptDesc = ({ Model, setModel, SelectedID }) => {

    const [Prompt, setPrompt] = useState(null)

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
            const response = await fetch(`${BaseURL}/api/company/promptdetail/${SelectedID}`, {
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

            const PlaceHolderResponse = await fetch(`${BaseURL}/api/chat/fillPlaceholders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({ message: Query, department: department })
            });

            const placeholderdata = await PlaceHolderResponse.json()

            const askData = {
                query: placeholderdata.filledMessage,
                history: [],
                role: department
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
                    Department: department,
                    ChatConversation: NewData
                })
            });
            const data = await responseSaving.json();
            if (data.success) {
                setIsLoading(false)
                setModel(false)
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
        if (SelectedID) {
            fetchPrompt()
        }
    }, [SelectedID])

    return (
        <div>
            {console.log(SelectedID)}
            {Model &&
                <div className='fixed z-[9999999999] w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
                    <div className="bg-black/50 w-[100vw] h-[100vh] absolute z-30" onC5lick={() => { setModel(false) }}></div>
                    <div className='bg-white rounded-2xl py-3 px-2 md:px-4 w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] relative z-30 m-auto max-h-[60%]'>
                        <div className='flex flex-col justify-end items-end mb-5'>
                            <IoMdClose className='text-gray text-4xl' onClick={() => { setModel(false) }} />
                        </div>
                        <div className="flex flex-col gap-4 max-h-[70%] overflow-y-scroll">
                            <div className="flex flex-col gap-2 md:gap-4">
                                <h2 className='text-gray font-para text-lg md:text-xl font-bold'>Question</h2>
                                <p className='ml-2 text-gray text-base font-semibold font-para'>{Prompt?.Info}</p>
                            </div>
                            <div className="flex flex-col gap-2 md:gap-4">
                                <h2 className='text-gray font-para text-lg md:text-xl font-bold'>Prompt</h2>
                                <p className='ml-2 text-gray font- font-para'>{Prompt?.PromptsList[0]?.value}</p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4 justify-end">
                            <button
                                className='hover:bg-gray py-2 px-4 rounded-lg border-2 border-gray mt-4 hover:text-white bg-transparent text-gray font-para ease-in-out duration-300 self-end float-right'
                                onClick={() => { setModel(false) }}
                            >
                                Skip
                            </button>
                            <button
                                className={`bg-gray py-2 px-4 rounded-lg border-2 border-gray mt-4 text-white  font-para ease-in-out duration-300 self-end float-right ${IsLoading ? "opacity-30" : "hover:bg-transparent hover:text-gray"}`}
                                onClick={() => {
                                    if (!IsLoading) {
                                        setChatsData([])
                                        NewChatCreate(Prompt?.PromptsList[0]?.value)
                                    }
                                }}
                            >{!IsLoading ? "Continue" : "Creating Chat"}</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default PromptDesc