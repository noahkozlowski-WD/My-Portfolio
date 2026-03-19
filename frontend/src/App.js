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
import SectionDivider from './components/SectionDivider';
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
    <SectionDivider direction="down" fillTop="var(--bg-secondary)" fillBottom="var(--bg-primary)" accent="#ff2d7c" />
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
