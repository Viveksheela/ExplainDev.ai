import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TermPage from './pages/TermPage';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import AddTermPage from './pages/AddTermPage';
import { AuthProvider } from './contexts/AuthContext';
import { TermsProvider } from './contexts/TermsContext';

export function App() {
  useEffect(() => {
    // Load Inter font
    const link = document.createElement('link');
    link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@500;600;700&display=swap';
    link.rel = 'stylesheet';
    document.head.appendChild(link);
    
    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <Router>
      <AuthProvider>
        <TermsProvider>
          <div className="min-h-screen flex flex-col bg-gray-50">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/term/:slug" element={<TermPage />} />
                <Route path="/signin" element={<SignInPage />} />
                <Route path="/signup" element={<SignUpPage />} />
                <Route path="/add-term" element={<AddTermPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </TermsProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
