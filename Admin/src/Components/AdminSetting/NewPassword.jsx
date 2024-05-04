import React, { useContext, useState } from 'react';
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';
import { useNavigate } from 'react-router-dom';

const NewPassword = () => {

    const alertcontext = useContext(AlertContext);
    const { showAlert } = alertcontext

    const navigate = useNavigate();

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async () => {
        try {
            if (password !== confirmPassword) {
                showAlert("Password and Confirm Password do not match", 'danger');
                return;
            }

            const response = await fetch(`${BaseURL}/ChangePassword`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "AdminBizzToken": sessionStorage.getItem('AdminBizzToken')
                },
                body: JSON.stringify({
                    newPassword: password
                })
            });
            const data = await response.json();
            if (data.success) {
                showAlert("Password Changes Successfully", 'success');
                sessionStorage.removeItem('AdminBizzToken')
                navigate('/login');
            } else {
                showAlert("Failed to change password", 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    return (
        <>
            <div className={`flex font-Para flex-col justify-center items-center rounded-md m-5 md:m-10 `}>
                <div className="bg-white w-[95%] md:w-[80%] py-6 px-6 m-auto" style={{ boxShadow: "1px 1px 7.800000190734863px 0px #00000040" }}>
                <div className="flex flex-col md:flex-row gap-2 md:border-b-2 md:border-lightgray">
                        <div className="py-2 px-4 text-lightgray font-normal">
                            Forget Password
                        </div>
                        <div className="py-2 px-4 text-lightgray font-normal">
                            Verify OTP
                        </div>
                        <div className="border-b-2 border-gray py-2 px-4 text-gray font-medium">
                            Change Password
                        </div>
                    </div>
                    <div className=" py-6 flex flex-col gap-6" >
                        <h2 className='text-lg font-bold text-gray'>Set a password</h2>
                        <p >Your previous password has been reset. Please set a new password for your account.</p>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor=""
                                    className='text-gray font-medium'
                                >
                                    Create Password
                                </label>
                                <input
                                    type="password"
                                    placeholder='Enter New Password'
                                    className='border-2 border-gray font-normal bg-transparent py-2 px-4 rounded-xl'
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor=""
                                    className='text-gray font-medium'
                                >
                                    Confirm Password
                                </label>
                                <input
                                    type="password"
                                    placeholder='Confirm New Password'
                                    className='border-2 border-gray font-normal bg-transparent py-2 px-4 rounded-xl'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className='bg-gray rounded-xl py-2 px-4 border-2 border-gray text-white hover:bg-transparent hover:text-gray ease-in-out duration-300'
                            >
                                Verify
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default NewPassword;
