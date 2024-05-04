import React from 'react'

const PreviewForm = ({
    Title,
    Category,
    Image
}) => {
    return (
        <div className='bg-[url(/assets/bgImage.png)] lg:p-4 p-4 lg:m-4 m-2'>

            <div className='rounded-md  bg-white lg:block flex-col font-Para mx-2 '>
                <img className='rounded-t-md object-contain w-[100%] h-[100%]' src={Image} />
                <div className='flex flex-col p-4'>
                    <h1 className="text-sm sm:text-base md:text-lg font-medium mx-2 text-primary mb-1 w-[80%] uppercase">{Category}</h1>
                    <div className=' text-sm sm:text-base md:text-xl  font-bold  my-1 ' >{Title}</div>
                    
                </div>
            </div>

        </div>
    )
}

export default PreviewForm
