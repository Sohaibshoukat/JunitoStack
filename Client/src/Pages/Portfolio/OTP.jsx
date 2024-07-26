import React, { useContext, useState } from 'react';
import { IoIosArrowBack } from 'react-icons/io';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';

const OTP = () => {
    const [otp, setOTP] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Loading state

    const navigate = useNavigate();
    const { id } = useParams();
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true); // Start loading

        try {
            const response = await fetch(`${BaseURL}/api/user/verifyOTP`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id,
                    otp,
                }),
            });

            const data = await response.json();

            if (!data.success) {
                showAlert(data.message || 'OTP verification failed', 'danger');
            } else {
                localStorage.setItem("auth-token", data.AuthToken);
                navigate(`/selectplan/${id}`);
            }
        } catch (error) {
            showAlert(error.message || 'OTP verification failed', 'danger');
        } finally {
            setIsLoading(false); // End loading
        }
    };

    const handleResendOTP = async () => {
        setIsLoading(true); // Start loading

        try {
            const response = await fetch(`${BaseURL}/api/user/SendOTPagain`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id }),
            });

            const data = await response.json();

            if (!data.success) {
                showAlert(data.message || 'Failed to resend OTP', 'danger');
            } else {
                showAlert(data.message || 'OTP sent successfully', 'success');
            }
        } catch (error) {
            showAlert(error.message || 'Failed to resend OTP', 'danger');
        } finally {
            setIsLoading(false); // End loading
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
                            <h2 className=' font-para text-3xl font-bold text-black'>Verify Email?</h2>
                            <p className='text-lightgray font-para text-lg'>We have sent an OTP to your registered Email</p>
                            <div className="flex flex-col gap-4">
                                <input
                                    type="text"
                                    value={otp}
                                    onChange={(e) => setOTP(e.target.value)}
                                    placeholder='****'
                                    className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                    disabled={isLoading} // Disable input while loading
                                />
                                <button
                                    className='text-white text-lg my-2 md:text-md lg:text-lg font-Para px-2 py-2 md:px-6 rounded-md bg-gray hover:text-black hover:bg-transparent hover:border-gray border-2 w-full border-gray duration-300 ease-in-out'
                                    onClick={handleSubmit}
                                    disabled={isLoading} // Disable button while loading
                                >
                                    {isLoading ? 'Verifying...' : 'Verify'} {/* Show loading text */}
                                </button>
                            </div>
                            <p className='text-lightgray font-para text-sm'>
                                Did not receive OTP?{' '}
                                <span 
                                    className={`text-gray cursor-pointer ${isLoading ? 'text-gray-400' : ''}`} 
                                    onClick={() => { if (!isLoading) handleResendOTP(); }} // Disable resend during loading
                                >
                                    {isLoading ? 'Sending...' : 'Send again'}
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="basis-[50%] bg-gray w-full h-full flex-col hidden lg:flex gap-10 relative items-center">
                        <img src="../Porp/ring1.png" alt="" className='relative top-0 right-0 w-[30%] self-end' />
                        <h2 className=' font-para text-3xl font-bold text-center text-white'>Email Verification</h2>
                        <img src="../Banner/auth.png" alt="" className='w-[60%] self-end' />
                        <img src="../Porp/ring2.png" alt="" className='absolute bottom-0 -left-[20%] w-[40%] self-end' />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default OTP;
