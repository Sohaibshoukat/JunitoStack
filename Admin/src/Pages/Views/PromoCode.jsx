import React, { useContext, useEffect, useState } from 'react';
import AlertContext from '../../Context/Alert/AlertContext';
import { convertDateFormat } from '../../Context/DateFunction';
import { BaseURL } from '../../Data/BaseURL';
import PromoCodeModel from '../../Components/PromoCode/PromoCodeModel';

const PromoCode = () => {
    const [promos, setPromos] = useState([]);
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const [PromoModel, setPromoModel] = useState(false)
    const [EditId, setEditId] = useState(null)

    // Fetch all promo codes
    const fetchPromoCodes = async () => {
        try {
            const response = await fetch(`${BaseURL}/getAllPromoCodes`, {
                method: 'GET',
                headers: {
                    "AdminBizzToken": sessionStorage.getItem('AdminBizzToken'),
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (response.ok) {
                setPromos(result.data);
            } else {
                showAlert(result.message, 'danger');
            }
        } catch (error) {
            console.error('Error fetching promo codes:', error);
            showAlert('Failed to fetch promo codes', 'danger');
        }
    };

    // Delete a promo code
    const deletePromoCode = async (id) => {
        try {
            const response = await fetch(`${BaseURL}/deletePromoCode/${id}`, {
                method: 'DELETE',
                headers: {
                    "AdminBizzToken": sessionStorage.getItem('AdminBizzToken'),
                    'Content-Type': 'application/json',
                },
            });
            const result = await response.json();
            if (response.ok) {
                showAlert(result.message, 'success');
                fetchPromoCodes()
            } else {
                showAlert(result.message, 'danger');
            }
        } catch (error) {
            console.error('Error deleting promo code:', error);
            showAlert('Failed to delete promo code', 'danger');
        }
    };

    useEffect(() => {
        fetchPromoCodes();
    }, []);

    return (
        <>
        <PromoCodeModel PromoModel={PromoModel} setPromoModel={setPromoModel} fetchPromoCodes={fetchPromoCodes} EditId={EditId} setEditId={setEditId} />
        <div className='w-[90%] mx-auto my-10'>
            <div className="bg-white shadow-shadow3 rounded-xl py-4 px-6 font-Para">
                <div className="flex flex-col lg:flex-row gap-2 justify-between lg:items-center">
                    <h2 className='font-semibold text-lg text-gray'>Promotion Activities</h2>
                    <button 
                        className='bg-gray py-2 px-4 rounded-lg text-white border-2 border-gray hover:bg-transparent hover:text-gray ease-in-out duration-300'
                        onClick={()=>{
                            setPromoModel(true)
                        }}
                    >
                        Add Promotion
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 my-10">
                    {promos.map((item) => (
                        <div className="bg-white shadow-shadow2 py-2 px-4 flex flex-col gap-4 rounded-xl" key={item._id}>
                            <div className="flex text-lg font-semibold justify-between items-center">
                                <h2 className='font-medium'>{item.Heading || 'Promo'}</h2>
                                <p>{item.OffPercentage}%</p>
                            </div>
                            <h4 className='font-medium text-gray'>PromoCode: {item.PromoCode}</h4>
                            <h4 className='font-medium text-gray'>Expiry Date: {convertDateFormat(item.ExpiryDate)}</h4>
                            <div className="flex justify-between gap-4 items-center">
                                <button 
                                    className='w-full bg-blue-500/40 border-2 text-blue-500 border-blue-500 py-2 px-4 rounded-xl'
                                    onClick={()=>{
                                        setEditId(item._id);
                                        setPromoModel(true)
                                    }}
                                >
                                    Edit
                                </button>
                                <button
                                    className='w-full bg-red-500/40 border-2 text-red-500 border-red-500 py-2 px-4 rounded-xl'
                                    onClick={() => deletePromoCode(item._id)}
                                >
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
        </>
    );
};

export default PromoCode;
