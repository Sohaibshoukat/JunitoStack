import React, { useContext, useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { BaseURL } from '../../../Data/BaseURL';
import AlertContext from '../../../Context/Alert/AlertContext';
import { taxes } from '../../../Data/CountryList';

const PaySubUser = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    const users = JSON.parse(params.get('users'));
    const [SubUsers, setSubUsers] = useState([]);
    const [Owner, setOwner] = useState(null);
    const [Company, setCompany] = useState(null);
    const [TotalAmount, setTotalAmount] = useState(0);
    const [PromoCode, setPromoCode] = useState('');
    const [DiscountPerce, setDiscountPerce] = useState(0);
    const [BeforeDiscount, setBeforeDiscount] = useState(0);
    const [saleTax, setSalesTax] = useState(0);

    const alertContext = useContext(AlertContext);
    const { showAlert } = alertContext;
    const navigate = useNavigate();
    const paypal = useRef();

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/user/getuser`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('auth-token'),
                },
            });

            const data = await response.json();
            if (data.success) {
                setOwner(data.userData);
            } else {
                showAlert('Only Company Owner can Pay', 'danger');
                navigate("/dashboard/users");
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    const fetchCompany = async () => {
        try {
            const response = await fetch(`${BaseURL}/api/user/getcompany`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    "auth-token": localStorage.getItem('auth-token'),
                },
            });
            const data = await response.json();
            if (data.success) {
                setCompany(data.company);
            } else {
                showAlert('Failed to fetch Company Detail', 'danger');
            }
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    const fetchSubUsers = async () => {
        try {
            let SubUserArray = [];
            let AmountCal = 0;

            const responses = await Promise.all(
                users.map(async (item) => {
                    const response = await fetch(`${BaseURL}/api/user/getbyid/${item}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });

                    const data = await response.json();
                    if (data.success) {
                        AmountCal += 50;
                        SubUserArray.push(data.userData);
                    }
                })
            );

            setSubUsers(SubUserArray);
            setBeforeDiscount(AmountCal);
            const taxrate = getTaxRate(Company?.Country)
            console.log(taxrate);
            setSalesTax(taxrate);

            const newTotal = (AmountCal + (AmountCal * taxrate / 100)).toFixed(2);

            setTotalAmount(newTotal);
            renderPaypalButton(newTotal);
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    const getTaxRate = (country) => {
        const taxObj = taxes.find(tax => tax.hasOwnProperty(country));
        return taxObj ? parseFloat(taxObj[country]) : 20; // Default to 20% if country not found
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
                    var newTotal = (BeforeDiscount - (BeforeDiscount * discount / 100))
                    console.log(newTotal)
                    const taxrate = getTaxRate(Company?.Country)
                    console.log(taxrate)

                    newTotal = (newTotal + (newTotal * taxrate / 100)).toFixed(2);
                    console.log(newTotal)
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
            console.log(error);
            showAlert('Error applying promo code', 'danger');
        }
    };

    const renderPaypalButton = (amount) => {
        if (paypal.current) {
            paypal.current.innerHTML = '';
            window.paypal.Buttons({
                createOrder: (data, actions) => {
                    return actions.order.create({
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                description: "Bizz Bot Junito",
                                amount: {
                                    currency_code: "EUR",
                                    value: amount,
                                },
                            },
                        ],
                    });
                },
                onApprove: async (data, actions) => {
                    const order = await actions.order.capture();
                    console.log(users)
                    const responses = await fetch(`${BaseURL}/api/transaction/SubUserAdd`, {
                        method: "PUT",
                        headers: {
                            'Content-Type': 'application/json',
                            "auth-token": localStorage.getItem('auth-token'),
                        },
                        body: JSON.stringify({
                            subUserIds: users,
                            data: order,
                            DateCreated: new Date().toISOString(),
                            ExpiryDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toISOString(),
                            beforediscount: BeforeDiscount,
                            DiscountPerce: DiscountPerce,
                            SalesTax: saleTax,
                            Amount: TotalAmount,
                        }),
                    });
                    const ResponseData = await responses.json();
                    if (ResponseData.success) {
                        showAlert("Transaction Completed Successfully", 'success');
                        navigate("/dashboard/users");
                    }
                },
                onError: (err) => {
                    console.log(err);
                },
            }).render(paypal.current);
        }
    };

    useEffect(() => {
        fetchUserData();
        fetchSubUsers();
        fetchCompany();
    }, []);

    return (
        <div className='w-[90%] mx-auto my-10'>
            <div className="flex justify-between items-center gap-2 font-para my-4">
                <h2 className='text-xl font-para font-semibold text-gray'>Company</h2>
                <p className='text-lg font-bold font-para text-black'>{Company?.CompanyName}</p>
            </div>

            <div className="flex justify-between items-center gap-2 font-para my-4">
                <h2 className='text-xl font-para font-semibold text-gray'>Company Owner</h2>
                <p className='text-lg font-bold font-para text-black'>{Owner?.FirstName} {Owner?.LastName}</p>
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
                        {SubUsers.map((item, index) => (
                            <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    <p className='w-max'>{item?.FirstName} {item?.LastName}</p>
                                </th>
                                <td className="px-6 py-4">
                                    <p className='w-max'>{item?.User_Type}</p>
                                </td>
                                <td className="px-6 py-4">
                                    <p className='w-max'>{item?.Email}</p>
                                </td>
                                <td className="px-6 py-4">
                                    €50
                                </td>
                            </tr>
                        ))}
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className='w-ma text-xl font-semibold'>Before Discount</p>
                            </th>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4">€{BeforeDiscount}</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className='w-ma text-xl font-semibold'>Discount Percentage</p>
                            </th>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4">{DiscountPerce} %</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className='w-ma text-xl font-semibold'>Sales tax</p>
                            </th>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4">{saleTax} %</td>
                        </tr>
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                <p className='w-ma text-xl font-semibold'>Total</p>
                            </th>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4"></td>
                            <td className="px-6 py-4">€{TotalAmount}</td>
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

export default PaySubUser;
