import React from 'react'
import { IoMdClose } from 'react-icons/io'

const AddUserModel = ({ UserModel, setUserModel }) => {
    return (
        <>
            {UserModel &&
                <div className='fixed z-50 w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
                    <div className="bg-black/50 w-[100vw] h-[100vh] absolute z-30" onC5lick={() => { setUserModel(false) }}></div>
                    <div className='bg-gray/50 rounded-2xl py-6 px-4 md:px-8 w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] relative z-30 m-auto h-fit'>
                        <div className='flex flex-row pb-2 border-b-2 border-white justify-between items-end mb-5'>
                            <h2 className='font-para text-lg text-white font-medium'>Add User</h2>
                            <IoMdClose className='text-white text-4xl' onClick={() => { setUserModel(false) }} />
                        </div>
                        <div className="flex flex-col w-[80%] m-auto font-para gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className='text-white'>Full Name</label>
                                <input type="text" className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4' placeholder='Please Enter Full Name' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className='text-white'>UserName</label>
                                <input type="text" className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4' placeholder='Please Enter Full Name' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className='text-white'>Email</label>
                                <input type="text" className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4' placeholder='Please Enter Full Name' />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="" className='text-white'>Password</label>
                                <input type="text" className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4' placeholder='Please Enter Full Name' />
                            </div>
                        </div>
                        <div className='flex justify-end my-4'>
                            <button
                                className='font-para items-center text-gray gap-2 flex bg-white border-2 border-white font-semibold rounded-lg py-3 px-4 hover:bg-transparent ease-in-out duration-300 hover:text-white'
                            >
                                Create User
                            </button>
                        </div>
                    </div>
                </div>
            }
        </>
    )
}

export default AddUserModel