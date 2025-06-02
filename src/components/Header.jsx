import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="main-header" style={{ padding: '1rem', backgroundColor: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div className="logo" style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>WEB</div>
      <nav className="main-nav">
        <ul style={{ listStyle: 'none', display: 'flex', gap: '1rem', margin: 0, padding: 0 }}>
          <li>
            <NavLink to="/" style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/tiket" style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>
              Tiket
            </NavLink>
          </li>
          <li>
            <NavLink to="/login" style={({ isActive }) => ({ color: isActive ? 'blue' : 'black' })}>
              Login | Register
            </NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
}
