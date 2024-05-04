import React, { useState } from 'react'
import { CAlert } from '@coreui/react'
import { IoIosSend } from 'react-icons/io'

const ContactForm2 = () => {

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Company, setCompany] = useState('')
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
            <div className={`bg-[#EEEEEE] rounded-2xl py-6 px-4 md:px-8`}>
                <div className="flex flex-col gap-6">
                    <div className="flex flex-col gap-1">
                        <input
                            type="text"
                            name='Name'
                            id='Name'
                            value={Name}
                            onChange={(e) => { setName(e.target.value) }}
                            placeholder='Name'
                            className='text-para text-black text-base md:text-lg font-para placeholder:text-gray-400 bg-transparent outline-none py-3 px-2 border-b-2 border-black'
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <input
                            type="email"
                            name='Email'
                            id='Email'
                            value={Email}
                            onChange={(e) => { setEmail(e.target.value) }}
                            placeholder='Email'
                            className='text-para text-black text-base md:text-lg font-para placeholder:text-gray-400 bg-transparent outline-none py-3 px-2 border-b-2 border-black'
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <input
                            type="text"
                            name='Company'
                            id='Company'
                            value={Company}
                            onChange={(e) => { setCompany(e.target.value) }}
                            placeholder='Company Name'
                            className='text-para text-black text-base md:text-lg font-para placeholder:text-gray-400 bg-transparent outline-none py-3 px-2 border-b-2 border-black'
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <input
                            type="text"
                            name='Subject'
                            id='Subject'
                            value={Subject}
                            onChange={(e) => { setSubject(e.target.value) }}
                            placeholder='Subject'
                            className='text-para text-black text-base md:text-lg font-para placeholder:text-gray-400 bg-transparent outline-none py-3 px-2 border-b-2 border-black'
                        />
                    </div>
                    <div className="flex flex-col gap-1">
                        <textarea
                            cols="30"
                            name='Message'
                            id='Message'
                            value={Message}
                            onChange={(e) => { setMessage(e.target.value) }}
                            rows="5"
                            placeholder='Message'
                            className='text-para text-black text-base md:text-lg font-para placeholder:text-gray-400 bg-transparent outline-none py-3 px-2 border-b-2 border-black'
                        />
                    </div>
                    <button
                        className={`
                        rounded-lg mt-2 md:mt-4 py-2 px-4  border-gray hover:text-gray bg-gray text-white  
                        hover:bg-transparent text-lg flex items-center w-fit gap-4 self-start
                        font-semibold font-para border-2 ease-in-out duration-300
                        `}
                        onClick={handleFormSubmit}
                        disabled={IsLoading}
                    >
                        <IoIosSend className='text-2xl'/>
                        Send Message
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

export default ContactForm2