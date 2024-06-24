import React from 'react'
import { ForgotFields2 } from '../Data/Forgot2'
import Slice from '../assets/slice.png'

const ForgotPassword2 = () => {
    return (
        <>
            <div className='flex flex-col h-screen justify-center items-center'>

                <div className=' w-[90%] md:w-[60%] lg:w-[45%]  m-auto   '>
                    {ForgotFields2.map((item, index) => (
                        <div className={`border-t-[30px] md:border-t-[40px] border-b-[20px] border-x-[20px] border-gray rounded-lg relative bg-gray  text-black h-full shadow-xl`}>

                            <div className='rounded-3xl p-2 md:p-4'>
                                <img src={'./Logo2.png'} alt="Logo" className='mx-auto pb-10 lg:w-[100px]' />
                                <div className='flex flex-col justify-between mb-2 md:mb-4 '>

                                    <h2 className={`text-xl md:text-3xl font-bold  font-Para text-white `}>{item.Name}</h2>
                                    <p className='text-white font-Para text-sm md:text-base '>Please enter your email</p>
                                </div>
                                <input type="password" placeholder='New password' className={`py-3 px-4 rounded-lg w-full font-Para mb-4 text-base md:text-xl  border border-white text-white bg-black hover:bg-black hover:border-gray hover:text-white duration-300 ease-in-out  focus:border-[#ADFC32] `} />
                                <input type="password" placeholder='Confirm password' className={`py-3 px-4 rounded-lg w-full font-Para mb-4 text-base md:text-xl  border border-white text-white bg-black hover:bg-black hover:border-gray hover:text-white duration-300 ease-in-out  focus:border-[#ADFC32] `} />


                                <button
                                    className={`py-3 px-4 rounded-lg w-full font-Para mb-4 text-base md:text-xl font-bold text-gray bg-white border-2 border-white hover:bg-accence hover:bg-transparent hover:text-white duration-300 ease-in-out `}
                                >
                                    Reset Password
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </>
    )
}

export default ForgotPassword2
