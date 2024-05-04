import React from 'react'
const Card = ({ heading, price, buttonText }) => {
    return (
        <>
            <div class="flex flex-col items-start  p-14    pb-36 gap-5 bg-primary border rounded-lg shadow">
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
        </>
    )
}

export default Card
