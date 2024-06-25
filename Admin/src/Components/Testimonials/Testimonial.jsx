import React from 'react';
import Rating from '@mui/material/Rating';



const Testimonial = ({
    author,
    position,
    company,
    content,
    title,
    rating,
    Image,
    id,
    SelectedId
}) => {

    return (

        <div className={` ${id == SelectedId && 'border-4 border-black'} p-2 md:py-6 md:px-10 w-[100%] mx-auto cursor-pointer bg-white rounded-xl shadow-md flex-col items-center hover:shadow-xl hover:shadow-gray-500 ease-in-out duration-300 `}>
            <div className="flex justify-between items-center">
                <div>
                    {console.log(rating)}
                    <Rating
                        name="read-only"
                        value={rating}
                        readOnly
                        className='my-5 text-xs'
                        sx={{
                            '& .MuiRating-iconFilled': {
                                color: '#ADFC32', // Custom color 
                            }
                        }}
                    />
                </div>
            </div>
            <div className='my-2 mx-2'>
                <h2 className="lg:text-4xl font-head text-base  font-bold text-primary">{title}</h2>
                <p className="text-gray-500 my-2 lg:text-lg text-base">{content}</p>
            </div>
            <div className='flex flex-row justify-start gap-2'>
                <img className="h-8 w-8 md:h-[50px] md:w-[50px] rounded-full" src={Image} />
                <div className='flex-col'>
                    <div className="sm:text-sm md:text-lg lg:text-xl text-xs font-medium text-primary">{author}</div>
                    <p className="sm:text-xs md:text-sm lg:text-lg font-Para text-xs text-gray-500">{position}@{company}</p>
                </div>
            </div>
        </div >
    );
};

export default Testimonial;
