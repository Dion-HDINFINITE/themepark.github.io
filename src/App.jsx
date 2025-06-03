import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Search from './pages/Search';
import Ticket from './pages/Ticket';
import Login from './pages/Login';
import Register from './pages/Register';
import Bought from './pages/Bought';
import QRTicket from './pages/QRTicket';
import QRPay from './pages/QRPay';

import Header from './components/Header';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';

export default function App() {
  return (
    <>
<audio autoPlay loop muted>
  <source src="/jazz.mp3" type="audio/mpeg" />
</audio>


      <Header />
      <main style={{ minHeight: '80vh', padding: '1rem' }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route 
            path="/tiket" 
            element={
              <PrivateRoute>
                <Ticket />
              </PrivateRoute>
            } 
          />
          <Route path="/search" element={<Search />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/bought" element={<Bought />} />
          <Route path="/qrticket" element={<QRTicket />} />
          <Route path="/qrpay" element={<QRPay />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
