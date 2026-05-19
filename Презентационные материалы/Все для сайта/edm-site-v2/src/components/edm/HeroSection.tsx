'use client';

import Image from 'next/image';

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden section-black">
      {/* Decorative floating elements — EA-themed */}
      <div className="floating-element" style={{ top: '12%', left: '8%', width: '60px', height: '60px', animationDelay: '0s' }} />
      <div className="floating-element" style={{ top: '22%', right: '12%', width: '40px', height: '40px', animationDelay: '1.5s', borderColor: 'rgba(167,139,250,0.08)' }} />
      <div className="floating-element" style={{ bottom: '25%', left: '15%', width: '35px', height: '35px', animationDelay: '3s', borderColor: 'rgba(217,119,6,0.08)' }} />
      <div className="floating-element" style={{ top: '35%', right: '6%', width: '50px', height: '50px', animationDelay: '4.5s' }} />
      <div className="floating-element" style={{ bottom: '35%', right: '20%', width: '28px', height: '28px', animationDelay: '2s', borderColor: 'rgba(167,139,250,0.06)' }} />

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-5 px-6">
        {/* Benefit statement above logo — McKinsey pattern */}
        <div className="reveal-on-scroll">
          <span className="text-[#14b8a6]/70 text-sm md:text-base tracking-[0.35em] uppercase font-medium">
            Выравниваем стратегию и технологии
          </span>
        </div>

        {/* Logo — Tree2 */}
        <div className="relative w-36 h-36 md:w-48 md:h-48 reveal-on-scroll" style={{ transitionDelay: '100ms' }}>
          <Image
            src="/tree-logo.png"
            alt="EDM Consulting — логотип Дерево"
            width={192}
            height={192}
            className="object-contain"
            style={{ filter: 'drop-shadow(0 0 40px rgba(20, 184, 166, 0.25))' }}
            priority
          />
        </div>

        {/* Company Name */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-wide reveal-on-scroll" style={{ transitionDelay: '200ms' }}>
          <span className="text-[#14b8a6]">EDM</span>
          <span className="text-white/60 mx-2 md:mx-3">—</span>
          <span className="text-[#a78bfa]">Consulting</span>
        </h1>

        {/* Value subtitle — research formula */}
        <p className="text-white/60 text-base md:text-lg tracking-[0.2em] uppercase text-center reveal-on-scroll" style={{ transitionDelay: '300ms' }}>
          Business Architecture &amp; Enterprise Modeling
        </p>

        {/* CTA buttons — winning hero pattern */}
        <div className="flex flex-col sm:flex-row gap-4 mt-4 reveal-on-scroll" style={{ transitionDelay: '400ms' }}>
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="cta-primary"
          >
            Начать проект
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>
          <button
            onClick={() => document.getElementById('section-architecture')?.scrollIntoView({ behavior: 'smooth' })}
            className="cta-secondary"
          >
            Узнать больше
          </button>
        </div>
      </div>

      {/* Flow lines from logo — subtle, architectural */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none" aria-hidden="true">
        <div className="flow-line" style={{ height: '180px', left: '46%', top: '58%', transform: 'rotate(6deg)' }} />
        <div className="flow-line" style={{ height: '150px', left: '50%', top: '54%', transform: 'rotate(-10deg)', animationDelay: '0.6s' }} />
        <div className="flow-line" style={{ height: '200px', left: '54%', top: '56%', transform: 'rotate(18deg)', animationDelay: '1.2s' }} />
        <div className="flow-line" style={{ height: '140px', left: '42%', top: '52%', transform: 'rotate(-22deg)', animationDelay: '1.8s' }} />
        <div className="flow-line" style={{ height: '170px', left: '58%', top: '60%', transform: 'rotate(30deg)', animationDelay: '0.9s' }} />
        <div className="flow-line" style={{ height: '130px', left: '38%', top: '56%', transform: 'rotate(-35deg)', animationDelay: '2.4s' }} />
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-white/40 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <div className="w-5 h-8 rounded-full border border-white/15 flex justify-center pt-1.5">
          <div className="w-1 h-2 bg-[#14b8a6]/70 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
}
