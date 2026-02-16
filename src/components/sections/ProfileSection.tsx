"use client";

import React, { useMemo, useState } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import enLocales from '../../locales/en.json';
import esLocales from '../../locales/es.json';
import itLocales from '../../locales/it.json';
import {
  User,
  Music,
  Dumbbell,
  Compass,
  Code,
  Quote,
  X,
  Lightbulb,
} from "lucide-react";

type Testimonial = {
  name: string;
  role?: string;
  company?: string;
  text: string;
};

function TestimonialLoop({ testimonials, speed = 15, }: { testimonials: Testimonial[]; speed?: number; }) {
  const [selected, setSelected] = useState<Testimonial | null>(null);
  const wrapperRef = React.useRef<HTMLDivElement | null>(null);
  const innerRef = React.useRef<HTMLDivElement | null>(null);
  const rafRef = React.useRef<number | null>(null);
  const lastTimeRef = React.useRef<number | null>(null);
  const posRef = React.useRef<number>(0);
  const velocityRefMem = React.useRef<number>(0);

  const isPausedRef = React.useRef(false);
  const isDraggingRef = React.useRef(false);
  const dragStartXRef = React.useRef(0);
  const dragStartPosRef = React.useRef(0);

  const ANIMATION_CONFIG = { SMOOTH_TAU: 0.25 } as const;

  const measure = React.useCallback(() => {
    const inner = innerRef.current;
    if (!inner) return { halfWidth: 0 };
    const total = inner.scrollWidth;
    return { halfWidth: total / 2 };
  }, []);

  // keep animation smooth and respect prefers-reduced-motion
  React.useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const step = (t: number) => {
      if (lastTimeRef.current == null) lastTimeRef.current = t;
      const dtMs = t - lastTimeRef.current;
      const dt = Math.max(0, dtMs) / 1000;
      lastTimeRef.current = t;

      if (prefersReduced) {
        // jump to neutral transform
        if (innerRef.current) innerRef.current.style.transform = `translateX(0)`;
        return;
      }

      if (!isPausedRef.current && !isDraggingRef.current) {
        const { halfWidth } = measure();
        if (halfWidth > 0) {
          const targetPxPerSec = halfWidth / (speed || 15); // speed = seconds to traverse halfWidth
          // exponential smoothing toward target velocity
          const easingFactor = 1 - Math.exp(-dt / ANIMATION_CONFIG.SMOOTH_TAU);
          const newVelocity = velocityRefMem.current + (targetPxPerSec - velocityRefMem.current) * easingFactor;
          velocityRefMem.current = newVelocity;

          let next = posRef.current + newVelocity * dt;
          next = ((next % halfWidth) + halfWidth) % halfWidth;
          posRef.current = next;
          if (innerRef.current) innerRef.current.style.transform = `translateX(-${Math.floor(posRef.current)}px)`;
        }
      }

      rafRef.current = requestAnimationFrame(step);
    };

    rafRef.current = requestAnimationFrame(step);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
      lastTimeRef.current = null;
      velocityRefMem.current = 0;
    };
  }, [measure, speed]);

  // pause when a card is opened
  React.useEffect(() => {
    isPausedRef.current = !!selected;
  }, [selected]);

  // pointer drag handlers
  React.useEffect(() => {
    const wrapper = wrapperRef.current;
    const inner = innerRef.current;
    if (!wrapper || !inner) return;

    const onPointerDown = (e: PointerEvent) => {
      isDraggingRef.current = true;
      isPausedRef.current = true;
      dragStartXRef.current = e.clientX;
      dragStartPosRef.current = posRef.current;
      (e.target as Element).setPointerCapture?.(e.pointerId);
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - dragStartXRef.current;
      const { halfWidth } = measure();
      if (halfWidth <= 0) return;
      let next = dragStartPosRef.current - dx;
      next = ((next % halfWidth) + halfWidth) % halfWidth;
      posRef.current = next;
      inner.style.transform = `translateX(-${Math.floor(posRef.current)}px)`;
    };

    const onPointerUp = (e: PointerEvent) => {
      if (isDraggingRef.current) {
        isDraggingRef.current = false;
        isPausedRef.current = false;
        try { (e.target as Element).releasePointerCapture?.(e.pointerId); } catch {}
      }
    };

    wrapper.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    window.addEventListener('pointercancel', onPointerUp);

    return () => {
      wrapper.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      window.removeEventListener('pointercancel', onPointerUp);
    };
  }, [measure]);

  const handleCardPointerEnter = () => { isPausedRef.current = true; };
  const handleCardPointerLeave = () => { if (!isDraggingRef.current) isPausedRef.current = false; };

  return (
    <>
      <div ref={wrapperRef} className="relative overflow-hidden px-4 sm:px-8 py-6">
        <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[var(--background)] via-[var(--background)]/80 to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[var(--background)] via-[var(--background)]/80 to-transparent z-10 pointer-events-none" />

        <div ref={innerRef} className="flex items-stretch relative z-20 transition-transform duration-100 ease-linear" style={{ gap: 16, transform: "translateX(0)" }}>
          {Array.from({ length: 2 }).flatMap(() => testimonials).map((t, i) => (
            <button
              key={`${t.name}-${i}`}
              type="button"
              onClick={() => setSelected(t)}
              onPointerEnter={handleCardPointerEnter}
              onPointerLeave={handleCardPointerLeave}
              className="flex-none group p-0 m-0 border-0 bg-transparent cursor-pointer"
            >
              <div className="theme-glass rounded-xl p-6 w-80 hover:border-[var(--accent-primary)]/50 transition-all duration-300 hover:scale-[1.01] theme-shadow-lg will-change-transform text-left">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--gold-alt)] flex items-center justify-center theme-bg font-bold text-lg shadow-lg shadow-[var(--accent-primary)]/30">
                    {t.name.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold theme-text text-sm truncate">{t.name}</h4>
                    {t.role && <p className="text-xs theme-text-muted truncate">{t.role}</p>}
                  </div>
                </div>
                <p className="text-sm theme-text-secondary line-clamp-3 leading-relaxed mb-3">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-2 text-xs theme-accent opacity-0 group-hover:opacity-100 transition-opacity">
                  <span>Leer más</span>
                  <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {selected && (
        <div
          className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/80 [data-theme='light']:bg-white/80 backdrop-blur-sm animate-fadeIn"
          onClick={() => setSelected(null)}
        >
          <div
            className="theme-elevated border border-[var(--accent-primary)]/40 rounded-2xl p-6 sm:p-8 max-w-lg sm:max-w-2xl w-full relative animate-scaleIn shadow-2xl shadow-[var(--accent-primary)]/20 max-h-[90vh] overflow-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelected(null)}
              aria-label="Cerrar"
              className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-lg theme-surface hover:bg-[var(--accent-primary)]/20 transition-colors group theme-border hover:border-[var(--accent-primary)]/50"
            >
              <X className="w-5 h-5 theme-text-muted group-hover:theme-accent transition-colors" />
            </button>

            <Quote className="w-12 h-12 theme-accent mb-6 opacity-80" />

            <p className="text-base sm:text-lg theme-text mb-8 leading-relaxed italic">&ldquo;{selected.text}&rdquo;</p>

            <div className="flex items-center gap-4 pt-6 border-t theme-border">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--gold-alt)] flex items-center justify-center theme-bg font-bold text-2xl shadow-xl shadow-[var(--accent-primary)]/30">
                {selected.name.charAt(0)}
              </div>
              <div>
                <h4 className="font-bold theme-text text-lg">{selected.name}</h4>
                {selected.role && <p className="text-sm theme-text-muted">{selected.role}</p>}
                {selected.company && <p className="text-xs theme-text-muted mt-1 opacity-75">{selected.company}</p>}
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        .animate-fadeIn { animation: fadeIn 0.2s ease-out; }
        .animate-scaleIn { animation: scaleIn 0.3s ease-out; }
      `}</style>
    </>
  );
}

export function ProfileSection() {
  const t = useTranslations('profile');
  const locale = useLocale();

  // raw locale JSON imported statically so arrays/objects can be read directly
  
  const interests = useMemo(
    () => [
      {
        icon: Music,
        title: t('interests.music.title'),
        desc: t('interests.music.description'),
        color: "text-[#E63946]",
      },
      {
        icon: Dumbbell,
        title: t('interests.sports.title'),
        desc: t('interests.sports.description'),
        color: "text-[#D62839]",
      },
      {
        icon: Compass,
        title: t('interests.explorer.title'),
        desc: t('interests.explorer.description'),
        color: "text-[#C41E3A]",
      },
    ],
    [t]
  );

  const testimonials: Testimonial[] = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const msgs: any = locale === 'es' ? esLocales : locale === 'it' ? itLocales : enLocales;
    const items = msgs?.profile?.testimonials?.items;
    return Array.isArray(items) ? items : [];
  }, [locale]);

  return (
    <section id="profile" className="relative py-16 md:py-24 theme-bg overflow-hidden">
      {/* Background effects - matching portfolio style */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.08]" style={{ background: 'radial-gradient(circle, var(--accent-primary), var(--gold-alt))' }} />
      <div className="absolute bottom-1/4 -left-64 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.08]" style={{ background: 'radial-gradient(circle, var(--gold-alt), var(--accent-primary))' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent, transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header - matching HeroSection style */}
        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="theme-gradient-text">
              {t('title')}
            </span>
          </h2>
          <p className="text-base sm:text-lg theme-text-muted max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.header>

          {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 mb-16">
          {/* Left - Engineer */}
          <motion.article 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative p-3 bg-gradient-to-br from-[var(--gold-mid)] to-[var(--accent-primary)] rounded-2xl shadow-lg shadow-[var(--accent-primary)]/20"
              >
                <Code className="w-7 h-7 text-white dark:text-[var(--text-primary)]" />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--gold-mid)] to-[var(--accent-primary)] rounded-2xl blur-xl opacity-20"></div>
              </motion.div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold theme-text">{t('engineer.title')}</h3>
                <div className="h-1 w-24 bg-gradient-to-r from-[var(--gold-mid)] to-[var(--accent-primary)] rounded-full mt-2 opacity-40"></div>
              </div>
            </div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group theme-glass rounded-xl p-5 md:p-6 transition-all duration-300 theme-shadow-lg hover:border-[var(--accent-primary)]/50"
            >
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--gold-alt)] mt-2 flex-shrink-0 shadow-lg shadow-[var(--accent-primary)]/50" />
                <div className="flex-1">
                  <p className="text-sm font-bold theme-accent mb-2 tracking-wide">{t('engineer.formation.title')}</p>
                  <p className="text-sm md:text-base theme-text-muted leading-relaxed group-hover:theme-text-secondary transition-colors">{t('engineer.formation.content')}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group theme-glass rounded-xl p-5 md:p-6 transition-all duration-300 theme-shadow-lg hover:border-[var(--accent-primary)]/50"
            >
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--gold-alt)] mt-2 flex-shrink-0 shadow-lg shadow-[var(--accent-primary)]/50" />
                <div className="flex-1">
                  <p className="text-sm font-bold theme-accent mb-2 tracking-wide">{t('engineer.methodologies.title')}</p>
                  <p className="text-sm md:text-base theme-text-muted leading-relaxed group-hover:theme-text-secondary transition-colors">{t('engineer.methodologies.content')}</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              whileHover={{ scale: 1.02 }}
              className="group theme-glass rounded-xl p-5 md:p-6 transition-all duration-300 theme-shadow-lg hover:border-[var(--accent-primary)]/50"
            >
              <div className="flex items-start gap-4">
                <div className="w-2 h-2 rounded-full bg-gradient-to-br from-[var(--accent-primary)] to-[var(--gold-alt)] mt-2 flex-shrink-0 shadow-lg shadow-[var(--accent-primary)]/50" />
                <div className="flex-1">
                  <p className="text-sm font-bold theme-accent mb-2 tracking-wide">{t('engineer.projects.title')}</p>
                  <p className="text-sm md:text-base theme-text-muted leading-relaxed group-hover:theme-text-secondary transition-colors">{t('engineer.projects.content')}</p>
                </div>
              </div>
            </motion.div>
          </motion.article>

          {/* Right - Personal */}
          <motion.article 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-5"
          >
            <div className="flex items-center gap-4 mb-6">
              <motion.div 
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="relative p-3 bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--red-dark)] rounded-2xl shadow-lg shadow-[var(--accent-secondary)]/20"
              >
                <User className="w-7 h-7 text-white" />
                <div className="absolute inset-0 bg-gradient-to-br from-[var(--accent-secondary)] to-[var(--red-dark)] rounded-2xl blur-xl opacity-20"></div>
              </motion.div>
              <div>
                <h3 className="text-2xl sm:text-3xl font-bold theme-text">{t('personal.title')}</h3>
                <div className="h-1 w-24 bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--red-dark)] rounded-full mt-2 opacity-40"></div>
              </div>
            </div>

            <p className="text-sm md:text-base theme-text-muted leading-relaxed mb-4">
              {t('personal.intro')}
            </p>

            <div className="space-y-3">
              {interests.map((interest, idx) => {
                const Icon = interest.icon;
                return (
                  <motion.article 
                    key={idx}
                    whileHover={{ scale: 1.02, x: 4 }}
                    className="group flex items-start gap-4 p-4 rounded-xl theme-surface hover:theme-glass theme-border hover:border-[var(--accent-secondary)]/30 transition-all duration-300 backdrop-blur-sm"
                  >
                    <div className="p-2 rounded-lg theme-elevated group-hover:bg-gradient-to-br group-hover:from-[var(--accent-secondary)]/20 group-hover:to-[var(--red-dark)]/20 transition-all duration-300">
                      <Icon className={`w-5 h-5 ${interest.color} group-hover:scale-110 transition-transform`} />
                    </div>
                    <div className="flex-1">
                      <div className="font-bold theme-text text-sm md:text-base mb-1 group-hover:theme-accent-red transition-colors">{interest.title}</div>
                      <div className="text-xs md:text-sm theme-text-muted leading-relaxed">{interest.desc}</div>
                    </div>
                  </motion.article>
                );
              })}
            </div>

            {/* Philosophy */}
            <motion.article 
              whileHover={{ scale: 1.02 }}
              className="bg-gradient-to-br from-[var(--red-darker)]/20 via-[var(--red-darker)]/15 to-[var(--red-darker)]/20 backdrop-blur-md rounded-xl border border-[var(--red-dark)]/40 hover:border-[var(--accent-secondary)]/60 p-5 md:p-6 mt-4 transition-all duration-300 theme-shadow-lg"
            >
              <div className="flex items-center justify-center mb-4">
                <div className="p-2 rounded-lg bg-[var(--accent-secondary)]/20">
                  <Lightbulb className="w-6 h-6" style={{ color: 'var(--accent-secondary)' }} />
                </div>
              </div>
              <h4 className="font-bold theme-accent-red mb-4 text-center text-base md:text-lg tracking-wide">{t('philosophy.title')}</h4>
                <blockquote className="text-center italic theme-text mb-5 text-sm md:text-base leading-relaxed">
                  &ldquo;{t('philosophy.quote')}&rdquo;
                </blockquote>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs md:text-sm">
                <span className="px-3 py-1.5 theme-surface rounded-lg theme-text-muted theme-border">Automatización</span>
                <span className="theme-accent-red">→</span>
                <span className="px-3 py-1.5 theme-surface rounded-lg theme-text-muted theme-border">Eficiencia</span>
                <span className="theme-accent-red">→</span>
                <span className="px-3 py-1.5 theme-surface rounded-lg theme-text-muted theme-border">Libertad</span>
                <span className="theme-accent-red">→</span>
                <span className="px-3 py-1.5 bg-gradient-to-r from-[var(--accent-secondary)] to-[var(--red-dark)] rounded-lg font-bold text-white shadow-lg shadow-[var(--accent-secondary)]/40">Vida plena</span>
              </div>
            </motion.article>
          </motion.article>
        </div>

        {/* Testimonials */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16"
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl sm:text-4xl font-bold mb-3">
              <span className="theme-gradient-text">
                {t('testimonials.title')}
              </span>
            </h3>
            <p className="text-sm md:text-base theme-text-muted">
              {t('testimonials.description')}
            </p>
          </div>
          <TestimonialLoop testimonials={testimonials} speed={15} />
        </motion.section>
      </div>
    </section>
  );
}

export default ProfileSection;