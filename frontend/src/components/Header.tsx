import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true); // Si se hace scroll, cambia la clase
      } else {
        setIsScrolled(false); // Si no hay scroll, barra transparente
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
      <div className="logo-container">
        <Link to="/" className="logo-text">FAMI</Link>
      </div>
      <nav className="navigation">
        <Link to="/" className="header-button">Home</Link>
        <Link to="/about-us" className="header-button">About Us</Link>
        <Link to="/inscribete" className="header-button">Inscríbete</Link>
        <Link to="/instructores" className="header-button">Instructores</Link>
        <Link to="/horarios" className="header-button">Horarios</Link>
      </nav>
    </header>
  );
};

export default Header;
