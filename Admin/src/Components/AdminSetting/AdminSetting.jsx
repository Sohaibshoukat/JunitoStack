import React, { useState } from 'react'
import Changepassword from './Changepassword'
import VerifyOTP from './VerifyOTP'
import NewPassword from './NewPassword'



const AdminSetting = () => {
    const [Step, setStep] = useState(1)
    const [OTP, setOTP] = useState("")
    return (
        <>
            {Step == 2 ?
                <VerifyOTP setStep={setStep} OTP={OTP} setOTP={setOTP} />
                : Step == 3 ?
                    <NewPassword setStep={setStep} />
                    :
                    <Changepassword setStep={setStep} />
            }
        </>
    )
}

export default AdminSetting
