import React, { useContext, useEffect, useState } from 'react'
import { IoMdMail } from 'react-icons/io'
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';
import { trimToWords } from '../../Data/UseFullFunction';

const Prompts = () => {
    const [Vertid, setVertid] = useState('')
    const [Support, setSupport] = useState('')
    const [HR, setHR] = useState()
    const [Marketing, setMarketing] = useState()
    const [Startup, setStartup] = useState()
    const [Vertrieb, setVertrieb] = useState()
    const [SupportData, setSupportData] = useState()
    const [Assistent, setAssitent] = useState()

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    const sendEmail = async (email, department) => {
        try {
            const response = await fetch(`${BaseURL}/api/contact/sendMailMore`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ Email: email, Department: department })
            });
            const data = await response.json();

            if (response.ok) {
                showAlert('We will get back to you soon', 'success');
                // You can perform any additional actions here after successful email sending
            } else {
                showAlert('Failed to send email:', 'danger');
                // Handle the error accordingly
            }
        } catch (error) {
            showAlert('Error occurred while sending email', 'danger');
            // Handle the error accordingly
        }
    };

    const fetchPrompts = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/company/random`);
            if (response.ok) {
                const data = await response.json();
                setHR(data.HR)
                setMarketing(data.Marketing)
                setStartup(data.Startup)
                setVertrieb(data.Vertrieb)
                setSupportData(data.Support)
                setAssitent(data.Agentour)
            } else {
                showAlert('Failed to fetch prompts', 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    useEffect(() => {
        fetchPrompts();
    }, []);

    return (
        <div className='relative my-8'>
            <div className='w-[90%] md:w-[90%] xl:w-[80%] m-auto relative'>
                <h1 className='font-head text-center text-gray text-lg md:text-xl lg:text-2xl xl:text-4xl font-bold mb-4'>Prompts</h1>
                <p className='font-para text-base md:text-lg text-center'>We are providing you several prompts to give you slight information.</p>
                <div className="py-8 md:py-16">
                    <div className='flex flex-col lg:flex-row justify-between gap-10'>
                        <div className="flex flex-col gap-4  basis-[33.333%]">
                            <div className='bg-[#F2E7FF] rounded-3xl p-8'>
                                <div className='bg-[#bf8aff] rounded-t-lg rounded-b-2xl shadow-shadow2 flex flex-col gap-2 pt-2'>
                                    <div className='px-6 h-[100%] basis-[50%]'>
                                        <img src="./Prompts/SocialMedia.png" alt="" className='m-auto w-[100%] h-[100%]' />
                                    </div>
                                    <div className='bg-[#F2E7FF] rounded-2xl flex flex-col gap-2 w-[100%] py-4 px-6'>
                                        <h3 className='font-mont text-base font-bold'>Are you ready to take your Marketing experience to the next level?</h3>
                                        <p className='font-para text-sm'>{Marketing && trimToWords(Marketing?.Info)}....</p>
                                        <button className='bg-[#1F2429] rounded-full px-5 my-2 self-end py-2 w-fit font-para text-white font-bold text-lg'>Read More</button>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-[#E6EAF9] rounded-3xl p-8'>
                                <div className='bg-[#5A71D9] rounded-t-lg rounded-b-2xl shadow-shadow2 flex flex-col gap-2 pt-2'>
                                    <div className='px-6 h-[100%] basis-[50%]'>
                                        <img src="./Prompts/Assistent.png" alt="" className='m-auto w-[100%] h-[100%]' />
                                    </div>
                                    <div className='bg-[#D9E5FF] rounded-2xl flex flex-col gap-2 w-[100%] py-4 px-6'>
                                        <h3 className='font-mont text-base font-bold'>👋 Hey, look at our assistent.</h3>
                                        <p className='font-para text-sm'>....</p>
                                        <button className='hover:bg-[#1F2429] bg-transparent text-[#1F2429] border-2 border-[#1F2429] rounded-full px-5 my-4 self-start py-2 w-fit font-para hover:text-white font-bold text-sm ease-in-out duration-300'>Book a meeting</button>
                                        <button className='bg-[#1F2429] rounded-full px-5 my-2 self-end py-2 w-fit font-para text-white font-bold text-lg'>Read More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4  basis-[33.333%]">
                            <div className='bg-[#FFEBEF] rounded-3xl p-8'>
                                <div className='bg-[#E987A0] rounded-t-lg rounded-b-2xl shadow-shadow2 flex flex-col gap-2 pt-2'>
                                    <div className='px-6 h-[100%] basis-[50%]'>
                                        <img src="./Prompts/HR.png" alt="" className='m-auto w-[100%] h-[100%]' />
                                    </div>
                                    <div className='bg-[#FFCAD8] rounded-2xl flex flex-col gap-2 w-[100%] py-4 px-6'>
                                        <h3 className='font-mont text-base font-bold'>👋 Hey, Are you ready to take your HR experience to the next level?</h3>
                                        <p className='font-para text-sm'>{HR && trimToWords(HR?.Info)}....</p>
                                        <button className='hover:bg-[#1F2429] bg-transparent text-[#1F2429] border-2 border-[#1F2429] rounded-full px-5 my-4 self-start py-2 w-fit font-para hover:text-white font-bold text-sm ease-in-out duration-300'>Book a meeting</button>
                                        <button className='bg-[#1F2429] rounded-full px-5 my-2 self-end py-2 w-fit font-para text-white font-bold text-lg'>Read More</button>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-[#FFF3CF] rounded-3xl p-8'>
                                <div className='bg-[#eed078] rounded-t-lg rounded-b-2xl shadow-shadow2 flex flex-col gap-2 pt-2'>
                                    <div className='px-6 h-[100%] basis-[50%]'>
                                        <img src="./Prompts/Support.png" alt="" className='m-auto w-[100%] h-[100%]' />
                                    </div>
                                    <div className='bg-[#FCF7E8] rounded-2xl flex flex-col gap-2 w-[100%] py-4 px-6'>
                                        <h3 className='font-mont text-base font-bold'>How much would you want help from our support?</h3>
                                        <p className='font-para text-sm'>{SupportData && trimToWords(SupportData?.Info)}...</p>
                                        <button className='bg-[#1F2429] rounded-full px-5 my-2 self-end py-2 w-fit font-para text-white font-bold text-lg'>Read More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col gap-4  basis-[33.333%]">
                            <div className='bg-[#F6F7F9] rounded-3xl p-8'>
                                <div className='bg-[#100F0F] rounded-t-lg rounded-b-2xl shadow-shadow2 flex flex-col gap-2 pt-2'>
                                    <div className='px-6 h-[100%] basis-[50%]'>
                                        <img src="./Prompts/Vertrieb.png" alt="" className='m-auto w-[100%] h-[100%]' />
                                    </div>
                                    <div className='bg-white rounded-2xl flex flex-col gap-2 w-[100%] py-4 px-6'>
                                        <h3 className='font-mont text-base font-bold'>Want to test our vertrieb? Let us your email and we will contact you for a demo</h3>
                                        <div className='border-2 border-[#1F242933] rounded-2xl py-2 px-2 bg-slate-100 flex gap-3'>
                                            <div className='bg-[#c9cacb] p-1 rounded-lg'>
                                                <IoMdMail className='text-xl text-black' />
                                            </div>
                                            <input
                                                type="email"
                                                name='Email'
                                                id='Email'
                                                value={Vertid}
                                                onChange={(e) => { setVertid(e.target.value) }}
                                                placeholder='Email'
                                                className='text-para text-black text-base md:text-lg font-para placeholder:text-gray-400 bg-transparent outline-none'
                                            />
                                        </div>
                                        <button
                                            className='bg-[#1F2429] rounded-full px-5 my-2 self-end py-2 w-fit font-para text-white font-bold text-lg'
                                            onClick={() => { sendEmail(Vertid, 'Vertid') }}
                                        >Read More</button>
                                    </div>
                                </div>
                            </div>
                            <div className='bg-[#C9E6DF] rounded-3xl p-8'>
                                <div className='bg-[#77C7B6] rounded-t-lg rounded-b-2xl shadow-shadow2 flex flex-col gap-2 pt-2'>
                                    <div className='px-6 h-[100%] basis-[50%]'>
                                        <img src="./Prompts/Support.png" alt="" className='m-auto w-[100%] h-[100%]' />
                                    </div>
                                    <div className='bg-[#A7F1E1] rounded-2xl flex flex-col gap-2 w-[100%] py-4 px-6'>
                                        <h3 className='font-mont text-base font-bold'>Would you like to know about our startup 😎 ?</h3>
                                        <p className='font-para text-sm'>We promise to don’t spam you everyday </p>

                                        <div className='border-2 border-[#1F242933] rounded-2xl py-2 px-2 bg-slate-100 flex gap-3'>
                                            <div className='bg-[#c9cacb] p-1 rounded-lg'>
                                                <IoMdMail className='text-xl text-black' />
                                            </div>
                                            <input
                                                type="email"
                                                name='Email'
                                                id='Email'
                                                value={Support}
                                                onChange={(e) => { setSupport(e.target.value) }}
                                                placeholder='Email'
                                                className='text-para text-black text-base md:text-lg font-para placeholder:text-gray-400 bg-transparent outline-none'
                                            />
                                        </div>
                                        <button
                                            className='bg-[#1F2429] rounded-full px-5 my-2 self-end py-2 w-fit font-para text-white font-bold text-lg'
                                            onClick={() => { sendEmail(Support, 'Support') }}
                                        >Read More</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Prompts