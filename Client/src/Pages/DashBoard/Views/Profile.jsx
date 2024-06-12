import React, { useState, useEffect, useContext } from 'react';
import AlertContext from '../../../Context/Alert/AlertContext';
import { BaseURL } from '../../../Data/BaseURL';

const ProfilePage = () => {
    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Phone: '',
        Age: '',
        Gender: 'Male',
        ImageShow:null,
        ProfilePhoto: null,
    });
    const [isLoading, setIsLoading] = useState(true);
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/user/getuser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
            });

            const result = await response.json();

            if (result.success) {
                setFormData({
                    FirstName: result.userData.FirstName,
                    LastName: result.userData.LastName,
                    Phone: result.userData.Phone,
                    Age: result.userData.Age,
                    Gender: result.userData.Gender,
                    ImageShow: result.userData.ProfilePhoto,
                });
            } else {
                showAlert('Failed to fetch user data', 'danger');
            }
        } catch (error) {
            showAlert('An error occurred while fetching user data', 'danger');
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'ProfilePhoto') {
            setFormData({
                ...formData,
                ProfilePhoto: files[0],
                ImageShow:(URL.createObjectURL(files[0]))
            });
        } else {
            setFormData({
                ...formData,
                [name]: value,
            });
        }
    };

    const handleUpdateProfile = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append('FirstName', formData.FirstName);
        formDataToSend.append('LastName', formData.LastName);
        formDataToSend.append('Phone', formData.Phone);
        formDataToSend.append('Age', formData.Age);
        formDataToSend.append('Gender', formData.Gender);
        if (formData.ProfilePhoto) {
            formDataToSend.append('profimg', formData.ProfilePhoto);
        }

        try {
            const response = await fetch(`${BaseURL}/api/user/UpdateUser`, {
                method: 'PUT',
                headers: {
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: formDataToSend,
            });

            const result = await response.json();

            if (result.success) {
                showAlert('Profile updated successfully', 'success');
                fetchUserData();
            } else {
                showAlert('Failed to update profile', 'danger');
            }
        } catch (error) {
            console.error('Error updating profile', error);
            showAlert('An error occurred while updating the profile', 'danger');
        }
    };

    const handleReset = () => {
        setFormData({
            FirstName: '',
            LastName: '',
            Phone: '',
            Age: '',
            Gender: 'Male',
            ProfilePhoto: null,
        });
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='flex flex-col gap-4 py-6'>
            <div className="flex flex-col gap-1 font-Para">
                <p className='text-sm text-darkestgray'>Your Profile Picture</p>
                <div className="flex items-center gap-6 justify-center w-fit">
                    {formData.ImageShow&&<img src={formData && `${BaseURL}/${formData.ImageShow}`} alt="" className='w-40 h-36 rounded-full'/>}
                    <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-30 px-4 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-[#EDF2F6] dark:hover:bg-bray-800">
                        <div className="flex flex-col items-center justify-center pt-3 pb-2">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="text-sm">Upload your photo</span></p>
                        </div>
                        <input
                            id="dropzone-file"
                            type="file"
                            name="ProfilePhoto"
                            className="hidden"
                            onChange={handleChange}
                        />
                    </label>
                </div>
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>First Name</p>
                    <input
                        type="text"
                        name="FirstName"
                        value={formData.FirstName}
                        onChange={handleChange}
                        placeholder='Enter Your First Name'
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>Last Name</p>
                    <input
                        type="text"
                        name="LastName"
                        value={formData.LastName}
                        onChange={handleChange}
                        placeholder='Enter Your Last Name'
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
            </div>
            <div className="flex flex-col gap-1 font-Para basis-[50%]">
                <p className='text-sm text-darkestgray'>Phone Number</p>
                <input
                    type="tel"
                    name="Phone"
                    value={formData.Phone}
                    onChange={handleChange}
                    placeholder='Enter Your Phone Number'
                    className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                />
            </div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>Age</p>
                    <input
                        type="number"
                        name="Age"
                        value={formData.Age}
                        onChange={handleChange}
                        placeholder='Enter Your Age'
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>Gender</p>
                    <select
                        name="Gender"
                        value={formData.Gender}
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>
            <div className="flex gap-4 w-fit items-center">
                <div onClick={handleUpdateProfile} className="cursor-pointer bg-gray text-white border-2 border-gray rounded-lg py-2 px-4 font-Para hover:bg-transparent hover:text-gray ease-in-out duration-300">
                    Update Profile
                </div>
                <div onClick={handleReset} className="cursor-pointer bg-red-400 text-white border-2 border-red-400 rounded-lg py-2 px-4 font-Para hover:bg-transparent hover:text-red-400 ease-in-out duration-300">
                    Reset
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
