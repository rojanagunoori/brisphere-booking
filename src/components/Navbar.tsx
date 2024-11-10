import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';  // Import react-scroll Link
import './Navbar.css';
import { FaSun, FaMoon } from 'react-icons/fa'; 

interface NavbarProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, darkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false); 
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="logo">Brisphere</h1>

      <div className='right-side'>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        
          <li>
            <Link to="/users" >Users</Link>
          </li>
          <li>
            <Link to="/posts" >Posts</Link>
          </li>
          <li>
            <Link to="/about-us" >About Us</Link>
          </li>
        </ul>

        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="hamburger" onClick={toggleMenu}>
          &#9776; 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;









/*import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Link as ScrollLink } from 'react-scroll';  // Import react-scroll Link
import './Navbar.css';
import { FaSun, FaMoon } from 'react-icons/fa'; 

interface NavbarProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, darkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false); 
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="logo">Brisphere</h1>

      <div className='right-side'>
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        
          <li>
            <ScrollLink to="discover" smooth={true} duration={500}>Discover</ScrollLink>
          </li>
          <li>
            <ScrollLink to="services" smooth={true} duration={500}>Services</ScrollLink>
          </li>
          <li>
            <ScrollLink to="about-us" smooth={true} duration={500}>About Us</ScrollLink>
          </li>
        </ul>

        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>

        <div className="hamburger" onClick={toggleMenu}>
          &#9776; 
        </div>
      </div>
    </nav>
  );
};

export default Navbar;

*/









/*import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import { FaSun, FaMoon } from 'react-icons/fa'; 

interface NavbarProps {
  toggleDarkMode: () => void;
  darkMode: boolean;
}

const Navbar: React.FC<NavbarProps> = ({ toggleDarkMode, darkMode }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prevState => !prevState);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsMenuOpen(false); 
      }
    };
    
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  return (
    <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
      <h1 className="logo">Brisphere</h1>

      <div className='right-side'>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/">Discover</Link></li>
        <li><Link to="/services">Services</Link></li>
        <li><Link to="/about-us">About Us</Link></li>
        <li><Link to="/book">Book</Link></li>
      </ul>

      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        {darkMode ? <FaSun /> : <FaMoon />}
      </button>

      <div className="hamburger" onClick={toggleMenu}>
        &#9776; 
      </div>
      </div>
    </nav>
  );
};

export default Navbar;
*/