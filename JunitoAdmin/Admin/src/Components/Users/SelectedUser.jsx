import React, { useEffect, useState } from 'react'
import { UserDataList } from '../../Data/UserData'
import { IoMdMail } from 'react-icons/io'

const SelectedUser = ({ selectedItem, setselectedItem }) => {
  const [userSelected, setuserSelected] = useState(null)
  useEffect(() => {
    UserDataList.map((item, index) => {
      if (selectedItem == index) {
        setuserSelected(item)
      }
    })
  }, [selectedItem, setselectedItem])

  return (
    <div className='relative'>
      <div className='w-[100%] h-[100%] flex flex-col justify-center items-center font-Para gap-2 mb-4'>
        <h2>{userSelected?.ID}</h2>
        <img src={'../assets/user2.png'} alt="" className='w-[200px] h-[200px] rounded-full' />
        <h1>{userSelected?.Name}</h1>
        <a href={`mailto:${userSelected?.Email}`} className='bg-gray-300 p-2 rounded-xl'>
          <IoMdMail className='text-2xl text-gray-100' />
        </a>
      </div>
      <div className='grid grid-cols-2 gap-2 justify-between font-Para mb-8'>
        <div className='flex flex-col gap-1'>
          <h2 className='text-black font-semibold text-lg'>Plan</h2>
          <p className='pl-2 text-gray-500 text-base font-light'>{userSelected?.Plan}</p>
        </div>
        <div className='flex flex-col gap-1'>
          <h2 className='text-black font-semibold text-lg'>Last Payment</h2>
          <p className='pl-2 text-gray-500 text-base font-light'>Feb 10,2024</p>
        </div>
        <div className='flex flex-col gap-1'>
          <h2 className='text-black font-semibold text-lg'>Plan Expiry</h2>
          <p className='pl-2 text-gray-500 text-base font-light'>March 10,2024</p>
        </div>
        <div className='flex flex-col gap-1'>
          <h2 className='text-black font-semibold text-lg'>Amount</h2>
          <p className='pl-2 text-gray-500 text-base font-light'>$30</p>
        </div>
        <div className='flex flex-col gap-1'>
          <h2 className='text-black font-semibold text-lg'>Age</h2>
          <p className='pl-2 text-gray-500 text-base font-light'>17</p>
        </div>
        <div className='flex flex-col gap-1'>
          <h2 className='text-black font-semibold text-lg'>Gender</h2>
          <p className='pl-2 text-gray-500 text-base font-light'>{userSelected?.Gender}</p>
        </div>
      </div>

      <div className='flex flex-col font-Para gap-3'>
        <h2 className='text-black font-semibold text-lg'>People from the same class</h2>
        <div className='flex flex-row items-center gap-3'>
          <div className="flex flex-row gap-0">
            <img src="../assets/1.png" alt="" className='w-[45px] h-[45px]'/>
            <img src="../assets/2.png" alt="" className='w-[45px] h-[45px] -ml-4' />
            <img src="../assets/3.png" alt="" className='w-[45px] h-[45px] -ml-4' />
            <img src="../assets/2.png" alt="" className='w-[45px] h-[45px] -ml-4' />
          </div>
          <h3 className='font-Para text-lg text-[#73B0E2]'>+12 more</h3>
        </div>
      </div>
    </div>
  )
}

export default SelectedUser