import React from 'react'

const Form = ({  image, IDSelected, IDindex }) => {
  return (
    <div
      className={` w-[100%] p-2 md:p-4 mx-auto mt-2 mb-6 hover:scale-95 rounded-md ease-in-out duration-300 ${IDSelected === IDindex && "border-4 border-black "} `}
      
    >

        <img className='rounded-md object-contain w-[100%] h-[100%]' src={image} />



    </div>
  )
}

export default Form
