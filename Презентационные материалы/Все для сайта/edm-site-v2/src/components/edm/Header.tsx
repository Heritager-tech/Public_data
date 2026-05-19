'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Header({ currentPage, onNavigate }: HeaderProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navItems = [
    { key: 'home', label: 'Главная' },
    { key: 'interactive', label: 'Интерактив' },
    { key: 'diagrams', label: 'Схемы' },
  ];

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[100] header-glass ${scrolled ? 'scrolled' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          {/* Logo + Company Name */}
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-3.5 group cursor-pointer"
            aria-label="EDM Consulting — на главную"
          >
            <div className="relative w-11 h-11 overflow-hidden transition-transform duration-300 group-hover:scale-110">
              <Image
                src="/tree-logo.png"
                alt=""
                width={44}
                height={44}
                className="object-contain"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="text-white font-bold text-lg tracking-wide leading-tight">
                <span className="text-[#14b8a6]">EDM</span>
                <span className="text-white/60 mx-1.5">—</span>
                <span className="text-[#a78bfa]">Consulting</span>
              </span>
              <span className="text-white/50 text-[10px] tracking-[0.25em] uppercase leading-tight mt-0.5">
                Enterprise Architecture
              </span>
            </div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-7">
            {navItems.map(item => (
              <button
                key={item.key}
                onClick={() => onNavigate(item.key)}
                className={`nav-link text-sm tracking-wide ${
                  currentPage === item.key
                    ? 'text-[#14b8a6] active'
                    : 'text-white/50 hover:text-white/90'
                }`}
              >
                {item.label}
              </button>
            ))}
            {/* CTA in header — McKinsey pattern */}
            <button
              onClick={() => { onNavigate('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
              className="ml-2 px-5 py-2 bg-[#14b8a6]/10 text-[#14b8a6] text-[13px] font-semibold rounded-lg border border-[#14b8a6]/25 hover:bg-[#14b8a6]/20 hover:border-[#14b8a6]/40 transition-all duration-300"
            >
              Связаться
            </button>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(true)}
            className="md:hidden text-white/60 hover:text-white p-2 -mr-2"
            aria-label="Открыть меню"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <path d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </header>

      {/* Mobile Menu — slide-in panel */}
      <div className={`mobile-menu-overlay ${mobileOpen ? 'open' : ''}`} onClick={() => setMobileOpen(false)} />
      <div className={`mobile-menu-panel ${mobileOpen ? 'open' : ''}`}>
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-5 right-5 text-white/50 hover:text-white p-2"
          aria-label="Закрыть меню"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        </button>

        <div className="flex flex-col gap-2">
          {navItems.map(item => (
            <button
              key={item.key}
              onClick={() => { onNavigate(item.key); setMobileOpen(false); }}
              className={`text-left py-3 px-4 rounded-xl text-base transition-all duration-200 ${
                currentPage === item.key
                  ? 'text-[#14b8a6] bg-[#14b8a6]/10 font-semibold'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
              }`}
            >
              {item.label}
            </button>
          ))}
          <div className="mt-6 pt-6 border-t border-white/10">
            <button
              onClick={() => { onNavigate('home'); setMobileOpen(false); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
              className="cta-primary w-full justify-center text-sm"
            >
              Связаться с нами
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
