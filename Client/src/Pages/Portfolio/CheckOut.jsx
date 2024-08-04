import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from "react-router-dom";
import { BaseURL } from '../../Data/BaseURL';
import AlertContext from '../../Context/Alert/AlertContext';
import Nav from '../../Components/Nav';
import Footer from '../../Components/Footer';
import { taxes } from '../../Data/CountryList';

const CheckOut = () => {
    const { id, plan } = useParams();

    const [User, setUser] = useState(null);
    const [Company, setCompany] = useState(null);
    const [PromoCode, setPromoCode] = useState('');
    const [DiscountPerce, setDiscountPerce] = useState(0);
    const [BeforeDiscount, setBeforeDiscount] = useState(plan === "Monthly" ? 99 : 990);
    const [SalesTax, setSalesTax] = useState(0);
    const [TotalAmount, setTotalAmount] = useState(plan === "Monthly" ? 99 : 990);

    const navigate = useNavigate();
    const paypalRef = useRef();
    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;

    useEffect(() => {
        fetchTransactionData();
    }, []);

    useEffect(() => {
        loadPayPalScript();
    }, [TotalAmount]);

    const fetchTransactionData = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/transaction/transactions/${id}`);
            if (response.ok) {
                const data = await response.json();
                setUser(data.User_ID);
                setCompany(data.Company_ID);

                const country = data.Company_ID.Country;
                const taxRate = getTaxRate(country);
                const salesTax = calculateSalesTax(BeforeDiscount, taxRate);

                setSalesTax(salesTax);
                const initialTotal = parseFloat(BeforeDiscount) + parseFloat(salesTax);
                setTotalAmount(initialTotal);
            } else {
                showAlert('Failed to fetch transaction details', 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    // Function to get the tax rate based on the country
    const getTaxRate = (country) => {
        const taxObj = taxes.find(tax => tax.hasOwnProperty(country));
        return taxObj ? parseFloat(taxObj[country]) : 20; // Default to 20% if country not found
    };

    // Function to calculate sales tax
    const calculateSalesTax = (amount, taxRate) => {
        return (amount * taxRate / 100).toFixed(2);
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
                    const discountedAmount = (BeforeDiscount - (BeforeDiscount * discount / 100)).toFixed(2);
                    const newSalesTax = calculateSalesTax(discountedAmount, getTaxRate(Company.Country));
                    const newTotal = parseFloat(discountedAmount) + parseFloat(newSalesTax);

                    setDiscountPerce(discount);
                    setSalesTax(newSalesTax);
                    setTotalAmount(newTotal);
                    showAlert('Promo code applied successfully', 'success');
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

    // Function to dynamically load the PayPal SDK script
    const loadPayPalScript = () => {
        const existingScript = document.getElementById('paypal-sdk');
        if (existingScript) return;

        const script = document.createElement('script');
        script.src = 'https://www.paypal.com/sdk/js?client-id=AaB_n2qBFaqY0T7ipK6WEYTzYvg4yoMwFIOq-Rp0vDOyyQYai_-vfTkzAXSJh5TtYPZu-Y5Sgf_GsiX3&vault=true&intent=subscription';
        script.id = 'paypal-sdk';
        script.onload = renderPaypalButton; // Render button once the script is loaded
        document.body.appendChild(script);
    };

    const renderPaypalButton = () => {
        if (paypalRef.current) {
            paypalRef.current.innerHTML = ''; // Clear previous buttons

            // Render PayPal subscription button
            window.paypal.Buttons({
                style: {
                    shape: 'pill',
                    color: 'white',
                    layout: 'vertical',
                    label: 'subscribe'
                },
                createSubscription: function(data, actions) {
                    return actions.subscription.create({
                        plan_id: plan === 'Monthly' ? 'P-4YT50923UK892682NM2WMRZQ' : 'P-1AG61244CV737862VM2XDVLI'
                    });
                },
                onApprove: async function(data, actions) {
                    console.log(data)
                    const subscriptionId = data.subscriptionID;
                    const orderId = data.orderID;
                    try {
                        const response = await fetch(`${BaseURL}/api/transaction/registertransactions`, {
                            method: "POST",
                            headers: {
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({
                                id: id,
                                Amount: TotalAmount,
                                DateCreated: new Date().toISOString(),
                                ExpiryDate: plan === 'Monthly' ? new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString() : new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString(),
                                Status: "Paid",
                                subscriptionId: subscriptionId,
                                orderId: orderId,
                                discount: BeforeDiscount,
                                DiscountPerce: DiscountPerce,
                                SalesTax: SalesTax,
                                Plan: plan
                            })
                        });
                        const ResponseData = await response.json();
                        if (ResponseData.success) {
                            showAlert("Transaction completed successfully", 'success');
                            navigate("/login");
                        }
                    } catch (error) {
                        showAlert('Error completing the transaction', 'danger');
                    }
                },
                onError: (err) => {
                    console.error('PayPal error:', err);
                    showAlert('An error occurred with PayPal. Please try again.', 'danger');
                }
            }).render(paypalRef.current);
        }
    };

    return (
        <>
            <Nav />
            <div className='w-[90%] mx-auto pt-28'>
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
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
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
                            {/* <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                    <p className='w-max'>Discount</p>
                                </th>
                                <td className="px-6 py-4">
                                    <p className='w-max'>{DiscountPerce}%</p>
                                </td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4">
                                    €{((BeforeDiscount * DiscountPerce) / 100).toFixed(2)}
                                </td>
                            </tr> */}
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                    <p className='w-max'>Sales Tax</p>
                                </th>
                                <td className="px-6 py-4">
                                    <p className='w-max'>Standard</p>
                                </td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4">
                                    €{SalesTax}
                                </td>
                            </tr>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-black">
                                    <p className='w-max'>Total Amount</p>
                                </th>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4"></td>
                                <td className="px-6 py-4">
                                    <p className='font-semibold font-para'>€{TotalAmount}</p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                {/* <div className="my-8 flex flex-wrap justify-between gap-2 items-center">
                    <input
                        onChange={(e) => setPromoCode(e.target.value)}
                        type="text"
                        className="outline-none font-para border border-gray focus:border-primary hover:border-primary text-black text-lg p-3 w-[20rem] max-w-full"
                        placeholder="Promo Code"
                    />
                    <button onClick={applyPromoCode} className='text-lg font-para py-3 px-4 bg-primary text-white bg-gray rounded-lg border-2 border-gray'>
                        Apply
                    </button>
                </div> */}

                <div className="my-8 flex flex-wrap justify-between gap-2 items-center">
                    <p className='text-lg font-semibold font-para text-black'>Subscribe with PayPal</p>
                    <div ref={paypalRef}></div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CheckOut;
