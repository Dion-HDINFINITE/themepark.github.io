import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/common.css';
import '../styles/qrticket.css';

export default function QRTicket() {
  return (
    <div className="min-h-screen flex flex-col font-inter">
      <main className="flex-grow qr-container">
        <h2>Tiket Anda Sudah Siap!</h2>
        <div className="qr-placeholder">
          <p>Scan QR ini untuk masuk</p>
        </div>
        <p style={{ marginTop: '15px', fontSize: '0.9em', color: '#555' }}>
          Tunjukkan QR code ini saat di pintu masuk.
        </p>

        <Link to="/ticket" className="btn-action-primary mt-6">
          Lihat Semua Tiket
        </Link>
      </main>
    </div>
  );
}
