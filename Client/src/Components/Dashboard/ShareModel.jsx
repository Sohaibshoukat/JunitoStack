import React, { useContext, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';
import { useParams } from 'react-router-dom';

const ShareModel = ({ ShareChatModel, setShareChatModel, EditID }) => {
    const [DepartmentChat, setDepartmentChat] = useState('HR');
    const [isLoadingChat, setisLoadingChat] = useState(false);
    const { id } = useParams();

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const fetchSharedChat = async () => {
        if (EditID) {
            setisLoadingChat(true);
            try {
                const response = await fetch(`${BaseURL}/api/chat/SahredID/${EditID}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                    },
                });
                const data = await response.json();
                if (response.ok) {
                    setDepartmentChat(data.sharedchat.Category);
                    setisLoadingChat(false);
                } else {
                    setisLoadingChat(false);
                    showAlert(data.message, 'danger');
                }
            } catch (error) {
                setisLoadingChat(false);
                showAlert(error.message, 'danger');
            }
        }
    };
    
    useEffect(() => {
        fetchSharedChat();
    }, [EditID]);

    const handleShareChat = async () => {
        setisLoadingChat(true);
        try {
            const response = await fetch(
                EditID ? `${BaseURL}/api/chat/editchat/share/${EditID}` : `${BaseURL}/api/chat/chat/share`,
                {
                    method: EditID ? 'PUT' : 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'auth-token': localStorage.getItem('auth-token'),
                    },
                    body: JSON.stringify({
                        chatId: id,
                        Category: DepartmentChat,
                    }),
                }
            );
            const data = await response.json();
            if (response.ok) {
                setisLoadingChat(false);
                setShareChatModel(false);
                showAlert(data.message, 'success');
            } else {
                setisLoadingChat(false);
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            setisLoadingChat(false);
            showAlert(error.message, 'danger');
        }
    };

    const departmentData = [
        { head: 'HR', icon: '../../BotIcons/hr.png' },
        { head: 'Marketing', icon: '../../BotIcons/marketing.png' },
        { head: 'Vertrieb', icon: '../../BotIcons/vertrieb.png' },
        { head: 'Support', icon: '../../BotIcons/support.png' },
        { head: 'Startup', icon: '../../BotIcons/todo.png' },
        { head: 'Sales', icon: '../../BotIcons/sales.png' },
        { head: 'Agent', icon: '../../BotIcons/vertrieb.png' },
    ];

    return (
        <>
            {ShareChatModel && (
                <div className="fixed top-0 left-0 z-50 w-[100vw] h-[100vh] flex flex-col justify-center items-center">
                    <div className="bg-black/50 w-[100vw] h-[100vh] absolute z-30" onClick={() => setShareChatModel(false)}></div>
                    <div className="bg-gray/50 rounded-2xl py-6 px-4 md:px-8 w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] relative z-30 m-auto h-fit">
                        <div className="flex flex-row pb-2 border-b-2 border-white justify-between items-end mb-5">
                            <h2 className="font-para text-lg text-white font-medium">{EditID ? 'Edit Shared Chat' : 'Add to Share Chat'}</h2>
                            <IoMdClose className="text-white text-4xl" onClick={() => setShareChatModel(false)} />
                        </div>
                        <div className="flex flex-col w-[80%] m-auto font-para gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className="text-white">Share Chat Category</label>
                                <select
                                    name=""
                                    id=""
                                    className="bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4"
                                    value={DepartmentChat}
                                    onChange={(e) => setDepartmentChat(e.target.value)}
                                >
                                    <option value="" disabled>Select Category</option>
                                    {departmentData.map((item, index) => (
                                        <option value={item.head} key={index}>{item.head}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <div className="flex justify-end my-4">
                            <button
                                className={`font-para items-center text-gray gap-2 flex bg-white border-2 border-white font-semibold rounded-lg py-2 px-4 ${isLoadingChat && "opacity-30"} hover:bg-transparent ease-in-out duration-300 hover:text-white`}
                                onClick={() => {
                                    if (!isLoadingChat) {
                                        handleShareChat();
                                    }
                                }}
                            >
                                {EditID ? 'Update Shared Chat' : 'Add to shared Chat'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ShareModel;
