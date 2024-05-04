import React from 'react';
import { CiCirclePlus } from "react-icons/ci";
import Rating from '@mui/material/Rating';

const EditForm = ({
    Title,
    setTitle,
 
    Category,
    setCategory,

    handleImageChange,
    FormHeading

  }) => {
  return  (
    <div className="container mx-auto p-2 md:p-4 text-black">
      <h2 className="text-2xl md:text-3xl lg:text-5xl tracking-wider font-bold font-head mb-4 ">{FormHeading}</h2>
      <form>
        <div className="mb-2">
          <label htmlFor="title" className="text-lg font-bold text-[#8A8A8A] ">
            Title:
          </label>
          <input
            type="text"
            value={Title}
            onChange={(e) => { setTitle(e.target.value) }}
            className={`py-3 px-4 rounded-lg w-full font-para mt-4 text-base md:text-xl border border-darkgray  text-black  hover:border-[#ADFC32]  duration-300 ease-in-out`}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="description" className="text-lg font-bold text-[#8A8A8A] ">
            Category:
          </label>
          <input
            type="text"
            placeholder='Category'
            value={Category}
            onChange={(e) => { setCategory(e.target.value) }}
            className={`py-3 px-4 rounded-lg w-full font-para mt-4 text-base md:text-xl border border-darkgray  text-black hover:border-[#ADFC32]  duration-300 ease-in-out`}
          />
        </div>

        <div className="mb-2">
          <label htmlFor="profile-image" className="text-lg font-bold text-[#8A8A8A]">
            Upload File For Design:
          </label>
          <div className="flex items-center mt-4">
            <input
              type="file"
              id="profile-image"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="profile-image"
              className=" flex items-center justify-center py-3 px-4 rounded-lg w-full font-para text-base md:text-lg border border-darkgray hover:border-[#ADFC32] text-black duration-300 ease-in-out cursor-pointer"
            >
              <CiCirclePlus className='mx-2 text-lg' />
              Import From Computer
            </label>
          </div>
        </div>



        <div className='mt-8 flex-col '>
          <div className='flex justify-center'>
            <button
              className={`w-full md:w-auto py-3 px-10 md:rounded-3xl mb-4 text-base md:text-xl bg-[#4DB678] hover:bg-[#2d6f49] text-white duration-300 ease-in-out`}
            >
              Create
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default EditForm
