import React from 'react'
import { Link } from 'react-router-dom'
import Nav from '../../Components/Nav'
import Footer from '../../Components/Footer'

const Signup = () => {
    return (
        <>
        <Nav/>
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
                                        placeholder='John'
                                        className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                    />
                                    <input
                                        type="text"
                                        placeholder='Dep'
                                        className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                    />
                                </div>
                                <div className="flex flex-col md:flex-row justify-between gap-4">
                                    <input
                                        type="email"
                                        placeholder='abc@gmail.com'
                                        className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                    />
                                    <input
                                        type="tel"
                                        placeholder='1234567890'
                                        className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                    />
                                </div>
                                <input
                                    type="password"
                                    placeholder='******'
                                    className='py-3 text-lg px-4 border-2 border-black/50 rounded-lg'
                                />
                                <input
                                    type="password"
                                    placeholder='******'
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
                                <button className='text-white text-lg my-2 md:text-md lg:text-lg font-Para px-2 py-2 md:px-6 rounded-md bg-gray hover:text-black hover:bg-transparent hover:border-gray border-2 w-full border-gray duration-300 ease-in-out'>Create account</button>
                                <p className='text-black font-bold text-center font-para text-lg'>Already have an account?
                                    <Link to={'/login'}>
                                        <span className='text-gray'>
                                            Login</span>
                                    </Link>
                                </p>
                                <p className='text-lightgray font-para text-lg text-center'>Or Sign up with</p>
                                <div className="flex flex-row gap-2">
                                    <div className="basis-[33.3333%] border-2 border-gray  rounded-lg py-2 flex flex-col items-center hover:bg-gray ease-in-out duration-300">
                                        <img src="./Social/facebook.png" alt="" className='w-[30px]' />
                                    </div>
                                    <div className="basis-[33.3333%] border-2 border-gray  rounded-lg py-2 flex flex-col items-center hover:bg-gray ease-in-out duration-300">
                                        <img src="./Social/google.png" alt="" className='w-[30px]' />
                                    </div>
                                    <div className="basis-[33.3333%] border-2 border-gray  rounded-lg py-2 flex flex-col items-center hover:bg-gray ease-in-out duration-300">
                                        <img src="./Social/apple.png" alt="" className='w-[30px]' />
                                    </div>
                                </div>
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
            <Footer/>
        </>
    )
}

export default Signup