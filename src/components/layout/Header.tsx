'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [hindiDate, setHindiDate] = useState('');

  useEffect(() => {
    const date = new Date();
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    setHindiDate(date.toLocaleDateString('hi-IN', options));
    
    // Check initial dark mode
    if (typeof window !== 'undefined') {
      const isDark = document.body.classList.contains('dark-mode') || 
                     localStorage.getItem('ika_theme') === 'dark';
      setIsDarkMode(isDark);
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !isDarkMode;
    setIsDarkMode(newMode);
    if (newMode) {
      document.body.classList.add('dark-mode');
      localStorage.setItem('ika_theme', 'dark');
    } else {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('ika_theme', 'light');
    }
  };

  const categories = [
    { name: '🔴 ताज़ा खबर', id: 'breaking' },
    { name: '🏛️ राजनीति', id: 'politics' },
    { name: '🚔 अपराध', id: 'crime' },
    { name: '🎬 मनोरंजन', id: 'entertainment' },
    { name: '🏏 खेल', id: 'sports' },
    { name: '💼 व्यापार', id: 'business' },
    { name: '🏥 स्वास्थ्य', id: 'health' },
    { name: '📚 शिक्षा', id: 'education' },
    { name: '📍 स्थानीय', id: 'local' },
    { name: '🎥 वीडियो', id: 'video' },
  ];

  return (
    <>
      {/* ═══ Top Bar ═══ */}
      <div className="top-bar">
        <div className="container flex-between">
          <div className="date-display">
            <i className="far fa-calendar-alt"></i>
            <span>{hindiDate}</span>
          </div>
          <div className="top-bar-links">
            <Link href="/about">हमारे बारे में</Link>
            <Link href="/contact">संपर्क करें</Link>
            <Link href="/admin">Admin</Link>
          </div>
          <div className="social-icons">
            <a href="https://www.facebook.com/Internetkiawaaz/" target="_blank" rel="noreferrer" aria-label="Facebook"><i className="fab fa-facebook-f"></i></a>
            <a href="https://www.instagram.com/internetkiawaaz" target="_blank" rel="noreferrer" aria-label="Instagram"><i className="fab fa-instagram"></i></a>
            <a href="https://www.youtube.com/internetkiawaaz" target="_blank" rel="noreferrer" aria-label="YouTube"><i className="fab fa-youtube"></i></a>
            <button className="dark-mode-toggle" aria-label="Toggle dark mode" onClick={toggleDarkMode}>
              <i className={isDarkMode ? 'fas fa-sun' : 'fas fa-moon'}></i>
            </button>
          </div>
        </div>
      </div>

      {/* ═══ Header ═══ */}
      <header className="site-header" id="site-header">
        <div className="container">
          <div className="header-main">
            <Link href="/" className="logo">
              <img src="/assets/images/logo.png" alt="इंटरनेट की आवाज़" className="logo-img" />
              <div className="logo-text">
                <span className="logo-name">इंटरनेट की आवाज़</span>
                <span className="logo-tagline">सच की आवाज़, हर ख़बर आपके साथ</span>
              </div>
            </Link>
            <div className="search-bar" id="header-search">
              <i className="fas fa-search search-icon"></i>
              <input type="text" placeholder="खबरें खोजें..." aria-label="Search news" />
            </div>
          </div>
        </div>
        <nav className="main-nav" id="main-nav">
          <div className="container flex-between">
            <ul className="nav-list">
              <li className="nav-item"><Link href="/"><i className="fas fa-home"></i> होम</Link></li>
              {categories.map(cat => (
                <li className="nav-item" key={cat.id}><Link href={`/category/${cat.id}`}>{cat.name}</Link></li>
              ))}
            </ul>
            <button className="menu-toggle" aria-label="Open menu" onClick={() => setIsMobileMenuOpen(true)}>
              <i className="fas fa-bars"></i>
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'active' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${isMobileMenuOpen ? 'active' : ''}`}>
        <div style={{ padding: '0 var(--space-6)', marginBottom: 'var(--space-4)' }}>
          <Link href="/" className="logo" style={{ marginBottom: 'var(--space-4)', display: 'flex', gap: '8px', alignItems: 'center' }}>
            <img src="/assets/images/logo.png" alt="Logo" style={{ height: '36px' }} />
            <span style={{ color: 'var(--color-primary)', fontWeight: 800, fontSize: '1.1rem' }}>इंटरनेट की आवाज़</span>
          </Link>
        </div>
        <ul>
          <li className="nav-item"><Link href="/" onClick={() => setIsMobileMenuOpen(false)}><i className="fas fa-home"></i> होम</Link></li>
          {categories.map(cat => (
            <li className="nav-item" key={cat.id}>
              <Link href={`/category/${cat.id}`} onClick={() => setIsMobileMenuOpen(false)}>{cat.name}</Link>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
