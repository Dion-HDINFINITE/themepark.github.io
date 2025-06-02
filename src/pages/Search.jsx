import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import '../styles/search.css';

const availableTickets = [
  { id: 'dufan', name: 'Dufan', price: 150000, city: 'Jakarta', dates: ['2025-06-01', '2025-06-08', '2025-06-15'] },
  { id: 'transstudiobdg', name: 'Trans Studio Bandung', price: 180000, city: 'Bandung', dates: ['2025-06-01', '2025-06-09', '2025-06-16'] },
  { id: 'jatimpark', name: 'Jatim Park', price: 120000, city: 'Malang', dates: ['2025-06-03', '2025-06-10', '2025-06-17'] },
  { id: 'ancol', name: 'Ancol Dreamland', price: 160000, city: 'Jakarta', dates: ['2025-06-01', '2025-06-07', '2025-06-14'] },
  { id: 'tamanmini', name: 'Taman Mini Indonesia', price: 100000, city: 'Jakarta', dates: ['2025-06-05', '2025-06-12', '2025-06-19'] }
];

export default function Search() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [filterCity, setFilterCity] = useState('');
  const [filterDate, setFilterDate] = useState('');
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [selectedTickets, setSelectedTickets] = useState({});
  const [modal, setModal] = useState({ visible: false, title: '', message: '' });

  useEffect(() => {
    const cityParam = searchParams.get('city') || '';
    const dateParam = searchParams.get('date') || '';
    setFilterCity(cityParam);
    setFilterDate(dateParam);

    const storedTickets = localStorage.getItem('selectedTickets');
    if (storedTickets) {
      try {
        const parsed = JSON.parse(storedTickets);
        const filtered = Object.fromEntries(Object.entries(parsed).filter(([_, v]) => v != null));
        setSelectedTickets(filtered);
      } catch {
        setSelectedTickets({});
      }
    }
  }, [searchParams]);

  useEffect(() => {
    const filtered = availableTickets.filter(ticket => {
      const matchesCity = ticket.city.toLowerCase().trim() === filterCity.toLowerCase().trim();
      const matchesDate = ticket.dates.includes(filterDate.trim());
      return matchesCity && matchesDate;
    });
    setFilteredTickets(filtered);
  }, [filterCity, filterDate]);

  useEffect(() => {
    localStorage.setItem('selectedTickets', JSON.stringify(selectedTickets));
  }, [selectedTickets]);

  function showMessage(title, message) {
    setModal({ visible: true, title, message });
  }

  function hideMessage() {
    setModal({ visible: false, title: '', message: '' });
  }

  function adjustQuantity(ticketId, delta) {
    setSelectedTickets(prev => {
      const current = prev[ticketId]?.quantity || 0;
      const newQuantity = current + delta;
      if (newQuantity <= 0) {
        const updated = { ...prev };
        delete updated[ticketId];
        return updated;
      }
      return {
        ...prev,
        [ticketId]: {
          ...availableTickets.find(t => t.id === ticketId),
          quantity: newQuantity,
        }
      };
    });
  }

  function showCounter(ticketId) {
    setSelectedTickets(prev => {
      if (prev[ticketId] && prev[ticketId].quantity > 0) return prev;
      const ticket = availableTickets.find(t => t.id === ticketId);
      return {
        ...prev,
        [ticketId]: { ...ticket, quantity: 1 }
      };
    });
  }

  function checkout() {
    const totalSelected = Object.values(selectedTickets).reduce((sum, t) => sum + (t?.quantity || 0), 0);
    if (totalSelected === 0) {
      showMessage("Peringatan", "Pilih tiket terlebih dahulu.");
      return;
    }
    localStorage.setItem('checkoutType', 'multiple');
    localStorage.setItem('ticketsToProcess', JSON.stringify(selectedTickets));
    navigate('/bought');
  }

  const hasSelectedTickets = Object.values(selectedTickets).some(t => t && t.quantity > 0);

  return (
    <div className="min-h-screen">
      <div className="search-container">
        <h1 className="page-title">Tiket Tersedia</h1>
        <p className="page-subtitle">Temukan tiket taman hiburan impianmu!</p>

        <div className="filter-controls">
          <input
            type="text"
            id="filter-city"
            placeholder="Kota"
            className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
            value={filterCity}
            onChange={e => setFilterCity(e.target.value)}
          />
          <input
            type="date"
            id="filter-date"
            className="focus:outline-none focus:ring-2 focus:ring-blue-400 rounded-md"
            value={filterDate}
            onChange={e => setFilterDate(e.target.value)}
          />
        </div>

        <div className="ticket-list" id="ticketList">
          {filteredTickets.length > 0 ? (
            filteredTickets.map(ticket => {
              const selected = selectedTickets[ticket.id];
              return (
                <div key={ticket.id} className="ticket-card" data-id={ticket.id}>
                  <div>
                    <h3>{ticket.name}</h3>
                    <p>Rp {ticket.price.toLocaleString('id-ID')}</p>
                  </div>
                  <div className="quantity-control">
                    {selected && selected.quantity > 0 ? (
                      <div className="counter-box">
                        <button onClick={() => adjustQuantity(ticket.id, -1)}>-</button>
                        <span>{selected.quantity}</span>
                        <button onClick={() => adjustQuantity(ticket.id, 1)}>+</button>
                      </div>
                    ) : (
                      <button className="select-ticket-btn" onClick={() => showCounter(ticket.id)}>Tambah</button>
                    )}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 mt-4">Tidak ada tiket yang cocok dengan pencarian Anda.</p>
          )}
        </div>

        {hasSelectedTickets && (
          <div id="checkoutBox">
            <button onClick={checkout}>Checkout</button>
          </div>
        )}
      </div>

      {modal.visible && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>{modal.title}</h2>
            <p>{modal.message}</p>
            <button onClick={hideMessage}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
