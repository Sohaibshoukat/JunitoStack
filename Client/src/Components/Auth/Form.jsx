import React, { useEffect, useState } from 'react'

import circle from "../../assets/Images/Shapes/circle.png"
import polygon from "../../assets/Images/Shapes/polygon.png"
import Polygonrev from "../../assets/Images/Shapes/Polygonrev.png"

const Form = ({StateSet}) => {




    return (
        <>
            <div className={`w-[80%] md:w-[90%] lg:w-[80%] xl:w-[70%] relative min-h-[630px] md:min-h-[700px] m-auto mb-20 container2`} id="container">
                <div class="py-10 md:py-20 form-container sign-up-container sm:translate-x-0 w-[100%] md:w-[60%]" id="SignUp">
                    <form action="#" className='sm:px-10'>
                        <h1 className='text-black font-Para text-2xl md:text-4xl font-bold mb-3'>Create Account</h1>
                        <h2 className='text-black font-Para text-xl font-light'> Sign Up With</h2>
                        <div class="flex flex-row gap-6 social-container my-4">
                            <img src="./Images/google.png" alt="" className='w-[50px] h-[50px]' />
                            <img src="./Images/facebook.png" alt="" className='w-[50px] h-[50px]' />
                        </div>
                        <div className='font-Para text-black text-2xl font-bold my-2'>Or</div>
                        <div className='flex flex-col gap-4 text-left items-start w-[80%] m-auto'>
                            <div className='font-Para flex flex-col gap-2 text-black font-semibold w-[100%]'>
                                <label htmlFor="" className='text-xl'>Email</label>
                                <input type="email" placeholder="Your Email" className='py-2 px-4 bg-white rounded-lg text-lg placeholder:text-gray-400' style={{ boxShadow: "1px 0px 12px 1px #00000040" }} />
                            </div>
                            <div className='font-Para flex flex-col gap-2 text-black font-semibold w-[100%]'>
                                <label htmlFor="" className='text-xl'>Password</label>
                                <input type="password" placeholder="Your Password" className='py-2 px-4 bg-white rounded-lg text-lg placeholder:text-gray-400' style={{ boxShadow: "1px 0px 12px 1px #00000040" }} />
                            </div>
                            <div className='font-Para flex flex-col gap-2 text-black font-semibold w-[100%]'>
                                <label htmlFor="" className='text-xl'>Confirm Password</label>
                                <input type="password" placeholder="Confirm Password" className='py-2 px-4 bg-white rounded-lg text-lg placeholder:text-gray-400' style={{ boxShadow: "1px 0px 12px 1px #00000040" }} />
                            </div>
                            <div className='flex justify-center w-[100%]'>
                                <button className='font-Para w-fit m-auto my-4 bg-black text-white rounded-lg text-xl md:text-xl font-bold py-2 px-6 hover:bg-accence hover:text-black duration-300 ease-in-out' >Sign Up</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="py-10 md:py-20 form-container sign-in-container sm:translate-x-0 w-[100%] md:w-[60%]" id="SignIn">
                    <form action="#"  className='sm:px-10'>
                        <h1 className='text-black font-Para text-2xl md:text-4xl font-bold mb-3'>Login To Your Account</h1>
                        <h2 className='text-black font-Para text-xl font-light'>Login with</h2>
                        <div class="flex flex-row gap-6 social-container my-4">
                            <img src="./Images/google.png" alt="" className='w-[50px] h-[50px]' />
                            <img src="/Images/facebook.png"alt="" className='w-[50px] h-[50px]' />
                        </div>
                        <div className='font-Para text-black text-2xl font-bold my-2'>Or</div>
                        <div className='flex flex-col gap-4 text-left items-start w-[80%] m-auto'>
                            <div className='font-Para flex flex-col gap-2 text-black font-semibold w-[100%]'>
                                <label htmlFor="" className='text-xl'>Email</label>
                                <input type="email" placeholder="Your Email" className='py-2 px-4 bg-white rounded-lg text-lg placeholder:text-gray-400' style={{ boxShadow: "1px 0px 12px 1px #00000040" }} />
                            </div>
                            <div className='font-Para flex flex-col gap-2 text-black font-semibold w-[100%]'>
                                <label htmlFor="" className='text-xl'>Password</label>
                                <input type="password" placeholder="Your Password" className='py-2 px-4 bg-white rounded-lg text-lg placeholder:text-gray-400' style={{ boxShadow: "1px 0px 12px 1px #00000040" }} />
                            </div>
                            <div className='flex justify-center w-[100%]'>
                                <button className='font-Para w-fit m-auto my-4 bg-black text-white rounded-lg text-xl md:text-xl font-bold py-2 px-6 hover:bg-accence hover:text-black duration-300 ease-in-out' >Sign In</button>
                            </div>
                        </div>
                    </form>
                </div>
                <div class="overlay-container hidden md:block">
                    <img src="./Images/Shapes/circle.png" alt="" className='absolute z-50 right-[-20%] top-[5%] w-[100px] xl:w-[150px]' />
                    <img src="./Images/Shapes/polygon.png" alt="" className='absolute z-50 left-[10%] top-[10%] lg:top-[20%]  w-[100px] xl:w-[150px]' />
                    <img src="./Images/Shapes/Polygonrev.png" alt="" className='absolute z-50 left-[-5%] bottom-[20%] w-[100px] xl:w-[100px]' />
                    <img src="/Images/Shapes/circle.png" alt="" className='absolute z-50 right-[10%] lg:right-[15%] bottom-[5%] lg:bottom-[15%] w-[150px] xl:w-[200px]' />
                    <div class="overlay bg-black">
                        <div class="overlay-panel overlay-left">
                            <h1 className='text-WHITE font-Para text-4xl font-bold mb-3'>New Here?</h1>
                            <p className='text-white font-Para text-lg'>Sign up and discover a great amount of new oppurtunities</p>
                            <button
                                class="uppercase my-10 py-2 px-8 rounded-full bg-transparent border-2 border-white text-xl font-Para font-bold hover:bg-white hover:text-black ease-in-out duration-300"
                                onClick={() => {
                                    StateSet("log in to your slice list account")
                                    const container = document.getElementById('container');
                                    container.classList.remove("right-panel-active");
                                }}
                            >
                                Sign In
                            </button>
                        </div>
                        <div class="overlay-panel overlay-right">
                            <h1 className='text-WHITE font-Para text-4xl font-bold mb-3'>Welcome back</h1>
                            <p className='text-white font-Para text-lg'>To keep connected with us please login with your personal info</p>
                            <button
                                class="uppercase my-10 py-2 px-8 rounded-full bg-transparent border-2 border-white text-xl font-Para font-bold hover:bg-white hover:text-black ease-in-out duration-300"
                                onClick={() => {
                                    StateSet("sign up to your slice list account")
                                    const container = document.getElementById('container');
                                    container.classList.add("right-panel-active");
                                }}
                            >
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Form