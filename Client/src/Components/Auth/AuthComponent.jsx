import React, { useState } from 'react'
import Banner from './Banner'
import Form from './Form'

import "./Auth.css"

const AuthComponent = () => {

    const [HeadinState, setHeadinState] = useState('log in to your slice list account')

    return (
        <>
            <Banner Heading={HeadinState}/>

            <Form StateSet={setHeadinState} Heading={HeadinState}/>            

        </>
    )
}

export default AuthComponent