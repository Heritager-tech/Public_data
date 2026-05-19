'use client';

export default function SocialProof() {
  const stats = [
    { number: '50+', label: 'Проектов выполнено' },
    { number: '10+', label: 'Лет экспертизы' },
    { number: '30+', label: 'Корпоративных клиентов' },
    { number: '4', label: 'Уровень зрелости CMMI' },
  ];

  return (
    <section className="relative py-20 px-6 overflow-hidden" style={{ background: 'linear-gradient(180deg, #3b2510 0%, #2a1a0c 50%, #1a0e2e 100%)' }}>
      <div className="max-w-5xl mx-auto">
        {/* Stats row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-14 reveal-on-scroll">
          {stats.map((stat, i) => (
            <div key={i} className="stat-item">
              <div className="stat-number">{stat.number}</div>
              <div className="text-white/50 text-sm mt-2">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Credentials */}
        <div className="text-center reveal-on-scroll" style={{ transitionDelay: '150ms' }}>
          <span className="text-[#14b8a6] text-xs tracking-[0.35em] uppercase font-semibold">
            Компетенции
          </span>
          <p className="text-white/55 text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            Сертифицированные архитекторы TOGAF и ArchiMate с многолетним опытом реализации проектов бизнес-архитектуры и процессной оптимизации в крупнейших российских и международных компаниях.
          </p>

          {/* Certification badges */}
          <div className="flex flex-wrap justify-center gap-4 mt-8">
            {['TOGAF Certified', 'ArchiMate 3.0', 'BPMN 2.0', 'SAFe Agilist'].map((cert, i) => (
              <div
                key={i}
                className="px-5 py-2.5 rounded-lg border border-[#14b8a6]/20 bg-[#14b8a6]/5 text-[#14b8a6] text-sm font-medium"
              >
                {cert}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
