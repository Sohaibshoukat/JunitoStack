import React, { useState, useEffect, useContext } from 'react';
import { HiQuestionMarkCircle } from 'react-icons/hi';
import { BaseURL } from '../../../Data/BaseURL';
import AlertContext from '../../../Context/Alert/AlertContext';

const FAQ = () => {
    const [faqData, setFaqData] = useState([]);

    const AletContext = useContext(AlertContext);
    const { showAlert } = AletContext;

    useEffect(() => {
        fetchFAQs();
    }, []);

    const fetchFAQs = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/company/faq`);
            if (!response.ok) {
                showAlert('Failed to fetch FAQs','danger');
            }
            const data = await response.json();
            if(!data.success){
                showAlert(data.message,'danger');
                return;
            }
            setFaqData(data.FAQ);
        } catch (error) {
            showAlert(error.message,'danger');
        }
    };

    const [currentTab, setCurrentTab] = useState(null);

    return (
        <div className="flex flex-col px-3 md:px-6 py-4">
            {faqData.map((item, index) => (
                <div
                    className={`
                        flex flex-col ${currentTab === index ? 'bg-gray text-white' : 'bg-white text-gray'}
                        rounded-md my-2 py-2 px-5 cursor-pointer 
                        ease-in-out duration-300 
                    `}
                    style={{ boxShadow: '1px 1px 7.800000190734863px 0px #00000040' }}
                    key={index}
                >
                    <div
                        className="text-left flex flex-row justify-between items-center text-base md:text-xl xl:text-2xl font-semibold"
                        onClick={() => {
                            setCurrentTab(currentTab === index ? null : index);
                        }}
                    >
                        <div className="flex gap-x-4 items-center">
                            <HiQuestionMarkCircle />
                            <h2 className="font-Para text-xs sm:text-sm md:text-lg font-semibold">
                                {item.Question}
                            </h2>
                        </div>
                    </div>
                    <div className={`${currentTab !== index ? 'hidden' : 'block'} text-xs sm:text-sm md:text-lg font-Para text-white text-justify font-normal pt-2 xl:pt-4 px-2 md:px-4 ease-in-out duration-300`}>
                        {currentTab === index && <p>{item.Answer}</p>}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default FAQ;
