'use client';

import React, { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Mail, Github, Linkedin, Instagram, MapPin, Clock, Send, ChevronRight, ChevronLeft, Sparkles, Code2, Rocket, FileText, CheckCircle2, ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
  prefersReducedMotion?: boolean;
}

function Stepper({ currentStep, totalSteps, prefersReducedMotion = false }: StepperProps) {
  const t = useTranslations('contact');
  return (
    <div className="flex items-center justify-between mb-8 px-2">
      {[...Array(totalSteps)].map((_, index) => {
        const step = index + 1;
        const isComplete = currentStep > step;
        const isActive = currentStep === step;
        
        return (
          <React.Fragment key={step}>
            <div className="flex flex-col items-center flex-1">
              <motion.div
                initial={false}
                animate={{
                  scale: isActive ? 1 : 0.9,
                }}
                className="relative"
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isComplete 
                      ? 'bg-gradient-to-br from-[var(--accent-primary)] to-[var(--gold-alt)] border-[var(--accent-primary)] theme-shadow-lg' 
                      : isActive 
                      ? 'theme-surface border-[var(--accent-primary)] theme-shadow-lg' 
                      : 'theme-surface theme-border'
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-5 h-5 text-[var(--text-primary)]" strokeWidth={2.5} />
                  ) : (
                    <span className={`text-sm font-bold ${isActive ? 'theme-accent' : 'theme-text-muted'}`}>
                      {step}
                    </span>
                  )}
                </div>
                {isActive && !prefersReducedMotion && (
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: 'var(--accent-primary)' }}
                    initial={{ scale: 1, opacity: 0.22 }}
                    animate={{ scale: 1.3, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
              <p className={`text-xs mt-2 font-medium text-center ${isActive ? 'theme-accent' : 'theme-text-muted'}`}>
                {step === 1 ? t('form.steps.info') : step === 2 ? t('form.steps.project') : t('form.steps.message')}
              </p>
            </div>
            {step < totalSteps && (
              <div className="flex-1 h-[2px] mx-2 theme-elevated relative overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ width: isComplete ? '100%' : '0%' }}
                  className="h-full bg-gradient-to-r from-[var(--accent-primary)] to-[var(--gold-alt)]"
                  transition={{ duration: 0.5, ease: "easeInOut" }}
                />
              </div>
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

const projectIcons = {
  backend: Code2,
  fullstack: Rocket,
  devops: Sparkles,
  automation: Sparkles,
  consulting: FileText,
  other: Code2,
};

export function ContactSection() {
  const t = useTranslations('contact');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'backend',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const projectTypes = [
    'backend',
    'fullstack',
    'devops',
    'automation',
    'consulting',
    'other'
  ];

  const socialLinks = [
    { key: 'github', name: 'GitHub', icon: Github, url: 'https://github.com/Nicolas-12000', color: 'text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[var(--accent-primary)]' },
    { key: 'linkedin', name: 'LinkedIn', icon: Linkedin, url: 'https://www.linkedin.com/in/nicolás-alejandro-garcía-pasmiño-82765333b/', color: 'text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[#0A66C2]' },
    { key: 'instagram', name: 'Instagram', icon: Instagram, url: 'https://www.instagram.com/nico.gp12/', color: 'text-[var(--text-primary)] transition-colors duration-200 group-hover:text-[#E4405F]' }
  ];

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-16 md:py-24 theme-bg overflow-hidden">
      {/* Background effects - matching portfolio style */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      <div className="absolute top-1/4 -right-64 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.08]" style={{ background: 'radial-gradient(circle, var(--accent-primary), var(--gold-alt))' }} />
      <div className="absolute bottom-1/4 -left-64 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.08]" style={{ background: 'radial-gradient(circle, var(--gold-alt), var(--accent-primary))' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-10" style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent, transparent)' }} />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div 
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
            {t('form.lead')}
          </p>
        </motion.div>

        {/* Main Grid - 3 sections */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          {/* Contact Info Card */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.02 }}
            className="theme-glass rounded-xl p-6 hover:border-[var(--accent-primary)]/50 transition-all duration-300 theme-shadow-lg"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 rounded-lg bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--gold-alt)]/20">
                <Mail className="w-5 h-5 theme-accent" />
              </div>
                <h3 className="text-lg font-bold theme-text">{t('info.title')}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 theme-accent mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium theme-text-muted">{t('info.location.title')}</p>
                  <p className="text-sm theme-text-secondary">{t('info.location.value')}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 theme-accent mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium theme-text-muted">Email</p>
                  <a href={`mailto:${t('info.email.value')}`} className="text-sm theme-text-secondary hover:theme-accent transition-colors break-all">
                    {t('info.email.value')}
                  </a>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 theme-accent mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-medium theme-text-muted">{t('info.availability.title')}</p>
                  <p className="text-sm theme-text-secondary">{t('info.availability.value')}</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Social Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="theme-glass rounded-xl p-6 hover:border-[var(--accent-primary)]/50 transition-all duration-300 theme-shadow-lg"
          >
            <h3 className="text-lg font-bold theme-text mb-5">{t('social.title')}</h3>
            <div className="space-y-2">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a 
                    key={social.name}
                    href={social.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between p-3 sm:p-3.5 theme-surface hover:theme-elevated rounded-lg transition-all duration-300 theme-border hover:border-[var(--accent-primary)]/50"
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-5 h-5 sm:w-5 sm:h-5 ${social.color}`} />
                        <span className="text-sm font-medium theme-text-secondary group-hover:theme-text">{t(`social.${social.key}.title`)}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 theme-text-muted group-hover:theme-accent group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                );
              })}
            </div>
          </motion.div>

          {/* CV Download */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            whileHover={{ scale: 1.02 }}
            className="bg-gradient-to-br from-[var(--accent-primary)]/15 via-[var(--gold-alt)]/10 to-[var(--accent-primary)]/15 backdrop-blur-md rounded-xl border border-[var(--accent-primary)]/40 p-6 group hover:border-[var(--accent-primary)]/60 transition-all duration-300 theme-shadow-lg hover:shadow-[var(--accent-primary)]/20"
          >
            <div className="flex items-start gap-3 mb-4">
              <div className="p-3 rounded-lg flex items-center justify-center bg-gradient-to-br from-[var(--accent-primary)]/20 to-[var(--gold-alt)]/20">
                <FileText className="w-6 h-6 theme-accent" />
              </div>
              <div className="flex-1">
                <h4 className="font-bold theme-text text-base">{t('cv.title')}</h4>
                <p className="text-sm theme-text-muted">{t('cv.description')}</p>
              </div>
            </div>
            <p className="text-sm theme-text-muted mb-4 leading-relaxed">
              {t('cv.fullDownload')}
            </p>

            <div className="flex gap-2 flex-wrap mb-4">
              <span className="px-2 py-1 theme-surface-hover rounded text-xs theme-text-muted">{t('cv.tags.projects')}</span>
              <span className="px-2 py-1 theme-surface-hover rounded text-xs theme-text-muted">{t('cv.tags.architectures')}</span>
              <span className="px-2 py-1 theme-surface-hover rounded text-xs theme-text-muted">{t('cv.tags.metrics')}</span>
            </div>

            <a
              href="/CV.pdf"
              download
              target="_blank"
              rel="noopener noreferrer"
              className="w-full inline-flex items-center justify-center theme-btn-primary px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
              aria-label={t('cv.download')}
            >
              {t('cv.download')}
            </a>
          </motion.div>
        </div>

        {/* Form Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="theme-glass rounded-xl p-6 sm:p-8 shadow-xl"
        >
          {!submitted ? (
            <>
              <Stepper currentStep={currentStep} totalSteps={3} />
              
              <div className="mt-8">
                <AnimatePresence mode="wait">
                  {/* Step 1 */}
                  {currentStep === 1 && (
                    <motion.div
                      key="step1"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div>
                        <h3 className="text-xl font-bold theme-text mb-1">{t('form.step1Title')}</h3>
                        <p className="text-sm theme-text-muted mb-5">{t('form.step1Subtitle')}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">
                          Nombre completo *
                        </label>
                        <input 
                          type="text" 
                          value={formData.name}
                          onChange={(e) => setFormData({...formData, name: e.target.value})}
                          className="w-full theme-surface theme-border rounded-lg px-4 py-3 theme-text placeholder-text-tertiary focus:border-[var(--accent-primary)] focus:outline-none transition-colors focus:ring-1 focus:ring-[var(--accent-primary)]/20"
                          placeholder={t('form.name.placeholder')}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">
                          Email de contacto *
                        </label>
                        <input 
                          type="email" 
                          value={formData.email}
                          onChange={(e) => setFormData({...formData, email: e.target.value})}
                          className="w-full theme-surface theme-border rounded-lg px-4 py-3 theme-text placeholder-text-tertiary focus:border-[var(--accent-primary)] focus:outline-none transition-colors focus:ring-1 focus:ring-[var(--accent-primary)]/20"
                          placeholder={t('form.email.placeholder')}
                        />
                      </div>
                    </motion.div>
                  )}

                  {/* Step 2 */}
                  {currentStep === 2 && (
                    <motion.div
                      key="step2"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div>
                        <h3 className="text-xl font-bold theme-text mb-1">{t('form.step2Title')}</h3>
                        <p className="text-sm theme-text-muted mb-5">{t('form.step2Subtitle')}</p>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {projectTypes.map((type) => {
                          const Icon = projectIcons[type as keyof typeof projectIcons];
                          return (
                            <button
                              key={type}
                              onClick={() => setFormData({...formData, projectType: type})}
                              className={`relative flex items-center gap-3 p-4 rounded-lg transition-all duration-300 border-2 text-left ${
                                  formData.projectType === type
                                    ? 'border-[var(--accent-primary)] theme-shadow-lg bg-[var(--accent-primary)]/12 hover:bg-[var(--accent-primary)]/16' : 'theme-surface theme-border hover:border-[var(--accent-primary)]/40'
                                }`}
                            >
                              <div className={`p-2 rounded-lg flex-shrink-0 ${
                                formData.projectType === type 
                                  ? 'bg-[var(--accent-primary)]/30' 
                                  : 'theme-elevated'
                              }`}>
                                <Icon className={`w-5 h-5 ${
                                  formData.projectType === type ? 'text-[var(--text-primary)]' : 'theme-text-muted'
                                }`} />
                              </div>
                              <div className="flex-1">
                                <span className={`text-sm font-medium ${
                                  formData.projectType === type ? 'text-[var(--text-primary)]' : 'theme-text-secondary'
                                }`}>
                                  {t(`projectTypes.${type}`)}
                                </span>
                              </div>
                              {formData.projectType === type && (
                                <CheckCircle2 className="w-5 h-5 theme-accent flex-shrink-0" />
                              )}
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* Step 3 */}
                  {currentStep === 3 && (
                    <motion.div
                      key="step3"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                      className="space-y-5"
                    >
                      <div>
                        <h3 className="text-xl font-bold theme-text mb-1">{t('form.step3Title')}</h3>
                        <p className="text-sm theme-text-muted mb-5">{t('form.step3Subtitle')}</p>
                      </div>

                      <div>
                        <label className="block text-sm font-medium theme-text-secondary mb-2">
                          {t('form.message.label')}
                        </label>
                        <textarea 
                          rows={6}
                          value={formData.message}
                          onChange={(e) => setFormData({...formData, message: e.target.value})}
                          className="w-full theme-surface theme-border rounded-lg px-4 py-3 theme-text placeholder-text-tertiary focus:border-[var(--accent-primary)] focus:outline-none transition-colors focus:ring-1 focus:ring-[var(--accent-primary)]/20 resize-none"
                          placeholder={t('form.message.placeholder')}
                        />
                      </div>

                      <div className="rounded-lg p-4 bg-[var(--accent-primary)]/12 border border-[var(--accent-primary)]/20">
                        <div className="flex gap-3">
                          <Sparkles className="w-5 h-5 theme-accent flex-shrink-0 mt-0.5" />
                          <div>
                              <p className="text-sm font-semibold text-[var(--text-primary)] mb-0.5">{t('form.guaranteeTitle')}</p>
                              <p className="text-xs theme-text-secondary">{t('form.guarantee')}</p>
                            </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Navigation */}
                <div className="flex justify-between items-center mt-8 pt-6 border-t theme-border">
                  <button
                    onClick={handleBack}
                    disabled={currentStep === 1}
                    className="flex items-center gap-2 px-4 py-2 theme-text-muted hover:theme-text disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium text-sm"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    {t('form.back')}
                  </button>
                  
                  {currentStep < 3 ? (
                    <button
                      onClick={handleNext}
                      className="flex items-center gap-2 theme-btn-primary px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {t('form.next')}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  ) : (
                    <button
                      onClick={handleSubmit}
                      className="flex items-center gap-2 theme-btn-primary px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Send className="w-4 h-4" />
                      {t('form.submit')}
                    </button>
                  )}
                </div>
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-12 px-4"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", delay: 0.2 }}
                className="w-20 h-20 bg-gradient-to-br from-[var(--accent-primary)] to-[var(--gold-alt)] rounded-full flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-[var(--accent-primary)]/30"
              >
                <CheckCircle2 className="w-10 h-10 theme-bg" strokeWidth={2.5} />
              </motion.div>
              <h3 className="text-2xl font-bold theme-text mb-2">{t('submitted.title')}</h3>
              <p className="text-sm theme-text-muted mb-6 max-w-sm mx-auto">
                {t('submitted.message', { name: formData.name })}
              </p>
              <button
                onClick={() => {
                  setSubmitted(false);
                  setCurrentStep(1);
                  setFormData({ name: '', email: '', projectType: 'Backend Development', message: '' });
                }}
                className="theme-accent hover:text-[var(--gold-alt)] transition-colors text-sm font-medium inline-flex items-center gap-2 group"
              >
                <span>{t('submitted.action')}</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}