import React, { useState } from 'react';
import '../styles/common.css';
import '../styles/index.css';
import { useNavigate, Link } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();
  const [city, setCity] = useState('');
  const [date, setDate] = useState('');

  const handleSearch = () => {
    if (!city || !date) {
      alert('Mohon pilih kota dan tanggal!');
      return;
    }

    const params = new URLSearchParams({ city, date });
    navigate(`/search?${params.toString()}`);
  };

  return (
    <>
    <div className="hero-booking-background">
      <section className="hero-section">
        <h1>TIKETIN</h1>
        <p>Temukan dan pesan tiket taman hiburan favoritmu dengan mudah!</p>
      </section>

      <section className="booking-section">
        <div className="form-row">
          <div className="form-group">
            <label htmlFor="city">Kota</label>
            <select
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            >
              <option value="">-- Pilih Kota --</option>
              <option value="Jakarta">Jakarta</option>
              <option value="Bandung">Bandung</option>
              <option value="Surabaya">Surabaya</option>
              <option value="Yogyakarta">Yogyakarta</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">Tanggal</label>
            <input
              type="date"
              id="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>

        <button className="search-button" onClick={handleSearch}>
          Cari Tiket!
        </button>

        <p className="notice-text">
          Mohon untuk cek kembali waktu dan tanggal booking
        </p>
      </section>
    </div>



      <section className="content-blocks-section">
        <div className="image-text-block">
          <div
            className="image"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1505731110654-99d7f7f8e39c?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
            }}
          ></div>
          <div className="text">
            <h2>Batavia Park</h2>
            <p>
              Batavia Park adalah taman hiburan ikonik di jantung Jakarta. Rasakan petualangan mendebarkan dan pesona budaya Indonesia yang memukau, cocok untuk semua usia.
            </p>
          </div>
        </div>

        <div className="image-text-block reverse">
          <div
            className="image"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1715449187015-3f8b18d3587b?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
            }}
          ></div>
          <div className="text">
            <h2>Pacific Park</h2>
            <p>
              Pacific Park adalah taman hiburan terkemuka di Bandung yang menawarkan petualangan tak terlupakan dengan wahana seru dan atraksi unik. Nikmati keseruan untuk seluruh keluarga!
            </p>
          </div>
        </div>

        <div className="image-text-block">
          <div
            className="image"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1603707112961-46e6a1ee5ba7?q=80&w=1931&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
            }}
          ></div>
          <div className="text">
            <h2>Suro Park</h2>
            <p>
              Suro Park adalah taman hiburan keluarga favorit di Surabaya. Nikmati beragam wahana seru, area bermain yang aman, dan suasana riang gembira yang kental dengan semangat dan keramahan khas Surabaya, ideal untuk bersantai dan bersenang-senang.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
