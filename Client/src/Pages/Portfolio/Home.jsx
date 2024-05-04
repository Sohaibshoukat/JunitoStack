import React from 'react'
import Banner from '../../Components/Home/Banner'
import About from '../../Components/Home/About'
import Functions from '../../Components/Home/Functions'
import Why from '../../Components/Home/Why'
import Prompts from '../../Components/Home/Prompts'
import Features from '../../Components/Home/Features'
import NewYork from '../../Components/Home/NewYork'
import ContactSec from '../../Components/Contact/ContactSec'
import Nav from '../../Components/Nav'
import Footer from '../../Components/Footer'


const Home = () => {
  return (
    <>
        <Nav /> 

      <Banner />

      <Features />

      <About />

      <Functions />

      <Prompts />

      <NewYork />

      <Why />

      <ContactSec/>

      <Footer/>

    </>
  )
}

export default Home