import React, { useContext, useEffect, useState } from 'react';
import { BaseURL } from '../../../Data/BaseURL';
import AlertContext from '../../../Context/Alert/AlertContext';

const Company = () => {
    const [formData, setFormData] = useState({
        CompanyName: '',
        Address: '',
        ContactEmail: '',
        CollectiveAgreement: '',
        CompanyDescription: '',
        NumEmployee: '',
        CompanySell: '',
        Customers: '',
        Structure: '',
        DailyOperation: '',
        Rules: '',
        Communication: '',
        Questions: '',
        Feedback: ''
    });

    const [isAccess, setisAccess] = useState(null)
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/user/getcompany`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
            });

            const result = await response.json();

            if (result.success) {
                setisAccess(true)
                const companyData = result.company;
                setFormData({
                    CompanyName: companyData.CompanyName || '',
                    Address: companyData.Address || '',
                    ContactEmail: companyData.ContactEmail || '',
                    CollectiveAgreement: companyData.CollectiveAgreement || '',
                    CompanyDescription: companyData.CompanyMoto || '',
                    NumEmployee: companyData.NumEmployee || '',
                    CompanySell: companyData.CompanySell || '',
                    Customers: companyData.Customers || '',
                    Structure: companyData.Struture || '',
                    DailyOperation: companyData.dailyoperation || '',
                    Rules: companyData.rules || '',
                    Communication: companyData.communication || '',
                    Questions: companyData.questions || '',
                    Feedback: companyData.feedback || ''
                });
            } else {
                setisAccess(false)
                showAlert('Failed to fetch Company Data', 'danger');
            }
        } catch (error) {
            showAlert('An error occurred while fetching Company data', 'danger');
        }
    };



    useEffect(() => {
        fetchUserData();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/user/updatecompany`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': localStorage.getItem('auth-token')
                },
                body: JSON.stringify(formData)
            });

            const result = await response.json();

            if (result.success) {
                showAlert('Company data updated successfully', 'success');
            } else {
                showAlert('Failed to update Company data', 'danger');
            }
        } catch (error) {
            showAlert('An error occurred while updating Company data', 'danger');
        }
    };

    return (
        <>
            {isAccess == true ? <div className='flex flex-col gap-4 py-6'>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>Name of Your Company</p>
                    <input
                        name='CompanyName'
                        value={formData.CompanyName}
                        placeholder='Enter Name of Your Company'
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>Company Address</p>
                    <input
                        name='Address'
                        value={formData.Address}
                        placeholder='Enter Company Address'
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>Contact Email Address</p>
                    <input
                        name='ContactEmail'
                        value={formData.ContactEmail}
                        placeholder='Enter Contact Email Address'
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>Applicable Collective Agreement/Contract (if known)</p>
                    <input
                        name='CollectiveAgreement'
                        value={formData.CollectiveAgreement}
                        placeholder='Enter Applicable Collective Agreement/Contract'
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>What does your company do? (e.g., sell sports equipment, offer cleaning services)</p>
                    <input
                        name='CompanyDescription'
                        value={formData.CompanyDescription}
                        placeholder='Enter What Your Company Does'
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>How many people work for you?</p>
                    <input
                        name='NumEmployee'
                        value={formData.NumEmployee}
                        placeholder='Enter Number of Employees'
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>Briefly describe what your company sells or what services it offers</p>
                    <input
                        name='CompanySell'
                        value={formData.CompanySell}
                        placeholder='Enter Description of Company Products/Services'
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>Who buys your products/services? (e.g., families, other businesses)</p>
                    <input
                        name='Customers'
                        value={formData.Customers}
                        placeholder='Enter Customer Types'
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>How is your company structured? (e.g., are there different teams or departments? Who does what?)</p>
                    <input
                        name='Structure'
                        value={formData.Structure}
                        placeholder='Enter Company Structure'
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>What do your daily operations look like? Are there specific programs or tools you use?</p>
                    <input
                        name='DailyOperation'
                        value={formData.DailyOperation}
                        placeholder='Enter Daily Operations Details'
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>Are there specific laws or rules your company must follow?</p>
                    <input
                        name='Rules'
                        value={formData.Rules}
                        placeholder='Enter Applicable Laws/Rules'
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>How do you typically communicate with your customers? (e.g., email, phone, social networks)</p>
                    <input
                        name='Communication'
                        value={formData.Communication}
                        placeholder='Enter Communication Methods'
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>Are there questions that your customers ask very often?</p>
                    <input
                        name='Questions'
                        value={formData.Questions}
                        placeholder='Enter Frequently Asked Questions'
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>
                <div className="flex flex-col gap-1 font-Para basis-[50%]">
                    <p className='text-sm text-darkestgray'>How do you collect feedback from your customers? Is there a way you prefer to talk to customers that you find particularly effective?</p>
                    <input
                        name='Feedback'
                        value={formData.Feedback}
                        placeholder='Enter Feedback Collection Methods'
                        onChange={handleChange}
                        className='bg-[#EDF2F6] py-2 px-4 rounded-lg font-Para'
                    />
                </div>

                <div className="flex gap-4 w-fit items-center">
                    <div
                        onClick={handleSubmit}
                        className="cursor-pointer bg-black text-white border-2 border-black rounded-lg py-2 px-4 font-Para hover:bg-transparent hover:text-black ease-in-out duration-300"
                    >
                        Submit
                    </div>
                </div>
            </div> : isAccess == false ?
                <h2 className='font-para text-lg font-semibold'>You have no access to this data</h2>
                : <p className='text-lg font-para font-semibold'>Loading...</p>}
        </>
    );
}

export default Company;
