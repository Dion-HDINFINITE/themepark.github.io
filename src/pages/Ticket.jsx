import React, { useState } from 'react';
import '../styles/common.css';
import '../styles/ticket.css';
import { useNavigate } from 'react-router-dom';

export default function Ticket() {
  const [activeTab, setActiveTab] = useState('active');
  const navigate = useNavigate();

  const handleTabSwitch = (tab) => {
    setActiveTab(tab);
  };

  const renderTicketCard = (
    icon,
    title,
    subtitle,
    dateLabel,
    dateValue,
    quantity,
    status,
    statusClass,
    isClickable = false
  ) => {
    const cardContent = (
      <div className="ticket-item-card">
        <div className="ticket-header">
          <div className="ticket-icon">{icon}</div>
          <div>
            <div className="ticket-title">{title}</div>
            <div className="ticket-subtitle">{subtitle}</div>
          </div>
        </div>
        <div className="ticket-details">
          <div className="detail-row">
            <span className="detail-label">{dateLabel}</span>
            <span className="detail-value">{dateValue}</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">🎫 Jumlah Tiket</span>
            <span className="detail-value">{quantity} Tiket</span>
          </div>
          <div className="detail-row">
            <span className="detail-label">🎯 Status</span>
            <span className={`ticket-status-badge ${statusClass}`}>{status}</span>
          </div>
        </div>
      </div>
    );

    if (isClickable) {
      return (
        <div
          key={title}
          className="clickable-ticket-wrapper"
          onClick={() => navigate('/qrticket')}
          style={{ cursor: 'pointer' }}
        >
          {cardContent}
        </div>
      );
    }

    return <div key={title}>{cardContent}</div>;
  };

  return (
    <div className="ticket-page-container font-inter">
      {/* Decorative Circles */}
      <div className="decorative-circle circle-1"></div>
      <div className="decorative-circle circle-2"></div>

      {/* Tab Buttons */}
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

      {/* Active Tickets */}
      {activeTab === 'active' && (
        <div className="tab-content-section active">
          <div className="tickets-grid">
            {renderTicketCard('🎡', 'Dufan Ancol', 'Theme Park Adventure', '📅 Tanggal Kunjungan', '25 Mei 2025', 2, 'Aktif', 'status-active', true)}
            {renderTicketCard('🎢', 'Trans Studio Bandung', 'Indoor Theme Park', '📅 Tanggal Kunjungan', '28 Mei 2025', 4, 'Aktif', 'status-active', true)}
          </div>
        </div>
      )}

      {/* Ticket History */}
      {activeTab === 'history' && (
        <div className="tab-content-section active">
          <div className="tickets-grid">
            {renderTicketCard('🎠', 'Taman Safari Indonesia', 'Wildlife Adventure', '📅 Tanggal Kunjungan', '15 Mei 2025', 3, 'Sudah Digunakan', 'status-used')}
            {renderTicketCard('🎪', 'Jatim Park 1', 'Educational Theme Park', '📅 Tanggal Kunjungan', '10 Mei 2025', 2, 'Sudah Digunakan', 'status-used')}
            {renderTicketCard('🏰', 'Atlantis Water Adventure', 'Water Theme Park', '📅 Tanggal Pembelian', '02 Mei 2025', 1, 'Kedaluwarsa', 'status-expired')}
          </div>
        </div>
      )}
    </div>
  );
}
