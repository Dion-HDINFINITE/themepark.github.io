import React, { useEffect, useRef, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(true);
  const audioRef = useRef(null);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const toggleAudio = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const navLinkStyle = ({ isActive }) => ({
    color: isActive ? 'blue' : 'black',
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
  });

  const baseButtonStyle = {
    color: 'black',
    textDecoration: 'none',
    background: 'none',
    border: 'none',
    padding: 0,
    font: 'inherit',
    cursor: 'pointer',
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => setIsPlaying(false));
    }
  }, []);

  return (
    <header className="main-header" style={{ padding: '1rem', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>WEB</div>
      
      <audio ref={audioRef} loop>
        <source src="/jazz.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <nav className="main-nav">
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0 }}>
          <li>
            <NavLink to="/" style={navLinkStyle}>
              Home
            </NavLink>
          </li>
          {user && (
            <li>
              <NavLink to="/tiket" style={navLinkStyle}>
                Tiket
              </NavLink>
            </li>
          )}
          <li>
            <button onClick={toggleAudio} style={baseButtonStyle}>
              {isPlaying ? '🔊 Mute' : '🔇 Play'}
            </button>
          </li>
          {!user ? (
            <li>
              <NavLink to="/login" style={navLinkStyle}>
                Login | Register
              </NavLink>
            </li>
          ) : (
            <li>
              <button onClick={handleLogout} style={baseButtonStyle}>
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
