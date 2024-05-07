import React, { useContext } from 'react'
import { IoCopyOutline } from 'react-icons/io5'
import { LuListTodo } from 'react-icons/lu'
import ChatContext from '../../Context/ChatContaxt/ChatContext';
import AlertContext from '../../Context/Alert/AlertContext';

const Conversation = ({setModelTODO }) => {

    const chatcontext = useContext(ChatContext);
    const { ChatsData } = chatcontext

    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text)
            .then(() => {
                showAlert("Copied to clipboard",'success')
            })
            .catch((error) => {
                showAlert("Error coping to clipboard",'danger')
            });
    };

    return (
        <div className='max-h-[60vh] h-[60vh] font-para overflow-y-scroll'>
            <div className="flex flex-col gap-8">
                {ChatsData.map((item, index) => (
                    <>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row items-center gap-3">
                                {item.Type == "User" ? <img src="../../Porp/User.png" alt="" className='w-8 h-8 rounded-full' /> : <img src="../../BizzBot.png" alt="" className='w-8 h-auto' />}
                                <h2 className='text-gray text-lg font-bold'>{item.Type == "User" ? "You" : "BizzBot"}</h2>
                            </div>
                            <div className="ml-10"> 
                                <p className='text-base text-black font-normal'>{item?.Query}</p>
                            </div>
                            {item.Type!="User" && <div className="mt-10 ml-10 flex justify-between items-center">
                                <div className="flex flex-row gap-4">
                                    <div className="bg-white rounded-lg px-2 py-1" onClick={() => copyToClipboard(item?.Query)}>
                                        <IoCopyOutline className='text-xl'/>
                                    </div>
                                    <div className="bg-white rounded-lg cursor-pointer flex gap-2 px-2 py-1" onClick={()=>{setModelTODO(true)}}>
                                        <LuListTodo className='text-xl'/>
                                        <h2 className='text-gray font-medium'>Add ToDo</h2>
                                    </div>
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