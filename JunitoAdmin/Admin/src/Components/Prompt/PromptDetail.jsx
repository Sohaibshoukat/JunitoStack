import React from 'react'

const PromptDetail = ({ setActiveStep, handleChange, formData }) => {

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
                        Prompt Name
                    </label>
                    <input
                        type="text"
                        value={formData.Name}
                        onChange={(e) => { handleChange("Name", e.target.value) }}
                        placeholder='1-Klick Online Kurs Creator erstellt verkaufsfähige Inhalte'
                        className='border-2 border-gray font-normal bg-transparent py-2 px-4 rounded-xl'
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor=""
                        className='text-gray font-medium'
                    >
                        Kategory
                    </label>
                    <input
                        type="text"
                        value={formData.Category}
                        onChange={(e) => { handleChange("Category", e.target.value) }}
                        placeholder='1-Klick Online Kurs Creator erstellt verkaufsfähige Inhalte'
                        className='border-2 border-gray font-normal bg-transparent py-2 px-4 rounded-xl'
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor=""
                        className='text-gray font-medium'
                    >
                        Potential
                    </label>
                    <select
                        name=""
                        id=""
                        value={formData.Potential}
                        onChange={(e) => { handleChange("Potential", e.target.value) }}
                        className='border-2 border-gray font-normal bg-transparent py-2 px-4 rounded-xl'
                    >
                        <option value="Premium">Premium</option>
                        <option value="High">High</option>
                        <option value="Medium">Medium</option>
                        <option value="Low">Low</option>
                    </select>
                </div>
                <div className="flex flex-col gap-2">
                    <label
                        htmlFor=""
                        className='text-gray font-medium'
                    >
                        Type
                    </label>
                    <input
                        type="text"
                        value={formData.Type}
                        onChange={(e) => { handleChange("Type", e.target.value) }}
                        placeholder='1-Klick Online Kurs Creator erstellt verkaufsfähige Inhalte'
                        className='border-2 border-gray font-normal bg-transparent py-2 px-4 rounded-xl'
                    />
                </div>
            </div>
            <button
                onClick={() => {
                    console.log(formData)
                    if (formData.Name !== "" && formData.Category !== "" && formData.Potential !== "" && formData.Type !== "") {
                        setActiveStep(3)
                    }
                }}
                className='bg-gray rounded-xl py-2 px-4 border-2 my-4 border-gray text-white hover:bg-transparent hover:text-gray ease-in-out duration-300'
            >
                Next
            </button>
        </div>
    )
}

export default PromptDetail