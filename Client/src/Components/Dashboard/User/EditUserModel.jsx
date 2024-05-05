import React, { useContext, useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { BaseURL } from '../../../Data/BaseURL';
import AlertContext from '../../../Context/Alert/AlertContext';

const EditUserModel = ({ UserModel, setUserModel, fetchUsers, subuserid }) => {

    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        Password: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const fetchUser = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/company/subUser/${subuserid}`, {
                method: 'GET',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            const data = await response.json();
            if (response.ok) {
                setFormData({
                    FirstName: data?.SubUser?.Own_ID?.FirstName,
                    LastName:  data?.SubUser?.Own_ID?.LastName,
                    Email:  data?.SubUser?.Own_ID?.Email,
                    Phone:  data?.SubUser?.Own_ID?.Phone,
                    Password:''
                })
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        if(subuserid){
            fetchUser()
        }
    }, [subuserid])
    
    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/company/editSubuser/${subuserid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify(formData)
            });
            const data = await response.json();
            if (data.success) {
                showAlert('User created successfully', 'success');
                fetchUsers()
                setUserModel(false);
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    return (
        <>
            {UserModel &&
                <div className='fixed z-50 top-0 left-0 w-full h-full flex flex-col justify-center items-center'>
                    <div className="bg-black/50 w-full h-full absolute z-30" onClick={() => { setUserModel(false) }}></div>
                    <div className='bg-gray/50 rounded-2xl py-6 px-4 md:px-8 w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] relative z-30 m-auto h-fit'>
                        <div className='flex flex-row pb-2 border-b-2 border-white justify-between items-end mb-5'>
                            <h2 className='font-para text-lg text-white font-medium'>Edit User</h2>
                            <IoMdClose className='text-white text-4xl' onClick={() => { setUserModel(false) }} />
                        </div>
                        <div className="flex flex-col w-[80%] m-auto font-para gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="FirstName" className='text-white'>First Name</label>
                                <input
                                    type="text"
                                    name="FirstName"
                                    value={formData.FirstName}
                                    onChange={handleChange}
                                    className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4'
                                    placeholder='Please Enter First Name'
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="LastName" className='text-white'>Last Name</label>
                                <input
                                    type="text"
                                    name="LastName"
                                    value={formData.LastName}
                                    onChange={handleChange}
                                    className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4'
                                    placeholder='Please Enter Last Name'
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="Email" className='text-white'>Email</label>
                                <input
                                    type="email"
                                    name="Email"
                                    value={formData.Email}
                                    onChange={handleChange}
                                    className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4'
                                    placeholder='Please Enter Email'
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="Phone" className='text-white'>Phone</label>
                                <input
                                    type="text"
                                    name="Phone"
                                    value={formData.Phone}
                                    onChange={handleChange}
                                    className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4'
                                    placeholder='Please Enter Phone'
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="Password" className='text-white'>Password</label>
                                <input
                                    type="password"
                                    name="Password"
                                    value={formData.Password}
                                    onChange={handleChange}
                                    className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4'
                                    placeholder='Please Enter Password'
                                />
                            </div>
                        </div>
                        <div className='flex justify-end my-4'>
                            <button
                                onClick={handleSubmit}
                                className='font-para items-center text-gray gap-2 flex bg-white border-2 border-white font-semibold rounded-lg py-3 px-4 hover:bg-transparent ease-in-out duration-300 hover:text-white'
                            >
                                Update User
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default EditUserModel;