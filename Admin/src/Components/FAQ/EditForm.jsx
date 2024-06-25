import React, { useContext, useEffect, useState } from 'react';
import { FAQData } from '../../Data/FAQdata';
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';

const EditForm = ({
    setEditBTN,
    EditBTN,
    editID,
    fetchFAQs,
    seteditID,
}) => {

    const alertcontext = useContext(AlertContext);
    const { showAlert } = alertcontext

    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const fetchFAQ = async (editID) => {
        try {
            const response = await fetch(`${BaseURL}/getFAQ/${editID}`, {
                headers: {
                    "AdminBizzToken": sessionStorage.getItem('AdminBizzToken')
                }
            });
            const data = await response.json();
            if (!data.success) {
                showAlert(data.message, 'danger');
            }
            setQuestion(data.faq.Question);
            setAnswer(data.faq.Answer);
        } catch (error) {
            showAlert(error.message, 'danger');
            // Handle error
        }
    };
  
    useEffect(() => {
        if(EditBTN){
            fetchFAQ(editID);
        }
    }, [EditBTN,editID]);

    const handleAddQuestion = async () => {
        try {
            const response = await fetch(`${BaseURL}/updateFAQ/${editID}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    "AdminBizzToken": sessionStorage.getItem('AdminBizzToken')
                },
                body: JSON.stringify({ Question: question, Answer: answer })
            });
            const data = await response.json();
            if (response.ok) {
                // Handle success
                fetchFAQs()
                showAlert('FAQ created successfully','success');
                setQuestion('')
                setAnswer('')
                setEditBTN(false)
            } else {
                // Handle error
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    return (
        <>
            <div className={`flex flex-col justify-center items-center rounded-md`} style={{ boxShadow: "1px 1px 7.800000190734863px 0px #00000040" }}>

                <div className={`w-full m-auto rounded-lg relative bg-transparent text-black shadow-xl p-5 md:p-10`}>

                    <div className='flex flex-col justify-between mb-6 md:mb-2'>
                        <h2 className={`text-xl md:text-2xl font-Para text-gray`}>Edit FAQ Question</h2>
                    </div>

                    <div className='flex flex-col md:flex-row justify-between mb-7 md:mb-4 gap-2 md:gap-16'>
                        <div className='flex flex-col w-full gap-2'>
                            <h2 className='font-Para text-xs sm:text-sm md:text-base text-gray font-semibold'>Question:</h2>
                            <input 
                                type="text" 
                                name="question" 
                                id="question" 
                                placeholder='Write Your Question Here....'
                                className='border-2 border-gray rounded-md p-1' 
                                value={question} 
                                onChange={(e) => { setQuestion(e.target.value) }} />
                        </div>
                        <div className='flex flex-col w-full gap-2'>
                            <h2 className='font-Para text-xs sm:text-sm md:text-base text-gray font-semibold'>Answer:</h2>
                            <input 
                                type="text" 
                                name="answer" 
                                id="answer" 
                                placeholder='Write Your Answer Here....'
                                className='border-2 border-gray rounded-md p-1'  
                                value={answer} 
                                onChange={(e) => { setAnswer(e.target.value) }} 
                            />
                        </div>
                    </div>

                    <button
                        className={`py-2 px-4  rounded-lg w-full font-Para  text-xs sm:text-sm md:text-base font-bold border-2 border-gray bg-gray text-white  hover:bg-transparent hover:text-gray ease-in-out duration-300 `}
                        onClick={handleAddQuestion}
                    >
                        Edit Question
                    </button>

                </div>
            </div>
        </>
    )
}

export default EditForm;
