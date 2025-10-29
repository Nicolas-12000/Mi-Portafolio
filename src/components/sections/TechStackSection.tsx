'use client';

import { useTranslations } from 'next-intl';
import { Database, Settings, Cloud, Code2, Cpu, Zap, CheckCircle, Target } from 'lucide-react';

export function TechStackSection() {
  const t = useTranslations('tech');

  const strongSkills = [
    { category: t('backend.title'), icon: Database, skills: ['Spring Boot', 'Spring Security', 'JPA/Hibernate', 'Swagger', 'Hexagonal', 'Modelo 4+1'] },
    { category: t('databases.title'), icon: Settings, skills: ['MySQL', 'MongoDB', 'Scrum', 'SOLID', 'Git Flow', 'APIs REST'] }
  ];

  const consolidatedSkills = [
    { category: t('devops.title'), icon: Cloud, skills: ['Azure DevOps', 'Docker', 'Jenkins', 'GitHub Actions'] },
    { category: t('fullstack.title'), icon: Code2, skills: ['Django + DRF', 'Flutter', 'JavaScript', 'HTML/CSS'] },
    { category: t('tools.title'), icon: Zap, skills: ['Git Avanzado', 'IaaS/PaaS', 'Swagger/OpenAPI', 'Postman'] }
  ];

  const learningSkills = [
    { category: t('frontend.title'), icon: Code2, skills: ['React + Hooks', 'Next.js', 'TypeScript'] },
    { category: t('ai.title'), icon: Cpu, skills: ['PyTorch', 'Tensores', 'LLMs'] },
    { category: t('cloud.title'), icon: Cloud, skills: ['Azure Ecosystem', 'GraphQL', 'Webhooks'] },
    { category: t('automation.title'), icon: Settings, skills: ['n8n', 'Pytest', 'Jest Testing'] }
  ];

  return (
    <section id="tech" className="relative py-12 sm:py-16 md:py-20 bg-gradient-to-b from-[#050507] via-[#0A0A0F] to-[#050507] overflow-hidden">
      {/* Decorative elements - armonía con ContactSection */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-[#E6B93D] rounded-full blur-[120px] opacity-10" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-[#D4AF37] rounded-full blur-[120px] opacity-10" />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-accent-primary via-accent-primary to-accent-secondary bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-2">
            {t('subtitle')}
          </p>
        </div>

        <div className="space-y-8 sm:space-y-10 md:space-y-12">
          {/* Strong Skills */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-accent-secondary mb-4 sm:mb-6 flex items-center">
              <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              {t('strong.title')}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
              {strongSkills.map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <div key={idx} className="bg-surface-elevated/60 backdrop-blur-lg rounded-xl border border-border p-4 sm:p-6">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <Icon className="w-6 h-6 sm:w-8 sm:h-8 text-accent-primary mr-2 sm:mr-3" />
                      <h4 className="text-lg sm:text-xl font-bold text-text-primary">{skill.category}</h4>
                    </div>
                    <div className="grid grid-cols-2 gap-2 sm:gap-3">
                      {skill.skills.map((s, i) => (
                        <span key={i} className="bg-surface-hover text-text-secondary px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm text-center">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Consolidated Skills */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-accent-secondary mb-4 sm:mb-6 flex items-center">
              <Target className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              {t('consolidated.title')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {consolidatedSkills.map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <div key={idx} className="bg-surface-elevated/60 backdrop-blur-lg rounded-xl border border-accent-secondary/20 p-4 sm:p-6">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-primary mr-2" />
                      <h4 className="font-bold text-sm sm:text-base text-text-primary">{skill.category}</h4>
                    </div>
                    <div className="space-y-2">
                      {skill.skills.map((s, i) => (
                        <span key={i} className="block bg-surface-hover text-text-secondary px-2 sm:px-3 py-1.5 sm:py-2 rounded text-xs sm:text-sm text-center">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Learning Skills */}
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-accent-secondary mb-4 sm:mb-6 flex items-center">
              <Zap className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3" />
              {t('learning.title')}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {learningSkills.map((skill, idx) => {
                const Icon = skill.icon;
                return (
                  <div key={idx} className="bg-surface-elevated/60 backdrop-blur-lg rounded-xl border border-accent-secondary/20 p-4 sm:p-6">
                    <div className="flex items-center mb-3 sm:mb-4">
                      <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-accent-primary mr-2" />
                      <h4 className="font-bold text-xs sm:text-sm text-text-primary">{skill.category}</h4>
                    </div>
                    <div className="space-y-2">
                      {skill.skills.map((s, i) => (
                        <span key={i} className="block bg-surface-hover text-text-secondary px-2 py-1 rounded text-xs text-center">
                          {s}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Roadmap 2025 */}
        <div className="mt-10 sm:mt-12 md:mt-16 bg-gradient-to-r from-surface-elevated/80 to-surface-hover/80 backdrop-blur-lg rounded-2xl border border-border p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 sm:mb-8 text-accent-primary">
            {t('roadmap.title')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 text-center">
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-secondary/20 rounded-full flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-accent-secondary" />
              </div>
              <h4 className="font-bold text-accent-secondary text-sm sm:text-base">{t('roadmap.q1.title')}</h4>
              <p className="text-xs sm:text-sm text-text-tertiary">{t('roadmap.q1.description')}</p>
            </div>
            <div className="space-y-3 sm:space-y-4">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-secondary/20 rounded-full flex items-center justify-center mx-auto">
                <Zap className="w-6 h-6 sm:w-8 sm:h-8 text-accent-secondary" />
              </div>
              <h4 className="font-bold text-accent-secondary text-sm sm:text-base">{t('roadmap.q2.title')}</h4>
              <p className="text-xs sm:text-sm text-text-tertiary">{t('roadmap.q2.description')}</p>
            </div>
            <div className="space-y-3 sm:space-y-4 sm:col-span-2 md:col-span-1">
              <div className="w-12 h-12 sm:w-16 sm:h-16 bg-accent-secondary/20 rounded-full flex items-center justify-center mx-auto">
                <Cpu className="w-6 h-6 sm:w-8 sm:h-8 text-accent-secondary" />
              </div>
              <h4 className="font-bold text-accent-secondary text-sm sm:text-base">{t('roadmap.q3.title')}</h4>
              <p className="text-xs sm:text-sm text-text-tertiary">{t('roadmap.q3.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
