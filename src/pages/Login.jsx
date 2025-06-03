import React, { useState } from 'react';
import '../styles/common.css';
import '../styles/auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';  // <-- import useAuth

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { login } = useAuth();  // <-- get login function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('http://localhost:3001/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      // Success: store user in context (which also stores in localStorage)
      login(data);

      alert(`Login berhasil! Selamat datang, ${data.username}`);

      // Redirect to home page or dashboard
      navigate('/');
    } catch (err) {
      setError('Terjadi kesalahan. Coba lagi nanti.');
    }
  };

  return (
    <>
      <div className="circle-left"></div>
      <div className="circle-right"></div>

      <div className="auth-container">
        <div className="auth-form">
          <h2 className="welcome-title">Welcome Back</h2>
          <p className="welcome-subtitle">Sign in to your account to continue</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            {error && <p className="error-text">{error}</p>}

            <button type="submit" className="submit-btn">Sign In</button>
          </form>

          <p className="auth-link">
            Belum punya akun? <Link to="/register">Daftar di sini</Link>
          </p>
        </div>
      </div>
    </>
  );
}
