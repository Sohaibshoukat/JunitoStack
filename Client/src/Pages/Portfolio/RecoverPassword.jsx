import React, { useContext, useState } from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Nav from '../../Components/Nav'
import Footer from '../../Components/Footer'
import AlertContext from '../../Context/Alert/AlertContext'
import { BaseURL } from '../../Data/BaseURL'

const Recoverpassword = () => {
    const { id } = useParams()
    const navigate = useNavigate();

    const [OTP, setOTP] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate passwords match
        if (newPassword !== confirmPassword) {
            showAlert("Passwords don't match", 'danger');
            return;
        }

        try {
            const response = await fetch(`${BaseURL}/api/user/forgetPasswordemail`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ OTPReq: OTP, NewPassword: newPassword, id }),
            });

            const data = await response.json();

            if (!data.success) {
                showAlert(data.message, 'danger');
                return;
            }

            // Password updated successfully, navigate to login page
            showAlert('Password Update Kindly Login again', 'success');
            navigate('/login');
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    return (
        <>
            <Nav />
            <div className='py-36'>
                <h1 className='font-para text-4xl md:text-5xl text-center m-auto font-bold text-black max-w-[90%] md:max-w-[70%]'>Forget Your Password</h1>
            </div>
            <div className="w-[90%] xl:w-[80%] m-auto shadow-shadow2">
                <div className="flex flex-row justify-between">
                    <div className="bg-white w-[100%] lg:basis-[50%] px-8 md:px-14 py-12 md:py-20">
                        <div className="flex flex-col gap-4 font-para">
                            <Link to={'/login'}>
                                <div className='flex gap-1 items-center'>
                                    <IoIosArrowBack className='text-lightgray text-2xl' />
                                    <p className='text-lightgray font-para text-lg'>Back to Login</p>
                                </div>
                            </Link>
                            <h2 className=' font-para text-3xl font-bold text-black'>Recover Password</h2>
                            <p className='text-lightgray font-para text-lg'>Enter Your OTP and New Password</p>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    placeholder='OTP'
                                    value={OTP}
                                    onChange={(e) => setOTP(e.target.value)}
                                    className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                />
                                <input
                                    type="password"
                                    placeholder='New Password'
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                />
                                <input
                                    type="password"
                                    placeholder='Confirm Password'
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                />
                                <button
                                    className='text-white text-lg my-2 md:text-md lg:text-lg font-Para px-2 py-2 md:px-6 rounded-md bg-gray hover:text-black hover:bg-transparent hover:border-gray border-2 w-full border-gray duration-300 ease-in-out'
                                    onClick={handleSubmit}
                                >
                                    Submit
                                </button>
                            </div>
                        </div>
                    </div>
                    <div className="basis-[50%] bg-gray w-full h-full flex-col hidden lg:flex gap-10 relative items-center">
                        <img src="../Porp/ring1.png" alt="" className='relative top-0 right-0 w-[30%] self-end' />
                        <h2 className=' font-para text-3xl font-bold text-center text-white'>Don’t worry</h2>
                        <img src="../Banner/auth.png" alt="" className='w-[60%] self-end' />
                        <img src="../Porp/ring2.png" alt="" className='absolute bottom-0 -left-[20%] w-[40%] self-end' />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Recoverpassword