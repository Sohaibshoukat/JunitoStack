import React from 'react'

const Cards = ({ cardData, SelectedID, IDIndex }) => {
    
  return (
    <>
            <div
                className={`bg-black w-full max-w-sm bg-primary group py-6 px-4 rounded-md shadow-black shadow-md relative cursor-pointer border group-hover:text-black border-black hover:bg-white ease-in-out duration-300 ${SelectedID === IDIndex && " border-4 border-[#ADFC32]"} `}
            >
                <div className="flex flex-col items-center pb-2">
                    <img
                        className="w-[75px] h-[75px] mb-3 rounded-full "
                        src={cardData.Image}
                        alt="Image"
                    />
                </div>
                <div>
                    <h5 className={`mb-2 text-3xl md:text-4xl font-bold  group-hover:text-black ease-in-out duration-300 text-white text-center uppercase font-head  ${SelectedID === IDIndex && "text-black"} `}>
                        {cardData.Title}
                    </h5>
                    <p className={`mb-3 font-para text-base md:text-lg font-normal group-hover:text-black ease-in-out duration-300 text-white text-center  ${SelectedID === IDIndex && "text-black "} `}>
                        {cardData.Description}
                    </p>
               
                </div>
            </div>
        </>
  )
}

export default Cards
