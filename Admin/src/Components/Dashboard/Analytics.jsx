import React, { useContext, useEffect, useState } from 'react'
import { LineChart } from '@mui/x-charts/LineChart';
import AlertContext from '../../Context/Alert/AlertContext';
import { BaseURL } from '../../Data/BaseURL';

const Analytics = () => {
    const [userData, setUserData] = useState([]);

    const alertcontext = useContext(AlertContext);
    const { showAlert } = alertcontext

    useEffect(() => {
        fetchUserData();
    }, []);

    const fetchUserData = async () => {
        try {
            const response = await fetch(`${BaseURL}/user-registrations`, {
                headers: {
                    "AdminBizzToken": sessionStorage.getItem('AdminBizzToken')
                }
            });
            const data = await response.json();
            setUserData(data);
        } catch (error) {
            showAlert(error.message, 'danger');
        }
    };

    return (
        <div className="bg-white rounded-xl shadow-shadow2 py-6 px-4 md:px-6 h-[100%]">
            <div className="flex flex-col gap-4 h-[100%]">
                <div className="flex flex-col gap-2">
                    <h2 className='font-Para font-bold text-xl'>Users</h2>
                    <p className='font-Para text-base font-light text-gray-500'>All Users from last 6 months</p>
                </div>
                <div className="relative -ml-5">
                    <LineChart
                        xAxis={[{ data: [1, 2, 3, 4, 5, 6] }]}
                        series={[
                            {
                                data: [
                                    userData[0]?.registrations,
                                    userData[1]?.registrations,
                                    userData[2]?.registrations,
                                    userData[3]?.registrations,
                                    userData[4]?.registrations,
                                    userData[5]?.registrations
                                ],
                                area: true,
                            },
                        ]}
                        className='max-w-full max-h-full'
                        // width={600}
                        height={300}
                    />
                </div>
            </div>
        </div>
    )
}

export default Analytics