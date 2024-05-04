import React, { useState } from 'react';
import { IoMdPricetags } from "react-icons/io";

const ToggleButton = () => {
  const [selected, setSelected] = useState(true);

  const toggleSelected = () => {
    setSelected(!selected);
  };

  return (
    <div className="relative w-full font-Heading mt-4 rounded-md  h-10 p-1 bg-primary md:w-[70%]">
      <div className="relative w-full h-full flex items-center">
        <div onClick={toggleSelected} className="w-full z-10 flex justify-center font-Heading text-darkgray cursor-pointer">
          <button><h1 className='font-bold text-lg'>Monthly</h1></button>
        </div>
        <div onClick={toggleSelected} className="flex-row w-full z-20 flex justify-center items-center font-Heading text-darkgray cursor-pointer">
          <button><h1 className='font-bold text-lg'>Yearly</h1>  </button><IoMdPricetags className="text-accence"/> <p>Get 1 Month Free</p>
        </div>
      </div>

      <span className={`bg-white shadow z-0 text-sm flex items-center justify-center w-1/2 rounded h-[1.88rem] transition-all duration-150 ease-linear top-[4px] absolute ${ selected ? 'left-1  ' : 'left-1/2 -ml-1 t'}`}>
      </span>
    </div>
  );
};

export default ToggleButton;
