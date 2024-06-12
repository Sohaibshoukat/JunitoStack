import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';

const Login = () => {
    const [formData, setFormData] = useState({
        Email: '',
        Password: ''
    });

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const navigate = useNavigate()

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        try {
            const response = await fetch(`${BaseURL}/api/user/loginuser`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();

            if(!data.success){
                showAlert(data.Message || 'Login failed check credentials','danger')
                return;
            }

            showAlert('Login Success','success')
            localStorage.setItem("auth-token", data.AuthToken)
            navigate('/dashboard/chatbot')
        } catch (error) {
            console.log(error)
            showAlert(error.message,'danger')
        }
    };

    return (
        <>
            <Nav />
            <div className='py-36'>
                <h1 className='font-para text-5xl text-center m-auto font-bold text-black max-w-[70%]'>Login To Your BizBot Account</h1>
            </div>
            <div className="w-[90%] xl:w-[80%] m-auto shadow-shadow2">
                <div className="flex flex-row justify-between">
                    <div className="bg-white w-[100%] lg:basis-[50%] px-8 md:px-14 py-20">
                        <div className="flex flex-col gap-4 font-para">
                            <h2 className=' font-para text-3xl font-bold text-black'>Login</h2>
                            <p className='text-lightgray font-para text-lg'>Login to access your travelwise  account</p>
                            <form onSubmit={handleSubmit}>
                                <div className="flex flex-col gap-4">
                                    <input
                                        type="email"
                                        name="Email"
                                        value={formData.Email}
                                        onChange={handleChange}
                                        placeholder='abc@gmail.com'
                                        className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                    />
                                    <input
                                        type="password"
                                        name="Password"
                                        value={formData.Password}
                                        onChange={handleChange}
                                        placeholder='******'
                                        className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                    />
                                    <div className="flex flex-col gap-2 md:flex-row justify-between md:items-center">
                                        <div className="flex gap-3 items-center">
                                            <input
                                                type="checkbox"
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
                                    <button type="submit" className='text-white text-lg my-2 md:text-md lg:text-lg font-Para px-2 py-2 md:px-6 rounded-md bg-gray hover:text-black hover:bg-transparent hover:border-gray border-2 w-full border-gray duration-300 ease-in-out'>Login</button>
                                    <p className='text-black font-bold text-center font-para text-lg'>Don’t have an account?
                                        <Link to={'/sign-up'}>
                                            <span className='text-gray'>
                                                Sign up</span>
                                        </Link>
                                    </p>
                                    <div className='flex flex-col gap-4 my-2'></div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="basis-[50%] bg-gray w-full h-auto flex-col hidden lg:flex gap-10 relative items-center">
                        <img src="./Porp/ring1.png" alt="" className='relative top-0 right-0 w-[30%] self-end' />
                        <h2 className=' font-para text-3xl font-bold text-center text-white'>Welcome back</h2>
                        <img src="./Banner/auth.png" alt="" className='w-[60%] self-end' />
                        <img src="./Porp/ring2.png" alt="" className='absolute bottom-0 -left-[20%] w-[40%] self-end' />
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default Login;
