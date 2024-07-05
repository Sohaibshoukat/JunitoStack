import React from 'react'
import Nav from '../../Components/Nav'
import Footer from '../../Components/Footer'

const Testing = () => {
  return (
    <div>
        <Nav/>
        <div className='py-36 font-para text-3xl lg:text-5xl flex flex-col gap-4 justify-center items-center text-center font-semibold'>
            We are in Testing Phase <br/>
            Coming Soon
        </div>
        <Footer/>
    </div>
  )
}

export default Testing