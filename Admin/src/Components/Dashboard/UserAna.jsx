import React from 'react'
import { UserDataList } from '../../Data/UserData'

const UserAna = () => {
    return (
        <div className="bg-white rounded-xl shadow-boxshade py-6 px-6 h-[100%]">
            <div className="flex flex-col gap-2">
                <div className="flex flex-col gap-2">
                    <h2 className='font-Para font-bold text-xl'>Last 10 Users</h2>
                </div>
                <div className='max-h-[300px] overflow-scroll'>
                    <table className='styled-table w-[100%] text-sm md:text-base'>
                        <thead>
                            <tr>
                                <th>Email</th>
                                <th>Plan</th>
                            </tr>
                        </thead>
                        <tbody className=''>
                            {UserDataList.map((item, index) => (
                                <tr
                                    key={index}
                                    className={`p-10 hover:bg-black hover:text-white ease-in-out duration-300`}
                                >
                                    <td>{item.Email}</td>
                                    <td>{item.Plan}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default UserAna