import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { BaseURL } from '../../../Data/BaseURL';
import AlertContext from '../../../Context/Alert/AlertContext';

const SharedChat = () => {

    const [sharedChats, setSharedChats] = useState([]);

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
            } else {
                showAlert(data.message,'danger');
            }
        } catch (error) {
            showAlert(error.message,'danger');
        }
    };

    useEffect(() => {
        fetchSharedChats();
    }, []);

    return (
        <div className='w-[90%] pb-20 m-auto'>
            <div className='grid grid-cols-1 my-10 md:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 w-[90%] lg:w-[80%] m-auto'>
                {sharedChats.map((item, index) => (
                    <div className={`flex flex-row group items-center gap-3 font-para py-2 md:py-4 px-3 md:px-6 bg-white rounded-2xl shadow-shadow3 ease-in-out duration-300`} key={index}>
                        <div className="flex flex-col text-gray gap-2 ease-in-out duration-300">
                            <h2 className='text-lg md:text-xl font-bold'>{item?.Chat_id?.Title}</h2>
                            <p className='text-xsm md:text-sm'>{item?.Chat_id?.ChatConversation[1]?.Query}</p>
                            <button
                                className='bg-[#7FA084] py-2 px-4 rounded-lg border-2 border-[#7FA084] text-white hover:bg-transparent hover:text-[#7FA084] font-para ease-in-out duration-300 w-fit'
                                onClick={()=>{
                                    navigate(`/dashboard/c/${item?.Chat_id?._id}`)
                                }}
                            >
                                View
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default SharedChat