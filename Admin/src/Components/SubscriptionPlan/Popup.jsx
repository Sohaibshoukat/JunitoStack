import React, { useEffect, useState } from 'react';
import { IoCloseSharp } from "react-icons/io5";
import { FeaturesData } from '../../Data/FeaturesData';

const Popup = ({ handleclose, sethandleclose }) => {
    const [Plan, setPlan] = useState("");
    const [Price, setPrice] = useState('');
    const [MetaTitle, setMetaTitle] = useState('');
    const [YearlyOff, setYearlyOff] = useState('');
    const [Popular, setPopular] = useState(false);
    const [SelectedFeatures, setSelectedFeatures] = useState([]);
    const [MatchedFeatures, setMatchedFeatures] = useState([]);

    console.log("SelectedFeatures are:", SelectedFeatures);

    useEffect(() => {
        FeaturesData.find((item, index) => {
            if (index === SelectedFeatures) {
                setMatchedFeatures(item.Name);
            }
        });
    }, [SelectedFeatures]);

    const toggleFeatureSelection = (index) => {
        setSelectedFeatures(prevSelectedFeatures => {
            if (prevSelectedFeatures.includes(index)) {
                // If already selected, remove it
                return prevSelectedFeatures.filter(item => item !== index);
            } else {
                // If not selected, add it
                return [...prevSelectedFeatures, index];
            }
        });
    };

    return (
        <>
            <div className={`${handleclose ? "block" : "hidden"}  `}>
                <div className='fixed inset-0 bg-black flex justify-center items-center bg-opacity-50  '>
                    <div className=' bg-white w-10/12 md:w-1/2 lg:1/3 shadow-inner border-e-emerald-600 rounded-lg py-8 px-10 '>
                        <div className='border-b-2 flex flex-row justify-between '>
                            <h2 className='font-bole font-Para text-base font-bold border-b-2 border-black w-fit'> New Plan</h2>
                            <IoCloseSharp className='text-xl cursor-pointer' onClick={() => { sethandleclose(false) }} />
                        </div>
                        <div className='flex flex-row justify-end mt-4'>
                            <label htmlFor="popular" className="inline-flex items-center cursor-pointer gap-3">
                                <span className="text-sm font-base font-Para">Popular</span>
                                <input id="popular" type="checkbox" className="sr-only peer" />
                                <div className="relative w-7 h-4 border border-black rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[1px] after:start-[1px] after:bg-[#ADFC32] after:rounded-full after:h-3 after:w-3 after:transition-all"></div>
                            </label>
                        </div>
                        <div className='grid grid-cols-1 gap-2 px-0 sm:px-5 md:px-8'>
                            <div className='flex flex-col gap-1'>
                                <h2 className='text-sm sm:text-base font-Heading font-semibold'>Plan Name</h2>
                                <div className='relative'>
                                    <input type="text" placeholder="Enter Name" className='text-sm sm:text-base border-2 p-1 rounded-md w-full' onChange={(e) => setPlan(e.target.value)} />
                                </div>
                            </div>
                            <div className=' flex flex-col  gap-1'>
                                <h2 className=' text-sm sm:text-base font-Heading font-semibold'>Price</h2>
                                <div className='relative'>
                                    <input type="number" placeholder="Enter Price" className=' text-sm sm:text-base border-2 p-1 rounded-md w-full' onChange={(e) => setPrice(e.target.value)} />

                                </div>

                            </div>
                            <div className=' flex flex-col  gap-1'>
                                <h2 className=' text-sm sm:text-base font-Heading font-semibold'>Meta Title</h2>
                                <div className='relative'>
                                    <input type="text" placeholder="Enter Title" className=' text-sm sm:text-base border-2 p-1 rounded-md w-full' onChange={(e) => setMetaTitle(e.target.value)} />

                                </div>

                            </div>
                            <div className=' flex flex-col  gap-1'>
                                <h2 className=' text-sm sm:text-base font-Heading font-semibold'>Features</h2>
                                <div className=' border-2 p-2 rounded-md w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-x-2 gap-y-1' style={{ maxHeight: '130px', overflowY: 'auto' }}>
                                    {FeaturesData.map((item, index) => (
                                        <ul key={index}>
                                            <li
                                                className={`border rounded-full px-2 py-1 text-xs cursor-pointer text-center ${SelectedFeatures.includes(index) ? "bg-[#ADFC32] text-black" : "bg-gray-500 text-white"}`}
                                                onClick={() => toggleFeatureSelection(index)}
                                            >
                                                {item.Name}
                                            </li>
                                        </ul>
                                    ))}

                                </div>

                            </div>
                            <div className=' flex flex-col  gap-1'>
                                <h2 className=' text-sm sm:text-base font-Heading font-semibold'>yearly off</h2>
                                <div className='relative'>
                                    <input type="text" placeholder="20%" className=' text-sm sm:text-base border-2 p-1 rounded-md w-full' onChange={(e) => setYearlyOff(e.target.value)} />

                                </div>

                            </div>

                            <button
                                className={`py-2 px-4 mt-2 rounded-lg w-full font-para  text-xs sm:text-sm md:text-base font-bold bg-black text-white  hover:bg-[#ADFC32] hover:text-black ease-in-out duration-300 `}
                            >
                                ADD
                            </button>
                        </div>




                    </div>
                </div>
            </div >
        </>
    )
}

export default Popup
