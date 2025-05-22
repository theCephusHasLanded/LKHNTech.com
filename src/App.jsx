// import React from 'react'; // Not needed in modern React
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import EnhancedLKHNWebsite from './components/EnhancedLKHNWebsite';
import ServicePage from './pages/ServicePage';
import AboutPage from './pages/AboutPage';
import MarketsPage from './pages/MarketsPage';
import ContactPage from './pages/ContactPage';
import NotFoundPage from './pages/NotFoundPage';
import './styles/global.css';

function App() {
  return (
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true
      }}
    >
      <Routes>
        <Route path="/" element={<EnhancedLKHNWebsite />} />
        <Route path="/services" element={<ServicePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/markets" element={<MarketsPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Router>
  );
}

export default App;