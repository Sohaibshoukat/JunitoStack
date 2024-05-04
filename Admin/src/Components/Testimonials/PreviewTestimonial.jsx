import React from 'react';
import Rating from '@mui/material/Rating';



const PreviewTestimonial = ({
    author,
    position,
    company,
    content,
    title,
    rating,
    Image
}) => {
    return (
        <div className='bg-[url(/assets/bgImage.png)] lg:p-4 p-4 lg:m-4 m-2'>
            <div className='bg-white group  hover:shadow-2xl ease-in-out duration-300 shadow-lg w-[100%] py-2 px-4 md:py-4 md:px-6 m-auto'>
                <Rating
                    name="read-only"
                    value={rating}
                    readOnly
                    className='text-xs'
                    sx={{
                        '& .MuiRating-iconFilled': {
                            color: '#ADFC32', // Custom color 
                        }
                    }}
                />
                <h1 className='text-black group-hover:text-black ease-in-out duration-300 lg:text-3xl xl:text-4xl font-bold mb-3 font-head'>{title}</h1>
                <p className='text-black group-hover:text-black ease-in-out duration-300 text-base md:text-base mb-10'>{content}</p>
                <div className='flex flex-row gap-4'>
                    <img src={Image} alt="" className='w-[50px] h-[50px] md:w-[75px] md:h-[75px] rounded-[50%]' />
                    <div className='flex flex-col gap-0 text-black ease-in-out duration-300 group-hover:text-black justify-center'>
                        <h2 className='text-xl md:text-2xl font-bold font-head'>{author}</h2>
                        <h3 className='text-lg md:text-lg font-light'>{position} @{company}</h3>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PreviewTestimonial;
