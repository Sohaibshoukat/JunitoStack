import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BaseURL } from '../../../Data/BaseURL';
import AlertContext from '../../../Context/Alert/AlertContext';
import { truncateHTMLString } from '../../../Data/UseFullFunction';
import { FiEdit } from "react-icons/fi";
import ShareModel from '../../../Components/Dashboard/ShareModel';
import { MdDelete } from "react-icons/md";


const SharedChat = () => {

    const [sharedChats, setSharedChats] = useState([]);
    const [filteredChats, setFilteredChats] = useState([]);
    const [filter, setFilter] = useState('all');
    const [ShareChatModel, setShareChatModel] = useState(false)
    const [EditID, setEditID] = useState(null)
    

    const departmentData = [
        {
            head: "HR",
            icon: "../../BotIcons/hr.png"
        },
        {
            head: "Marketing",
            icon: "../../BotIcons/marketing.png"
        },
        {
            head: "Vertrieb",
            icon: "../../BotIcons/vertrieb.png"
        },
        {
            head: "Support",
            icon: "../../BotIcons/support.png"
        },
        {
            head: "Startup",
            icon: "../../BotIcons/todo.png"
        },
        {
            head: "Sales",
            icon: "../../BotIcons/sales.png"
        },
        {
            head: "Agent",
            icon: "../../BotIcons/vertrieb.png"
        },
    ]

    const navigate = useNavigate();

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const fetchSharedChats = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/chat/sharedChats`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            const data = await response.json();
            if (response.ok) {
                setSharedChats(data.sharedChats);
                setFilteredChats(data.sharedChats);
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        fetchSharedChats();
    }, []);

    const deleteSharedChat = async (sharedChatId) => {
        try {
            const response = await fetch(`${BaseURL}/api/chat/sharedChat/${sharedChatId}`, {
                method: 'DELETE',
                headers: { 'auth-token': localStorage.getItem('auth-token') },
            });
            const data = await response.json();
            if (response.ok) {
                showAlert(data.message, 'success');
                fetchSharedChats()
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };


    useEffect(() => {
        if (filter === 'all') {
            setFilteredChats(sharedChats);
        } else {
            setFilteredChats(sharedChats.filter(chat => chat.Category === filter));
        }
    }, [filter, sharedChats]);

    return (
        <>
        {ShareChatModel && <ShareModel ShareChatModel={ShareChatModel} setShareChatModel={setShareChatModel} EditID={EditID}/>     }
        <div className='w-[90%] pb-20 pt-10 m-auto'>
            <select
                name="filter"
                id="filter"
                value={filter}
                className='border-2 border-gray rounded-xl py-2 px-2 text-gray font-para font-medium'
                onChange={(e) => setFilter(e.target.value)}
            >
                <option value="all">All Category</option>
                {departmentData.map((item, index) => (
                    <option value={item.head} key={index}>{item.head}</option>
                ))}
            </select>
            <div className='grid grid-cols-1 my-10 md:grid-cols-1 lg:grid-cols-2 gap-x-4 gap-y-8 w-[90%] lg:w-[90%] m-auto'>
                {filteredChats.map((item, index) => (
                    <div className={`flex flex-col justify-between group gap-3 font-para py-2 md:py-4 px-3 md:px-6 bg-white rounded-2xl shadow-shadow3 ease-in-out duration-300 group relative`} key={index}>
                        <div className="absolute  group-hover:flex gap-2 items-center hidden top-[-3%] left-[-3%]">
                                <FiEdit 
                                    className='text-xl text-red-500 cursor-pointer'
                                    onClick={()=>{
                                        setEditID(item._id)
                                        setShareChatModel(true)
                                    }}
                                />
                                <MdDelete 
                                    className='text-xl text-black cursor-pointer'
                                    onClick={()=>{
                                        deleteSharedChat(item._id)
                                    }}
                                />
                        </div>
                        <div className="flex flex-col text-gray gap-2 ease-in-out duration-300">
                            <div className="bg-red-500/50 border-2 border-red-500 rounded-lg py-2 px-4 font-para w-fit text-white font-semibold">
                                {item?.Category}
                            </div>
                            <h2 className='text-lg md:text-xl font-bold'>{item?.Chat_id?.Title}</h2>
                            <div className='text-xsm md:text-sm' dangerouslySetInnerHTML={{ __html: truncateHTMLString(item?.Chat_id?.ChatConversation[1]?.Query) }} />
                        </div>
                        <button
                            className='bg-[#7FA084] py-2 px-4 rounded-lg border-2 border-[#7FA084] text-white hover:bg-transparent hover:text-[#7FA084] font-para ease-in-out duration-300 w-fit'
                            onClick={() => {
                                navigate(`/dashboard/c/${item?.Chat_id?._id}`)
                            }}
                        >
                            View
                        </button>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}

export default SharedChat
