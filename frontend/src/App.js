import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Services from './components/Services';
import TechDivider from './components/TechDivider';
import Process from './components/Process';
import WhyChooseMe from './components/WhyChooseMe';
import Pricing from './components/Pricing';
import Contact from './components/Contact';
import Footer from './components/Footer';
import { Toaster } from './components/ui/toaster';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

const PublicSite = () => (
  <div>
    <Navbar />
    <Hero />
    <About />
    <Skills />
    <Services />
    <TechDivider />
    <Process />
    <WhyChooseMe />
    <div style={{ position: 'relative', padding: '0', background: 'var(--bg-primary)' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, padding: '20px 24px' }}>
          <div style={{ flex: 1, maxWidth: 200, height: 1, background: 'linear-gradient(90deg, transparent, rgba(255, 45, 124, 0.3))' }} />
          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#ff2d7c', boxShadow: '0 0 12px rgba(255, 45, 124, 0.5), 0 0 30px rgba(255, 45, 124, 0.2)' }} />
          <div style={{ flex: 1, maxWidth: 200, height: 1, background: 'linear-gradient(90deg, rgba(255, 45, 124, 0.3), transparent)' }} />
        </div>
      </div>
    <Pricing />
    <Contact />
    <Footer />
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <div className="App">
          <Routes>
            <Route path="/" element={<PublicSite />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute>
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
          </Routes>
          <Toaster />
        </div>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
