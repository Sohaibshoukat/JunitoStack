import React from 'react'
import { IoMdClose } from 'react-icons/io'

const PromptDesc = ({Model, setModel}) => {
    return (
        <div>
            {Model &&
                <div className='fixed z-[9999999999] w-[100vw] h-[100vh] flex flex-col justify-center items-center'>
                    <div className="bg-black/50 w-[100vw] h-[100vh] absolute z-30" onC5lick={() => { setModel(false) }}></div>
                    <div className='bg-white rounded-2xl py-3 px-2 md:px-4 w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] relative z-30 m-auto max-h-[60%]'>
                        <div className='flex flex-col justify-end items-end mb-5'>
                            <IoMdClose className='text-gray text-4xl' onClick={() => { setModel(false) }} />
                        </div>
                        <div className="flex flex-col gap-4 max-h-[70%] overflow-y-scroll">
                            <div className="flex flex-col gap-2 md:gap-4">
                                <h2 className='text-gray font-para text-lg md:text-xl font-bold'>Question</h2>
                                <p className='ml-2 text-gray text-base font-semibold font-para'>Klick Online Kurs Creator erstellt verkaufsfähige Inhalte</p>
                            </div>
                            <div className="flex flex-col gap-2 md:gap-4">
                                <h2 className='text-gray font-para text-lg md:text-xl font-bold'>Answer</h2>
                                <p className='ml-2 text-gray text-sm font- font-para'>Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet. Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet. Lorem ipsum dolor sit amet consectetur. Adipiscing urna consectetur at et purus amet.  </p>
                            </div>
                        </div>
                        <div className="flex flex-row gap-4 justify-end">
                            <button
                                className='hover:bg-gray py-2 px-4 rounded-lg border-2 border-gray mt-4 hover:text-white bg-transparent text-gray font-para ease-in-out duration-300 self-end float-right'
                                onClick={() => { setModel(false) }}
                            >
                                Skip
                            </button>
                            <button className='bg-gray py-2 px-4 rounded-lg border-2 border-gray mt-4 text-white hover:bg-transparent hover:text-gray font-para ease-in-out duration-300 self-end float-right'>Continue</button>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}

export default PromptDesc