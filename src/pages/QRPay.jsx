import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/common.css';
import '../styles/qrticket.css'; // make sure this file exists

export default function QRPay() {
  return (
    <div className="min-h-screen flex flex-col font-inter">
      <main className="flex-grow qr-container">
        <h2 className="text-xl font-semibold mb-4">Silakan Scan untuk Pembayaran</h2>

        <div className="qr-placeholder">
          <p>Scan QR ini untuk menyelesaikan pembayaran</p>
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Gunakan aplikasi e-wallet atau mobile banking untuk memindai QR ini.
        </p>

        <Link to="/Tiket" className="btn-action-primary mt-6 inline-block">
          KONFIRMASI BAYAR
        </Link>
      </main>
    </div>
  );
}
