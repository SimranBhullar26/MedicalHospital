import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import AboutUs from './components/AboutUs';
import BookingPage from './components/BookingPage';
import ContactUs from './components/ContactUs';
import DoctorDashboard from './components/DoctorDashboard';
import FeedbackForm from './components/FeedbackForm';
import Footer from './components/Footer';
import Home from './components/Home';
import PatientDashboard from './components/PatientDashboard';
import PrivacyPolicy from './components/PrivacyPolicy';
import ProtectedRoute from './components/ProtectedRoute';
import SignInPage from './components/SignInPage';
import SignUpPage from './components/SignUpPage';
import TermsAndConditions from './components/TermsandConditions';
import Services from './components/Services';  

const App = () => {
  return (
    <Router>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/book" element={<ProtectedRoute><BookingPage /></ProtectedRoute>} />
          <Route path="/doctor-dashboard" element={<ProtectedRoute><DoctorDashboard /></ProtectedRoute>} />
          <Route path="/patient-dashboard" element={<ProtectedRoute><PatientDashboard /></ProtectedRoute>} />
          <Route path="/services" element={<Services />} /> {/* Add Services route */}
          {/* <Route path="/navbar" element={<Navbar/>}/> */}
          <Route path="/feedback" element={<FeedbackForm />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} /> 
          <Route path="/terms-and-conditions" element={<TermsAndConditions />} /> 
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
