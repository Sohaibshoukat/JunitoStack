import React from 'react';

const Blog = ({ title, date, image, IDSelected, IDindex }) => {
  return (

    <div
      className={`bg-white flex lg:flex-row flex-col w-[100%] p-2 md:p-4 mx-auto mt-2 mb-6 lg:items-center hover:scale-95 rounded-md ease-in-out duration-300 ${IDSelected && "border-4 border-black "} `}
      style={{
        boxShadow: '1px 0px 27.299999237060547px -3px rgba(0, 0, 0, 0.4)',
        transition: 'box-shadow 0.3s ease-in-out',
      }}
    >

      <div className='basis-[35%]'>
        <img className='rounded-md object-contain w-[100%] h-[100%]' src={image} />
      </div>


      <div className=' hidden lg:block flex-col font-Para mx-2 basis-[80%]'>
        <h1 className="text-2xl font-bold mx-2 text-primary mb-10 w-[80%] uppercase">{title}</h1>
        <div className='flex justify-between mx-2 pr-8'>
          <div className='text-xl font-medium  my-1 '>{date}</div>
          <div className='bg-black text-center text-secondary w-40 py-2 px-4 rounded-md lg:text-lg text-sm my-1 hover:bg-gray-800'>Read me</div>
        </div>
      </div>

      <div className='flex-col gap-4 font-Para sm:block md:block lg:hidden xl:hidden mt-2'>
        <div className=' text-sm md:text-lg my-1'>{date}</div>
        <h1 className="text-sm md:text-lg font-bold text-primary uppercase">{title}</h1>
        <div className='flex justify-end '>
          <div className='bg-black text-center text-secondary w-20 md:w-28 py-2 px-2 rounded-md lg:text-lg text-sm mt-2 hover:bg-gray-800'>Read me</div>
        </div>
      </div>

    </div>



  );
};

export default Blog;
