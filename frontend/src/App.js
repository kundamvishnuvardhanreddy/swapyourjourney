import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import RoleSwitcher from './pages/RoleSwitcher';
import TicketList from './pages/TicketList';
import CreateTicket from './pages/CreateTicket';
import MyTickets from './pages/MyTickets';
import MySoldTickets from './pages/MySoldTickets';
import MyPurchases from './pages/MyPurchases';
import Profile from './pages/Profile';

function App() {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedRole = localStorage.getItem('role');
    
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedRole) {
      setRole(storedRole);
    }
  }, []);

  const handleRoleSelect = (selectedRole) => {
    localStorage.setItem('role', selectedRole);
    setRole(selectedRole);
  };

  // If not logged in, show auth pages
  if (!user) {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/signup" element={<Signup setUser={setUser} />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="*" element={<Login setUser={setUser} setRole={setRole} />} />
        </Routes>
      </BrowserRouter>
    );
  }

  // If logged in but no role selected
  if (!role) {
    return (
      <BrowserRouter>
        <RoleSwitcher onSelect={handleRoleSelect} />
      </BrowserRouter>
    );
  }

  // Logged in with role
  return (
    <BrowserRouter>
      <Navbar user={user} role={role} setUser={setUser} setRole={setRole} />
      <Routes>
        <Route path="/home" element={<HomePage role={role} />} />
        <Route path="/" element={<TicketList role={role} />} />
        <Route path="/profile" element={<Profile user={user} />} />
        
        {/* Seller Routes */}
        {role === 'seller' && (
          <>
            <Route path="/create-ticket" element={<CreateTicket />} />
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="/my-sold-tickets" element={<MySoldTickets />} />
          </>
        )}
        
        {/* Buyer Routes */}
        {role === 'buyer' && (
          <Route path="/my-purchases" element={<MyPurchases />} />
        )}
        
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;