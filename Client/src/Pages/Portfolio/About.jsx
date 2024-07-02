import React from 'react'
import Banner from '../../Components/About/Banner'
import AboutText from '../../Components/About/AboutText'
import Features from '../../Components/About/Features'
import Partner from '../../Components/About/Partner'
import Nav from '../../Components/Nav'
import Footer from '../../Components/Footer'

const About = () => {
  return (
    <>
    <Nav/>
        <Banner/>
        <AboutText/>
        {/* <Features/> */}
        {/* <Partner/> */}
        <Footer/>
    </>
  )
}

export default About