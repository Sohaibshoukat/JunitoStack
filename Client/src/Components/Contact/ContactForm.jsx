import React, { useContext, useState } from 'react'
import { CAlert } from '@coreui/react'
import AlertContext from '../../Context/Alert/AlertContext'
import { BaseURL } from '../../Data/BaseURL'

const ContactForm = () => {

    const [Name, setName] = useState('')
    const [Email, setEmail] = useState('')
    const [Message, setMessage] = useState('')
    const [IsLoading, setIsLoading] = useState(false)


    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;


    const handleFormSubmit = async () => {
        setIsLoading(true);
        if (Name == "" || Email == "") {
            showAlert("Empty Fields Not Allowed", 'danger')
            setIsLoading(false); // Set loading state to true when form is submitted
            return;
        }
        try {
            const response = await fetch(`${BaseURL}/api/contact/sendcontactMail`, {
                method: 'POST',
                body: JSON.stringify({ Name, Email, Message }),
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            if (data.success) {
                setName('');
                setEmail('');
                setMessage('');

                showAlert("Danke für Ihre Nachricht, wir werden Sie bald kontaktieren!", "success")
                setIsLoading(false);
            }
            else {
                setIsLoading(false);
                showAlert(data.message, "success")
            }
        } catch (error) {
            console.log(error.message);
            showAlert(error.message, 'danger')
            setIsLoading(false);
        }
    }

    return (
        <>
            <div className={``}>
                <div className='border-b-2 pb-10 border-[#3A3A3A]  flex flex-col gap-4'>
                    <h2 className='font-mont text-gray font-bold text-xl md:text-2xl lg:text-3xl'>Kontaktieren Sie uns heute noch und erfahren Sie mehr über die Vorteile von BizBot für Ihr Business.                    </h2>
                    <p className='font-para text-xl text-slate-400 '>Bitte teilen Sie uns Ihre Wünsche mit.                    </p>
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

                        <label htmlFor="Name" className='text-gray font-para text-base font-bold'>Nachricht                        </label>
                        <textarea
                            cols="30"
                            name='Message'
                            id='Message'
                            value={Message}
                            onChange={(e) => { setMessage(e.target.value) }}
                            rows="5"
                            placeholder='Nachricht'
                            className='text-para text-black text-base outline-none md:text-lg font-para placeholder:text-gray-400 bg-light rounded-xl py-3 px-4 shadow-shadow2'
                        />
                    </div>
                    <button
                        className={`rounded-lg self-center mt-2 md:mt-4 w-full py-3 px-4  border-gray hover:text-gray bg-gray text-white  hover:bg-transparent text-base md:text-lg font-semibold font-para  border-2   ease-in-out duration-300`}
                        onClick={handleFormSubmit}
                        disabled={IsLoading}
                    >
                        {IsLoading ? "wird bearbeitet" : "Nachricht abschicken"}
                    </button>
                </div>
            </div>
        </>
    )
}

export default ContactForm