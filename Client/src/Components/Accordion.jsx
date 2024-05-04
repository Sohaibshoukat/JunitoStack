import React, { useState } from 'react';
import { faq } from "../Data/FAQ";
import { FaMinus, FaPlus } from 'react-icons/fa';

const Accordion = () => {

  const [currenttab, setcurrenttab] = useState(null)


  return (
    <div className="h-96 overflow-y-auto flex flex-col gap-y-4 px-3 md:px-6 py-4">
      {faq.map((item, index) => (
        <div
          className={`
             flex flex-col gap-5 ${currenttab==index?'bg-black text-accence' :'bg-white text-black'}
             py-4 px-4 md:py-4 md:px-8 lg:py-6 lg:px-8 rounded-lg cursor-pointer 
             ease-in-out duration-300
          `}
          style={{boxShadow: "1px 1px 23.799999237060547px -3px #00000040"}}
          key={index}
        >
          <div
            className={`text-left flex flex-row  justify-between items-center text-base md:text-xl xl:text-2xl font-semibold`}
            onClick={() => {
              if (currenttab === index) {
                setcurrenttab(null);
              } else {
                setcurrenttab(index);
              }
            }}
          >
            <div className='flex gap-x-4 items-center'>
              <h1 className='font-indexs text-2xl md:text-3xl font-bold'>{index + 1}</h1>
              <h2 className='font-Para text-lg md:text-2xl font-normal'>{item.heading}</h2>
            </div>
            {currenttab !== index ? <FaPlus /> : <FaMinus />}
          </div>
          <div className={`${currenttab !== index ? 'hidden':'block'} text-base md:text-xl font-Para text-white text-justify font-normal lg:pt-2 xl:pt-4 px-2 md:px-4 ease-in-out duration-300`}>
            {currenttab === index && <p>
              {item.content}
            </p>}
          </div>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
