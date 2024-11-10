import React, { useState } from 'react';
import './Header.css';
import { FaFacebook, FaInstagram, FaSun, FaMoon } from 'react-icons/fa'; // Icons for dark/light mode toggle

interface HeaderProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Header: React.FC<HeaderProps> = ({ toggleDarkMode, darkMode }) => {
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [rooms, setRooms] = useState(1);

  // Handle input changes
  const handleCheckInChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckInDate(e.target.value);
  };

  const handleCheckOutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCheckOutDate(e.target.value);
  };

  const handleRoomsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRooms(Number(e.target.value));
  };

  const handleBook = () => {
    alert(`Booking Details: 
      Check-In: ${checkInDate}, 
      Check-Out: ${checkOutDate}, 
      Rooms: ${rooms}`);
  };

  return (
    <header className={`header ${darkMode ? 'dark-mode' : ''}`}>
       <div className="header-content">
        {/* Left side: Text */}
        <div className="left-side">
          <h2>Work from Ladakh</h2>
          <p>India’s first true digital tourism ecosystem</p>

          {/* Social Media Icons */}
          <div className="social-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
              <FaInstagram size={30} />
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
              <FaFacebook size={30} />
            </a>
          </div>
        </div>

        {/* Right side: Image */}
        <div className="right-side">
          <img 
            src="https://img.freepik.com/free-photo/confluence-indus-zanskar-rivers-leh-ladakh-india_1150-11112.jpg" 
            alt="Ladakh" 
            className="responsive-image"
          />
        </div>
      </div>

      {/* Booking Form Box */}
      <div className={`booking-box ${darkMode ? 'dark-mode' : ''}`}>
        <h3>Book Your Stay</h3>
        <div className={`form ${darkMode ? 'dark-mode' : ''}`}>
          <div className="form-group">
            <label htmlFor="check-in">CHECK-IN</label>
            <input 
              type="date" 
              id="check-in" 
              value={checkInDate} 
              onChange={handleCheckInChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="check-out">CHECK-OUT</label>
            <input 
              type="date" 
              id="check-out" 
              value={checkOutDate} 
              onChange={handleCheckOutChange} 
            />
          </div>
          <div className="form-group">
            <label htmlFor="rooms">ROOMS</label>
            <select id="rooms" value={rooms} onChange={handleRoomsChange}>
              <option value={1}>1 Room</option>
              <option value={2}>2 Rooms</option>
              <option value={3}>3 Rooms</option>
              <option value={4}>4 Rooms</option>
            </select>
          </div>
          <button className="book-button" onClick={handleBook}>BOOK</button>
        </div>
      </div>

      
    </header>
  );
};

export default Header;
