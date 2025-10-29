'use client';

import { useTranslations } from 'next-intl';
import { Database, Settings, ExternalLink, Play, Mail } from 'lucide-react';

interface CaseStudiesSectionProps {
  onNavigate: (sectionId: string) => void;
}

export function CaseStudiesSection({ onNavigate }: CaseStudiesSectionProps) {
  const t = useTranslations('cases');
  const tCommon = useTranslations('common');

  const cases = [
    {
      id: 'case1',
      icon: Database,
      iconColor: 'text-accent-secondary',
      bgColor: 'bg-accent-secondary/20',
      status: 'completed',
      statusBg: 'bg-accent-primary/20',
      statusText: 'text-accent-primary',
      cta: 'cta',
      ctaColor: 'text-accent-secondary',
      tags: [
        { label: 'Spring Boot', color: 'bg-orange-600/20 text-orange-300' },
        { label: 'MySQL', color: 'bg-blue-600/20 text-blue-300' },
        { label: 'JWT', color: 'bg-accent-primary/20 text-accent-primary' },
        { label: 'Swagger', color: 'bg-purple-600/20 text-purple-300' }
      ]
    },
    {
      id: 'case2',
      icon: Settings,
      iconColor: 'text-accent-primary',
      bgColor: 'bg-accent-primary/20',
      status: 'inProgress',
      statusBg: 'bg-accent-secondary/20',
      statusText: 'text-accent-secondary',
      cta: 'cta',
      ctaColor: 'text-accent-primary',
      tags: [
        { label: 'Django', color: 'bg-accent-primary/20 text-accent-primary' },
        { label: 'Flutter', color: 'bg-blue-600/20 text-blue-300' },
        { label: 'MySQL', color: 'bg-orange-600/20 text-orange-300' },
        { label: 'REST API', color: 'bg-purple-600/20 text-purple-300' }
      ]
    }
  ];

  return (
    <section id="cases" className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#050507] via-[#0A0A0F] to-[#050507] overflow-hidden">
      {/* Decorative elements - armonía con ContactSection */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#E6B93D] rounded-full blur-[120px] opacity-10" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#D4AF37] rounded-full blur-[120px] opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header - Mobile optimized */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-accent-primary via-accent-primary to-accent-secondary bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-2">
            {t('subtitle')}
          </p>
        </div>

        {/* Cases Grid - 1 col mobile, 2 cols tablet, 2 cols desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 mb-8 sm:mb-12">
          {cases.map((caseItem) => {
            const Icon = caseItem.icon;
            return (
              <div 
                key={caseItem.id}
                className="group bg-surface-elevated/60 backdrop-blur-lg rounded-xl border border-border hover:border-accent-secondary/40 transition-all duration-300 overflow-hidden"
              >
                <div className="p-4 sm:p-6">
                  {/* Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`${caseItem.bgColor} p-2 sm:p-2.5 rounded-lg`}>
                      <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${caseItem.iconColor}`} />
                    </div>
                    <span className={`text-xs ${caseItem.statusBg} ${caseItem.statusText} px-2 py-1 rounded-full`}>
                      {t(`status.${caseItem.status}`)}
                    </span>
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-lg sm:text-xl font-bold mb-2 sm:mb-3 text-text-primary">
                    {t(`${caseItem.id}.title`)}
                  </h3>
                  <p className="text-text-secondary mb-3 sm:mb-4 text-sm sm:text-base">
                    {t(`${caseItem.id}.description`)}
                  </p>
                  
                  {/* Details */}
                  <div className="space-y-2 sm:space-y-3 mb-4 sm:mb-6">
                    <div className="text-sm">
                      <span className="text-accent-secondary font-semibold">{tCommon('problem')}</span>
                      <span className="text-text-tertiary"> {t(`${caseItem.id}.problem`)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-accent-primary font-semibold">{tCommon('solution')}</span>
                      <span className="text-text-tertiary"> {t(`${caseItem.id}.solution`)}</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-accent-primary font-semibold">{tCommon('impact')}</span>
                      <span className="text-text-tertiary"> {t(`${caseItem.id}.impact`)}</span>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {caseItem.tags.map((tag, idx) => (
                      <span key={idx} className={`${tag.color} px-2 py-1 rounded text-xs`}>
                        {tag.label}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <button className={`group flex items-center gap-2 ${caseItem.ctaColor} hover:text-accent-primary transition-colors active:scale-95`}>
                    <span className="text-sm font-medium">{t(`${caseItem.id}.cta`)}</span>
                    {caseItem.status === 'completed' ? (
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    ) : (
                      <Play className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* CTA Footer - Mobile optimized */}
        <div className="text-center">
          <p className="text-text-secondary mb-4 text-sm sm:text-base">¿Te interesa algún caso específico?</p>
          <button 
            onClick={() => onNavigate('contact')}
            className="inline-flex items-center gap-2 bg-surface-hover border border-accent-secondary/40 hover:bg-surface-elevated px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg transition-all duration-300 active:scale-95 text-sm sm:text-base"
          >
            <Mail className="w-4 h-4" />
            <span>Solicitar detalles técnicos</span>
          </button>
        </div>
      </div>
    </section>
  );
}
