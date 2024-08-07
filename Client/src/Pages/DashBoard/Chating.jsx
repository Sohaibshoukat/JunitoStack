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
import { FaFileAlt, FaRegShareSquare, FaTimes } from 'react-icons/fa'
import BotDepContext from '../../Context/BotContaxt/BotDepContext'
import { LuListTodo } from 'react-icons/lu'
import { ImAttachment } from "react-icons/im";
import ShareModel from '../../Components/Dashboard/ShareModel'


const Chating = () => {

    const navigate = useNavigate()
    const { id } = useParams()

    const [ModelTODO, setModelTODO] = useState(false)
    const [Query, setQuery] = useState('')
    const [SearchSugesstonsData, setSearchSugesstonsData] = useState([])
    const [Profile, setProfile] = useState(false)
    const [UserData, setUserData] = useState(null)
    const [IsDisable, setIsDisable] = useState(false)
    const [selectedFile, setSelectedFile] = useState(null);
    const [abortController, setAbortController] = useState(null)
    const [ShareChatModel, setShareChatModel] = useState(false)

    const chatcontext = useContext(ChatContext);
    const { ChatsData, setChatsData } = chatcontext

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const departcontext = useContext(BotDepContext);
    const { department } = departcontext

    const UpdateChat = async () => {
        try {
            setIsDisable(true)
            setQuery("")
            console.log(ChatsData)
            const chatHistory = await ChatsData.map((item) => {
                if (item.Type == "User") {
                    return { role: "user", content: item.Query }
                } else {
                    return { role: "assistant", content: item.Query }
                }
            })

            let fileName = null;

            // If a file is selected, upload it first
            if (selectedFile) {
                const formData = new FormData();
                formData.append('fileup', selectedFile);

                const uploadResponse = await fetch(`${BaseURL}/api/chat/upload-document`, {
                    method: 'POST',
                    headers: {
                        'auth-token': localStorage.getItem('auth-token')
                    },
                    body: formData
                });

                const uploadResult = await uploadResponse.json();
                if (uploadResponse.ok) {
                    fileName = await uploadResult.filename;
                } else {
                    setIsDisable(false);
                    showAlert(uploadResult.error || 'File upload failed', 'danger');
                    return;
                }
            }

            let askData;

            if (fileName !== null) {
                askData = {
                    query: Query,
                    history: chatHistory,
                    role: department,
                    file_name: fileName
                }
            } else {
                console.log(123)
                askData = {
                    query: Query,
                    history: chatHistory,
                    role: department
                }
            }

            console.log(askData)

            const ChatResponse = await fetch(`${BaseURL}/api/chat/ask`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify(askData)
            });

            const AskDetail = await ChatResponse.json()

            const NewData = ChatsData

            NewData[ChatsData.length - 1] = {
                Type: "BizBot",
                Query: AskDetail.response.content
            }

            setChatsData(NewData)

            const responseSavingchat = await fetch(`${BaseURL}/api/chat/${id}/addchat`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({
                    Type: "User",
                    Query: Query,
                    Response: AskDetail.response.content
                })
            });

            const dataChat = await responseSavingchat.json();

            if (dataChat.success) {
                setIsDisable(false)
            } else {
                setIsDisable(false)
                showAlert(dataChat.message, 'danger');
            }
        } catch (error) {
            setIsDisable(false)
            showAlert(error.message, 'danger');
        }
    }

    const SearchSuggesstion = async () => {
        if (abortController) {
            abortController.abort()
        }
        const newAbortController = new AbortController()
        setAbortController(newAbortController)

        try {
            const chatHistory = await ChatsData.map((item) => {
                if (item.Type == "User") {
                    return { role: "user", content: item.Query }
                } else {
                    return { role: "assistant", content: item.Query }
                }
            })

            let askData = {
                data: Query,
                history: chatHistory,
                role: department,
            }

            const ChatResponse = await fetch(`${BaseURL}/api/chat/searchsuggestion`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify(askData),
                signal: newAbortController.signal
            });

            const AskDetail = await ChatResponse.json()
            const suggestions = Object.values(AskDetail)
            setSearchSugesstonsData(suggestions)

        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Request was aborted')
            } else {
                setIsDisable(false)
                showAlert(error.message, 'danger')
            }
        }
    }

    useEffect(() => {
        if (Query !== "") {
            SearchSuggesstion()
        }
    }, [Query])


    const RegenrateChat = async (index) => {
        try {
            setIsDisable(true)
            setQuery("")
            console.log(ChatsData)
            const chatHistory = await ChatsData.map((item) => {
                if (item.Type == "User") {
                    return { role: "user", content: item.Query }
                } else {
                    return { role: "assistant", content: item.Query }
                }
            })

            const lastData = ChatsData[index - 1]
            console.log(lastData)


            const NewData2 = ChatsData

            NewData2[index] = ""

            setChatsData(NewData2)

            const askData = {
                query: lastData.Query,
                history: chatHistory,
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

            const NewData = ChatsData

            NewData[index] = {
                Type: "BizBot",
                Query: AskDetail.response.content
            }

            setChatsData(NewData)

            const responseSavingchat = await fetch(`${BaseURL}/api/chat/${id}/regenratechat`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({
                    Response: AskDetail.response.content
                })
            });

            const dataChat = await responseSavingchat.json();

            if (dataChat.success) {
                setIsDisable(false)
            } else {
                setIsDisable(false)
                showAlert(dataChat.message, 'danger');
            }
        } catch (error) {
            setIsDisable(false)
            showAlert(error.message, 'danger');
        }
    }



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

            <TODOModel ModelTODO={ModelTODO} setModelTODO={setModelTODO} chatid={id} />
            {ShareChatModel && <ShareModel ShareChatModel={ShareChatModel} setShareChatModel={setShareChatModel} chatis={id} />}

            <div className='w-full bg-white py-2 fixed top-0 z-50 items-center px-6 flex justify-between'>
                <h2 className='text-gray font-bold font-head text-2xl'>Chatbot</h2>
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
                <div className="flex flex-row max-h-[inherit] items-start gap-4 px-2 md:px-8 pt-16 md:pt-20 pb-5 relative">
                    <div className="xl:basis-[70%] w-[97%] md:w-[90%] xl:w-[70%] mx-auto max-h-[90vh] min-h-[90vh] overflow-y-auto flex flex-col justify-between">
                        <div className="flex gap-4 items-center mb-2 md:mb-4 ">
                            <button
                                className='bg-gray text-sm md:text-base py-2 px-2 md:px-4 rounded-lg border-2 border-gray text-white hover:bg-transparent hover:text-gray font-para ease-in-out duration-300 self-end float-right'
                                onClick={() => { navigate('/dashboard/') }}
                            >
                                Dashboard
                            </button>
                            <div
                                className={`flex gap-2 items-center p-2 border-2 border-gray rounded-2xl w-fit  cursor-pointer`}
                                onClick={() => {
                                    setShareChatModel(true)
                                }}
                            >
                                <FaRegShareSquare className='text-lg md:text-2xl text-gray' />
                                <h2 className='text-xs md:text-base'>Share Chat</h2>
                            </div>
                            <div className="bg-white rounded-lg cursor-pointer flex gap-2 px-2 py-1" onClick={() => { setModelTODO(true) }}>
                                <LuListTodo className='text-base md:text-xl' />
                                <h2 className='text-gray text-xs md:text-base font-medium'>Add ToDo</h2>
                            </div>
                            <div
                                className='bg-gray text-sm md:text-base py-2 px-2 md:px-4 rounded-lg border-2 border-gray text-white hover:bg-transparent hover:text-gray font-para ease-in-out duration-300 self-end float-right'
                                onClick={newTopic}
                            >
                                <h2 className='font-para text-sm font-medium md:text-base text-white'>New Chat</h2>
                            </div>
                        </div>
                        <Conversation setModelTODO={setModelTODO} RegenrateChat={RegenrateChat} />
                        <div className='w-full'>
                            <div className="flex flex-row gap-2 mt-0 md:mt-2  w-full">
                                <div
                                    className='rounded-2xl  flex h-fit w-[-webkit-fill-available] max-w-fit flex-row items-center gap-2 ease-in-out duration-100000 group gradientcolor p-3 cursor-pointer'
                                    onClick={newTopic}
                                >
                                    <img src="../../Porp/chat.png" alt="" srcset="" className='w-4 h-4 md:w-6 md:h-6' />
                                    <h2 className='hidden w-max group-hover:block ease-in-out duration-1000 font-para text-sm font-medium md:text-base text-white'>New Chat</h2>
                                </div>
                                <div
                                    className="bg-white w-[100%] relative rounded-xl shadow-shadow3 border-1 border-[#B7B4B4] py-2 md:py-4 px-4 flex flex-col gap-4 h-full"
                                >
                                    {Query.length > 0 &&
                                        <div className="w-full max-h-[40vh] absolute bottom-[100%] z-[50] shadow-shadow3 rounded-t-xl left-[0] overflow-y-auto flex gap-2 flex-wrap bg-white px-4 py-4">
                                            {SearchSugesstonsData?.length > 0 ?
                                                <>
                                                    {SearchSugesstonsData?.map((item) => {
                                                        return (
                                                            <div
                                                                className="bg-gray cursor-pointer  px-4 py-2"
                                                                onClick={() => {
                                                                    if (Query !== "" && !IsDisable) {
                                                                        setQuery(item)
                                                                        const NewData = ChatsData
                                                                        NewData.push({
                                                                            Type: "User",
                                                                            Query: item
                                                                        })
                                                                        NewData.push({
                                                                            Type: "BizBot",
                                                                            Query: ""
                                                                        })
                                                                        setChatsData(NewData)
                                                                        UpdateChat()
                                                                    }
                                                                }}
                                                            >
                                                                <h2 className='text-white text-sm font-medium font-para'>{item}</h2>
                                                            </div>
                                                        )
                                                    })}
                                                </>
                                                :
                                                <div className='w-[20%]'>
                                                    <img src="../../Porp/Loading.gif" alt="" className='object-cover bg-gray rounded-xl px-2' />
                                                </div>}
                                        </div>
                                    }
                                    {selectedFile != null &&
                                        <div className="bg-white rounded-lg flex gap-2 text-sm font-para py-2 px-2">
                                            <FaFileAlt className='text-xl' />
                                            {selectedFile?.name}
                                            <button onClick={() => setSelectedFile(null)}>
                                                <FaTimes />
                                            </button>
                                        </div>
                                    }
                                    <div className="flex justify-between">
                                        <div className="flex gap-4 w-[100%]">
                                            <label htmlFor="fileupload">
                                                <ImAttachment
                                                    className='text-xl cursor-pointer'
                                                />
                                                <input
                                                    type="file"
                                                    id='fileupload'
                                                    className='hidden opacity-0 absolute'
                                                    onChange={(e) => setSelectedFile(e.target.files[0])} // Update state on file select
                                                />
                                            </label>
                                            <textarea
                                                name=""
                                                id=""
                                                rows={'2'}
                                                value={Query}
                                                onChange={(e) => { setQuery(e.target.value) }}
                                                placeholder='Ask my anything......'
                                                className='border-none outline-none w-[100%] font-para text-base placeholder:text-gray/40'
                                            />
                                        </div>
                                        <img
                                            src="../../Porp/send.png"
                                            alt=""
                                            className={`w-6 h-6 ${Query == "" && !IsDisable && "opacity-35"} cursor-pointer`}
                                            onClick={() => {
                                                if (Query !== "" && !IsDisable) {
                                                    const NewData = ChatsData
                                                    NewData.push({
                                                        Type: "User",
                                                        Query: Query
                                                    })
                                                    NewData.push({
                                                        Type: "BizBot",
                                                        Query: ""
                                                    })
                                                    setChatsData(NewData)
                                                    UpdateChat()
                                                }
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="basis-[30%] max-h-[85vh] overflow-y-scroll hidden xl:block">
                        <div className="flex flex-col gap-4">
                            {/* <BizBotDep /> */}
                            <ChatHistory />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Chating