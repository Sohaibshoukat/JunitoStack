import React, { useContext, useEffect, useState } from 'react'
import PromptsSlider from '../../Components/Dashboard/PromptsSlider'
import BizBotDep from '../../Components/Dashboard/BizBotDep'
import ChatHistory from '../../Components/Dashboard/ChatHistory'
import { Link, useNavigate } from 'react-router-dom'
import TODOModel from '../../Components/Dashboard/TODOModel'
import Conversation from '../../Components/Dashboard/Conversation'
import PromptDesc from '../../Components/Dashboard/PromptDesc'
import { BaseURL } from '../../Data/BaseURL'
import BotDepContext from '../../Context/BotContaxt/BotDepContext'
import { trimToWords } from '../../Data/UseFullFunction'
import ChatContext from '../../Context/ChatContaxt/ChatContext'
import AlertContext from '../../Context/Alert/AlertContext'
import HistoryContext from '../../Context/History/HistoryContext'

const ChatBot = () => {


    const [Model, setModel] = useState(false)
    const [ModelTODO, setModelTODO] = useState(false)
    const [Query, setQuery] = useState('')
    const [Profile, setProfile] = useState(false)

    const navigate = useNavigate()

    const departcontext = useContext(BotDepContext);
    const { department } = departcontext
    
    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const chatcontext = useContext(ChatContext);
    const { ChatsData, setChatsData } = chatcontext

    const historyContext = useContext(HistoryContext);
    const { fetchHistory } = historyContext;


    const NewChatCreate = async () => {
        try {
            const NewData = ChatsData
            NewData.push({
                Type: "User",
                Query: Query
            })
            NewData.push({
                Type: "BizzBot",
                Query: "Create a chatbot  using python language what will be step for that Sure, I can help you get started with creating a chatbot using GPT in Python. Here are the basic steps you'll need to follow:"
            })
            setChatsData(NewData)
            setQuery("")

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
                fetchHistory()
                navigate(`/dashboard/c/${data?.Chat?._id}`)
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    }

    const newTopic = async () => {
        navigate("/dashboard/chatbot");
        setChatsData([])
    }

    useEffect(() => {
        if (localStorage.getItem("auth-token")) {
            return;
        } else {
            navigate("/login")
        }
    }, [])

    return (
        <>
            <PromptDesc Model={Model} setModel={setModel} />

            <TODOModel ModelTODO={ModelTODO} setModelTODO={setModelTODO} />

            <div className='w-full bg-white py-2 fixed top-0 z-50 items-center px-6 flex justify-between'>
                <h2 className='text-gray font-bold font-head text-2xl'>Chatbot</h2>
                <div className="flex flex-row items-center gap-2 cursor-pointer relative" onClick={() => { setProfile(!Profile) }}>
                    <img src="../Porp/User.png" alt="" className='w-10 h-10 rounded-full' />
                    <div className="flex font-para text-gray flex-col">
                        <h2 className='text-base font-bold'>Musfiq</h2>
                        <p className='text-sm'>User@gmail.com</p>
                    </div>
                    {Profile && <div className="flex rounded-xl z-[999999999] right-0 w-[100%] flex-col gap-2 bg-white absolute bottom-[-250%] shadow-2xl  font-para text-lg font-medium py-2 px-4">
                        <Link to={"/user-dashboard/profile/"}>
                            <h3>Profile</h3>
                        </Link>
                        <Link to={"/user-dashboard/profile/setting"}>
                            <h3>Setting</h3>
                        </Link>
                        <Link to={"/"}>
                            <h3>
                                SignOut
                            </h3>
                        </Link>
                    </div>}
                </div>
            </div>
            <div className='bg-[#F0F0F0] min-h-[100vh]'>
                <div className="flex flex-row items-start gap-4 px-2 md:px-8 pt-20 pb-10 relative">
                    <div className="basis-[70%] w-[97%] md:w-[90%] xl:w-[70%] m-auto ">
                        {ChatsData?.length <= 0 ?
                            <div className='flex flex-col justify-between gap-8'>
                                <div className="text-center flex flex-col gap-3 w-[100%]">
                                    <div className="flex gap-4 justify-center items-end">
                                        <img src="../BizzBot.png" alt="" className='w-6 md:w-12' />
                                        <h2 className='text-gray font-bold text-xl md:text-xl font-para'>Welcome to BizBot</h2>
                                    </div>
                                </div>
                                <PromptsSlider Model={Model} setModel={setModel} />
                                <div className='w-[90%] m-auto' id="AI-chat">
                                    <div className='flex flex-col gap-4' id='Chat-Body'>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-2 items-start">
                                                <img src="../BizzBot.png" alt="" className='w-6' />
                                                <h2 className='text-gray font-bold text-lg font-para'>BizBot</h2>
                                            </div>
                                            <p className=' ml-4 text-gray font-para'>Hi ,How can I help you today?</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <Conversation setModelTODO={setModelTODO} />
                        }
                        <div className='w-full'>
                            <div className="flex flex-col md:flex-row gap-2 mt-8  w-full">
                                <div
                                    className='rounded-2xl  flex h-fit w-[-webkit-fill-available] max-w-fit flex-row items-center gap-2 ease-in-out duration-100000 group gradientcolor p-3 cursor-pointer'
                                    onClick={newTopic}
                                >
                                    <img src="../Porp/chat.png" alt="" srcset="" className='w-4 h-4 md:w-6 md:h-6' />
                                    <h2 className='hidden w-max group-hover:block ease-in-out duration-1000 font-para text-sm font-medium md:text-base text-white'>New Topic</h2>
                                </div>
                                <div className="bg-white w-[100%] rounded-xl shadow-shadow3 border-1 border-[#B7B4B4] py-4 px-4 flex flex-row">
                                    <input
                                        name=""
                                        id=""
                                        value={Query}
                                        onChange={(e) => { setQuery(e.target.value) }}
                                        placeholder='Ask my anything......'
                                        className='border-none outline-none w-[100%] font-para text-base placeholder:text-gray/40'
                                    />
                                    <img
                                        src="../Porp/send.png"
                                        alt=""
                                        className={`w-6 h-6 ${Query == "" && "opacity-35"}`}

                                        onClick={() => {
                                            if (Query !== "") {
                                                NewChatCreate()
                                            }
                                        }}
                                    />
                                </div>
                            </div>
                            <button
                                className='bg-gray py-2 px-4 rounded-lg border-2 border-gray mt-4 text-white hover:bg-transparent hover:text-gray font-para ease-in-out duration-300 self-end float-right'
                                onClick={() => { navigate('/dashboard/') }}
                            >
                                See More
                            </button>
                        </div>

                    </div>
                    <div className="basis-[30%] max-h-[100vh] overflow-y-scroll hidden xl:block">
                        <div className="flex flex-col gap-4">
                            <BizBotDep />
                            <ChatHistory />
                        </div>
                    </div>
                </div>

            </div>
        </>
    )
}

export default ChatBot