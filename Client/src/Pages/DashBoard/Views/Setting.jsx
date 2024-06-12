import React, { useContext, useState } from 'react';
import { BaseURL } from '../../../Data/BaseURL';
import AlertContext from '../../../Context/Alert/AlertContext';

const Password = () => {

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const [formData, setFormData] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdatePassword = async () => {
        if (formData.newPassword !== formData.confirmPassword) {
            showAlert("New Password and Confirm Password do not match",'danger');
            return;
        }

        try {
            const response = await fetch(`${BaseURL}/api/user/ChangePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify({
                    oldPassword: formData.oldPassword,
                    newPassword: formData.newPassword
                }),
            });

            const result = await response.json();

            if (result.success) {
                showAlert('Password updated successfully','success');
                setFormData({
                    oldPassword: '',
                    newPassword: '',
                    confirmPassword: ''
                });
            } else {
                showAlert(result.message || 'Failed to update password','danger');
            }
        } catch (error) {
            showAlert('An error occurred while updating the password','danger');
        }
    };

    return (
        <div className='flex flex-col gap-4 py-6'>
            <div className="flex flex-col gap-1 font-Para basis-[50%]">
                <p className='text-sm text-darkestgray'>Old Password</p>
                <input
                    type="password"
                    name="oldPassword"
                    value={formData.oldPassword}
                    onChange={handleChange}
                    placeholder='Enter Your Old Password'
                    className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                />
            </div>
            <div className="flex flex-col gap-1 font-Para basis-[50%]">
                <p className='text-sm text-darkestgray'>New Password</p>
                <input
                    type="password"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    placeholder='Enter New Password'
                    className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                />
            </div>
            <div className="flex flex-col gap-1 font-Para basis-[50%]">
                <p className='text-sm text-darkestgray'>Confirm Password</p>
                <input
                    type="password"
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    placeholder='Confirm New Password'
                    className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                />
            </div>

            <div className="flex gap-4 w-fit items-center">
                <div
                    onClick={handleUpdatePassword}
                    className="cursor-pointer bg-black text-white border-2 border-black rounded-lg py-2 px-4 font-Para hover:bg-transparent hover:text-black ease-in-out duration-300"
                >
                    Update Password
                </div>
            </div>
        </div>
    );
}

export default Password;
