import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Nav from '../../Components/Nav'
import Footer from '../../Components/Footer'
import AlertContext from '../../Context/Alert/AlertContext'
import { BaseURL } from '../../Data/BaseURL'

const Signup = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        FirstName: '',
        LastName: '',
        Email: '',
        Phone: '',
        CompanyName: '',
        Password: '',
        ConfirmPassword: ''
    });

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Frontend validation
        if (!formData.FirstName || !formData.LastName || !formData.Email || !formData.Phone || !formData.CompanyName || !formData.Password || !formData.ConfirmPassword) {
            showAlert('All fields are required', 'danger');
        }
        if (formData.Password !== formData.ConfirmPassword) {
            showAlert('Passwords do not match', 'danger');
        }
        // Backend API call
        try {
            const response = await fetch(`${BaseURL}/api/user/createuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (!data.success) {
                showAlert(data.error || 'Signup failed', 'danger');
            }
            showAlert('OTP Email sent to your registerd email', 'success');
            navigate(`/otpconfirm/${data.AuthToken}`)
        } catch (error) {
            showAlert(error.messaage, 'danger');
        }
    };


    return (
        <>
            <Nav />
            <div className='py-36'>
                <h1 className='font-para text-5xl text-center m-auto font-bold text-black max-w-[70%]'>SignUp To Your BizBot Account</h1>
            </div>
            <div className="w-[90%] xl:w-[80%] m-auto shadow-shadow2">
                <div className="flex flex-row justify-between">
                    <div className="bg-white w-[100%] lg:basis-[50%] px-8 md:px-14 py-20">
                        <div className="flex flex-col gap-4 font-para">
                            <h2 className=' font-para text-3xl font-bold text-black'>Sign up</h2>
                            <p className='text-lightgray font-para text-lg'>Let’s get you all st up so you can access your personal account.</p>
                            <div className="flex flex-col gap-4">
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <input
                                        type="text"
                                        name="FirstName"
                                        value={formData.FirstName}
                                        onChange={handleChange}
                                        placeholder='John'
                                        className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                    />
                                    <input
                                        type="text"
                                        name="LastName"
                                        value={formData.LastName}
                                        onChange={handleChange}
                                        placeholder='Dep'
                                        className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <input
                                        type="email"
                                        name="Email"
                                        value={formData.Email}
                                        onChange={handleChange}
                                        placeholder='abc@gmail.com'
                                        className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                    />
                                    <input
                                        type="tel"
                                        name="Phone"
                                        value={formData.Phone}
                                        onChange={handleChange}
                                        placeholder='1234567890'
                                        className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                    />
                                </div>
                                <input
                                    type="text"
                                    name="CompanyName"
                                    value={formData.CompanyName}
                                    onChange={handleChange}
                                    placeholder='Company Name'
                                    className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                />
                                <input
                                    type="password"
                                    name="Password"
                                    value={formData.Password}
                                    onChange={handleChange}
                                    placeholder='Password'
                                    className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                />
                                <input
                                    type="password"
                                    name="ConfirmPassword"
                                    value={formData.ConfirmPassword}
                                    onChange={handleChange}
                                    placeholder='Confirm Password'
                                    className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                />
                                <div className="flex flex-col gap-2 md:flex-row justify-between md:items-center">
                                    <div className="flex gap-3 items-center">
                                        <input
                                            type="check"
                                            className='w-5 h-5  border-2 border-black/50 rounded-md'
                                        />
                                        <p className='text-black font-medium font-para text-lg'>Remember me</p>
                                    </div>
                                    <p className='text-gray font-medium font-para text-lg'>
                                        <Link to={'/forget-password'}>
                                            Forgot Password
                                        </Link>
                                    </p>
                                </div>
                                <button
                                    className='text-white text-lg my-2 md:text-md lg:text-lg font-Para px-2 py-2 md:px-6 rounded-md bg-gray hover:text-black hover:bg-transparent hover:border-gray border-2 w-full border-gray duration-300 ease-in-out'
                                    onClick={handleSubmit}
                                >
                                    Create account
                                </button>
                                <p className='text-black font-bold text-center font-para text-lg'>Already have an account?
                                    <Link to={'/login'}>
                                        <span className='text-gray'>
                                            Login</span>
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="basis-[50%] bg-gray w-full h-auto flex-col hidden lg:flex gap-10 relative items-center">
                        <img src="./Porp/ring1.png" alt="" className='relative top-0 right-0 w-[30%] self-end' />
                        <h2 className=' font-para text-3xl font-bold text-center text-white'>New Here?</h2>
                        <img src="./Banner/auth.png" alt="" className='w-[60%] self-end' />
                        <img src="./Porp/ring2.png" alt="" className='absolute bottom-0 -left-[20%] w-[40%] self-end' />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Signup