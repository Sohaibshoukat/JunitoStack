import React, { useContext, useState } from 'react'
import { CAlert } from '@coreui/react'
import { IoIosSend } from 'react-icons/io'
import AlertContext from '../../Context/Alert/AlertContext'
import { BaseURL } from '../../Data/BaseURL'

const ContactForm2 = () => {

    const [Name, setName] = useState('');
    const [Email, setEmail] = useState('');
    const [Phone, setPhone] = useState('');
    const [Company, setCompany] = useState(''); // New state for Company
    const [Subject, setSubject] = useState(''); // New state for Subject
    const [Message, setMessage] = useState('');
    const [IsLoading, setIsLoading] = useState(false);

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;


    const handleFormSubmit = async () => {
        setIsLoading(true); // Set loading state to true when form is submitted
        try {
            const response = await fetch(`${BaseURL}/api/contact/sendMail`, {
                method: 'POST',
                body: JSON.stringify({ Name, Email, Phone, Company, Subject, Message }), // Include Company and Subject in the request body
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.success) {
                setName('');
                setEmail('');
                setPhone('')
                setCompany('');
                setSubject('');
                setMessage('');

                showAlert("Danke für Ihre Nachricht, wir werden Sie bald kontaktieren!", "success");
            } else {
                showAlert("Failed to send message. Please try again later.", "danger");
            }
        } catch (error) {
            console.log(error.message);
            showAlert("An error occurred. Please try again later.", 'danger');
        } finally {
            setIsLoading(false);
        }
    };

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
                            type="tel"
                            name='Phone'
                            id='Phone'
                            value={Phone}
                            onChange={(e) => { setPhone(e.target.value) }}
                            placeholder='Telefonnummer'
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
                            placeholder='Firma'
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
                            placeholder='Thema'
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
                            placeholder='Nachricht'
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
                        <IoIosSend className='text-2xl' />
                        Nachricht senden
                    </button>
                </div>
            </div>

        </>
    )
}

export default ContactForm2