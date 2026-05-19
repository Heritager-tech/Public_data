'use client';

import { useState } from 'react';

const diagrams = [
  {
    title: 'Архитектура предприятия',
    tag: 'Стратегия',
    description: 'Полная модель архитектуры предприятия, включающая стратегический, бизнес- и технологический слои. Схема демонстрирует взаимосвязь между целями организации, бизнес-процессами и поддерживающими информационными системами, обеспечивая целостное понимание текущего состояния и целевого образа.',
    image: 'https://raw.githubusercontent.com/Heritager-tech/Public_data/main/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D1%8B/%D0%9B%D0%B0%D0%BD%D0%B4%D1%88%D0%B0%D1%84%D1%82%20%D1%81%D0%BF%D0%BE%D1%81%D0%BE%D0%B1%D0%BD%D0%BE%D1%81%D1%82%D0%B8%203%D0%B4.png',
  },
  {
    title: 'Карта бизнес-процессов',
    tag: 'Процессы',
    description: 'Детальная карта процессов верхнего уровня, отображающая основные и вспомогательные процессы организации. Каждый процесс связан с бизнес-способностями и стратегическими целями, что позволяет оценить вклад каждого процесса в создание ценности для клиента и выполнение стратегии компании.',
    image: 'https://raw.githubusercontent.com/Heritager-tech/Public_data/main/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D1%8B/%D0%9A%D0%B0%D1%80%D1%82%D0%B0%20%D0%BF%D1%80%D0%BE%D1%86%D0%B5%D1%81%D1%81%D0%BE%D0%B2.drawio.png',
  },
  {
    title: 'Потоки создания ценности',
    tag: 'Ценность',
    description: 'Визуализация сквозных потоков создания ценности от потребностей клиента до конечного результата. Схема показывает, как различные подразделения и процессы объединяются для доставки продуктов и услуг, выявляя критические точки взаимодействия и возможности оптимизации.',
    image: 'https://raw.githubusercontent.com/Heritager-tech/Public_data/main/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D1%8B/%D0%9F%D0%BE%D1%82%D0%BE%D0%BA%D0%B8%20%D1%81%D0%BE%D0%B7%D0%B4%D0%B0%D0%BD%D0%B8%D1%8F%20%D1%86%D0%B5%D0%BD%D0%BD%D0%BE%D1%81%D1%82%D0%B8.drawio.png',
  },
  {
    title: 'BPMN-моделирование',
    tag: 'Нотация',
    description: 'Пример детального моделирования бизнес-процесса в нотации BPMN 2.0. Модель включает пулы, дорожки, события, шлюзы и потоки управления, что обеспечивает точное описание логики выполнения процесса и позволяет выявить узкие места, дублирования и возможности автоматизации.',
    image: 'https://raw.githubusercontent.com/Heritager-tech/Public_data/main/%D0%9F%D1%80%D0%B5%D0%B7%D0%B5%D0%BD%D1%82%D0%B0%D1%86%D0%B8%D0%BE%D0%BD%D0%BD%D1%8B%D0%B5%20%D0%BC%D0%B0%D1%82%D0%B5%D1%80%D0%B8%D0%B0%D0%BB%D1%8B/BPMN%20%D0%BF%D1%80%D0%B8%D0%BC%D0%B5%D1%80.png',
  },
];

export default function DiagramsPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const [expandedIdx, setExpandedIdx] = useState<number | null>(null);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #060d18 0%, #1a0e2e 20%, #0a3333 45%, #1a0e2e 70%, #060d18 100%)' }}>
      <div className="max-w-6xl mx-auto page-fade-in">
        {/* Back navigation */}
        {onNavigate && (
          <div className="mb-6 pt-4">
            <button
              onClick={() => onNavigate('home')}
              className="text-white/40 text-sm flex items-center gap-2 hover:text-white/70 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M10 3L5 8l5 5" />
              </svg>
              На главную
            </button>
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-14">
          <span className="text-[#14b8a6] text-xs tracking-[0.35em] uppercase font-semibold">Артефакты</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
            Схемы и модели
          </h1>
          <p className="text-white/50 text-base md:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
            Ключевые архитектурные схемы и модели, описывающие различные аспекты предприятия
          </p>
        </div>

        {/* Diagrams grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {diagrams.map((diagram, idx) => (
            <div
              key={idx}
              className="glass-card overflow-hidden group cursor-pointer"
              onClick={() => setExpandedIdx(expandedIdx === idx ? null : idx)}
            >
              {/* Image */}
              <div className="relative aspect-[4/3] overflow-hidden bg-black/30">
                <img
                  src={diagram.image}
                  alt={diagram.title}
                  className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />

                {/* Tag */}
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 text-[10px] tracking-wider uppercase font-semibold rounded-md bg-[#14b8a6]/15 text-[#14b8a6] border border-[#14b8a6]/20">
                    {diagram.tag}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#14b8a6] transition-colors">
                  {diagram.title}
                </h3>
                <p className={`text-white/50 text-sm leading-relaxed transition-all duration-300 ${
                  expandedIdx === idx ? 'max-h-[200px] opacity-100' : 'max-h-[48px] opacity-80 overflow-hidden'
                }`}>
                  {diagram.description}
                </p>
                {expandedIdx !== idx && (
                  <span className="text-[#14b8a6]/60 text-xs mt-2 inline-block">Нажмите для подробностей →</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
