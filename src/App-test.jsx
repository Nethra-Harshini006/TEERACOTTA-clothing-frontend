import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/global.css';

// Simple test components
function TestLogin() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Login Page</h1>
      <p>This is a test login page</p>
      <button onClick={() => window.location.href = '/'}>Go to Home</button>
    </div>
  );
}

function TestHome() {
  return (
    <div style={{ padding: '2rem', textAlign: 'center' }}>
      <h1>Home Page</h1>
      <p>This is a test home page</p>
      <button onClick={() => window.location.href = '/login'}>Go to Login</button>
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<TestLogin />} />
        <Route path="/" element={<TestHome />} />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}