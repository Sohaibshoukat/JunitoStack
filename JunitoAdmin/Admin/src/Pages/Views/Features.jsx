import React from 'react';
import { FeaturesData } from '../../Data/FeaturesData.js';

const Features = () => {
  return (
    <>
      <div className='mx-8 my-10'>
        {FeaturesData.map((item, index) => (
          <div className='  rounded-md my-4 py-2 px-5 ' style={{ boxShadow: "1px 1px 7.800000190734863px 0px #00000040" }} key={index}>
            <ul className='list-disc'>
              <li className='mx-4 sm:mx-14 font-Para text-base font-semibold'>{item.Name}</li>
            </ul>
          </div>
        ))}
      </div>
    </>
  );
};

export default Features;
