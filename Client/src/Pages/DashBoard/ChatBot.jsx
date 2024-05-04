import React, { useState } from 'react'
import PromptsSlider from '../../Components/Dashboard/PromptsSlider'
import BizBotDep from '../../Components/Dashboard/BizBotDep'
import ChatHistory from '../../Components/Dashboard/ChatHistory'
import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import TODOModel from '../../Components/Dashboard/TODOModel'
import Conversation from '../../Components/Dashboard/Conversation'

const ChatBot = () => {
    const [Model, setModel] = useState(false)
    const [ModelTODO, setModelTODO] = useState(false)

    const navigate = useNavigate()

    const [Query, setQuery] = useState('')
    const [ChatsData, setChatsData] = useState([])

    return (
        <>
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
                                <p className='ml-2 text-gray text-base font-semibold font-para'>Klick Online Kurs Creator erstellt verkaufsfähige Inhalte</p>
                            </div>
                            <div className="flex flex-col gap-2 md:gap-4">
                                <h2 className='text-gray font-para text-lg md:text-xl font-bold'>Answer</h2>
                                <p className='ml-2 text-gray text-sm font- font-para'>Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet. Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet. Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4 justify-end">
                            <button 
                                    className='hover:bg-gray py-2 px-4 rounded-lg border-2 border-gray mt-4 hover:text-white bg-transparent text-gray font-para ease-in-out duration-300 self-end float-right'
                                    onClick={()=>{setModel(false)}}
                                >
                                    Skip
                            </button>
                            <button className='bg-gray py-2 px-4 rounded-lg border-2 border-gray mt-4 text-white hover:bg-transparent hover:text-gray font-para ease-in-out duration-300 self-end float-right'>Continue</button>
                        </div>
                    </div>
                </div>
            }

            <TODOModel ModelTODO={ModelTODO} setModelTODO={setModelTODO} />

            <div className='w-full bg-white py-2 fixed top-0 z-50 items-center px-6 flex justify-between'>
                <h2 className='text-gray font-bold font-head text-2xl'>Chatbot</h2>
                <div className="flex flex-row items-center gap-2">
                    <img src="../Porp/User.png" alt="" className='w-10 h-10 rounded-full' />
                    <div className="flex font-para text-gray flex-col">
                        <h2 className='text-base font-bold'>Musfiq</h2>
                        <p className='text-sm'>User@gmail.com</p>
                    </div>
                </div>
            </div>
            <div className='bg-[#F0F0F0] min-h-[100vh]'>
                <div className="flex flex-row items-start gap-4 px-2 md:px-8 pt-20 pb-10 relative">
                    <div className="basis-[70%] w-[97%] md:w-[90%] xl:w-[70%] m-auto ">
                        {ChatsData?.length <= 0 ? <div className='flex flex-col justify-between gap-8'>
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
                                        <p className=' ml-4 text-gray font-para'>How can I help you today?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                            :
                            <Conversation ChatsData={ChatsData} setModelTODO={setModelTODO} />
                        }
                        <div className='w-full'>
                            <div className="flex flex-col md:flex-row gap-2 mt-8  w-full">
                                <div className='rounded-2xl  flex h-fit w-[-webkit-fill-available] max-w-fit flex-row items-center gap-2 ease-in-out duration-100000 group gradientcolor p-3'>
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
                                        className='w-6 h-6'
                                        onClick={() => {
                                            const NewData = ChatsData
                                            NewData.push({
                                                Type: "User Message",
                                                Query: Query
                                            })
                                            NewData.push({
                                                Type: "Bot Reply",
                                                Answer: "Create a chatbot  using python language what will be step for that Sure, I can help you get started with creating a chatbot using GPT in Python. Here are the basic steps you'll need to follow:"
                                            })
                                            setChatsData(NewData)
                                            setQuery("")
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