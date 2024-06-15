import React, { useState } from 'react';

const PromptAdd = ({ setActiveStep, handleChange, formData }) => {
    const [promptList, setPromptList] = useState(formData.PromptsList);

    const handlePromptChange = (index, newText) => {
        const updatedPromptList = [...promptList];
        updatedPromptList[index].value = newText;
        setPromptList(updatedPromptList);
        handleChange("PromptsList", updatedPromptList)
    };

    const handleAddPrompt = () => {
        setPromptList([...promptList, { value: '' }]);
    };

    return (
        <div className='flex flex-col gap-6'>
            <div className="flex flex-col pb-6 w-full gap-2 border-b-2 border-lightgray">
                <h2 className='font-subhead text-xl font-bold'>Prompt Detail</h2>
                <p>First please give prompts detail.</p>
            </div>
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor=""
                        className='text-gray font-medium'
                    >
                        Info
                    </label>
                    <input
                        type="text"
                        value={formData.Info}
                        onChange={(e) => { handleChange("Info", e.target.value) }}
                        placeholder='Starte deinen online Kurs mit dem Erstellen von Outlines und einer Groben Modul Struktur. Im'
                        className='border-2 border-gray font-normal bg-transparent py-2 px-4 rounded-xl'
                    />
                </div>
                {promptList.map((prompt, index) => (
                    <div className="flex flex-col gap-2" key={index}>
                        <label
                            htmlFor={`prompt-${index}`}
                            className='text-gray font-medium'
                        >
                            Prompt {index + 1}
                        </label>
                        <input
                            type="text"
                            id={`prompt-${index}`}
                            placeholder='Enter prompt...'
                            className='border-2 border-gray font-normal bg-transparent py-2 px-4 rounded-xl'
                            value={prompt.value}
                            onChange={(e) => handlePromptChange(index, e.target.value)}
                        />
                    </div>
                ))}
            </div>
            <button
                onClick={handleAddPrompt}
                className='bg-transparent rounded-xl font-semibold py-2 px-4 border-2 border-gray text-gray hover:bg-gray hover:text-white ease-in-out duration-300'
            >
                Add Prompt
            </button>
            <button
                onClick={() => {
                    if (promptList?.length > 0 && formData.Info !== "") {
                        setActiveStep(4)
                    }
                }}
                className='bg-gray rounded-xl py-2 px-4 border-2 my-4 border-gray text-white hover:bg-transparent hover:text-gray ease-in-out duration-300'
            >
                Next
            </button>
        </div>
    );
};

export default PromptAdd;
