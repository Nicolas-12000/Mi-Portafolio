'use client';

import { useTranslations } from 'next-intl';
import { FileText, Cpu, ChevronRight, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useTheme } from '@/hooks/useTheme';

// Lazy load theme-specific LiquidEther variants - No SSR
const LiquidEtherLight = dynamic(() => import('@/components/effects/LiquidEtherLight'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 theme-bg" />
});

const LiquidEtherDark = dynamic(() => import('@/components/effects/LiquidEtherDark'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 theme-bg" />
});

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const t = useTranslations('hero');
  const prefersReducedMotion = useReducedMotion();
  const { theme } = useTheme();

  return (
    <section 
      id="hero" 
      role="region"
      aria-label="Hero"
      className="min-h-screen flex items-center justify-center relative pt-20 sm:pt-24 overflow-hidden"
    >
      {/* Background - LiquidEther para modo claro, Galaxy para modo oscuro */}
      <div className="absolute inset-0 z-0">
        {!prefersReducedMotion ? (
          // Use optimized wrapper per theme
          theme === 'light' ? (
            <LiquidEtherLight 
              mouseForce={20}
              cursorSize={100}
              isViscous={false}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          ) : (
            <LiquidEtherDark 
              mouseForce={20}
              cursorSize={100}
              isViscous={false}
              viscous={30}
              iterationsViscous={32}
              iterationsPoisson={32}
              resolution={0.5}
              isBounce={false}
              autoDemo={true}
              autoSpeed={0.5}
              autoIntensity={2.2}
              takeoverDuration={0.25}
              autoResumeDelay={3000}
              autoRampDuration={0.6}
            />
          )
        ) : (
          // Fallback estático para usuarios con reduced motion
          <div className="absolute inset-0 theme-bg" />
        )}
      </div>

      {/* Overlay suave - usa CSS para mantener marcado idéntico en SSR/CSR */}
      <div className="absolute inset-0 z-[1] hero-overlay pointer-events-none" />

      {/* IMPORTANTE: pointer-events-none permite que el mouse pase al Galaxy de abajo */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10 pointer-events-none">
        {/* Status Badge - Optimizado para móviles */}
        <div className="inline-flex items-center justify-center gap-2 sm:gap-3 theme-card backdrop-blur-lg border border-[var(--accent-primary)]/30 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full mb-6 sm:mb-8 pointer-events-auto">
          <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full ${!prefersReducedMotion ? 'animate-pulse' : ''}`} style={{ backgroundColor: 'var(--accent-primary)' }} />
          <span className="text-[10px] sm:text-xs md:text-sm font-medium theme-text tracking-wider uppercase">
            {t('statusBadge')}
          </span>
        </div>
        
        {/* Title con efecto dorado metalizado - Optimizado mobile-first */}
        <h1 className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-6 leading-tight">
          {/* Texto principal con gradiente dorado metalizado vertical */}
          <span className="relative bg-gradient-to-b from-[#FEFCE8] via-[#FACC15] to-[#78350F] bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            {t('title')}
          </span>
        </h1>
        
        {/* Tagline & Subtitle - Optimizado para móviles */}
        <div className="text-base sm:text-lg md:text-xl lg:text-2xl text-text-secondary mb-8 sm:mb-10 max-w-3xl mx-auto px-2">
          <p className="text-accent-primary font-semibold mb-2 sm:mb-3">
            &ldquo;{t('tagline')}&rdquo;
          </p>
          <p className="text-sm sm:text-base md:text-lg text-text-tertiary">
            {t('subtitle')}
          </p>
        </div>

        {/* Stats Grid - Optimizado para móviles pequeños */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-12 max-w-2xl mx-auto">
          <div className="bg-surface-elevated/40 backdrop-blur-lg rounded-lg p-3 sm:p-4 md:p-5 border border-border">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-primary mb-1">2+</div>
            <div className="text-[10px] sm:text-xs md:text-sm text-text-tertiary leading-tight">{t('stats.experience')}</div>
          </div>

          <div className="bg-surface-elevated/40 backdrop-blur-lg rounded-lg p-3 sm:p-4 md:p-5 border border-border">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-primary mb-1">5+</div>
            <div className="text-[10px] sm:text-xs md:text-sm text-text-tertiary leading-tight">{t('stats.projects')}</div>
          </div>

          <div className="bg-surface-elevated/40 backdrop-blur-lg rounded-lg p-3 sm:p-4 md:p-5 border border-border">
            <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent-primary mb-1">100%</div>
            <div className="text-[10px] sm:text-xs md:text-sm text-text-tertiary leading-tight">{t('stats.quality')}</div>
          </div>
        </div>

        {/* CTA Buttons - Optimizado para móviles con efectos dorados */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center mb-8 sm:mb-10 pointer-events-auto max-w-2xl mx-auto px-4">
          <button 
            onClick={() => onNavigate('cases')}
            className="w-full sm:w-auto group relative overflow-hidden bg-gradient-to-r from-[var(--burgundy)] to-[var(--accent-secondary)] hover:from-[var(--accent-secondary)] hover:to-[var(--burgundy)] px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] text-white"
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5 relative z-10" />
            <span className="relative z-10">{t('cta.cases')}</span>
            <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform relative z-10" />
          </button>
          
          <button 
            onClick={() => onNavigate('tech')}
            className="w-full sm:w-auto group relative overflow-hidden border-2 border-[var(--accent-primary)] hover:bg-[var(--accent-primary)]/10 px-6 sm:px-8 py-3 sm:py-4 rounded-lg text-sm sm:text-base font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] shadow-sm"
          >
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5 relative z-10 group-hover:text-[var(--accent-primary)] transition-colors" />
            <span className="relative z-10 group-hover:text-[var(--accent-primary)] transition-colors">{t('cta.tech')}</span>
            <ChevronRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 group-hover:translate-x-1 transition-transform relative z-10 group-hover:text-[var(--accent-primary)]" />
          </button>
        </div>

        {/* Quick Links - Centrados */}
        <div className="flex justify-center gap-8 pointer-events-auto">
          <button
            onClick={() => onNavigate('profile')}
            className="group transition-all duration-300 text-sm sm:text-base active:scale-95 font-semibold px-4 py-2 rounded-lg theme-card shadow-sm text-text-primary hover:text-[var(--accent-primary)]"
          >
            {t('quickLinks.about')}
          </button>
          <button
            onClick={() => onNavigate('contact')}
            className="group transition-all duration-300 text-sm sm:text-base active:scale-95 font-semibold px-4 py-2 rounded-lg border border-[var(--accent-primary)] theme-card shadow-sm text-text-primary hover:text-[var(--accent-primary)]"
          >
            {t('quickLinks.contact')}
          </button>
        </div>
      </div>

      {/* Scroll indicator - Hidden on small mobile */}
      <div className="hidden sm:block absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronRight className="w-6 h-6 text-accent-primary rotate-90" />
      </div>
    </section>
  );
}
