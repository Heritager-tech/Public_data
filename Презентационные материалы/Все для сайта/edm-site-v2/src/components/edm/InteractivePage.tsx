'use client';

import { useState } from 'react';

interface InteractivePageProps {
  onNavigate?: (page: string) => void;
}

const eaLayers = [
  {
    id: 'strategy',
    label: 'Стратегия',
    icon: '◎',
    color: '#a78bfa',
    description: 'Стратегический слой архитектуры определяет долгосрочные цели организации, ключевые показатели эффективности и бизнес-модели. Мы помогаем связать стратегическое видение с операционной реальностью через каскадирование целей и построение стратегических карт.',
    items: ['Стратегические карты целей', 'Сбалансированная система показателей', 'Бизнес-модель Canvas', 'Анализ стейкхолдеров'],
    placeholder: 'Здесь будет интерактивная визуализация стратегического слоя архитектуры предприятия — карта целей с каскадированием от миссии до операционных KPI.',
  },
  {
    id: 'business',
    label: 'Бизнес-архитектура',
    icon: '⬡',
    color: '#14b8a6',
    description: 'Бизнес-архитектура описывает структуру организации через бизнес-способности, процессы и потоки создания ценности. Этот слой связывает стратегию с executions, обеспечивая прозрачность того, как организация создаёт ценность для своих клиентов.',
    items: ['Карта бизнес-способностей', 'Потоки создания ценности', 'Карта бизнес-процессов', 'Организационная структура'],
    placeholder: 'Здесь будет интерактивная карта бизнес-способностей с навигацией по доменам и визуализацией связей между способностями, процессами и ИТ-системами.',
  },
  {
    id: 'data',
    label: 'Данные',
    icon: '◈',
    color: '#d97706',
    description: 'Слой данных определяет информационную архитектуру организации — от концептуальной модели данных до физических схем хранения. Мы проектируем архитектуру данных, которая обеспечивает целостность, доступность и безопасность корпоративной информации.',
    items: ['Концептуальная модель данных', 'Мастер-дата менеджмент', 'Потоки данных', 'Хранилища и озёра данных'],
    placeholder: 'Здесь будет интерактивная визуализация информационного ландшафта — модель данных с потоками между системами и визуализацией master-data управления.',
  },
  {
    id: 'application',
    label: 'Приложения',
    icon: '⊞',
    color: '#f59e0b',
    description: 'Прикладной слой описывает ландшафт информационных систем организации и их взаимосвязи. Мы строим карту приложений, которая показывает, какие системы поддерживают какие бизнес-процессы, и выявляем дублирования, разрывы и возможности консолидации.',
    items: ['Ландшафт приложений', 'Карта интеграций', 'API-шлюз и микросервисы', 'Портфель ИТ-проектов'],
    placeholder: 'Здесь будет интерактивный ландшафт приложений с фильтрацией по бизнес-доменам, визуализацией интеграционных потоков и оценкой дублирования.',
  },
  {
    id: 'technology',
    label: 'Технологии',
    icon: '⏣',
    color: '#ef4444',
    description: 'Технологический слой описывает инфраструктурную платформу — серверы, сети, облачные сервисы и средства безопасности. Мы проектируем технологическую архитектуру, которая обеспечивает надёжность, масштабируемость и экономическую эффективность ИТ-инфраструктуры.',
    items: ['Облачная архитектура', 'Сетевая инфраструктура', 'Кибербезопасность', 'DevOps и CI/CD'],
    placeholder: 'Здесь будет интерактивная визуализация технологического стека — от облачной инфраструктуры до средств мониторинга с оценкой рисков и зрелости.',
  },
];

const views = [
  { id: 'layers', label: 'Слои архитектуры', desc: 'Навигация по слоям EA' },
  { id: 'mapping', label: 'Кросс-маппинг', desc: 'Связи между слоями' },
  { id: 'maturity', label: 'Оценка зрелости', desc: 'Самоанализ EA' },
];

export default function InteractivePage({ onNavigate }: InteractivePageProps) {
  const [activeView, setActiveView] = useState('layers');
  const [activeLayer, setActiveLayer] = useState(0);

  return (
    <div className="min-h-screen pt-20 pb-16 px-4 sm:px-6" style={{ background: 'linear-gradient(180deg, #060d18 0%, #1a0e2e 25%, #0a3333 50%, #1a0e2e 75%, #060d18 100%)' }}>
      <div className="max-w-7xl mx-auto page-fade-in">
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

        {/* Page Header */}
        <div className="text-center mb-10">
          <span className="text-[#14b8a6] text-xs tracking-[0.35em] uppercase font-semibold">Исследуйте</span>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mt-3 leading-tight">
            Интерактивное представление
          </h1>
          <p className="text-white/40 text-base md:text-lg max-w-2xl mx-auto mt-3 leading-relaxed">
            Исследуйте архитектуру предприятия через интерактивные модели и визуализации. Выберите представление для навигации.
          </p>
        </div>

        {/* View Tabs */}
        <div className="flex justify-center mb-10">
          <div className="tab-switcher">
            {views.map(v => (
              <button
                key={v.id}
                className={`tab-btn ${activeView === v.id ? 'active' : ''}`}
                onClick={() => setActiveView(v.id)}
              >
                <span className="hidden sm:inline">{v.label}</span>
                <span className="sm:hidden">{v.label.split(' ')[0]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        {activeView === 'layers' && (
          <LayersView activeLayer={activeLayer} setActiveLayer={setActiveLayer} />
        )}
        {activeView === 'mapping' && (
          <MappingView onNavigate={onNavigate} />
        )}
        {activeView === 'maturity' && (
          <MaturityView onNavigate={onNavigate} />
        )}
      </div>
    </div>
  );
}

function LayersView({ activeLayer, setActiveLayer }: { activeLayer: number; setActiveLayer: (i: number) => void }) {
  const layer = eaLayers[activeLayer];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6">
      {/* Layer Navigation — Ardoq-inspired */}
      <div className="glass-card p-2">
        <div className="text-white/50 text-[10px] tracking-[0.2em] uppercase font-semibold px-4 pt-3 pb-2">
          Архитектурные слои
        </div>
        {eaLayers.map((l, i) => (
          <div
            key={l.id}
            className={`ea-layer ${activeLayer === i ? 'active' : ''}`}
            onClick={() => setActiveLayer(i)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && setActiveLayer(i)}
            style={{ borderLeftColor: activeLayer === i ? l.color : undefined }}
          >
            <div className="flex items-center gap-3">
              <span className="text-lg" style={{ color: l.color }}>{l.icon}</span>
              <span className={`text-sm font-medium ${activeLayer === i ? 'text-white' : 'text-white/50'}`}>
                {l.label}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Layer Content */}
      <div className="glass-card p-8 md:p-10">
        <div className="flex items-center gap-4 mb-6">
          <span className="text-3xl" style={{ color: layer.color }}>{layer.icon}</span>
          <div>
            <h3 className="text-2xl font-bold text-white">{layer.label}</h3>
            <span className="text-xs text-white/30 tracking-wider uppercase">Слой {activeLayer + 1} из {eaLayers.length}</span>
          </div>
        </div>

        <p className="text-white/55 text-base leading-relaxed mb-8">
          {layer.description}
        </p>

        {/* Key artifacts */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
          {layer.items.map((item, i) => (
            <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-white/[0.03] border border-white/[0.05] hover:border-white/10 transition-colors">
              <div className="w-2 h-2 rounded-full shrink-0" style={{ background: layer.color }} />
              <span className="text-white/60 text-sm">{item}</span>
            </div>
          ))}
        </div>

        {/* Interactive placeholder */}
        <div className="relative rounded-2xl border-2 border-dashed border-white/[0.08] bg-white/[0.015] min-h-[280px] flex flex-col items-center justify-center p-8">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4" style={{ background: `${layer.color}10`, border: `1px solid ${layer.color}25` }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={layer.color} strokeWidth="1.5" opacity="0.6">
              <path d="M12 5v14M5 12h14" />
            </svg>
          </div>
          <p className="text-white/45 text-sm text-center max-w-md leading-relaxed">
            {layer.placeholder}
          </p>
          <span className="text-white/35 text-xs mt-3">HTML-виджет будет встроен сюда</span>
        </div>
      </div>
    </div>
  );
}

function MappingView({ onNavigate }: { onNavigate?: (page: string) => void }) {
  return (
    <div className="glass-card p-8 md:p-10">
      <div className="text-center py-12">
        <div className="w-20 h-20 mx-auto mb-6 rounded-2xl border-2 border-dashed border-[#14b8a6]/20 flex items-center justify-center">
          <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#14b8a6" strokeWidth="1.5" opacity="0.4">
            <path d="M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h6v6h-6z" />
            <path d="M10 7h4M7 10v4M17 10v4M10 17h4" />
          </svg>
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">Кросс-маппинг слоёв</h3>
        <p className="text-white/50 max-w-lg mx-auto leading-relaxed">
          Интерактивная визуализация связей между архитектурными слоями. Прослеживайте, как бизнес-способности опираются на приложения, данные и технологии. Выявляйте разрывы и дублирования между слоями архитектуры.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {eaLayers.map(l => (
            <div key={l.id} className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/[0.03] border border-white/[0.05]">
              <span style={{ color: l.color }}>{l.icon}</span>
              <span className="text-white/40 text-sm">{l.label}</span>
            </div>
          ))}
        </div>
        <p className="text-[#14b8a6]/50 text-sm mt-6">Здесь будет встроен интерактивный HTML-виджет кросс-маппинга</p>
        <button
          onClick={() => { onNavigate?.('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
          className="mt-4 cta-secondary text-sm !py-2.5 !px-6"
        >
          Запросить демонстрацию
        </button>
      </div>
    </div>
  );
}

function MaturityView({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const levels = [
    { level: 1, name: 'Начальный', desc: 'Процессы не формализованы, хаотичные', color: '#ef4444' },
    { level: 2, name: 'Управляемый', desc: 'Базовые процессы документированы', color: '#f59e0b' },
    { level: 3, name: 'Стандартизированный', desc: 'Процессы стандартизированы и измеряются', color: '#d97706' },
    { level: 4, name: 'Предсказуемый', desc: 'Количественное управление процессами', color: '#14b8a6' },
    { level: 5, name: 'Оптимизирующий', desc: 'Непрерывное улучшение и инновации', color: '#a78bfa' },
  ];

  return (
    <div className="glass-card p-8 md:p-10">
      <h3 className="text-2xl font-bold text-white mb-2">Оценка зрелости EA</h3>
      <p className="text-white/50 text-base mb-8">
        Пройдите самооценку зрелости архитектуры предприятия по адаптированной модели CMMI. Определите текущий уровень и получите рекомендации по развитию.
      </p>

      {/* Maturity Scale */}
      <div className="flex flex-col gap-4 mb-8">
        {levels.map(l => (
          <div key={l.level} className="flex items-start gap-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.04] hover:border-white/[0.08] transition-colors">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white font-bold text-sm" style={{ background: `${l.color}20`, color: l.color, border: `1px solid ${l.color}30` }}>
              {l.level}
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm mb-0.5">{l.name}</h4>
              <p className="text-white/40 text-sm">{l.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center py-6 border-t border-white/[0.04]">
        <p className="text-[#14b8a6]/50 text-sm">Интерактивный инструмент оценки будет встроен сюда</p>
        <button
          onClick={() => { onNavigate?.('home'); setTimeout(() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }), 300); }}
          className="mt-3 cta-secondary text-sm !py-2.5 !px-6"
        >
          Запросить демонстрацию
        </button>
      </div>
    </div>
  );
}
