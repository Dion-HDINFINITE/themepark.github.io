import React, { useEffect, useState } from 'react';
import '../styles/bought_pay.css';
import { useNavigate } from 'react-router-dom';

export default function Bought() {
  const [tickets, setTickets] = useState([]);
  const [subtotal, setSubtotal] = useState(0);
  const applicationFee = 4329;
  const navigate = useNavigate();

  useEffect(() => {
    const ticketsToProcessString = localStorage.getItem('ticketsToProcess');
    let parsedTickets = {};

    if (ticketsToProcessString) {
      try {
        parsedTickets = JSON.parse(ticketsToProcessString);
      } catch (error) {
        console.error("Gagal memparsing tiket dari localStorage:", error);
      }
    }

    const ticketArray = [];
    let calculatedSubtotal = 0;

    for (const ticketId in parsedTickets) {
      const ticket = parsedTickets[ticketId];
      if (ticket?.name && ticket?.price && ticket?.quantity) {
        const itemTotal = ticket.price * ticket.quantity;
        calculatedSubtotal += itemTotal;
        ticketArray.push({ ...ticket, itemTotal });
      }
    }

    setTickets(ticketArray);
    setSubtotal(calculatedSubtotal);
  }, []);

  const handlePayment = () => {
    navigate('/qrpay');
  };

  const grandTotal = subtotal + applicationFee;

  return (
    <div className="min-h-screen flex flex-col font-inter payment-container">
      <main className="payment-section flex-grow">
        <h3 className="text-lg font-semibold mb-4">Pesanan Anda</h3>

        {tickets.length > 0 ? (
          tickets.map((ticket, idx) => (
            <div className="info-row" key={idx}>
              <span>{ticket.name} ({ticket.quantity} tiket)&nbsp;</span>
              <span>Rp{ticket.itemTotal.toLocaleString('id-ID')}</span>
            </div>
          ))
        ) : (
          <div className="info-row">
            <span>Tidak ada tiket yang dipilih.</span>
            <span>Rp 0</span>
          </div>
        )}

        <div className="info-row">
          <span>Subtotal&nbsp;</span>
          <span>Rp{subtotal.toLocaleString('id-ID')}</span>
        </div>
        <div className="info-row">
          <span>Biaya Aplikasi&nbsp;</span>
          <span>Rp{applicationFee.toLocaleString('id-ID')}</span>
        </div>
        <div className="total-row">
          <span>Grand Total&nbsp;</span>
          <span>Rp{grandTotal.toLocaleString('id-ID')}</span>
        </div>

        <button className="action-btn" onClick={handlePayment}>
          BAYAR TIKET
        </button>
      </main>
    </div>
  );
}
