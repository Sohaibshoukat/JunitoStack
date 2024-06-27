import React, { useContext, useState } from 'react'
import { HiDotsHorizontal } from 'react-icons/hi'
import { convertDateFormat } from '../../Data/DateFunction'
import { getFirstLetter } from '../../Data/UseFullFunction'
import { BaseURL } from '../../Data/BaseURL'
import AlertContext from '../../Context/Alert/AlertContext'
import { useNavigate } from 'react-router-dom'
import TODOEditModel from './TODOEditModel'

const TODOCart = ({ item, fetchTodos }) => {

    const navigate = useNavigate()

    const [OpenSetting, setOpenSetting] = useState(false)
    const [ModelTODO, setModelTODO] = useState(false)
    const [EditID, setEditID] = useState(false)

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`${BaseURL}/api/chat/todos/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
            });
            if (response.ok) {
                showAlert('ToDo deleted successfully', 'success');
                fetchTodos()
            } else {
                // Handle errors if any
                showAlert('Failed to delete ToDo', 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    const handleDone = async (id) => {
        try {
            const response = await fetch(`${BaseURL}/api/chat/todos/${id}/complete`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
            });
            if (response.ok) {
                showAlert('ToDo Marked as Done', 'success');
                fetchTodos()
            } else {
                // Handle errors if any
                showAlert('Failed to delete ToDo', 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };


    return (
        <>
        <TODOEditModel ModelTODO={ModelTODO} fetchTodos={fetchTodos} setModelTODO={setModelTODO} EditID={EditID} setEditID={setEditID} />
        <div className='border-2 font-para border-[#1C1D22]/10 py-4 px-6 rounded-xl bg-white'>
            <div className="flex flex-col gap-2 md:flex-row justify-between md:items-center mb-6">
                <h2 className='md:text-base font-bold'>{item?.Title}</h2>
                <div className="flex items-center relative w-fit self-end gap-2">
                    <div
                        className={`
                            ${item?.Priority == 'High' ? "bg-[#F0FDF4] border-[#00E58F] text-[#00E58F]"
                                : item?.Priority == 'Medium' ? "bg-[#FBF1FF] border-[#884DFF] text-[#884DFF]" :
                                    "bg-[#FEF6E6] border-[#FF8900] text-[#FF8900]"} text-center text-sm w-full py-1 px-2 rounded-lg border-2`}
                    >
                        {item?.Priority}
                    </div>
                    <div className="rounded-xl bg-white border-2 border-[#1C1D22]/30 p-1 h-fit" onClick={() => { setOpenSetting(!OpenSetting) }}>
                        <HiDotsHorizontal className='text-black text-lg' />
                        {OpenSetting &&
                            <div className="bg-white border-2 border-[#1C1D22]/10 top-[45%] right-[15%] flex flex-col gap-2 rounded-lg w-max absolute py-1 px-2">
                                {item?.Status !== "Done" && <p
                                    className='text-green-500 font-medium cursor-pointer'
                                    onClick={() => { handleDone(item._id) }}
                                >
                                    Mark as Done
                                </p>}
                                <p
                                    className='text-red-400 font-medium cursor-pointer'
                                    onClick={()=>{
                                        setEditID(item._id)
                                        setModelTODO(true)
                                    }}
                                >
                                    Edit
                                </p>
                                <p
                                    className='text-red-400 font-medium cursor-pointer'
                                    onClick={() => { handleDelete(item._id) }}
                                >
                                    Delete
                                </p>
                            </div>
                        }
                    </div>
                </div>
            </div>
            <p className='my-2 text-[#a1a1a1] text-sm max-w-sm'>{item?.Description}</p>
            <div className="flex justify-between items-center">
                <div className="bg-green-400/20 rounded-lg border-2 border-green-500 text-green-500 py-1 px-2 font-para">
                    {item.Status}
                </div>
                {item?.Chat_id &&
                    <div className="flex justify-end" onClick={() => {
                        navigate(`/dashboard/c/${item?.Chat_id}`)
                    }}>
                        <button className='bg-gray rounded-xl py-2 px-3 font-para text-white'>Check Chats</button>
                    </div>
                }
            </div>
            <div className="flex flex-row justify-between mt-6">
                <div className={`flex text-sm gap-1 font-medium bg-[#FFC5C5] border-[#DF0404] text-[#DF0404] py-1 px-2 rounded-lg border-2 items-center`}>
                    {convertDateFormat(item?.Deadline) <= convertDateFormat(new Date) ? "Overdue" : convertDateFormat(item?.Deadline)}
                </div>
                <div className="flex gap-[-2px]">
                    {item?.subUsers?.slice(0, 2).map((item2, index2) => (
                        <>
                            {item2?.ProfilePhoto ?
                                <div className='w-8 h-8 rounded-full -ml-3 border-2 border-white' key={index2}>
                                    <img src={item2?.ProfilePhoto} alt="" />
                                </div>
                                :
                                <div className='w-8 h-8 rounded-full bg-white -ml-3 border-2 border-[#1C1D22]/30 flex items-center justify-center'>
                                    {getFirstLetter(item2?.FirstName)}
                                </div>
                            }
                        </>
                    ))}
                    {item?.subUsers?.length > 2 && (
                        <div className='w-8 h-8 rounded-full bg-white -ml-3 border-2 border-[#1C1D22]/30 flex items-center justify-center'>
                            +{item?.subUsers?.length - 2}
                        </div>
                    )}
                </div>
            </div>
        </div>
        </>
    )
}

export default TODOCart