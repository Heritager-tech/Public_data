'use client';

import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#060d18] border-t border-white/[0.04] py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Main footer grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 relative">
                <Image
                  src="/tree-logo.png"
                  alt=""
                  width={36}
                  height={36}
                  className="object-contain"
                />
              </div>
              <span className="text-white font-bold text-base">
                <span className="text-[#14b8a6]">EDM</span>
                <span className="text-white/60 mx-1">—</span>
                <span className="text-[#a78bfa]">Consulting</span>
              </span>
            </div>
            <p className="text-white/40 text-sm leading-relaxed">
              Бизнес-архитектура и моделирование предприятия. Стратегическое выравнивание бизнеса и технологий.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase font-semibold mb-4">Услуги</h4>
            <ul className="flex flex-col gap-2.5">
              {['Архитектура предприятия', 'Процессное моделирование', 'ИТ-стратегия', 'Цифровая трансформация'].map(s => (
                <li key={s} className="text-white/55 text-sm hover:text-[#14b8a6] cursor-pointer transition-colors">{s}</li>
              ))}
            </ul>
          </div>

          {/* Approaches */}
          <div>
            <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase font-semibold mb-4">Подходы</h4>
            <ul className="flex flex-col gap-2.5">
              {['TOGAF', 'BPMN 2.0', 'ArchiMate', 'SAFe'].map(s => (
                <li key={s} className="text-white/55 text-sm hover:text-[#14b8a6] cursor-pointer transition-colors">{s}</li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white/50 text-xs tracking-[0.2em] uppercase font-semibold mb-4">Контакт</h4>
            <ul className="flex flex-col gap-2.5">
              <li className="text-white/55 text-sm">info@edm-consulting.ru</li>
              <li className="text-white/55 text-sm">+7 (495) 000-00-00</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-white/[0.04] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-white/40 text-xs">
            &copy; {new Date().getFullYear()} EDM-Consulting. Все права защищены.
          </div>
          <div className="flex items-center gap-5 text-white/40 text-xs">
            <span className="hover:text-[#14b8a6]/50 cursor-pointer transition-colors">Политика конфиденциальности</span>
            <span className="hover:text-[#14b8a6]/50 cursor-pointer transition-colors">Условия использования</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
