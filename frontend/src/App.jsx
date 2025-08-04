import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import './styles/App.css';
import PublicFeed from './pages/PublicFeed';
import ProfilePage from './components/ProfilePage';

function App() {
  return (
    <AuthProvider>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/public-feed" element={<PublicFeed/>} />
            <Route path="/profile/:id" element={<ProfilePage />} />
          </Routes>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;
