import React, { useContext, useState } from 'react';
import { FaLock } from "react-icons/fa";
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';
import { useNavigate } from 'react-router-dom';

const ChangePassword = ({setStep}) => {
    const alertcontext = useContext(AlertContext);
    const [Email, setEmail] = useState("")
    const { showAlert } = alertcontext

    const navigate = useNavigate()

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${BaseURL}/SendOTPemail`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: Email
                })
            });
            const data = await response.json();
            if (data.success) {
                showAlert("OTP Send to your Email", 'success');
                sessionStorage.setItem('AdminBizzToken',data.AdminBizzToken)
                setStep(2);
            } else {
                showAlert(data.message, 'danger');
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
                        <div className="border-b-2 border-gray py-2 px-4 text-gray font-medium">
                            Forget Password
                        </div>
                        <div className="py-2 px-4 text-lightgray font-normal">
                            Verify OTP
                        </div>
                        <div className="py-2 px-4 text-lightgray font-normal">
                        Change Password
                        </div>
                    </div>
                    <div className=" py-6 flex flex-col gap-6" >
                        <h2 className='text-lg font-bold text-gray'>Forgot your password?</h2>
                        <p >Don’t worry, happens to all of us. Enter Admin email below to recover your password</p>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <label
                                    htmlFor="email"
                                    className='text-gray font-medium'
                                >
                                    Email
                                </label>
                                <input
                                    type="email"
                                    name='email'
                                    id='email'
                                    value={Email}
                                    onChange={(e)=>{setEmail(e.target.value)}}
                                    placeholder='Enter Admin Mail'
                                    className='border-2 border-gray font-normal bg-transparent py-2 px-4 rounded-xl'
                                />
                            </div>
                            <button
                                onClick={handleSubmit}
                                className='bg-gray rounded-xl py-2 px-4 border-2 border-gray text-white hover:bg-transparent hover:text-gray ease-in-out duration-300'
                            >
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;
