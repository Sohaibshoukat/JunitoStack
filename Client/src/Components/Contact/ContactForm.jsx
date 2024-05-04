import React, { useState } from 'react'
import { CAlert } from '@coreui/react'

const ContactForm = () => {

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Subject, setSubject] = useState('')
    const [Message, setMessage] = useState('')
    const [showAlert, setshowAlert] = useState(false)
    const [AlertType, setAlertType] = useState(false)
    const [IsLoading, setIsLoading] = useState(false)
    const [AlertMessage, setAlertMessage] = useState('')


    const handleFormSubmit = async () => {
        try {
            const response = await fetch('https://baader-backend.vercel.app/sendMail', {
                method: 'POST',
                body: JSON.stringify({ Name, Email, Subject, Message }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.success) {
                setName('');
                setEmail('');
                setMessage('');
                setSubject('');

                setshowAlert(true)
                setAlertType("success")
                setAlertMessage("Your Message Have Been Send Succefully we will Get back to you soon")
                setIsLoading(false);
                setTimeout(() => {
                    setshowAlert(false)
                }, 3000);

            }
            else {
                setshowAlert(true)
                setAlertType('danger')
                setAlertMessage("Error Occured")
                setIsLoading(false);
                setTimeout(() => {
                    setshowAlert(false)
                }, 5000);
            }
        } catch (error) {
            console.log(error.message);
            setshowAlert(true)
            setAlertType('danger')
            setAlertMessage("Error Occured")
            setIsLoading(false);
            setTimeout(() => {
                setshowAlert(false)
            }, 5000);
        }
    }

    return (
        <>
            <div className={``}>
                <div className='border-b-2 pb-10 border-[#3A3A3A]  flex flex-col gap-4'>
                    <h2 className='font-mont text-gray font-bold text-xl md:text-2xl lg:text-3xl'>Let us know your concerns.</h2>
                    <p className='font-para text-xl text-slate-400 '>First please give us some context.</p>
                </div>
                <div className="flex flex-col gap-4 mt-10">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="Name" className='text-gray font-para text-base font-bold'>Name</label>
                        <input
                            type="text"
                            name='Name'
                            id='Name'
                            value={Name}
                            onChange={(e) => { setName(e.target.value) }}
                            placeholder='Name'
                            className='text-para text-black text-base md:text-lg font-para placeholder:text-gray-400 bg-light outline-none rounded-xl py-3 px-4 shadow-shadow2'
                        />
                    </div>
                    <div className="flex flex-col gap-1">

                        <label htmlFor="Name" className='text-gray font-para text-base font-bold'>Email</label>
                        <input
                            type="email"
                            name='Email'
                            id='Email'
                            value={Email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            placeholder='E-Mail'
                            className='text-para text-black text-base md:text-lg font-para placeholder:text-gray-400 bg-light outline-none rounded-xl py-3 px-4 shadow-shadow2'
                        />
                    </div>
                    <div className="flex flex-col gap-1">

                        <label htmlFor="Name" className='text-gray font-para text-base font-bold'>Message</label>
                        <textarea
                            cols="30"
                            name='Message'
                            id='Message'
                            value={Message}
                            onChange={(e) => { setMessage(e.target.value) }}
                            rows="5"
                            placeholder='Message'
                            className='text-para text-black text-base outline-none md:text-lg font-para placeholder:text-gray-400 bg-light rounded-xl py-3 px-4 shadow-shadow2'
                        />
                    </div>
                    <button
                        className={`rounded-lg self-center mt-2 md:mt-4 w-full py-3 px-4  border-gray hover:text-gray bg-gray text-white  hover:bg-transparent text-base md:text-lg font-semibold font-para  border-2   ease-in-out duration-300`}
                        onClick={handleFormSubmit}
                        disabled={IsLoading}
                    >
                        Make a reservation
                    </button>
                </div>
            </div>


            {showAlert &&
                <>
                    {
                        AlertType == "success" ? (
                            <CAlert
                                color={AlertType}
                                className='text-white'
                                style={{ position: "fixed", top: "50px", right: "10px", transition: "ease-in-out 5s", zIndex: "1000000000", borderRadius: "10px", padding: "15px", backgroundColor: `${AlertType == 'success' ? '#2acfb3' : '#bf1b2c'}` }}>
                                {AlertMessage}
                            </CAlert>
                        ) : (
                            <CAlert
                                color={AlertType}
                                className='text-white'
                                style={{ position: "fixed", top: "50px", right: "10px", transition: "ease-in-out 5s", zIndex: "1000000000", borderRadius: "10px", padding: "15px", backgroundColor: `${AlertType == 'success' ? '#2acfb3' : '#bf1b2c'}` }}>
                                {AlertMessage}
                            </CAlert>
                        )
                    }
                </>
            }
        </>
    )
}

export default ContactForm