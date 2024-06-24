import React from 'react'
import { FiChevronDown } from 'react-icons/fi';
import { IoSearch } from 'react-icons/io5';
import { UserDataList } from '../../Data/UserData';

const BlockUserData = () => {
  return (
    <>
      <div className="flex flex-col gap-2 md:gap-4">
        <div className='flex flex-row gap-2 md:gap-4 lg:gap-10 font-Para bg-white rounded-xl text-sm md:text-lg shadow-2xl'>
          <select name="" id="" className='w-[40%] md:w-auto md:basis-[5%] lg:basis-[15%] active:outline-none rounded-xl py-4 px-2 lg:px-6'>
            <option value="">Add Filter</option>
            <option value="Basic">Basic Plan</option>
            <option value="Advance">Advance Plan</option>
            <option value="Pro">Pro Plan</option>
          </select>
          <div className='relative flex rounded-xl flex-row gap-4 items-center  bg-white basis[85%] w-[100%]'>
            <IoSearch className='' />
            <input type="text" placeholder='Search' className='py-4 rounded-xl active:outline-none w-[100%] outline-none' />
          </div>
        </div>

        <div className="my-2 md:my-4 w-[100%] overflow-x-scroll font-Para">
          <table className='styled-table w-[100%] text-sm md:text-base'>
            <thead>
              <tr>
                <th>Name</th>
                <th>ID</th>
                <th>Email</th>
                <th>Gender</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody className=''>
              {UserDataList.map((item, index) => (
                <tr
                  key={index}
                  className={`p-10 hover:bg-black hover:text-white ease-in-out duration-300`}
                >
                  <td className='flex gap-2'>
                    <img src={'../assets/user.png'} alt="" className='w-[25px] h-[25px] rounded-lg' />
                    <h3>{item.Name}</h3>
                  </td>
                  <td>{item.ID}</td>
                  <td>{item.Email}</td>
                  <td>{item.Gender}</td>
                  <td>
                    <button className='bg-red-400 rounded-lg py-2 px-4 text-white font-semibold'>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </>
  )
}

export default BlockUserData