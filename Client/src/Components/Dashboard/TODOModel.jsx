import React, { useContext, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { BaseURL } from '../../Data/BaseURL';
import { MultiSelect } from 'primereact/multiselect';
import AlertContext from '../../Context/Alert/AlertContext';


const TODOModel = ({ ModelTODO, setModelTODO,chatid }) => {

    const [users, setUsers] = useState([]);
    const [SubUsers, setSubUsers] = useState([])
    const [title, setTitle] = useState('');
    const [deadline, setDeadline] = useState('');
    const [description, setDescription] = useState('');
    const [priority, setPriority] = useState('High');

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const handleAddToDo = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/chat/todos/add`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({
                    Title: title,
                    Description: description, // Add description if needed
                    Priority: priority,
                    Deadline: deadline,
                    subUsers: SubUsers.map(user => user?.Own_ID?._id),
                    chatId: chatid
                })
            });
            const data = await response.json();
            if (response.ok) {
                // Handle success
                showAlert('ToDo added successfully', 'success');
                setModelTODO(false); // Close the modal after successful addition
            } else {
                // Handle error
                showAlert(data.message,'danger');
            }
        } catch (error) {
            showAlert(error.message,'danger');
        }
    };

    const fetchUsers = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/company/subUser`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            const data = await response.json();
            if (response.ok) {
                setUsers(data.SubUsers);
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        fetchUsers()
    }, [])


    return (
        <>
            {ModelTODO &&
                <div className='fixed top-0 left-0 z-50 w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
                    <div className="bg-black/50 w-[100vw] h-[100vh] absolute z-30" onC5lick={() => { setModelTODO(false) }}></div>
                    <div className='bg-gray/50 rounded-2xl py-6 px-4 md:px-8 w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] relative z-30 m-auto h-fit'>
                        <div className='flex flex-row pb-2 border-b-2 border-white justify-between items-end mb-5'>
                            <h2 className='font-para text-lg text-white font-medium'>Add ToDo List</h2>
                            <IoMdClose className='text-white text-4xl' onClick={() => { setModelTODO(false) }} />
                        </div>
                        <div className="flex flex-col w-[80%] m-auto font-para gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className='text-white'>Title</label>
                                <input 
                                    type="text" 
                                    className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4' 
                                    placeholder='Please Enter Title' 
                                    value={title} 
                                    onChange={(e) => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className='text-white'>Description</label>
                                <input 
                                    type="text" 
                                    className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4' 
                                    placeholder='Please Enter Description' 
                                    value={description} 
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className='text-white'>Deadline</label>
                                <input 
                                    type="date" 
                                    className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4' 
                                    placeholder='Please Enter Full Name' 
                                    value={deadline} 
                                    onChange={(e) => setDeadline(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className='text-white'>SubUser</label>
                                <MultiSelect 
                                    value={SubUsers} 
                                    onChange={(e) => setSubUsers(e.value)} 
                                    options={users} 
                                    optionLabel="Own_ID.FirstName"
                                    display="chip" 
                                    placeholder="Select SubUser" 
                                    className='bg-[#EDF2F6] rounded-lg border-none outline-none'   
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className='text-white'>Priority</label>
                                <select 
                                    name="" 
                                    id="" 
                                    className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4'
                                    value={priority} 
                                    onChange={(e) => setPriority(e.target.value)}
                                >
                                    <option value="">Set Priority</option>
                                    <option value="High">High</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Low">Low</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex justify-end my-4'>
                            <button
                                className='font-para items-center text-gray gap-2 flex bg-white border-2 border-white font-semibold rounded-lg py-2 px-4 hover:bg-transparent ease-in-out duration-300 hover:text-white'
                                onClick={handleAddToDo}
                            >
                                Add ToDo
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default TODOModel