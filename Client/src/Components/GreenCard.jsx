import React from 'react'

const GreenCard = ({ heading, price, buttonText }) => {
    return (
        <>
            <div class="flex flex-col  items-center  px-5 pb-5   bg-accence  rounded-lg ">
                <h1 className='py-4 text-2xl font-bold text-gray-900 md:text-2xl lg:text-3xl dark:text-primary'>Most Popular</h1>
                <div class="flex flex-col items-start  p-14 gap-5 bg-primary border rounded-lg shadow">
                    <h1 class="mb-4 text-2xl font-bold text-gray-900 md:text-2xl lg:text-4xl dark:text-white">{heading}</h1>

                    <div>
                        <span class="text-2xl font-bold  text-accence md:text-2xl lg:text-4xl">{price}</span>
                        <span class="ms-1 text-xl font-normal text-accence ">/monthly</span>
                    </div>

                    <div>
                        <button type="button" class="text-white bg-primary border-white border-2 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-lg px-5 py-2.5 me-2 mb-2 ">{buttonText}</button>
                    </div>

                    <div className="text-white">
                        <p>✓ 1 Questionaire</p>
                        <p>✓ Basic designs</p>
                        <p>✓ Basic designs</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GreenCard
