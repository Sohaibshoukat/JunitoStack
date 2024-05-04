import React from 'react'
import { IoCopyOutline } from 'react-icons/io5'
import { LuListTodo } from 'react-icons/lu'

const Conversation = ({ ChatsData,setModelTODO }) => {
    return (
        <div className='max-h-[70vh] h-[70vh] font-para overflow-y-scroll'>
            <div className="flex flex-col gap-8">
                {ChatsData.map((item, index) => (
                    <>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-row items-center gap-3">
                                {item.Type == "User Message" ? <img src="../Porp/User.png" alt="" className='w-8 h-8 rounded-full' /> : <img src="../BizzBot.png" alt="" className='w-8 h-auto' />}
                                <h2 className='text-gray text-lg font-bold'>{item.Type == "User Message" ? "You" : "BizzBot"}</h2>
                            </div>
                            <div className="ml-10">
                            {item.Type == "User Message" ? 
                                <p className='text-base text-black font-normal'>{item?.Query}</p>: 
                                <p className='text-base text-black font-normal'>{item?.Answer}</p>
                            }
                            </div>
                            {item.Type!="User Message" && <div className="mt-10 ml-10 flex justify-between items-center">
                                <div className="flex flex-row gap-4">
                                    <div className="bg-white rounded-lg px-2 py-1">
                                        <IoCopyOutline className='text-xl'/>
                                    </div>
                                    <div className="bg-white rounded-lg flex gap-2 px-2 py-1" onClick={()=>{setModelTODO(true)}}>
                                        <LuListTodo className='text-xl'/>
                                        <h2 className='text-gray font-medium'>Add ToDo</h2>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}

export default Conversation