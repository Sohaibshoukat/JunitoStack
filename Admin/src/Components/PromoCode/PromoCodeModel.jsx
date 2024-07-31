import React, { useContext, useState, useEffect } from 'react';
import { IoMdClose } from 'react-icons/io';
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';

const PromoCodeModel = ({ PromoModel, setPromoModel, fetchPromoCodes, EditId, setEditId }) => {
    const [formData, setFormData] = useState({
        Heading: '',
        OffPercentage: '',
        PromoCodevalue: '',
        ExpiryDate: '',
    });

    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const fetchPromoCode = async () => {
            try {
                const response = await fetch(`${BaseURL}/getPromoCode/${EditId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        'AdminBizzToken': sessionStorage.getItem('AdminBizzToken'),
                    },
                });
                const data = await response.json();
                if (data.success) {
                    setFormData({
                        Heading: data.data.Heading,
                        OffPercentage: data.data.OffPercentage,
                        PromoCodevalue: data.data.PromoCode,
                        ExpiryDate: data.data.ExpiryDate.split('T')[0], // Formatting date
                    });
                } else {
                    showAlert(data.message, 'danger');
                }
            } catch (error) {
                showAlert('Error occurred while fetching promo code', 'danger');
            }
    };
    useEffect(() => {
        if (EditId) {
            fetchPromoCode();
        }
    }, [EditId]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async () => {
        try {
            if(formData.Heading=='' || formData.OffPercentage=="" || formData.PromoCodevalue=="" || formData.ExpiryDate==''){
                showAlert("No Empty Fields Allow");
                return;
            }
            const method = EditId ? 'PUT' : 'POST';
            const endpoint = EditId ? `/updatePromoCode/${EditId}` : '/createPromoCode';
            const response = await fetch(`${BaseURL}${endpoint}`, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'AdminBizzToken': sessionStorage.getItem('AdminBizzToken'),
                },
                body: JSON.stringify({
                    Heading: formData.Heading,
                    OffPercentage: formData.OffPercentage,
                    PromoCodeValue: formData.PromoCodevalue,
                    ExpiryDate: formData.ExpiryDate,
                }),
            });

            const data = await response.json();
            if (data.success) {
                showAlert(`Promo code ${EditId ? 'updated' : 'created'} successfully`, 'success');
                fetchPromoCodes();
                setPromoModel(false);
                setEditId(null);
            } else {
                showAlert(data.message, 'danger');
            }
        } catch (error) {
            showAlert(`Error occurred while ${EditId ? 'updating' : 'creating'} promo code`, 'danger');
        }
    };

    return (
        <>
            {PromoModel && (
                <div className='fixed z-50 top-0 left-0 w-full h-full flex flex-col justify-center items-center'>
                    <div
                        className="bg-black/50 w-full h-full absolute z-30"
                        onClick={() => { setPromoModel(false); setEditId(null); }}
                    ></div>
                    <div className='bg-gray/50 rounded-2xl py-6 px-4 md:px-8 w-[90%] md:w-[80%] lg:w-[60%] xl:w-[50%] relative z-30 m-auto h-fit'>
                        <div className='flex flex-row pb-2 border-b-2 border-white justify-between items-end mb-5'>
                            <h2 className='font-Para text-lg text-white font-medium'>
                                {EditId ? 'Edit Promo Code' : 'Add Promo Code'}
                            </h2>
                            <IoMdClose className='text-white text-4xl' onClick={() => { setPromoModel(false); setEditId(null); }} />
                        </div>
                        <div className="flex flex-col w-[80%] m-auto font-Para gap-4">
                            <div className="flex flex-col gap-1">
                                <label htmlFor="Heading" className='text-white'>Heading</label>
                                <input
                                    type="text"
                                    name="Heading"
                                    value={formData.Heading}
                                    onChange={handleChange}
                                    className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4'
                                    placeholder='Enter Promo Heading'
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="OffPercentage" className='text-white'>Off Percentage</label>
                                <input
                                    type="number"
                                    name="OffPercentage"
                                    value={formData.OffPercentage}
                                    onChange={handleChange}
                                    className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4'
                                    placeholder='Enter Off Percentage'
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="PromoCodevalue" className='text-white'>Promo Code</label>
                                <input
                                    type="text"
                                    name="PromoCodevalue"
                                    value={formData.PromoCodevalue}
                                    onChange={handleChange}
                                    className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4'
                                    placeholder='Enter Promo Code'
                                />
                            </div>
                            <div className="flex flex-col gap-1">
                                <label htmlFor="ExpiryDate" className='text-white'>Expiry Date</label>
                                <input
                                    type="date"
                                    name="ExpiryDate"
                                    value={formData.ExpiryDate}
                                    onChange={handleChange}
                                    className='bg-[#EDF2F6] rounded-lg border-none outline-none py-2 px-4'
                                />
                            </div>
                        </div>
                        <div className='flex justify-end my-4'>
                            <button
                                onClick={handleSubmit}
                                className='font-Para items-center text-gray gap-2 flex bg-white border-2 border-white font-semibold rounded-lg py-3 px-4 hover:bg-transparent ease-in-out duration-300 hover:text-white'
                            >
                                {EditId ? 'Update Promo Code' : 'Create Promo Code'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default PromoCodeModel;
