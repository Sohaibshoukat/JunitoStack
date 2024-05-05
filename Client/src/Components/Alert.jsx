import React, { useContext } from 'react'
import AlertContext from '../Context/Alert/AlertContext';

export default function Alert(s) {
    const Context = useContext(AlertContext);
    const { alert } = Context;

    return (
        alert && 
        <div className={`text-white font-Para text-lg fixed top-2 right-4 z-[99999999999999999999] ${alert.type=='success'? 'bg-gray': 'bg-red-600'} rounded-lg py-4 px-6`}>
            {alert.message}
        </div>
    )
}
