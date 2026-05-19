'use client';

import { useState } from 'react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
    setFormData({ name: '', email: '', company: '', message: '' });
  };

  return (
    <section className="relative py-24 md:py-32 px-6 section-beige overflow-hidden" id="contact">
      <div className="max-w-3xl mx-auto w-full">
        {/* Header */}
        <div className="text-center mb-14 reveal-on-scroll">
          <span className="text-[#3b2510] text-xs tracking-[0.35em] uppercase font-semibold">
            Свяжитесь с нами
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#0a0e18] leading-tight mt-4">
            Начните трансформацию
          </h2>
          <p className="text-[#4a2e15]/65 text-base md:text-lg leading-relaxed mt-4 max-w-xl mx-auto">
            Расскажите о вашем проекте, и мы поможем выстроить архитектуру предприятия, которая работает на ваш бизнес.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5 reveal-on-scroll" style={{ transitionDelay: '150ms' }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label htmlFor="name" className="block text-[#3b2510]/60 text-xs font-semibold tracking-wide uppercase mb-2">Имя</label>
              <input
                id="name"
                type="text"
                placeholder="Ваше имя"
                value={formData.name}
                onChange={(e) => setFormData(p => ({ ...p, name: e.target.value }))}
                required
                className="contact-input !bg-white/60 !border-[#3b2510]/15 !text-[#0a0e18] placeholder:text-[#4a2e15]/25 focus:!border-[#14b8a6] focus:!shadow-[0_0_0_3px_rgba(20,184,166,0.1)]"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-[#3b2510]/60 text-xs font-semibold tracking-wide uppercase mb-2">Email</label>
              <input
                id="email"
                type="email"
                placeholder="email@company.com"
                value={formData.email}
                onChange={(e) => setFormData(p => ({ ...p, email: e.target.value }))}
                required
                className="contact-input !bg-white/60 !border-[#3b2510]/15 !text-[#0a0e18] placeholder:text-[#4a2e15]/25 focus:!border-[#14b8a6] focus:!shadow-[0_0_0_3px_rgba(20,184,166,0.1)]"
              />
            </div>
          </div>
          <div>
            <label htmlFor="company" className="block text-[#3b2510]/60 text-xs font-semibold tracking-wide uppercase mb-2">Компания</label>
            <input
              id="company"
              type="text"
              placeholder="Название компании"
              value={formData.company}
              onChange={(e) => setFormData(p => ({ ...p, company: e.target.value }))}
              className="contact-input !bg-white/60 !border-[#3b2510]/15 !text-[#0a0e18] placeholder:text-[#4a2e15]/25 focus:!border-[#14b8a6] focus:!shadow-[0_0_0_3px_rgba(20,184,166,0.1)]"
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-[#3b2510]/60 text-xs font-semibold tracking-wide uppercase mb-2">Сообщение</label>
            <textarea
              id="message"
              placeholder="Опишите ваш проект или задачу..."
              value={formData.message}
              onChange={(e) => setFormData(p => ({ ...p, message: e.target.value }))}
              required
              rows={5}
              className="contact-input !bg-white/60 !border-[#3b2510]/15 !text-[#0a0e18] placeholder:text-[#4a2e15]/25 focus:!border-[#14b8a6] focus:!shadow-[0_0_0_3px_rgba(20,184,166,0.1)] resize-none"
            />
          </div>
          <button
            type="submit"
            disabled={submitted}
            className={`self-center px-10 py-4 font-semibold rounded-xl transition-all duration-300 text-[15px] ${
              submitted
                ? 'bg-[#14b8a6] text-white'
                : 'bg-[#0a0e18] text-[#14b8a6] border-2 border-[#14b8a6]/25 hover:bg-[#14b8a6] hover:text-[#0a0e18] hover:shadow-[0_0_30px_rgba(20,184,166,0.2)]'
            }`}
          >
            {submitted ? 'Отправлено!' : 'Отправить заявку'}
          </button>
        </form>
      </div>
    </section>
  );
}
