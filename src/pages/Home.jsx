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
                "url('https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
            }}
          ></div>
          <div className="text">
            <h2>Welcome to NamaThemePark</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
              dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
              auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
            </p>
          </div>
        </div>

        <div className="image-text-block reverse">
          <div
            className="image"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
            }}
          ></div>
          <div className="text">
            <h2>Our Attractions</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
              dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
              auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
            </p>
          </div>
        </div>

        <div className="image-text-block">
          <div
            className="image"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1513889961551-628c1e5e2ee9?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80')"
            }}
          ></div>
          <div className="text">
            <h2>Plan Your Visit</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in
              dui mauris. Vivamus hendrerit arcu sed erat molestie vehicula. Sed
              auctor neque eu tellus rhoncus ut eleifend nibh porttitor.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
