import './styles.css'
import NavBar from './components/navbar/navbar';

import Footer from './components/footer/footer';
import AboutPage from './pages/main/portfolio/About/About';
import LandingPage from './pages/main/portfolio/landingPage';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import SignInForm from './pages/main/portfolio/signin/signin';
import SignUpForm from './pages/main/portfolio/Signup/signup';
import SignUpFormEmail from './pages/main/portfolio/Signup/signupemail';
import Pricing from './pages/main/portfolio/pricing/pricing';

import Contact from './components/contact';
import Services from './pages/main/portfolio/Services/services';
import Level from './pages/main/portfolio/Level/Level';
import OTPScreen from './pages/main/portfolio/Signup/OTPScreen';
import OTPSignInScreen from './pages/main/portfolio/signin/OTPScreen';
import ProfileCreation from './pages/main/portfolio/signin/Profile';
import Industury from './pages/main/portfolio/signin/Industury';
import Final from './pages/main/portfolio/signin/Final';
import IdentityVerify from './pages/main/portfolio/signin/IdentityVerify';
import IdentityDoc from './pages/main/portfolio/signin/IdentityDoc';
import UserDashboard from './pages/Dashboard/UserDashboard';
import Main from './pages/main/Views/Buisness/Main';



function App() {

  return (
    <div className="App">

      <Router>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/level" element={<Level />} />
          <Route path="/services" element={<Services />} />
          <Route path="/signup" element={<SignInForm />} />
          <Route path="/signin" element={<SignUpForm />} />
          <Route path="/auth-veridy-otp" element={<OTPSignInScreen />} />
          <Route path="/profile-creation" element={<ProfileCreation />} />
          <Route path="/industry" element={<Industury />} />
          <Route path="/verify" element={<Final />} />
          <Route path="/verifictation" element={<IdentityVerify />} />
          <Route path="/doc-verify" element={<IdentityDoc />} />

          <Route path="/profileCreation/*" element={<Main />} />

          
          <Route path="/verify-otp" element={<OTPScreen />} />
          <Route path="/signinemail" element={<SignUpFormEmail />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/business" element={<Pricing />} />


          <Route path="/user-dashboard/*" element={<UserDashboard />} />
        </Routes>
        {/* <Footer /> */}
      </Router>


    </div>
  );

}

export default App;

