import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Interview from './pages/Interview';
import Feedback from './pages/Feedback';
import Header from './components/Header';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/interview/:id" element={<Interview />} />
            <Route path="/feedback/:id" element={<Feedback />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App; 