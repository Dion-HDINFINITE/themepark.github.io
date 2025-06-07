import React, { useEffect, useState } from 'react';
import '../styles/common.css';
import '../styles/ticket.css';
import { useNavigate } from 'react-router-dom';

export default function Ticket() {
  const [activeTab, setActiveTab] = useState('active');
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const fetchTickets = async () => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      console.error('User not logged in');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3001/my-tickets?userId=${userId}`);
      const data = await response.json();

      if (!response.ok) {
        console.error('Failed to fetch tickets:', data.message);
        return;
      }

      console.log('Fetched tickets from backend:', data.tickets);
      setTickets(data.tickets);
      console.log('Tickets from backend (with statuses):', data.tickets.map(t => `${t.status}`));
    } catch (error) {
      console.error('Error fetching tickets:', error);
    }
  };

  useEffect(() => {
    fetchTickets();
  }, []);

  const renderTicketCard = (ticket, isClickable = false, keyIndex = 0) => {
const handleCancel = async (e) => {
  e.stopPropagation();

  const confirmCancel = window.confirm('Apakah Anda yakin ingin membatalkan tiket ini?');
  if (!confirmCancel) return;

  try {
    console.log('Sending cancel ticket request:', {
      ticketId: ticket.id,
      userId: localStorage.getItem('userId'),
    });

    const response = await fetch('http://localhost:3001/cancel-ticket', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ticketId: ticket.id,
        userId: localStorage.getItem('userId'),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.message || 'Gagal membatalkan tiket');
      return;
    }

    alert('Tiket berhasil dibatalkan!');
    fetchTickets();
  } catch (err) {
    console.error(err);
    alert('Terjadi kesalahan.');
  }
};

    const cardContent = (
      <div className="ticket-item-card">
        <div className="ticket-header">
          <div className="ticket-icon">🎫</div>
          <div>
            <div className="ticket-title">{ticket.title}</div>
            <div className="ticket-subtitle">{ticket.subtitle}</div>
          </div>
        </div>
        <div className="ticket-details">
          <div className="detail-row">
            <span className="detail-label">📅 Tanggal Kunjungan</span>
            <span className="detail-value">{ticket.date}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">🎫 Jumlah Tiket</span>
            <span className="detail-value">{ticket.quantity} Tiket</span>
          </div>
          <div className="detail-row">
            <span
              className={`ticket-status-badge ${
                ticket.status === 'Aktif'
                  ? 'status-active'
                  : ticket.status === 'Sudah Digunakan'
                  ? 'status-used'
                  : ticket.status === 'Dibatalkan'
                  ? 'status-expired'
                  : 'status-expired'
              }`}
            >
              {ticket.status}
            </span>
          </div>
          {ticket.status === 'Aktif' && (
            <div className="detail-row">
              <button
                onClick={handleCancel}
                style={{
                  marginTop: '0.5rem',
                  padding: '0.3rem 0.7rem',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                }}
              >
                Batalkan Tiket
              </button>
            </div>
          )}
        </div>
      </div>
    );

    if (isClickable) {
      return (
        <div
          key={ticket.id || keyIndex}
          className="clickable-ticket-wrapper"
          onClick={() => navigate('/qrticket')}
          style={{ cursor: 'pointer' }}
        >
          {cardContent}
        </div>
      );
    }

    return <div key={ticket.id || keyIndex}>{cardContent}</div>;
  };

  console.log('Tickets state:', tickets);

  return (
    <div className="ticket-page-container font-inter">
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>

      <div className="tab-navigation">
        <button
          className={`tab-btn ${activeTab === 'active' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('active')}
        >
          Tiket Aktif
        </button>
        <button
          className={`tab-btn ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => handleTabSwitch('history')}
        >
          Riwayat Tiket
        </button>
      </div>

      {activeTab === 'active' && (
        <div className="tab-content-section active">
          <div className="tickets-grid">
            {(() => {
              const activeTickets = tickets.filter(
                (t) => t.status?.trim().toLowerCase() === 'aktif'
              );
              console.log('Active tickets:', activeTickets);
              return activeTickets.map((ticket, i) => renderTicketCard(ticket, true, i));
            })()}
          </div>
        </div>
      )}

      {activeTab === 'history' && (
        <div className="tab-content-section active">
          <div className="tickets-grid">
            {(() => {
              const historyTickets = tickets.filter(
                (t) => t.status?.trim().toLowerCase() !== 'aktif'
              );
              console.log('History tickets:', historyTickets);
              return historyTickets.map((ticket, i) => renderTicketCard(ticket, false, i));
            })()}
          </div>
        </div>
      )}
    </div>
  );
}
