// src/pages/Register.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/auth.css';

export default function Register() {
  const navigate = useNavigate();

  // State untuk tiap input
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validasi client-side
    if (!email || !username || !password || !confirmPassword) {
      setErrorMsg('Semua field wajib diisi.');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg('Password dan konfirmasi password tidak cocok.');
      return;
    }

    try {
      // Kirim request ke backend
      const res = await fetch('http://localhost:3001/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, username, password })
      });

      const data = await res.json();
      if (!data.success) {
        // Bila ada kesalahan dari server (misal email/username sudah terdaftar)
        setErrorMsg(data.message || 'Gagal registrasi.');
      } else {
        // Registrasi berhasil → arahkan ke login atau halaman lain
        navigate('/login');
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setErrorMsg('Terjadi kesalahan jaringan.');
    }
  };

  return (
    <div className="min-h-screen">
      <div className="circle-left"></div>
      <div className="circle-right"></div>

      <div className="auth-container">
        <div className="auth-form">
          <h2 className="welcome-title">Create Account</h2>
          <p className="welcome-subtitle">Sign up to get started with your account</p>

          {errorMsg && (
            <div className="error-message" style={{ color: 'red', marginBottom: '1rem' }}>
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirm-password">Re-enter Your Password</label>
              <input
                type="password"
                id="confirm-password"
                name="confirm-password"
                placeholder="Re-enter your password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-btn">Sign Up</button>
          </form>
        </div>
      </div>
    </div>
  );
}
