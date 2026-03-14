import React, { useState, useEffect } from 'react';

const Header = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToSection = (e, id) => {
        e.preventDefault();
        setMobileMenuOpen(false);
        const element = document.getElementById(id);
        if (element) {
            const offset = 80; // Header height
            const bodyRect = document.body.getBoundingClientRect().top;
            const elementRect = element.getBoundingClientRect().top;
            const elementPosition = elementRect - bodyRect;
            const offsetPosition = elementPosition - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    };

    return (
        <header className={`header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="container header-container">
                <a href="#" className="logo" onClick={(e) => scrollToSection(e, 'hero')}>
                    <span className="logo-icon">UP!</span>
                    <span className="logo-text">RSC<span className="logo-sub">令和スキルアップ研究会</span></span>
                </a>

                {/* Desktop Nav */}
                <nav className="nav-desktop">
                    <ul className="nav-list">
                        <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>RSCについて</a></li>
                        <li><a href="#events" onClick={(e) => scrollToSection(e, 'events')}>イベント</a></li>
                        <li>
                            <a href="#apply" className="btn btn-primary btn-sm" onClick={(e) => scrollToSection(e, 'apply')}>
                                参加を申し込む
                            </a>
                        </li>
                    </ul>
                </nav>

                {/* Mobile Hamburger */}
                <button 
                    className="mobile-menu-btn" 
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <div className={`hamburger ${mobileMenuOpen ? 'active' : ''}`}>
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </button>
            </div>

            {/* Mobile Nav Overlay */}
            <div className={`mobile-nav ${mobileMenuOpen ? 'open' : ''}`}>
                <div className="mobile-nav-inner">
                    <ul className="mobile-nav-list">
                        <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')}>RSCについて</a></li>
                        <li><a href="#events" onClick={(e) => scrollToSection(e, 'events')}>イベント一覧</a></li>
                        <li style={{ marginTop: '20px' }}>
                            <a href="#apply" className="btn btn-primary" onClick={(e) => scrollToSection(e, 'apply')} style={{ width: '100%' }}>
                                参加を申し込む
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <style>{`
                .header {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 80px;
                    background-color: transparent;
                    transition: all var(--transition-normal);
                    z-index: 1000;
                    display: flex;
                    align-items: center;
                }
                .header.scrolled {
                    background-color: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(10px);
                    box-shadow: var(--shadow-sm);
                }
                .header-container {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .logo {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    text-decoration: none;
                }
                .logo-icon {
                    background: linear-gradient(135deg, var(--color-primary), var(--color-primary-light));
                    color: white;
                    font-family: var(--font-heading);
                    font-weight: 800;
                    font-size: 1.1rem;
                    width: 44px;
                    height: 44px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    border-radius: 12px;
                    transform: rotate(-5deg);
                    box-shadow: 0 4px 10px rgba(16, 185, 129, 0.3);
                }
                .logo-text {
                    font-family: var(--font-heading);
                    font-weight: 800;
                    font-size: 1.5rem;
                    color: var(--color-text-main);
                    display: flex;
                    flex-direction: column;
                    line-height: 1.1;
                }
                .logo-sub {
                    font-size: 0.75rem;
                    color: var(--color-text-muted);
                    font-weight: 700;
                }
                
                .nav-desktop {
                    display: none;
                }
                @media (min-width: 768px) {
                    .nav-desktop {
                        display: block;
                    }
                }
                .nav-list {
                    display: flex;
                    align-items: center;
                    gap: 32px;
                    list-style: none;
                }
                .nav-list a:not(.btn) {
                    font-family: var(--font-heading);
                    font-weight: 700;
                    color: var(--color-text-main);
                    position: relative;
                }
                .nav-list a:not(.btn)::after {
                    content: '';
                    position: absolute;
                    bottom: -4px;
                    left: 0;
                    width: 0;
                    height: 3px;
                    background-color: var(--color-accent);
                    border-radius: var(--radius-full);
                    transition: width var(--transition-fast);
                }
                .nav-list a:not(.btn):hover::after {
                    width: 100%;
                }
                .btn-sm {
                    padding: 8px 20px;
                    font-size: 0.95rem;
                }

                /* Mobile Menu */
                .mobile-menu-btn {
                    display: block;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    z-index: 1001;
                    padding: 8px;
                }
                @media (min-width: 768px) {
                    .mobile-menu-btn {
                        display: none;
                    }
                }
                .hamburger {
                    width: 24px;
                    height: 20px;
                    position: relative;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                }
                .hamburger span {
                    display: block;
                    width: 100%;
                    height: 3px;
                    background-color: var(--color-text-main);
                    border-radius: 3px;
                    transition: all 0.3s ease-in-out;
                    transform-origin: left center;
                }
                .hamburger.active span:nth-child(1) { transform: rotate(45deg); }
                .hamburger.active span:nth-child(2) { opacity: 0; width: 0; }
                .hamburger.active span:nth-child(3) { transform: rotate(-45deg); }

                .mobile-nav {
                    position: fixed;
                    top: 0;
                    right: -100%;
                    width: 80%;
                    max-width: 320px;
                    height: 100vh;
                    background-color: var(--color-surface);
                    box-shadow: -5px 0 15px rgba(0,0,0,0.05);
                    transition: right 0.4s cubic-bezier(0.4, 0, 0.2, 1);
                    z-index: 999;
                    display: flex;
                    align-items: center;
                }
                .mobile-nav.open {
                    right: 0;
                }
                .mobile-nav-inner {
                    padding: 40px;
                    width: 100%;
                }
                .mobile-nav-list {
                    list-style: none;
                    display: flex;
                    flex-direction: column;
                    gap: 24px;
                    text-align: center;
                }
                .mobile-nav-list a:not(.btn) {
                    font-family: var(--font-heading);
                    font-weight: 700;
                    font-size: 1.25rem;
                    color: var(--color-text-main);
                }
            `}</style>
        </header>
    );
};

export default Header;
