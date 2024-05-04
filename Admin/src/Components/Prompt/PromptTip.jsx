import React, { useContext, useState } from 'react';
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';

const PromptTip = ({ setActiveStep, handleChange, formData,setformData }) => {
    const [tipList, setTipList] = useState([{ value: '' }]);

    const alertcontext = useContext(AlertContext);
    const { showAlert } = alertcontext

    const handleTipChange = (index, newText) => {
        const updatedTipList = [...tipList];
        updatedTipList[index].value = newText;
        setTipList(updatedTipList);
        handleChange("TipsList", updatedTipList)
    };

    const handleAddTip = () => {
        setTipList([...tipList, { value: '' }]);
    };

    const handleSubmit = async () => {
        try {
            const response = await fetch(`${BaseURL}/createPrompt`, {
                method: 'POST',
                headers: {
                    "AdminBizzToken": sessionStorage.getItem('AdminBizzToken'),
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            if (data.success) {
                showAlert("Prompt Created Success", "success");
                setformData({
                    Department: "",
                    Name: "",
                    Category: "",
                    Potential: "",
                    Type: "",
                    Info: "",
                    PromptsList: [],
                    TipsList: []
                })
                setActiveStep(1)
            } else {
                showAlert(data.message, "danger");
            }
        } catch (error) {
            showAlert(error.message, "danger");
        }
    };

    return (
        <div className='flex flex-col gap-6'>
            <div className="flex flex-col pb-6 w-full gap-2 border-b-2 border-lightgray">
                <h2 className='font-subhead text-xl font-bold'>Prompt Detail</h2>
                <p>First please give prompts detail.</p>
            </div>
            <div className="flex flex-col gap-4">
                {tipList.map((tip, index) => (
                    <div className="flex flex-col gap-2" key={index}>
                        <label
                            htmlFor={`tip-${index}`}
                            className='text-gray font-medium'
                        >
                            Tip {index + 1}
                        </label>
                        <input
                            type="text"
                            id={`tip-${index}`}
                            placeholder='Enter tip...'
                            className='border-2 border-gray font-normal bg-transparent py-2 px-4 rounded-xl'
                            value={tip.value}
                            onChange={(e) => handleTipChange(index, e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={handleAddTip}
                className='bg-transparent rounded-xl font-semibold py-2 px-4 border-2 border-gray text-gray hover:bg-gray hover:text-white ease-in-out duration-300'
            >
                Add Tip
            </button>
            <button
                onClick={handleSubmit}
                className='bg-gray rounded-xl py-2 px-4 border-2 my-4 border-gray text-white hover:bg-transparent hover:text-gray ease-in-out duration-300'
            >
                Submit
            </button>
        </div>
    );
};

export default PromptTip;
