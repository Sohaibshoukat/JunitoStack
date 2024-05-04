import React, { useState } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { IoIosSearch, IoMdAdd, IoMdClose } from 'react-icons/io'

const User = ({ UserModel, setUserModel }) => {

    const Users = [
        {
            Name: "Jane Cooper",
            Email: "jane@microsft.com",
            Company: "Microsft",
            Type: "Active"
        },
        {
            Name: "Jane Cooper",
            Email: "jane@microsft.com",
            Company: "Microsft",
            Type: "Inactive"
        },
        {
            Name: "Jane Cooper",
            Email: "jane@microsft.com",
            Company: "Microsft",
            Type: "Active"
        },
        {
            Name: "Jane Cooper",
            Email: "jane@microsft.com",
            Company: "Microsft",
            Type: "Inactive"
        }, {
            Name: "Jane Cooper",
            Email: "jane@microsft.com",
            Company: "Microsft",
            Type: "Active"
        },
        {
            Name: "Jane Cooper",
            Email: "jane@microsft.com",
            Company: "Microsft",
            Type: "Inactive"
        }, {
            Name: "Jane Cooper",
            Email: "jane@microsft.com",
            Company: "Microsft",
            Type: "Active"
        },
        {
            Name: "Jane Cooper",
            Email: "jane@microsft.com",
            Company: "Microsft",
            Type: "Inactive"
        }, {
            Name: "Jane Cooper",
            Email: "jane@microsft.com",
            Company: "Microsft",
            Type: "Active"
        },
        {
            Name: "Jane Cooper",
            Email: "jane@microsft.com",
            Company: "Microsft",
            Type: "Inactive"
        }, {
            Name: "Jane Cooper",
            Email: "jane@microsft.com",
            Company: "Microsft",
            Type: "Active"
        },
        {
            Name: "Jane Cooper",
            Email: "jane@microsft.com",
            Company: "Microsft",
            Type: "Inactive"
        },
    ]

    return (
        <>

            <div className='pt-5 pb-20 w-[95%] md:w-[90%] m-auto'>
                <div className="flex justify-end my-4">
                    <button
                        className='font-para items-center text-white gap-2 flex bg-[#E4AE44] border-2 border-[#E4AE44] font-semibold rounded-lg py-1 md:py-2 px-2 md:px-4 hover:bg-transparent ease-in-out duration-300 hover:text-[#E4AE44]'
                        onClick={() => { setUserModel(true) }}
                    >
                        <IoMdAdd className='text-xl' />
                        Add User
                    </button>
                </div>

                <div className="bg-white w-[100%] rounded-xl font-para py-2 md:py-6 px-3 md:px-8">
                    <div className="flex flex-col gap-4 lg:flex-row justify-between lg:items-center">
                        <h2 className='text-base md:text-lg font-bold'>All Users</h2>
                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="bg-slate-100 rounded-lg py-2 px-2 flex flex-row gap-2 items-center">
                                <IoIosSearch className='text-xl' />
                                <input type="text" className='text-base outline-none active:outline-none border-none bg-transparent' placeholder='Search...' />
                            </div>
                            <div className="bg-slate-100 rounded-lg py-2 px-2 flex flex-row gap-2 items-center">
                                <h2 className='text-base font-medium'>Sort By: </h2>
                                <select
                                    name="" id=""
                                    className='text-base outline-none active:outline-none border-none bg-transparent'
                                >
                                    <option value="Newst">Newest</option>
                                    <option value="Newst">Newest</option>
                                    <option value="Newst">Newest</option>
                                    <option value="Newst">Newest</option>
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="my-4">
                        <div class="w-[100%] overflow-y-scroll">
                            <table>
                                <thead class="text-sm md:text-base font-normal uppercase text-slate-300">
                                    <tr>
                                        <th class="px-2 md:px-6 py-2 md:py-4">
                                            User name
                                        </th>
                                        <th class="px-2 md:px-6 py-2 md:py-4">
                                            Company
                                        </th>
                                        <th class="px-2 md:px-6 py-2 md:py-4">
                                            Email
                                        </th>
                                        <th class="px-2 md:px-6 py-2 md:py-4">
                                            Action
                                        </th>
                                        <th class="px-2 md:px-6 py-2 md:py-4">
                                            Status
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Users?.map((item, index) => (
                                        <tr class="bg-white border-b font-medium text-sm md:text-sm border-slate-200" key={index}>
                                            <th class="px-2 md:px-6 py-2 md:py-4">
                                                <h2 className='w-max'>
                                                    {item.Name}
                                                </h2>
                                            </th>
                                            <td class="px-2 md:px-6 py-2 md:py-4">
                                                <h2 className='w-max'>
                                                    {item.Company}
                                                </h2>
                                            </td>
                                            <td class="px-2 md:px-6 py-2 md:py-4">
                                                <h2 className='w-max'>
                                                    {item.Email}
                                                </h2>
                                            </td>
                                            <td class="px-2 md:px-6 py-2 md:py-4">
                                                <div className='flex text-white md:flex-row gap-2'>
                                                    <button
                                                        className='flex w-max gap-1 font-medium  bg-[#96A6D2] py-2 px-3 rounded-lg border-2 border-[#1D4ED8] items-center'
                                                    >
                                                        <FaRegSave className='text-lg' />
                                                        Edit
                                                    </button>
                                                    <button
                                                        className='flex w-max gap-1 font-medium  bg-[#EAB374] py-2 px-3 rounded-lg border-2 border-[#D97706] items-center'
                                                    >
                                                        <FaRegSave className='text-lg' />
                                                        Delete
                                                    </button>
                                                </div>
                                            </td>
                                            <td class="px-2 md:px-6 py-2 md:py-4">
                                                <button
                                                    className={`flex w-max gap-1 font-medium ${item.Type == 'Active' ? "bg-[#16C098]/30 border-[#00B087] text-[#008767]" : "bg-[#FFC5C5] border-[#DF0404] text-[#DF0404]"} py-2 px-3 rounded-lg border-2 items-center`}
                                                >
                                                    {item.Type}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default User