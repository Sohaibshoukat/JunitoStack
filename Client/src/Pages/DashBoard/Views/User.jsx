import React, { useContext, useEffect, useState } from 'react'
import { FaRegSave } from 'react-icons/fa'
import { IoIosSearch, IoMdAdd, IoMdClose } from 'react-icons/io'
import { BaseURL } from '../../../Data/BaseURL';
import { useNavigate } from 'react-router-dom'
import AlertContext from '../../../Context/Alert/AlertContext';
import AddUserModel from '../../../Components/Dashboard/User/AddUserModel';
import EditUserModel from '../../../Components/Dashboard/User/EditUserModel';

const User = () => {
    const [users, setUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setfilter] = useState('')
    const [UserModel, setUserModel] = useState(false);
    const [EditModel, setEditModel] = useState(false);
    const [EditId, setEditId] = useState(null);
    const [PaidUser, setPaidUser] = useState([])
    const [loading, setLoading] = useState(false);
    const [loadingAction, setLoadingAction] = useState(null); // To track which action is loading

    const navigate = useNavigate()
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const fetchUsers = async () => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    const deleteUser = async (subuserId) => {
        setLoadingAction(subuserId);
        try {
            const response = await fetch(`${BaseURL}/api/company/deleteSubuser/${subuserId}`, {
                method: 'DELETE',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            const data = await response.json();
            if (response.ok) {
                showAlert('Subuser deleted successfully', 'success');
                fetchUsers(); // Refresh the user list after deletion
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        } finally {
            setLoadingAction(null);
        }
    };

    const toggleUserStatus = async (subuserId) => {
        setLoadingAction(subuserId);
        try {
            const response = await fetch(`${BaseURL}/api/company/statusSubuser/${subuserId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                }
            });
            const data = await response.json();
            if (response.ok) {
                showAlert('User status updated successfully', 'success');
                fetchUsers(); // Refresh the user list after status update
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        } finally {
            setLoadingAction(null);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const handleCheckboxChange = (subuserId) => {
        setPaidUser((prevPaidUser) => {
            if (prevPaidUser.includes(subuserId)) {
                return prevPaidUser.filter(id => id !== subuserId);
            } else {
                return [...prevPaidUser, subuserId];
            }
        });
    };

    // Filter users based on search query
    const filteredUsers = users.filter(user => {
        const fullName = `${user?.Own_ID?.FirstName} ${user?.Own_ID?.LastName}`.toLowerCase();
        const email = user?.Own_ID?.Email.toLowerCase();
        const status = user?.Own_ID?.Status.toLowerCase();

        if (filter === "") {
            return fullName.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase());
        } else {
            return (fullName.includes(searchQuery.toLowerCase()) || email.includes(searchQuery.toLowerCase())) && status === filter.toLowerCase();
        }
    });

    const handlePayKnow = (id) => {
        const params = new URLSearchParams({ users: JSON.stringify(PaidUser) });
        navigate(`/dashboard/paysubUser/${id}`);
    }

    return (
        <>
            <AddUserModel UserModel={UserModel} setUserModel={setUserModel} fetchUsers={fetchUsers} />
            <EditUserModel UserModel={EditModel} setUserModel={setEditModel} fetchUsers={fetchUsers} subuserid={EditId} />
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
                                <input
                                    type="text"
                                    className='text-base outline-none active:outline-none border-none bg-transparent'
                                    placeholder='Search...'
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                            <div className="bg-slate-100 rounded-lg py-2 px-2 flex flex-row gap-2 items-center">
                                <h2 className='text-base font-medium'>Sort By: </h2>
                                <select
                                    name="" id=""
                                    value={filter}
                                    onChange={(e) => { setfilter(e.target.value) }}
                                    className='text-base outline-none active:outline-none border-none bg-transparent'
                                >
                                    <option value="">Select Filter</option>
                                    <option value="active">Active</option>
                                    <option value="inactive">InActive</option>
                                </select>
                            </div>

                        </div>
                    </div>
                    {loading ? (
                        <div className="text-center my-4">
                            <p>Loading users...</p>
                        </div>
                    ) : (
                        <div className="my-4">
                            <div className="w-[100%] overflow-y-scroll">
                                <table className='w-full'>
                                    <thead className="text-sm md:text-base font-normal uppercase text-slate-300">
                                        <tr>
                                            <th className="px-2 md:px-6 py-2 md:py-4">User name</th>
                                            <th className="px-2 md:px-6 py-2 md:py-4">Phone</th>
                                            <th className="px-2 md:px-6 py-2 md:py-4">Email</th>
                                            <th className="px-2 md:px-6 py-2 md:py-4">Action</th>
                                            <th className="px-2 md:px-6 py-2 md:py-4">Transaction Status</th>
                                            <th className="px-2 md:px-6 py-2 md:py-4">User Status</th>
                                            <th className="px-2 md:px-6 py-2 md:py-4">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {filteredUsers?.map((item, index) => (
                                            <tr className="bg-white border-b font-medium text-sm md:text-sm border-slate-200" key={index}>
                                                {/* <th className="px-2 md:px-6 py-2 md:py-4">
                                                    {item?.TransactionStatus === "UnPaid" &&
                                                        <input
                                                            type="checkbox"
                                                            onChange={() => handleCheckboxChange(item?.Own_ID?._id)}
                                                        />
                                                    }
                                                </th> */}
                                                <th className="px-2 md:px-6 py-2 md:py-4">
                                                    <h2 className='w-max'>
                                                        {item?.Own_ID?.FirstName + " " + item?.Own_ID?.LastName}
                                                    </h2>
                                                </th>
                                                <td className="px-2 md:px-6 py-2 md:py-4">
                                                    <h2 className='w-max'>
                                                        {item?.Own_ID?.Phone}
                                                    </h2>
                                                </td>
                                                <td className="px-2 md:px-6 py-2 md:py-4">
                                                    <h2 className='w-max'>
                                                        {item?.Own_ID?.Email}
                                                    </h2>
                                                </td>
                                                <td className="px-2 md:px-6 py-2 md:py-4">
                                                    <div className='flex text-white md:flex-row gap-2'>
                                                        <button
                                                            className='flex w-max gap-1 font-medium bg-[#96A6D2] py-2 px-3 rounded-lg border-2 border-[#1D4ED8] items-center'
                                                            onClick={() => {
                                                                setEditId(item._id)
                                                                setEditModel(true)
                                                            }}
                                                            disabled={loadingAction === item._id}
                                                        >
                                                            {loadingAction === item._id ? 'Loading...' : (
                                                                <>
                                                                    <FaRegSave className='text-lg' />
                                                                    Edit
                                                                </>
                                                            )}
                                                        </button>
                                                        <button
                                                            className='flex w-max gap-1 font-medium bg-[#EAB374] py-2 px-3 rounded-lg border-2 border-[#D97706] items-center'
                                                            onClick={() => { deleteUser(item._id) }}
                                                            disabled={loadingAction === item._id}
                                                        >
                                                            {loadingAction === item._id ? 'Loading...' : (
                                                                <>
                                                                    <FaRegSave className='text-lg' />
                                                                    Delete
                                                                </>
                                                            )}
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="px-2 md:px-6 py-2 md:py-4">
                                                    <button
                                                        className={`flex w-max gap-1 font-medium ${item?.TransactionStatus === 'Paid' ? "bg-[#16C098]/30 border-[#00B087] text-[#008767]" : "bg-[#FFC5C5] border-[#DF0404] text-[#DF0404]"} py-2 px-3 rounded-lg border-2 items-center`}
                                                    >
                                                        {item?.TransactionStatus}
                                                    </button>
                                                </td>
                                                <td className="px-2 md:px-6 py-2 md:py-4">
                                                    <button
                                                        className={`flex w-max gap-1 font-medium ${item?.Own_ID?.Status === 'Active' ? "bg-[#16C098]/30 border-[#00B087] text-[#008767]" : "bg-[#FFC5C5] border-[#DF0404] text-[#DF0404]"} py-2 px-3 rounded-lg border-2 items-center`}
                                                        onClick={() => { toggleUserStatus(item._id) }}
                                                        disabled={loadingAction === item._id}
                                                    >
                                                        {loadingAction === item._id ? 'Loading...' : item?.Own_ID?.Status}
                                                    </button>
                                                </td>
                                                <td>
                                                    {item.TransactionStatus == "UnPaid" && <button
                                                        className={`bg-gray py-1 px-4 rounded-xl text-white border-2  hover:bg-transparent hover:text-gray border-gray  font-para font-semibold ease-in-out duration-300`}
                                                        onClick={() => { handlePayKnow(item?.Own_ID?._id) }}
                                                    >
                                                        Pay Users
                                                    </button>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}

export default User
