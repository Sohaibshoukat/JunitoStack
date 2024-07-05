import React, { useContext, useEffect, useState } from 'react'
import { IoCopyOutline } from 'react-icons/io5'
import { LuListTodo } from 'react-icons/lu'
import ChatContext from '../../Context/ChatContaxt/ChatContext';
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';
import { TfiReload } from "react-icons/tfi";
import BotDepContext from '../../Context/BotContaxt/BotDepContext';


const Conversation = ({ RegenrateChat }) => {

    const chatcontext = useContext(ChatContext);
    const { setChatsData, ChatsData } = chatcontext

    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext

    const departcontext = useContext(BotDepContext);
    const { department } = departcontext

    const copyToClipboard = (text) => {
        const tempElement = document.createElement('div');
        tempElement.innerHTML = text;
        const strippedText = tempElement.textContent || tempElement.innerText || '';
        navigator.clipboard.writeText(strippedText)
            .then(() => {
                showAlert("Copied to clipboard", 'success');
            })
            .catch((error) => {
                showAlert("Error copying to clipboard", 'danger');
            });
    };

    const [UserData, setUserData] = useState(null)


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

    return (
        <div className='max-h-[65vh] lg:max-h-[80vh] xl:max-h-[60vh] h-[65vh] lg:h-[80vh] xl:h-[80vh] font-para overflow-y-scroll'>
            <div className="flex flex-col gap-4 lg:gap-8">
                {ChatsData.map((item, index) => (
                    <>
                        <div className="flex flex-col gap-2 lg:gap-4" key={index}>
                            <div className="flex flex-row items-center gap-3">
                                {item.Type == "User"
                                    ? <img
                                        src={UserData?.ProfilePhoto ? `${BaseURL}/${UserData?.ProfilePhoto}` : "../../Porp/User.png"}
                                        className='w-6 md:w-8 h-6 md:h-8 rounded-full'
                                    />
                                    : <img
                                        src="../../BizzBot.png"
                                        alt=""
                                        className='w-6 md:w-8 h-auto'
                                    />
                                }
                                <h2 className='text-gray text-base lg:text-lg font-bold'>{item.Type == "User" ? "You" : `BizBot`}</h2>
                            </div>
                            <div className="text-xs md:text-base ml-10">
                                {item.Type == "User" ?
                                    <p className='text-black font-normal'>{item?.Query}</p>
                                    :
                                    <>
                                        {item?.Query !== "" ?
                                            <div className='default-html' dangerouslySetInnerHTML={{ __html: item?.Query }} />
                                            :
                                            <div className='w-24'>
                                                <img src="../../Porp/Loading.gif" alt="" className='object-cover bg-gray rounded-xl px-2' />
                                            </div>
                                        }
                                    </>
                                }
                            </div>
                            {item.Type != "User" && <div className="mt-3 lg:mt-5 ml-10 flex justify-between items-center">
                                <div className="flex flex-row gap-4">
                                    <div className="bg-white rounded-lg px-2 py-1" onClick={() => copyToClipboard(item?.Query)}>
                                        <IoCopyOutline className='text-base md:text-xl' />
                                    </div>
                                    {index == ChatsData?.length - 1 && <div
                                        className="bg-white rounded-lg px-2 py-1"
                                        onClick={() => {
                                            const NewData2 = ChatsData
                                            NewData2[index] = {
                                                Type: "BizBot",
                                                Query: ""
                                            }
                                            setChatsData(NewData2)
                                            RegenrateChat(index)
                                        }}
                                    >
                                        <TfiReload className='text-base md:text-xl' />
                                    </div>}
                                </div>
                            </div>}
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default Conversation