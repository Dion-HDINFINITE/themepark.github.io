import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/common.css';
import '../styles/qrticket.css';
const qrImageUrl = "https://upload.wikimedia.org/wikipedia/commons/2/2f/Rickrolling_QR_code.png?20200615212723";

export default function QRTicket() {
  return (
    <div className="min-h-screen flex flex-col font-inter">
      <main className="flex-grow qr-container">
        <h2>Tiket Anda Sudah Siap!</h2>
        <div className="p-4 bg-white rounded-lg border border-gray-200">
           <img 
            src={qrImageUrl} 
            alt="QR Code Tiket" 
            className="w-[220px] h-[220px] object-cover rounded-md"
            // Tambahkan fallback jika gambar gagal dimuat
            onError={(e) => {
              e.target.onerror = null; 
              e.target.src="https://placehold.co/220x220/e2e8f0/4a5568?text=QR+Error";
            }}
           />
        </div>
        <p style={{ marginTop: '15px', fontSize: '0.9em', color: '#555' }}>
          Tunjukkan QR code ini saat di pintu masuk.
        </p>

        <Link to="/tiket" className="btn-action-primary mt-6">
          Lihat Semua Tiket
        </Link>
      </main>
    </div>
  );
}
