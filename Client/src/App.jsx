import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import ScrollToTop from './Logics/scrolltop'
import Nav from './Components/Nav'
import Home from './Pages/Portfolio/Home'
import Footer from './Components/Footer'
import Contact from './Pages/Portfolio/Contact'
import Login from './Pages/Portfolio/Login'
import Signup from './Pages/Portfolio/Signup'
import Forgetpassword from './Pages/Portfolio/ForgetPassword'
import About from './Pages/Portfolio/About'
import Service from './Pages/Portfolio/Service'
// import HowTo from './Pages/Portfolio/HowTo'
// import HowItWork from './Pages/Portfolio/HowItWork'
// import Blog from './Pages/Portfolio/Blog'
// import Auth from './Pages/Portfolio/Auth'
// import Pricing from './Pages/Portfolio/Pricing'
import UserDashboard from './Pages/DashBoard/UserDashboard'
import ChatBot from './Pages/DashBoard/ChatBot'

function App() {

  return (
    <>
    
      <BrowserRouter >
      <ScrollToTop/> 
         <Routes>
           <Route path="/" element={<Home />}></Route>
           <Route path="/contact" element={<Contact />}></Route>
           <Route path="/login" element={<Login />}></Route>
           <Route path="/sign-up" element={<Signup />}></Route>
           <Route path="/forget-password" element={<Forgetpassword />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/service" element={<Service />}></Route>
          <Route path="/dashboard/*" element={<UserDashboard />}></Route>
          <Route path="/dashboard/chatbot" element={<ChatBot />}></Route>
          {/*<Route path="/pricing-plans" element={<Pricing />}></Route>
          <Route path="/auth" element={<Auth />}></Route> */}
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
