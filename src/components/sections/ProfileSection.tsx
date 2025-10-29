'use client';

import { useTranslations } from 'next-intl';
import { User, Music, Dumbbell, Coffee, Zap, Target, MapPin, Calendar } from 'lucide-react';

export function ProfileSection() {
  const t = useTranslations('profile');

  const interests = [
    { icon: Music, title: t('interests.music.title'), desc: t('interests.music.description'), color: 'text-purple-400' },
    { icon: Dumbbell, title: t('interests.sports.title'), desc: t('interests.sports.description'), color: 'text-accent-secondary' },
    { icon: Coffee, title: t('interests.explorer.title'), desc: t('interests.explorer.description'), color: 'text-accent-primary' }
  ];

  const softSkills = [
    { icon: User, title: t('softSkills.empathy.title'), desc: t('softSkills.empathy.description') },
    { icon: Zap, title: t('softSkills.adaptability.title'), desc: t('softSkills.adaptability.description') },
    { icon: Target, title: t('softSkills.balance.title'), desc: t('softSkills.balance.description') }
  ];

  return (
    <section id="profile" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 md:mb-16">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6 bg-gradient-to-r from-accent-primary via-accent-primary to-accent-secondary bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-text-secondary max-w-3xl mx-auto px-2">
            {t('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-10 sm:mb-12 md:mb-16">
          {/* Engineer Side */}
          <div className="bg-surface-elevated/60 backdrop-blur-lg rounded-xl border border-border p-6 sm:p-8">
            <div className="flex items-center mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-secondary/20 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                <User className="w-5 h-5 sm:w-6 sm:h-6 text-accent-secondary" />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-text-primary">{t('engineer.title')}</h3>
            </div>
            
            <div className="space-y-5">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <MapPin className="w-4 h-4 text-accent-primary" />
                  <h4 className="font-semibold text-accent-primary text-sm">{t('engineer.location.title')}</h4>
                </div>
                <p className="text-text-tertiary text-sm leading-relaxed">{t('engineer.location.description')}</p>
              </div>
              
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-4 h-4 text-accent-primary" />
                  <h4 className="font-semibold text-accent-primary text-sm">{t('engineer.experience.title')}</h4>
                </div>
                <p className="text-text-tertiary text-sm leading-relaxed">{t('engineer.experience.description')}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-accent-primary mb-2 text-sm">{t('engineer.methods.title')}</h4>
                <p className="text-text-tertiary text-sm leading-relaxed">{t('engineer.methods.description')}</p>
              </div>
              
              <div>
                <h4 className="font-semibold text-accent-primary mb-2 text-sm">{t('engineer.projects.title')}</h4>
                <p className="text-text-tertiary text-sm leading-relaxed">{t('engineer.projects.description')}</p>
              </div>
            </div>
          </div>

          {/* Personal Side */}
          <div className="space-y-6">
            <div className="bg-surface-elevated/60 backdrop-blur-lg rounded-xl border border-border p-6 sm:p-8">
              <div className="flex items-center mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-accent-primary/20 rounded-lg flex items-center justify-center mr-3 sm:mr-4">
                  <User className="w-5 h-5 sm:w-6 sm:h-6 text-accent-primary" />
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-text-primary">{t('personal.title')}</h3>
              </div>
              
              <div className="text-text-tertiary text-sm leading-relaxed mb-5 space-y-3">
                <p>{t('personal.intro')}</p>
                <p>{t('personal.hobbies')}</p>
              </div>

              <div className="space-y-4">
                {interests.map((interest, idx) => {
                  const Icon = interest.icon;
                  return (
                    <div key={idx} className="flex items-start gap-3">
                      <Icon className={`w-5 h-5 ${interest.color} shrink-0 mt-0.5`} />
                      <div>
                        <div className="font-medium text-text-primary text-sm">{interest.title}</div>
                        <div className="text-xs text-text-tertiary">{interest.desc}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Philosophy */}
            <div className="bg-gradient-to-r from-accent-secondary/20 to-accent-primary/20 backdrop-blur-lg rounded-xl border border-accent-secondary/20 p-5 sm:p-6">
              <h4 className="font-bold text-accent-secondary mb-3 text-center text-sm">{t('philosophy.title')}</h4>
              <blockquote className="text-center italic text-text-primary mb-3 text-sm">
                &ldquo;{t('philosophy.quote')}&rdquo;
              </blockquote>
              <div className="text-xs text-text-tertiary text-center">
                {t('philosophy.values')}
              </div>
            </div>
          </div>
        </div>

        {/* Soft Skills */}
        <div className="bg-gradient-to-r from-surface-hover/80 to-surface-elevated/80 backdrop-blur-lg rounded-2xl border border-border p-6 sm:p-8">
          <h3 className="text-xl sm:text-2xl font-bold text-center mb-6 bg-gradient-to-r from-accent-primary via-accent-primary to-accent-secondary bg-clip-text text-transparent">
            {t('softSkills.title')}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {softSkills.map((skill, idx) => {
              const Icon = skill.icon;
              return (
                <div key={idx} className="text-center space-y-3">
                  <div className="w-12 h-12 sm:w-14 sm:h-14 bg-accent-secondary/20 rounded-full flex items-center justify-center mx-auto">
                    <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-accent-secondary" />
                  </div>
                  <h4 className="font-bold text-accent-secondary text-sm">{skill.title}</h4>
                  <p className="text-xs text-text-tertiary leading-relaxed">{skill.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
