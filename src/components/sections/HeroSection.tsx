'use client';

import { useTranslations } from 'next-intl';
import { FileText, Cpu, ChevronRight, ArrowRight } from 'lucide-react';
import dynamic from 'next/dynamic';

// Lazy load Galaxy (WebGL) - No SSR para evitar errores de hidratación
const Galaxy = dynamic(() => import('@/components/effects/Galaxy'), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-gradient-to-b from-background to-surface" />
});

interface HeroSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const t = useTranslations('hero');

  return (
    <section 
      id="hero" 
      className="min-h-screen flex items-center justify-center relative pt-20 sm:pt-24 overflow-hidden"
    >
      {/* Galaxy Background - Con fondo adaptativo según tema */}
      <div className="absolute inset-0 z-0 [&_canvas]:!bg-[#0a0a14] dark:[&_canvas]:!bg-black/95">
        <Galaxy
          density={1.2}
          glowIntensity={0.35}
          saturation={0.12}
          hueShift={220}
          speed={0.3}
          mouseRepulsion={true}
          repulsionStrength={2.5}
          twinkleIntensity={0.25}
          rotationSpeed={0.03}
          transparent={false}
          mouseInteraction={true}
        />
      </div>

      {/* Overlay suave y largo: transición armoniosa hacia el fondo oscuro */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-[#0a0a14]/20 to-[#050507] dark:from-transparent dark:via-background/40 dark:to-background pointer-events-none" />

      {/* IMPORTANTE: pointer-events-none permite que el mouse pase al Galaxy de abajo */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10 pointer-events-none">
        {/* Status Badge - Centrado y armonioso */}
        <div className="inline-flex items-center justify-center gap-3 bg-white/90 dark:bg-[#1a1a28]/90 backdrop-blur-lg border border-[#C9A961]/30 dark:border-[#E6B93D]/30 px-5 py-2.5 rounded-full mb-8 pointer-events-auto shadow-[0_0_10px_rgba(201,169,97,0.6)] dark:shadow-[0_0_10px_rgba(230,185,61,0.6)]">
          <div className="w-2 h-2 bg-[#C9A961] dark:bg-[#E6B93D] rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium text-[#5A1E2E] dark:text-[#E6B93D] tracking-wider uppercase">
            {t('statusBadge')}
          </span>
        </div>
        
        {/* Title con efecto dorado metalizado - Perfectamente centrado */}
        <h1 className="relative text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight">
          {/* Resplandor dorado cálido detrás */}
          <span 
            className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FFA500] to-[#FFD700] bg-clip-text text-transparent blur-3xl opacity-50"
            aria-hidden="true"
          >
            {t('title')}
          </span>
          
          {/* Texto principal con gradiente dorado metalizado vertical */}
          <span className="relative bg-gradient-to-b from-[#FEFCE8] via-[#FACC15] to-[#78350F] bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(0,0,0,0.9)]">
            {t('title')}
          </span>
          
          {/* Brillo metálico superior */}
          <span 
            className="absolute inset-0 bg-gradient-to-b from-white via-white/40 to-transparent bg-clip-text text-transparent opacity-60"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to bottom, black 0%, transparent 40%)',
              maskImage: 'linear-gradient(to bottom, black 0%, transparent 40%)'
            }}
            aria-hidden="true"
          >
            {t('title')}
          </span>
          
          {/* Sombra profunda inferior */}
          <span 
            className="absolute inset-0 translate-y-1 bg-gradient-to-b from-transparent via-[#78350F] to-black bg-clip-text text-transparent opacity-40"
            style={{ 
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 60%, black 100%)',
              maskImage: 'linear-gradient(to bottom, transparent 60%, black 100%)'
            }}
            aria-hidden="true"
          >
            {t('title')}
          </span>
        </h1>
        
        {/* Tagline & Subtitle - Centrado y balanceado */}
        <div className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-10 max-w-3xl mx-auto">
          <p className="text-accent-primary font-semibold mb-3">
            &ldquo;{t('tagline')}&rdquo;
          </p>
          <p className="text-base sm:text-lg text-text-tertiary">
            {t('subtitle')}
          </p>
        </div>

        {/* Stats Grid - Perfectamente centrado */}
        <div className="grid grid-cols-3 gap-4 sm:gap-6 mb-12 max-w-2xl mx-auto">
          <div className="bg-surface-elevated/40 backdrop-blur-lg rounded-lg p-5 border border-border">
            <div className="text-3xl sm:text-4xl font-bold text-accent-primary mb-1">2+</div>
            <div className="text-xs sm:text-sm text-text-tertiary">{t('stats.experience')}</div>
          </div>

          <div className="bg-surface-elevated/40 backdrop-blur-lg rounded-lg p-5 border border-border">
            <div className="text-3xl sm:text-4xl font-bold text-accent-primary mb-1">5+</div>
            <div className="text-xs sm:text-sm text-text-tertiary">{t('stats.projects')}</div>
          </div>

          <div className="bg-surface-elevated/40 backdrop-blur-lg rounded-lg p-5 border border-border">
            <div className="text-3xl sm:text-4xl font-bold text-accent-primary mb-1">100%</div>
            <div className="text-xs sm:text-sm text-text-tertiary">{t('stats.quality')}</div>
          </div>
        </div>

        {/* CTA Buttons - Centrados y balanceados */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-10 pointer-events-auto max-w-2xl mx-auto">
          <button 
            onClick={() => onNavigate('cases')}
            className="w-full sm:w-auto group bg-gradient-to-r from-[#4A0E1F] to-[#E63946] hover:from-[#E63946] hover:to-[#4A0E1F] px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-[#E63946]/30 active:scale-[0.98] text-white"
          >
            <FileText className="w-5 h-5" />
            <span>{t('cta.cases')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => onNavigate('tech')}
            className="w-full sm:w-auto group border-2 border-[#E6B93D]/50 hover:bg-[#E6B93D]/10 hover:border-[#E6B93D] px-8 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98]"
          >
            <Cpu className="w-5 h-5" />
            <span>{t('cta.tech')}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Quick Links - Centrados */}
        <div className="flex justify-center gap-8 pointer-events-auto">
          <button 
            onClick={() => onNavigate('profile')}
            className="text-text-tertiary hover:text-accent-primary transition-colors text-sm sm:text-base active:scale-95 font-medium"
          >
            {t('quickLinks.about')}
          </button>
          <button 
            onClick={() => onNavigate('contact')}
            className="text-text-tertiary hover:text-accent-primary transition-colors text-sm sm:text-base active:scale-95 font-medium"
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
