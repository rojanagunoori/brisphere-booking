import React from 'react';
import './Footer.css';

const Footer: React.FC = () => {

  const openLocation = () => {
    const locationUrl = 'https://www.google.com/maps?q=Spituk,+Ladakh,+India,+194101';
    window.open(locationUrl, '_blank');
  };

  return (
    <footer className="footer">
      <h1>Brisphere</h1>
      <p>Spituk, Ladakh</p>
      <p>India, 194101</p>
      <p>+91 7764997033</p>
      <p>amit.jha6700@gmail.com</p>

      
      <button onClick={openLocation}>Location</button>
    </footer>
  );
};

export default Footer;
