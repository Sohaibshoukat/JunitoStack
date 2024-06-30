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
import UserDashboard from './Pages/DashBoard/UserDashboard'
import ChatBot from './Pages/DashBoard/ChatBot'
import AlertState from './Context/Alert/AlertState'
import Alert from './Components/Alert'
import OTP from './Pages/Portfolio/OTP'
import Recoverpassword from './Pages/Portfolio/RecoverPassword'
import Chating from './Pages/DashBoard/Chating'
import BotDepState from './Context/BotContaxt/BotDepState'
import ChatState from './Context/ChatContaxt/ChatState'
import HistoryState from './Context/History/HistoryState'
import { PrimeReactProvider, PrimeReactContext } from 'primereact/api';
import "primereact/resources/themes/lara-light-cyan/theme.css";
import CreatePassword from './Pages/Portfolio/CreatePassword'
import CheckOut from './Pages/Portfolio/CheckOut'


function App() {

  return (
    <>

      <BrowserRouter >
      <PrimeReactProvider>
        <AlertState>
          <BotDepState>
            <ChatState>
              <HistoryState>
                <Alert />
                <ScrollToTop />
                <Routes>
                  <Route path="/" element={<Home />}></Route>
                  <Route path="/contact" element={<Contact />}></Route>
                  <Route path="/login" element={<Login />}></Route>
                  <Route path="/createpassword/:id" element={<CreatePassword />}></Route>
                  <Route path="/sign-up" element={<Signup />}></Route>
                  <Route path="/otpconfirm/:id" element={<OTP />}></Route>
                  <Route path="/checkout/:id" element={<CheckOut />}></Route>
                  <Route path="/forget-password" element={<Forgetpassword />}></Route>
                  <Route path="/recover-password/:id" element={<Recoverpassword />}></Route>
                  <Route path="/about" element={<About />}></Route>
                  <Route path="/service" element={<Service />}></Route>
                  <Route path="/dashboard/*" element={<UserDashboard />}></Route>
                  <Route path="/dashboard/chatbot" element={<ChatBot />}></Route>
                  <Route path="/dashboard/c/:id" element={<Chating />}></Route>
                </Routes>
              </HistoryState>
            </ChatState>
          </BotDepState>
        </AlertState>
      </PrimeReactProvider>
      </BrowserRouter>
    </>
  )
}

export default App
