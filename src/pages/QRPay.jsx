import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/common.css';
import '../styles/qrticket.css';

export default function QRPay() {
  const navigate = useNavigate();

  const handleConfirmPayment = async () => {
    const userId = localStorage.getItem('userId');

    if (!userId) {
      alert('User belum login!');
      return;
    }

    // Load actual tickets the user selected
    const ticketsToProcessString = localStorage.getItem('ticketsToProcess');
    let parsedTickets = {};

    try {
      parsedTickets = JSON.parse(ticketsToProcessString);
    } catch (err) {
      console.error('Failed to parse ticketsToProcess:', err);
      alert('Gagal memuat data tiket.');
      return;
    }

    // If no tickets found
    if (!parsedTickets || Object.keys(parsedTickets).length === 0) {
      alert('Tidak ada tiket yang dipilih.');
      return;
    }

    // Loop and send 1 POST request per ticket
    for (const ticketId in parsedTickets) {
      const ticket = parsedTickets[ticketId];

      const ticketData = {
        userId: userId,
        title: ticket.name,                 // from actual cart
        subtitle: ticket.description || '',  // if you have it (optional)
        quantity: ticket.quantity,           // actual quantity selected
      };

      console.log('Sending ticket purchase:', ticketData);

      try {
        const response = await fetch('http://localhost:3001/buy-ticket', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(ticketData),
        });

        const data = await response.json();

        if (!response.ok) {
          alert(`Gagal membeli tiket ${ticket.name}: ${data.message}`);
          continue;
        }

        console.log(`Berhasil membeli tiket ${ticket.name}`);
      } catch (error) {
        console.error('Error saat memproses pembayaran untuk tiket:', ticket.name, error);
      }
    }

    alert('Pembayaran berhasil, tiket ditambahkan ke akun Anda!');
    navigate('/Tiket');
  };

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

        <button
          onClick={handleConfirmPayment}
          className="btn-action-primary mt-6 inline-block"
        >
          KONFIRMASI BAYAR
        </button>
      </main>
    </div>
  );
}
