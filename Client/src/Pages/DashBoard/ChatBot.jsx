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
import PromptDetailModel from '../../Components/Dashboard/PromptDetail/PromptDetailModel'

const ChatBot = () => {


    const [Model, setModel] = useState(false)
    const [ModelTODO, setModelTODO] = useState(false)
    const [Query, setQuery] = useState('')
    const [Profile, setProfile] = useState(false)
    const [UserData, setUserData] = useState(null)
    const [IsDisable, setIsDisable] = useState(false)

    const navigate = useNavigate()

    const departcontext = useContext(BotDepContext);
    const { department } = departcontext

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const chatcontext = useContext(ChatContext);
    const { ChatsData, setChatsData } = chatcontext

    const historyContext = useContext(HistoryContext);
    const { fetchHistory } = historyContext;

    const [SelectedID, setSelectedID] = useState(null)


    const NewChatCreate = async () => {
        try {
            setIsDisable(true)
            const NewData = ChatsData

            NewData.push({
                Type: "User",
                Query: Query
            })

            const askData = {
                query: Query,
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
                Type: "BizBot",
                Query: AskDetail.response.content
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
                setIsDisable(false)
                fetchHistory()
                navigate(`/dashboard/c/${data?.Chat?._id}`)
            } else {
                setIsDisable(false)
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            setIsDisable(false)
            showAlert(error.message, 'danger');
        }
    }

    const newTopic = async () => {
        navigate("/dashboard/chatbot");
        setChatsData([])
    }

    useEffect(() => {
        setChatsData([])
        if (localStorage.getItem("auth-token")) {
            return;
        } else {
            navigate("/login")
        }
    }, [])


    const fetchUserData = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/user/getuser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('auth-token')
                }
            });


            const data = await response.json();
            if (data.success) {
                setUserData(data.userData);
            } else {
                showAlert(data.message || 'Failed to fetch user data', 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        fetchUserData()
    }, [])

    useEffect(() => {
        if (localStorage.getItem("auth-token")) {
            return;
        } else {
            navigate("/login")
        }
    }, [])

    return (
        <>
            {Model && <PromptDesc Model={Model} setModel={setModel} SelectedID={SelectedID} />}
            <TODOModel ModelTODO={ModelTODO} setModelTODO={setModelTODO} />

            <div className='w-full bg-white py-2 fixed top-0 z-50 items-center px-6 flex justify-between'>
                <h2
                    className='text-gray font-bold font-head text-2xl cursor-pointer'
                    onClick={() => {
                        navigate("/dashboard")
                    }}
                >
                    Chatbot
                </h2>
                <div className="flex flex-row items-center gap-2 cursor-pointer relative" onClick={() => { setProfile(!Profile) }}>
                <img src={UserData?.ProfilePhoto ? `${BaseURL}/${UserData?.ProfilePhoto}` : "../Porp/User.png"} alt="" className='w-6 h-6 md:w-10 md:h-10 rounded-full' />
                    <div className="flex font-para text-gray flex-col">
                        <h2 className='text-base font-bold'>{UserData?.FirstName + " " + UserData?.LastName}</h2>
                        <p className='text-sm hidden md:block'>{UserData?.Email}</p>
                    </div>
                    {Profile && <div className="flex rounded-xl z-[999999999] right-0 w-[100%] flex-col gap-2 bg-white absolute bottom-[-250%] shadow-2xl  font-para text-lg font-medium py-2 px-4">
                        <Link to={"/dashboard/setting/"}>
                            <h3>Profile</h3>
                        </Link>
                        <Link to={"/dashboard/setting/password"}>
                            <h3>Setting</h3>
                        </Link>
                        <h3
                            onClick={() => {
                                localStorage.removeItem("auth-token")
                                navigate('/')
                            }}
                        >
                            SignOut
                        </h3>
                    </div>}
                </div>
            </div>
            <div className='bg-[#F0F0F0] min-h-[100vh]'>
                <div className="flex flex-row max-h-[inherit] items-start gap-4 px-2 md:px-8 pt-20 pb-10 relative">
                    <div className="xl:basis-[70%] w-[97%] md:w-[90%] xl:w-[70%] max-h-[90vh] overflow-y-auto mx-auto ">
                        {ChatsData?.length <= 0 ?
                            <div className='flex flex-col justify-between gap-8'>
                                <div className="text-center flex flex-col gap-3 w-[100%]">
                                    <div className="flex gap-4 justify-center items-end">
                                        <img src="../BizzBot.png" alt="" className='w-6 md:w-12' />
                                        <h2 className='text-gray font-bold text-xl md:text-xl font-para'>Welcome to {department} BizBot</h2>
                                    </div>
                                </div>
                                <PromptsSlider Model={Model} setModel={setModel} setSelectedID={setSelectedID} />
                                <div className='w-[90%] m-auto' id="AI-chat">
                                    <div className='flex flex-col gap-4' id='Chat-Body'>
                                        <div className="flex flex-col gap-2">
                                            <div className="flex gap-2 items-start">
                                                <img src="../BizzBot.png" alt="" className='w-6' />
                                                <h2 className='text-gray font-bold text-lg font-para'>{department} BizBot</h2>
                                            </div>
                                            <p className=' ml-4 text-gray font-para'>How can i help you today!</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            :
                            <Conversation setModelTODO={setModelTODO} />
                        }
                        <div className='w-full'>
                            <div className="flex flex-row gap-2 mt-0 md:mt-2  w-full">
                                <div
                                    className='rounded-2xl  flex h-fit w-[-webkit-fill-available] max-w-fit flex-row items-center gap-2 ease-in-out duration-100000 group gradientcolor p-3 cursor-pointer'
                                    onClick={newTopic}
                                >
                                    <img src="../Porp/chat.png" alt="" srcset="" className='w-4 h-4 md:w-6 md:h-6' />
                                    <h2 className='hidden w-max group-hover:block ease-in-out duration-1000 font-para text-sm font-medium md:text-base text-white'>New Topic</h2>
                                </div>
                                <div
                                    className="bg-white w-[100%] rounded-xl shadow-shadow3 border-1 border-[#B7B4B4] py-2 md:py-4 px-4 flex flex-row h-full">
                                    <textarea
                                        name=""
                                        id=""
                                        rows={'3'}
                                        value={Query}
                                        onChange={(e) => { setQuery(e.target.value) }}
                                        placeholder='Ask my anything......'
                                        className='border-none outline-none w-[100%] font-para text-base placeholder:text-gray/40'
                                    />
                                    <img
                                        src="../Porp/send.png"
                                        alt=""
                                        className={`w-6 h-6 ${Query == "" && "opacity-35"} ${IsDisable && 'opacity-35'}`}
                                        onClick={() => {
                                            if (Query !== "" || IsDisable) {
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
                                Dashboard
                            </button>
                        </div>
                    </div>
                    <div className="basis-[30%] max-h-[85vh] overflow-y-scroll hidden xl:block">
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