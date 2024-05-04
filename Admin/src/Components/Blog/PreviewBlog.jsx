import React from 'react';

const PreviewBlog = ({
    Title,
    Date,
    Image
}) => {
    return (
        <div className='bg-[url(/assets/bgImage.png)] lg:p-4 p-4 lg:m-4 m-2'>

            <div className='rounded-md  bg-white lg:block flex-col font-Para mx-2 '>
                <img className='rounded-t-md object-contain w-[100%] h-[100%]' src={Image} />
                <div className='flex flex-col p-4'>
                    <h1 className="text-sm sm:text-base md:text-lg font-medium mx-2 text-primary mb-1 w-[80%] uppercase">{Date}</h1>
                    <div className=' text-sm sm:text-base md:text-xl  font-bold  my-1 ' >{Title}</div>
                    <div className='flex justify-center'>
                        <div className='bg-black text-center text-secondary w-40 py-2 px-4 rounded-md lg:text-lg text-sm my-1 hover:bg-gray-800 mt-2'>Read me</div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PreviewBlog
