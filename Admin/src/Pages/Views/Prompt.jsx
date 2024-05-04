import React, { useState } from 'react';
import BusinessArea from '../../Components/Prompt/BusinessArea';
import PromptDetail from '../../Components/Prompt/PromptDetail';
import PromptAdd from '../../Components/Prompt/PromptAdd';
import PromptTip from '../../Components/Prompt/PromptTip';

const Prompt = () => {
    const [activeStep, setActiveStep] = useState(0);

    const [formData, setformData] = useState({
        Department:"", 
        Name:"", 
        Category:"", 
        Potential:"", 
        Type:"", 
        Info:"", 
        PromptsList:[], 
        TipsList:[]
    })

    const handleChange = (name, value) => {
        setformData({
            ...formData,
            [name]: value,
        });
    };

    


    return (
        <>
            <div className={`flex font-Para flex-col justify-center items-center rounded-md m-5 md:m-10 `}>
                <div className="bg-white w-[95%] md:w-[90%] xl:w-[80%] py-6 px-4 md:px-6 m-auto" style={{ boxShadow: "1px 1px 7.800000190734863px 0px #00000040" }}>
                    <div className="py-6 flex flex-r">
                        <ol class="flex items-center w-full">
                            <li class={`flex w-full items-center ${activeStep >= 1 ? "text-white after:border-gray":"after:border-[#EFF0F6]"} after:content-[''] after:w-full after:h-1 after:border-b  after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700`}>
                                <span class={`flex items-center font-semibold justify-center w-10 h-10 ${activeStep >= 0 && "dark:bg-gray bg-gray"}  rounded-full lg:h-12 lg:w-12  shrink-0`}>
                                    <h2>1</h2>
                                </span>
                            </li>
                            <li class={`flex w-full items-center after:content-[''] ${activeStep >= 2 ? "text-white after:border-gray":"after:border-[#EFF0F6]"} after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700`}>
                                <span class={`flex items-center justify-center w-10 ${activeStep >= 2 ? "dark:bg-gray bg-gray" : "bg-[#EFF0F6] text-gray"} h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0`}>
                                    <h2>2</h2>
                                </span>
                            </li>
                            <li class={`flex w-full items-center after:content-[''] ${activeStep >= 3 ? "text-white after:border-gray":"after:border-[#EFF0F6]"} after:w-full after:h-1 after:border-b after:border-gray-100 after:border-4 after:inline-block dark:after:border-gray-700`}>
                                <span class={`flex items-center justify-center w-10 ${activeStep >= 3 ? "dark:bg-gray bg-gray" : "bg-[#EFF0F6] text-gray"} h-10 bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0`}>
                                    <h2>3</h2>
                                </span>
                            </li>
                            <li class={`flex items-center w-full ${activeStep >= 4 && "text-white"}`}>
                                <span class={`flex items-center justify-center w-10 h-10 ${activeStep >= 4? "dark:bg-gray bg-gray" : "bg-[#EFF0F6] text-gray"} bg-gray-100 rounded-full lg:h-12 lg:w-12 dark:bg-gray-700 shrink-0`}>
                                    <h2>4</h2>
                                </span>
                            </li>
                        </ol>

                    </div>
                    <div className="py-6">
                        {activeStep == 2 ?
                            <PromptDetail setActiveStep={setActiveStep} handleChange={handleChange} formData={formData} />
                            : activeStep == 3 ?
                                <PromptAdd setActiveStep={setActiveStep} handleChange={handleChange} formData={formData} />
                                : activeStep == 4 ?
                                    <PromptTip setActiveStep={setActiveStep} handleChange={handleChange}  formData={formData} setformData={setformData}/>
                                    :
                                    <BusinessArea setActiveStep={setActiveStep} handleChange={handleChange} formData={formData} />
                        }
                    </div>
                </div>
            </div>
        </>
    );
}

export default Prompt;