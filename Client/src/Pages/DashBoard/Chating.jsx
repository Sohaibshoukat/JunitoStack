import React, { useContext, useEffect, useState } from 'react'
import PromptsSlider from '../../Components/Dashboard/PromptsSlider'
import BizBotDep from '../../Components/Dashboard/BizBotDep'
import ChatHistory from '../../Components/Dashboard/ChatHistory'
import { IoMdClose } from 'react-icons/io'
import { Link, useNavigate, useParams } from 'react-router-dom'
import TODOModel from '../../Components/Dashboard/TODOModel'
import Conversation from '../../Components/Dashboard/Conversation'
import ChatContext from '../../Context/ChatContaxt/ChatContext'
import { BaseURL } from '../../Data/BaseURL'
import AlertContext from '../../Context/Alert/AlertContext'
import { FaRegShareSquare } from 'react-icons/fa'

const Chating = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [ModelTODO, setModelTODO] = useState(false)
    const [Query, setQuery] = useState('')
    const [isLoadingChat, setisLoadingChat] = useState(false)
    const [Profile, setProfile] = useState(false)

    const chatcontext = useContext(ChatContext);
    const { ChatsData, setChatsData } = chatcontext

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;


    const UpdateChat = async () => {
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

            const responseSaving = await fetch(`${BaseURL}/api/chat/${id}/addchat`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({
                    Type: "User",
                    Query: Query
                })
            });
            const data = await responseSaving.json();
            if (data.success) {
                fetchConversation()
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    }

    const shareChat = async () => {
        setisLoadingChat(true)
        try {
            const response = await fetch(`${BaseURL}/api/chat/chat/share`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({
                    chatId: id
                })
            });
            const data = await response.json();
            if (response.ok) {
                setisLoadingChat(false)
                showAlert(data.message, 'success');
            } else {
                setisLoadingChat(false)
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            setisLoadingChat(false)
            showAlert(error.message, 'danger');
        }
    };

    const fetchConversation = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/chat/chatdetail/${id}`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            const data = await response.json();
            if (response.ok) {
                setChatsData(data?.Chat?.ChatConversation);
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    const newTopic = async () => {
        navigate("/dashboard/chatbot");
        setChatsData([])
    }

    useEffect(() => {
        fetchConversation()
    }, [id])

    return (
        <>

            <TODOModel ModelTODO={ModelTODO} setModelTODO={setModelTODO} chatid={id} />

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
                    <div className="basis-[70%] w-[97%] md:w-[90%] xl:w-[70%] mx-auto ">
                        <div 
                            className={`my-4 flex gap-2 items-center p-2 border-2 border-gray rounded-2xl w-fit ${isLoadingChat&&"opacity-50"} cursor-pointer`}
                            onClick={()=>{
                                if(!isLoadingChat){
                                    shareChat()
                                }
                            }}
                        >
                            <FaRegShareSquare className='text-2xl text-gray'/>
                            <h2>Share Chat</h2>
                        </div>
                        <Conversation setModelTODO={setModelTODO} />
                        <div className='w-full'>
                            <div className="flex flex-col md:flex-row gap-2 mt-8  w-full">
                                <div
                                    className='rounded-2xl  flex h-fit w-[-webkit-fill-available] max-w-fit flex-row items-center gap-2 ease-in-out duration-100000 group gradientcolor p-3 cursor-pointer'
                                    onClick={newTopic}
                                >
                                    <img src="../../Porp/chat.png" alt="" srcset="" className='w-4 h-4 md:w-6 md:h-6' />
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
                                        src="../../Porp/send.png"
                                        alt=""
                                        className={`w-6 h-6 ${Query == "" && "opacity-35"}`}
                                        onClick={() => {
                                            if (Query !== "") {
                                                UpdateChat()
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

export default Chating