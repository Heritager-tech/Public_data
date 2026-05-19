'use client';

import { useState, useEffect, useCallback } from 'react';
import Header from '@/components/edm/Header';
import MatrixRain from '@/components/edm/MatrixRain';
import HeroSection from '@/components/edm/HeroSection';
import SectionOne from '@/components/edm/SectionOne';
import SectionTwo from '@/components/edm/SectionTwo';
import SectionThree from '@/components/edm/SectionThree';
import SocialProof from '@/components/edm/SocialProof';
import ContactForm from '@/components/edm/ContactForm';
import Footer from '@/components/edm/Footer';
import InteractivePage from '@/components/edm/InteractivePage';
import DiagramsPage from '@/components/edm/DiagramsPage';
import FloatingShapes from '@/components/edm/FloatingShapes';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');

  // Scroll reveal observer — optimized
  const setupObserver = useCallback(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll('.reveal-on-scroll');
    elements.forEach((el) => observer.observe(el));

    return observer;
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const observer = setupObserver();
      return () => observer.disconnect();
    }, 80);

    return () => clearTimeout(timer);
  }, [currentPage, setupObserver]);

  const handleNavigate = (page: string) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <main className="relative min-h-screen bg-[#060d18]">
      {/* Matrix rain — always visible, very subtle */}
      <MatrixRain />

      {/* Floating white shapes — fixed background, stays while scrolling */}
      <FloatingShapes />

      {/* Header */}
      <Header currentPage={currentPage} onNavigate={handleNavigate} />

      {/* Page content */}
      {currentPage === 'home' && (
        <div className="relative z-10 page-fade-in">
          <HeroSection />
          <SectionOne />
          <SectionTwo />
          <SectionThree />
          <SocialProof />
          <ContactForm />
          <Footer />
        </div>
      )}

      {currentPage === 'interactive' && (
        <div className="relative z-10 page-fade-in">
          <InteractivePage onNavigate={handleNavigate} />
          <Footer />
        </div>
      )}

      {currentPage === 'diagrams' && (
        <div className="relative z-10 page-fade-in">
          <DiagramsPage onNavigate={handleNavigate} />
          <Footer />
        </div>
      )}
    </main>
  );
}
