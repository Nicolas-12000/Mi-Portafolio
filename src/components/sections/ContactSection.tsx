'use client';

import { useTranslations } from 'next-intl';
import { Mail, Github, Linkedin, Instagram, ExternalLink, Download, FileText } from 'lucide-react';

export function ContactSection() {
  const t = useTranslations('contact');

  const projectTypes = [
    'Backend Development',
    'Full-Stack Application',
    'DevOps y Cloud',
    'Process Automation',
    'Technical Consulting',
    t('form.projectType.other')
  ];

  return (
    <section id="contact" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-surface to-background">
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
          {/* Left Column: Info + CV + Social */}
          <div className="space-y-6">
            {/* Contact Info Card */}
            <div className="bg-surface-elevated/60 backdrop-blur-lg rounded-xl border border-border p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-accent-secondary">{t('info.title')}</h3>
              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-accent-primary mb-1">{t('info.location.title')}</h4>
                  <p className="text-sm text-text-tertiary">{t('info.location.value')}</p>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-accent-primary mb-1">{t('info.email.title')}</h4>
                  <a href="mailto:nikolasg1200@gmail.com" className="text-sm text-text-tertiary hover:text-accent-primary transition-colors">
                    nikolasg1200@gmail.com
                  </a>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-accent-primary mb-1">{t('info.availability.title')}</h4>
                  <p className="text-sm text-text-tertiary">{t('info.availability.value')}</p>
                </div>
              </div>
            </div>

            {/* CV Download */}
            <div className="bg-surface-elevated/60 backdrop-blur-lg rounded-xl border border-border p-6 sm:p-8">
              <div className="p-6 bg-gradient-to-r from-accent-secondary/20 to-accent-primary/20 rounded-xl border border-accent-primary/30">
                <h4 className="font-bold text-accent-secondary mb-3 flex items-center text-base sm:text-lg">
                  <FileText className="w-5 h-5 mr-2" />
                  {t('cv.title')}
                </h4>
                <p className="text-sm text-text-tertiary mb-4">
                  {t('cv.description')}
                </p>
                <button className="w-full bg-gradient-to-r from-accent-primary to-accent-secondary hover:from-accent-secondary hover:to-accent-primary px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 active:scale-[0.98] touch-manipulation">
                  <Download className="w-5 h-5" />
                  <span>{t('cv.download')}</span>
                </button>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-surface-elevated/60 backdrop-blur-lg rounded-xl border border-border p-6 sm:p-8">
              <h3 className="text-xl sm:text-2xl font-bold mb-6 text-accent-secondary">{t('social.title')}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <a 
                  href="https://github.com/Nicolas-12000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={t('social.github.aria')}
                  className="group bg-surface-hover/50 hover:bg-surface-hover/70 p-4 rounded-lg transition-all duration-300 flex items-center space-x-3 active:scale-95 touch-manipulation"
                >
                  <Github className="w-6 h-6 text-text-tertiary group-hover:text-text-primary" />
                  <div>
                    <div className="font-medium text-sm sm:text-base">{t('social.github.title')}</div>
                    <div className="text-xs text-text-tertiary">{t('social.github.subtitle')}</div>
                  </div>
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/nicol%C3%A1s-alejandro-garc%C3%ADa-pasmi%C3%B1o-82765333b/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={t('social.linkedin.aria')}
                  className="group bg-blue-900/30 hover:bg-blue-800/30 p-4 rounded-lg transition-all duration-300 flex items-center space-x-3 active:scale-95 touch-manipulation"
                >
                  <Linkedin className="w-6 h-6 text-blue-400 group-hover:text-blue-300" />
                  <div>
                    <div className="font-medium text-sm sm:text-base">{t('social.linkedin.title')}</div>
                    <div className="text-xs text-text-tertiary">{t('social.linkedin.subtitle')}</div>
                  </div>
                </a>
              </div>
              
              {/* Instagram - Subtle */}
              <div className="mt-4 pt-4 border-t border-border">
                <a 
                  href="https://www.instagram.com/nico.gp12/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label={t('social.instagram.aria')}
                  className="group text-text-tertiary hover:text-purple-400 transition-colors flex items-center space-x-2 text-sm active:scale-95"
                >
                  <Instagram className="w-4 h-4" />
                  <span>{t('social.instagram.text')}</span>
                  <ExternalLink className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-surface-elevated/60 backdrop-blur-lg rounded-xl border border-border p-6 sm:p-8 w-full">
            <h3 className="text-xl sm:text-2xl font-bold mb-6 text-accent-secondary">{t('form.title')}</h3>
            
            <form className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">{t('form.name.label')}</label>
                  <input 
                    type="text" 
                    className="w-full bg-surface-hover/50 border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-tertiary focus:border-accent-secondary focus:outline-none transition-colors touch-manipulation"
                    placeholder={t('form.name.placeholder')}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-text-secondary mb-2">{t('form.email.label')}</label>
                  <input 
                    type="email" 
                    className="w-full bg-surface-hover/50 border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-tertiary focus:border-accent-secondary focus:outline-none transition-colors touch-manipulation"
                    placeholder={t('form.email.placeholder')}
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">{t('form.projectType.label')}</label>
                <select className="w-full bg-surface-hover/50 border border-border rounded-lg px-4 py-3 text-text-primary focus:border-accent-secondary focus:outline-none transition-colors touch-manipulation">
                  {projectTypes.map((type, idx) => (
                    <option key={idx}>{type}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-text-secondary mb-2">{t('form.message.label')}</label>
                <textarea 
                  rows={4}
                  className="w-full bg-surface-hover/50 border border-border rounded-lg px-4 py-3 text-text-primary placeholder-text-tertiary focus:border-accent-secondary focus:outline-none transition-colors resize-none touch-manipulation"
                  placeholder={t('form.message.placeholder')}
                ></textarea>
              </div>
              
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-accent-secondary to-accent-primary hover:from-accent-primary hover:to-accent-secondary px-6 py-4 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center space-x-2 active:scale-[0.98] touch-manipulation"
              >
                <Mail className="w-5 h-5" />
                <span>{t('form.submit')}</span>
              </button>
            </form>
            
            <div className="mt-6 p-4 bg-accent-secondary/10 border border-accent-secondary/30 rounded-lg">
              <p className="text-sm text-accent-secondary text-center">
                <strong>{t('form.guarantee')}</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
