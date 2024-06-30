import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';

const CheckOut = () => {
    const { id } = useParams();
    const [User, setUser] = useState(null);
    const [Company, setCompany] = useState(null);
    const [PromoCode, setPromoCode] = useState('');
    const [DiscountPerce, setDiscountPerce] = useState(0);
    const [BeforeDiscount, setBeforeDiscount] = useState(99); // Initial total amount
    const [TotalAmount, setTotalAmount] = useState(99);

    const navigate = useNavigate();
    const paypal = useRef();
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    const fetchTransactionData = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/transaction/transactions/${id}`);
            if (response.ok) {
                const data = await response.json();
                setUser(data.User_ID);
                setCompany(data.Company_ID);
                setTotalAmount(BeforeDiscount);
                renderPaypalButton(BeforeDiscount);
            } else {
                showAlert('Failed to fetch transaction details', 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    const applyPromoCode = async () => {
        if (!PromoCode) {
            showAlert('Please enter a promo code', 'danger');
            return;
        }

        try {
            const response = await fetch(`${BaseURL}/api/transaction/getPromoCode/${PromoCode}`);
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    const discount = data.data.OffPercentage;
                    const newTotal = (BeforeDiscount - (BeforeDiscount * discount / 100)).toFixed(2);
                    setDiscountPerce(discount);
                    setTotalAmount(newTotal);
                    showAlert('Promo code applied successfully', 'success');
                    renderPaypalButton(newTotal);
                } else {
                    showAlert(data.message, 'danger');
                }
            } else {
                showAlert('Promo code not valid', 'danger');
            }
        } catch (error) {
            showAlert('Error applying promo code', 'danger');
        }
    };

    const renderPaypalButton = (amount) => {
        if (paypal.current) {
            paypal.current.innerHTML = ''; // Clear previous buttons
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [{
                            description: "Bizz Bot Junito",
                            amount: {
                                currency_code: "EUR",
                                value: amount
                            }
                        }]
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    const response = await fetch(`${BaseURL}/api/transaction/registertransactions`, {
                        method: "POST",
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            id: id,
                            Amount: amount,
                            DateCreated: new Date().toISOString(),
                            ExpiryDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
                            Status: "Paid"
                        })
                    });
                    const ResponseData = await response.json();
                    if (ResponseData.success) {
                        showAlert("Transaction completed successfully", 'success');
                        navigate("/login");
                    }
                },
                onError: (err) => {
                    console.log(err);
                }
            }).render(paypal.current);
        }
    };

    useEffect(() => {
        fetchTransactionData();
    }, []);

    return (
        <div className='w-[90%] mx-auto my-10'>
            <div className="flex justify-between items-center gap-2 font-para my-4">
                <h2 className='text-xl font-para font-semibold text-gray'>Company</h2>
                <p className='text-lg font-bold font-para text-black'>{Company?.CompanyName}</p>
            </div>

            <div className="relative overflow-x-auto">
                <table className="w-full text-lg text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-base text-white uppercase bg-gray">
                        <tr>
                            <th scope="col" className="px-6 py-3">User Name</th>
                            <th scope="col" className="px-6 py-3">User Type</th>
                            <th scope="col" className="px-6 py-3">Email</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className='w-max'>{User?.FirstName} {User?.LastName}</p>
                            </th>
                            <td className="px-6 py-4">
                                <p className='w-max'>{User?.User_Type}</p>
                            </td>
                            <td className="px-6 py-4">
                                <p className='w-max'>{User?.Email}</p>
                            </td>
                            <td className="px-6 py-4">
                                €{BeforeDiscount}
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className='w-ma text-xl font-semibold'>Before Discount</p>
                            </th>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4">
                                €{BeforeDiscount}
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className='w-ma text-xl font-semibold'>Discount Percentage</p>
                            </th>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4">
                                {DiscountPerce}%
                            </td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className='w-ma text-xl font-semibold'>Total</p>
                            </th>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4">
                                €{TotalAmount}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between my-6 flex-col lg:flex-row gap-10">
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col font-para gap-2">
                        <h2 className='text-lg font-semibold'>PromoCode</h2>
                        <input
                            type="text"
                            value={PromoCode}
                            onChange={(e) => setPromoCode(e.target.value)}
                            className='border-2 border-gray py-2 px-4 rounded-xl'
                            placeholder='Enter Promo Code'
                        />
                    </div>
                    <button
                        onClick={applyPromoCode}
                        className='bg-gray rounded-lg font-para text-lg font-semibold py-2 px-4 border-2 border-gray text-white hover:bg-transparent hover:text-gray ease-in-out duration-300'
                    >
                        Apply Discount
                    </button>
                </div>
                <div ref={paypal}></div>
            </div>
        </div>
    );
};

export default CheckOut;
