import React from 'react'


const Card = ({ cardData }) => {

    return (
        <>
            <div
                className="w-full max-w-sm bg-primary group py-6 px-4 rounded-md shadow-black shadow-md relative cursor-pointer"
            >
                <div className="flex flex-col items-center pb-2">
                    <img
                        className="w-[75px] h-[75px] mb-3 rounded-full "
                        src="./Images/mailchimp.png"
                        alt="Image"
                    />
                </div>
                <div>
                    <h5 className="mb-2 text-3xl md:text-4xl font-bold  text-white text-center uppercase font-head">
                        {cardData.title}
                    </h5>
                    <p className="mb-3 font-para text-base md:text-lg font-normal text-white text-center">
                        {cardData.description}
                    </p>
                    <div className="text-center mt-8">
                        <button className="inline-flex md:opacity-0 group-hover:opacity-100 items-center px-6 py-2 text-xl font-Para font-bold text-center text-primary bg-white rounded-md hover:bg-accence hover:text-primary duration-300 ease-in-out">
                            Read More
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Card
