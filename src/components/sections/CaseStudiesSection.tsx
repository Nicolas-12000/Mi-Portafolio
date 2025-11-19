'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Database, Settings, ExternalLink, Play, Mail, ChevronLeft, ChevronRight, Github, Sparkles, TrendingUp, Code2, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CaseStudiesSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function CaseStudiesSection({ onNavigate }: CaseStudiesSectionProps) {
  const t = useTranslations('cases');
  const tCommon = useTranslations('common');
  const [currentSlide, setCurrentSlide] = useState(0);

  const cases = [
    {
      id: 'case1',
      icon: Database,
      iconColor: 'text-[#E6B93D]',
      bgColor: 'bg-[#E6B93D]/20',
      status: 'completed',
      statusBg: 'bg-[#E6B93D]/20',
      statusText: 'text-[#E6B93D]',
        tags: [
        { label: 'Spring Boot', color: 'bg-amber-500/20 text-amber-400' },
        { label: 'MySQL', color: 'bg-amber-500/20 text-amber-400' },
        { label: 'JWT', color: 'bg-amber-500/20 text-amber-400' },
        { label: 'Swagger', color: 'bg-amber-500/20 text-amber-400' }
      ],
      metrics: [
        { icon: TrendingUp, label: '99.9% Uptime', color: 'text-[#E63946]' },
        { icon: Code2, label: '40% Faster', color: 'text-[#E63946]' },
        { icon: CheckCircle2, label: 'Production Ready', color: 'text-[#E63946]' }
      ]
    },
    {
      id: 'case2',
      icon: Settings,
      iconColor: 'text-[#D4AF37]',
      bgColor: 'bg-[#D4AF37]/20',
      status: 'inProgress',
      statusBg: 'bg-[#D4AF37]/20',
      statusText: 'text-[#D4AF37]',
        tags: [
        { label: 'Django', color: 'bg-amber-500/20 text-amber-400' },
        { label: 'Flutter', color: 'bg-amber-500/20 text-amber-400' },
        { label: 'MySQL', color: 'bg-amber-500/20 text-amber-400' },
        { label: 'REST API', color: 'bg-amber-500/20 text-amber-400' }
      ],
      metrics: [
        { icon: TrendingUp, label: 'In Development', color: 'text-[#E63946]' },
        { icon: Code2, label: 'Mobile First', color: 'text-[#E63946]' },
        { icon: Sparkles, label: 'Modern Stack', color: 'text-[#E63946]' }
      ]
    },
    {
      id: 'github-cta',
      icon: Github,
      iconColor: 'text-[#E6B93D]',
      bgColor: 'bg-gradient-to-br from-[#E6B93D]/20 to-[#D4AF37]/20',
      isGithubCTA: true
    }
  ];

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? cases.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev === cases.length - 1 ? 0 : prev + 1));
  };

  const currentCase = cases[currentSlide];

  return (
    <section id="cases" className="relative py-16 md:py-24 theme-bg overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 rounded-full blur-[120px] opacity-10" style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent)' }} />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 rounded-full blur-[120px] opacity-10" style={{ background: 'radial-gradient(circle, var(--gold-alt), transparent)' }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">
            <span className="theme-gradient-text">
              {t('title')}
            </span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl theme-text-muted max-w-3xl mx-auto px-2">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative max-w-4xl mx-auto">
          {/* Progress Indicators */}
          <div className="flex justify-center gap-2 mb-8">
            {cases.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className="group relative"
                aria-label={`Go to slide ${index + 1}`}
              >
                <div className={`h-1.5 rounded-full transition-all duration-300 ${
                  currentSlide === index 
                    ? 'w-12' 
                    : 'w-8 theme-border group-hover:bg-[var(--accent-primary)]/40'
                }`} style={currentSlide === index ? { background: 'linear-gradient(to right, var(--accent-primary), var(--gold-alt))' } : {}} />
                {currentSlide === index && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute inset-0 rounded-full blur-md opacity-30"
                    style={{ backgroundColor: 'var(--accent-primary)' }}
                  />
                )}
              </button>
            ))}
          </div>

          {/* Main Carousel */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative"
              >
                {currentCase.isGithubCTA ? (
                  // GitHub CTA Slide
                  <div className="theme-glass rounded-2xl border-2 border-[var(--accent-primary)]/40 p-8 sm:p-12 text-center relative overflow-hidden">
                    {/* Decorative elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-[100px] opacity-10" style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent)' }} />
                    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full blur-[100px] opacity-10" style={{ background: 'radial-gradient(circle, var(--gold-alt), transparent)' }} />
                    
                    <div className="relative z-10">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", delay: 0.2 }}
                        className="w-20 h-20 mx-auto mb-6 rounded-2xl flex items-center justify-center shadow-2xl"
                        style={{ 
                          background: 'linear-gradient(to bottom right, var(--accent-primary), var(--gold-alt))',
                          boxShadow: '0 25px 50px -12px rgba(var(--accent-primary-rgb), 0.3)'
                        }}
                      >
                        <Github className="w-10 h-10" style={{ color: 'var(--background)' }} strokeWidth={2} />
                      </motion.div>

                      <h3 className="text-2xl sm:text-3xl font-bold theme-text mb-4">
                        {t('github.title')}
                      </h3>
                      <p className="theme-text-muted mb-6 max-w-md mx-auto text-sm sm:text-base">
                        {t('github.description')}
                      </p>

                      <div className="flex flex-wrap justify-center gap-3 mb-8">
                        <span className="px-3 py-1.5 border rounded-lg text-xs sm:text-sm font-medium" style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--background)', borderColor: 'var(--accent-primary)' }}>
                          Open Source
                        </span>
                        <span className="px-3 py-1.5 border rounded-lg text-xs sm:text-sm font-medium" style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--background)', borderColor: 'var(--accent-primary)' }}>
                          Code Reviews
                        </span>
                        <span className="px-3 py-1.5 border rounded-lg text-xs sm:text-sm font-medium" style={{ backgroundColor: 'var(--gold-mid)', color: 'var(--background)', borderColor: 'var(--gold-mid)' }}>
                          Learning
                        </span>
                      </div>

                      <div className="theme-surface border theme-border rounded-lg p-4 mb-6 max-w-md mx-auto">
                        <div className="flex items-center justify-center gap-6 text-sm">
                          <div>
                            <div className="text-2xl font-bold theme-accent">30+</div>
                            <div className="theme-text-muted text-xs">{t('github.stats.repos')}</div>
                          </div>
                          <div className="w-px h-10 theme-border"></div>
                          <div>
                            <div className="text-2xl font-bold" style={{ color: 'var(--accent-primary)' }}>100+</div>
                            <div className="theme-text-muted text-xs">{t('github.stats.contributions')}</div>
                          </div>
                          <div className="w-px h-10 theme-border"></div>
                          <div>
                            <div className="text-2xl font-bold" style={{ color: 'var(--gold-mid)' }}>4+</div>
                            <div className="theme-text-muted text-xs">{t('github.stats.languages')}</div>
                          </div>
                        </div>
                      </div>

                      <a
                        href="https://github.com/Nicolas-12000"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-3 px-8 py-4 rounded-xl font-bold text-sm sm:text-base transition-all duration-300 transform hover:scale-[1.05] active:scale-[0.98] shadow-2xl"
                        style={{ 
                          background: 'linear-gradient(to right, var(--accent-primary), var(--gold-alt))',
                          color: 'var(--background)',
                          boxShadow: '0 25px 50px -12px rgba(var(--accent-primary-rgb), 0.3)'
                        }}
                        onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, var(--gold-alt), var(--accent-primary))'}
                        onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, var(--accent-primary), var(--gold-alt))'}
                      >
                        <Github className="w-5 h-5" />
                        <span>{t('github.cta')}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                ) : (
                  // Case Study Slide
                  <div className="theme-glass rounded-2xl border theme-border hover:border-[var(--accent-secondary)]/40 transition-all duration-300 overflow-hidden">
                    <div className="p-6 sm:p-8">
                      {/* Header */}
                      <div className="flex items-center justify-between mb-6">
                        <div className={`${currentCase.bgColor} p-3 rounded-xl shadow-lg`}>
                          <currentCase.icon className={`w-7 h-7 ${currentCase.iconColor}`} />
                        </div>
                        <span className={`text-xs sm:text-sm ${currentCase.statusBg} ${currentCase.statusText} px-3 py-1.5 rounded-full font-semibold border border-current/20`}>
                          {t(`status.${currentCase.status}`)}
                        </span>
                      </div>
                      
                      {/* Content */}
                      <h3 className="text-2xl sm:text-3xl font-bold mb-3 theme-text">
                        {t(`${currentCase.id}.title`)}
                      </h3>
                      <p className="theme-text-muted mb-6 text-sm sm:text-base leading-relaxed">
                        {t(`${currentCase.id}.description`)}
                      </p>
                      
                      {/* Metrics */}
                      <div className="grid grid-cols-3 gap-3 mb-6">
                        {(currentCase.metrics ?? []).map((metric, idx) => (
                          <div key={idx} className="theme-surface border theme-border rounded-lg p-3 text-center">
                            <metric.icon className={`w-5 h-5 ${metric.color} mx-auto mb-1`} />
                            <p className="text-xs theme-text-secondary font-medium">{metric.label}</p>
                          </div>
                        ))}
                      </div>

                      {/* Details */}
                      <div className="space-y-3 mb-6 theme-surface rounded-lg p-4 border theme-border">
                        <div className="text-sm">
                          <span className="theme-accent font-semibold">{tCommon('problem')}: </span>
                          <span className="theme-text-muted">{t(`${currentCase.id}.problem`)}</span>
                        </div>
                        <div className="h-px theme-border"></div>
                        <div className="text-sm">
                          <span className="font-semibold" style={{ color: 'var(--gold-alt)' }}>{tCommon('solution')}: </span>
                          <span className="theme-text-muted">{t(`${currentCase.id}.solution`)}</span>
                        </div>
                        <div className="h-px theme-border"></div>
                        <div className="text-sm">
                          <span className="theme-accent font-semibold">{tCommon('impact')}: </span>
                          <span className="theme-text-muted">{t(`${currentCase.id}.impact`)}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex flex-wrap gap-2 mb-6">
                        {(currentCase.tags ?? []).map((tag, idx) => (
                          <span key={idx} className={`${tag.color} px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium border border-current/20`}>
                            {tag.label}
                          </span>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex items-center gap-3">
                        <button className="group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-300" style={{ backgroundColor: 'var(--accent-primary)', color: 'var(--background)', borderColor: 'var(--accent-primary)' }}>
                          <span>{t(`${currentCase.id}.cta`)}</span>
                          {currentCase.status === 'completed' ? (
                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          ) : (
                            <Play className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                          )}
                        </button>
                        
                        {(currentCase.id === 'case1' || currentCase.id === 'case2') && (
                          <a
                            href={currentCase.id === 'case1' ? "https://github.com/Nicolas-12000/API-REST-Spring-Boot" : "https://github.com/Nicolas-12000"}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold border transition-all duration-300"
                            style={{ backgroundColor: 'var(--accent-secondary)', color: 'white', borderColor: 'var(--accent-secondary)' }}
                          >
                            <Github className="w-4 h-4" />
                            <span>{t('viewCode')}</span>
                            <ExternalLink className="w-3.5 h-3.5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-16 w-12 h-12 theme-glass border theme-border hover:border-[var(--accent-secondary)]/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 theme-shadow-lg z-10"
              aria-label="Previous slide"
            >
              <ChevronLeft className="w-6 h-6 theme-accent" />
            </button>

            <button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-16 w-12 h-12 theme-glass border theme-border hover:border-[var(--accent-secondary)]/40 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 active:scale-95 theme-shadow-lg z-10"
              aria-label="Next slide"
            >
              <ChevronRight className="w-6 h-6 theme-accent" />
            </button>
          </div>

          {/* Counter */}
          <div className="text-center mt-8">
            <p className="text-sm theme-text-muted">
              <span className="theme-accent font-semibold">{currentSlide + 1}</span>
              <span className="mx-2">/</span>
              <span className="theme-accent">{cases.length}</span>
            </p>
          </div>
        </div>

        {/* CTA Footer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="rounded-xl p-6 max-w-2xl mx-auto theme-surface" style={{ border: '1px solid var(--accent-primary)', backgroundColor: 'var(--surface)', boxShadow: '0 6px 24px rgba(0,0,0,0.04)' }}>
            <Sparkles className="w-8 h-8 mx-auto mb-3 theme-accent" />
            <p className="theme-text mb-6 text-base sm:text-lg font-semibold">
              ¿Quieres conocer los detalles técnicos de estos proyectos?
            </p>

            <div className="flex items-center justify-center mt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-3 px-6 py-3 rounded-lg font-semibold text-sm sm:text-base transition-transform duration-200 active:scale-95"
                style={{
                  background: 'linear-gradient(90deg, var(--accent-primary), var(--gold-alt))',
                  color: 'var(--background)',
                  padding: '14px 28px',
                  boxShadow: '0 12px 30px -10px rgba(180,139,47,0.35), inset 0 -2px 0 rgba(0,0,0,0.06)',
                  border: '1px solid rgba(0,0,0,0.06)'
                }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = 'translateY(-2px)'; }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLButtonElement).style.transform = ''; }}
              >
                <Mail className="w-4 h-4" />
                <span>Solicitar Información Detallada</span>
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}