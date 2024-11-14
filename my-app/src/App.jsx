import './App.css'

import Homepage from './Homepage'
import LoginPage from './login/LoginPage'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegistrationPage from './register/RegistrationPage';
import Startup from './startup/Startup';
import PitchersApp from './explore_startup/PitchersApp';
import NetworkingEvents from './webmashup/NetworkingEvents';
import InvestorProfilePage from './investorside/Profile';
import EditProfilePage from './investorside/EditProfilePage';
import Layout from './search_investors/Layout';
import InvestorConnect from './investorside/connect';
import EditSProfile from './startup/startup_profile';
import InvestorConnectj from './connect/investorConnect';
import InvestorC from './request/investorc';
import StartupConnect from './request/startupc';
import StartupDashboard from './request/i_schat';
import AcceptedInvestors from './request/s_ichat';
import StockAnalysis from './scraping/scraping';

import EventApp from './webmashup/Events';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/event" element={<NetworkingEvents />} />
        <Route path="/analysis" element={<StockAnalysis/>} />
      
        <Route path="/investor_profile/:userId" element={<EditProfilePage />} />
        <Route path="/investor/:userId" element={<InvestorProfilePage />} />
        {/* <Route path="/investor_search" element={<Layout />} /> */}
        <Route path="/investorconnect" element={<InvestorC/>} />
        <Route path="/startupchat" element={<StartupDashboard/>} />

        <Route path="/edit_startup" element={<EditSProfile />} />
        <Route path="/startup_profile/:userId" element={<Startup/>} />
        {/* <Route path="/startup_search" element={<PitchersApp/>}/> */}
        <Route path="/startupconnect" element={<StartupConnect />} />
        <Route path="/investorchat" element={<AcceptedInvestors/>} />
        <Route path="/displayevent" element={<EventApp/>} />
      </Routes>
    </Router>
  );
}

export default App;

