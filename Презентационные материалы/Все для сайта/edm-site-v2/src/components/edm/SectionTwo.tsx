'use client';

import { useState } from 'react';
import ParallaxWindow from './ParallaxWindow';

const sectionData = {
  title: 'Процессное моделирование',
  subtitle: 'Операционная эффективность',
  description: 'Глубокий анализ и моделирование бизнес-процессов с использованием международных нотаций. От картирования текущего состояния до проектирования целевых процессов — мы помогаем создать эффективную операционную модель, которая минимизирует потери и максимизирует ценность для клиента.',
  bullets: [
    'BPMN 2.0, EPC и кросс-функциональные диаграммы',
    'Анализ узких мест и возможностей автоматизации',
    'Реинжиниринг процессов и целевая операционная модель',
  ],
  buttons: [
    { label: 'BPMN процессы', image: 'https://raw.githubusercontent.com/Heritager-tech/Public_data/main/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D1%8B/BPMN%20%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80.png' },
    { label: 'Карта процессов', image: 'https://raw.githubusercontent.com/Heritager-tech/Public_data/main/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D1%8B/%D0%9A%D0%B0%D1%80%D1%82%D0%B0%20%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D0%BE%D0%B2.drawio.png' },
    { label: 'Потоки ценности', image: 'https://raw.githubusercontent.com/Heritager-tech/Public_data/main/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D1%8B/%D0%9F%D0%BE%D1%82%D0%BE%D0%BA%D0%B8%20%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D1%8F%20%D1%86%D0%B5%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D0%B8.drawio.png' },
  ],
  bgImage: 'https://raw.githubusercontent.com/Heritager-tech/Public_data/main/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D1%8B/%D0%A4%D0%BE%D0%BD%20%D1%81%D0%B5%D0%BA%D1%86%D0%B8%D0%B8.png',
};

export default function SectionTwo() {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-28 px-6 section-teal overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row-reverse items-center gap-10 md:gap-16">
        {/* Parallax window — right */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end reveal-on-scroll">
          <ParallaxWindow
            images={sectionData.buttons.map(b => b.image)}
            bgImage={sectionData.bgImage}
            position="right"
            activeIndex={activeIdx}
          />
        </div>

        {/* Text — left */}
        <div className="w-full md:w-1/2 flex flex-col gap-5 reveal-on-scroll" style={{ transitionDelay: '150ms' }}>
          <span className="text-[#14b8a6] text-xs tracking-[0.35em] uppercase font-semibold">
            {sectionData.subtitle}
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-[1.15]">
            {sectionData.title}
          </h2>
          <p className="text-white/60 text-base md:text-lg leading-relaxed">
            {sectionData.description}
          </p>

          <ul className="flex flex-col gap-2.5 mt-1">
            {sectionData.bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3 text-white/60 text-sm">
                <svg className="w-4 h-4 text-[#14b8a6] mt-0.5 shrink-0" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M3 8l4 4 6-7" />
                </svg>
                {b}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2.5 mt-3">
            {sectionData.buttons.map((btn, idx) => (
              <button
                key={idx}
                className={`switch-btn ${activeIdx === idx ? 'active' : ''}`}
                onClick={() => setActiveIdx(idx)}
                aria-pressed={activeIdx === idx}
              >
                {btn.label}
              </button>
            ))}
          </div>

          {/* Mid-journey CTA */}
          <button
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="mt-6 text-[#14b8a6] text-sm font-medium flex items-center gap-2 hover:gap-3 transition-all duration-300 group/cta"
          >
            Оптимизировать процессы
            <svg className="w-4 h-4 transition-transform group-hover/cta:translate-x-1" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
