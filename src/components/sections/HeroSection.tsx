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
      {/* Galaxy Background - Optimizado para dark & light mode */}
      <div className="absolute inset-0 z-0">
        <Galaxy
          density={1.2}
          glowIntensity={0.35}
          saturation={0.15}
          hueShift={200}
          speed={0.3}
          mouseRepulsion={true}
          repulsionStrength={2.5}
          twinkleIntensity={0.25}
          rotationSpeed={0.03}
          transparent={true}
          mouseInteraction={true}
        />
      </div>

      {/* Subtle overlay for contrast - works in both modes */}
      <div className="absolute inset-0 z-[1] bg-gradient-to-b from-transparent via-background/10 to-background/30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center relative z-10">
        {/* Status Badge - Mobile optimized */}
        <div className="inline-flex items-center gap-3 sm:gap-4 bg-surface-elevated/30 border border-border px-4 sm:px-5 py-2.5 sm:py-3 rounded-full mb-6 sm:mb-8">
          <div className="w-2 h-2 bg-accent-secondary rounded-full animate-pulse"></div>
          <span className="text-xs sm:text-sm font-medium text-accent-primary tracking-wider">
            {t('statusBadge')}
          </span>
        </div>
        
        {/* Title - Responsive typography */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-text-primary via-accent-primary to-accent-secondary bg-clip-text text-transparent">
          {t('title')}
        </h1>
        
        {/* Tagline & Subtitle - Mobile-first */}
        <div className="text-lg sm:text-xl md:text-2xl text-text-secondary mb-6 sm:mb-8 max-w-4xl mx-auto px-2">
          <span className="text-accent-primary font-semibold block mb-2 sm:mb-0 sm:inline">
            &ldquo;{t('tagline')}&rdquo;
          </span>
          <br className="hidden sm:block" />
          <span className="text-base sm:text-lg text-text-tertiary">
            {t('subtitle')}
          </span>
        </div>

        {/* Stats Grid - Mobile-first (1 col → 2 cols → 3 cols) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12 max-w-3xl mx-auto">
          <div className="bg-surface-elevated/40 backdrop-blur-lg rounded-lg p-4 sm:p-5 border border-border">
            <div className="text-2xl sm:text-3xl font-bold text-accent-primary">2+</div>
            <div className="text-sm text-text-tertiary">{t('stats.experience')}</div>
          </div>

          <div className="bg-surface-elevated/40 backdrop-blur-lg rounded-lg p-4 sm:p-5 border border-border">
            <div className="text-2xl sm:text-3xl font-bold text-accent-primary">5+</div>
            <div className="text-sm text-text-tertiary">{t('stats.projects')}</div>
          </div>

          <div className="bg-surface-elevated/40 backdrop-blur-lg rounded-lg p-4 sm:p-5 border border-border sm:col-span-2 md:col-span-1">
            <div className="text-2xl sm:text-3xl font-bold text-accent-primary">100%</div>
            <div className="text-sm text-text-tertiary">{t('stats.quality')}</div>
          </div>
        </div>

        {/* CTA Buttons - Stacked mobile, row desktop */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8 sm:mb-12">
          <button 
            onClick={() => onNavigate('cases')}
            className="group bg-gradient-to-r from-accent-secondary to-accent-primary hover:from-accent-primary hover:to-accent-secondary px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-accent-primary/20 active:scale-[0.98] text-sm sm:text-base"
          >
            <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{t('cta.cases')}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
          
          <button 
            onClick={() => onNavigate('tech')}
            className="group border border-accent-primary/50 hover:bg-accent-primary/10 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center gap-2 active:scale-[0.98] text-sm sm:text-base"
          >
            <Cpu className="w-4 h-4 sm:w-5 sm:h-5" />
            <span>{t('cta.tech')}</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Quick Links - Mobile optimized */}
        <div className="flex justify-center gap-6 sm:gap-8">
          <button 
            onClick={() => onNavigate('profile')}
            className="text-text-tertiary hover:text-accent-primary transition-colors text-sm sm:text-base active:scale-95"
          >
            {t('quickLinks.about')}
          </button>
          <button 
            onClick={() => onNavigate('contact')}
            className="text-text-tertiary hover:text-accent-primary transition-colors text-sm sm:text-base active:scale-95"
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
