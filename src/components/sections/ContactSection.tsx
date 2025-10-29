'use client';

import React, { useState } from 'react';
import { Mail, Github, Linkedin, Instagram, MapPin, Clock, Send, ChevronRight, ChevronLeft, Sparkles, Code2, Rocket, FileText, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslations } from 'next-intl';

interface StepperProps {
  currentStep: number;
  totalSteps: number;
}

function Stepper({ currentStep, totalSteps }: StepperProps) {
  return (
    <div className="flex items-center justify-between mb-10 px-4">
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
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                    isComplete 
                      ? 'bg-gradient-to-br from-[#E6B93D] to-[#D4AF37] border-[#E6B93D] shadow-lg shadow-[#E6B93D]/30' 
                      : isActive 
                      ? 'bg-[#0A0A0F] border-[#E6B93D] shadow-lg shadow-[#E6B93D]/20' 
                      : 'bg-[#0A0A0F] border-[#2A2A35]'
                  }`}
                >
                  {isComplete ? (
                    <CheckCircle2 className="w-6 h-6 text-[#0A0A0F]" strokeWidth={2.5} />
                  ) : (
                    <span className={`text-sm font-bold ${isActive ? 'text-[#E6B93D]' : 'text-[#6B7280]'}`}>
                      {step}
                    </span>
                  )}
                </div>
                {isActive && (
                  <motion.div
                    className="absolute inset-0 rounded-full bg-[#E6B93D]"
                    initial={{ scale: 1, opacity: 0.5 }}
                    animate={{ scale: 1.3, opacity: 0 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                )}
              </motion.div>
              <p className={`text-xs mt-2 font-medium text-center ${isActive ? 'text-[#E6B93D]' : 'text-[#6B7280]'}`}>
                {step === 1 ? 'Info' : step === 2 ? 'Proyecto' : 'Mensaje'}
              </p>
            </div>
            {step < totalSteps && (
              <div className="flex-1 h-[2px] mx-2 bg-[#1C1C28] relative overflow-hidden">
                <motion.div
                  initial={false}
                  animate={{ width: isComplete ? '100%' : '0%' }}
                  className="h-full bg-gradient-to-r from-[#E6B93D] to-[#D4AF37]"
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
  'Backend Development': Code2,
  'Full-Stack Application': Rocket,
  'DevOps y Cloud': Sparkles,
  'Process Automation': Sparkles,
  'Technical Consulting': FileText,
  'Other': Code2,
};

export function ContactSection() {
  const t = useTranslations('contact');
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Backend Development',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const projectTypes = [
    'Backend Development',
    'Full-Stack Application',
    'DevOps y Cloud',
    'Process Automation',
    'Technical Consulting',
    'Other'
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
    <section id="contact" className="relative py-20 md:py-28 bg-gradient-to-b from-[#050507] via-[#0A0A0F] to-[#050507] overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      <div className="absolute top-1/4 -right-32 w-96 h-96 bg-[#E6B93D] rounded-full blur-[120px] opacity-10" />
      <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-[#D4AF37] rounded-full blur-[120px] opacity-10" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-5">
            <span className="bg-gradient-to-r from-[#F2F2F7] via-[#E6B93D] to-[#D4AF37] bg-clip-text text-transparent">
              {t('form.title')}
            </span>
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Sidebar */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-4 space-y-6"
          >
            {/* Contact Info Card */}
            <div className="group bg-gradient-to-br from-[#0F0F1A] to-[#1C1C28] rounded-2xl border border-[#2A2A35] p-6 hover:border-[#E6B93D]/30 transition-all duration-300">
              <h3 className="text-xl font-bold text-[#E6B93D] mb-6 flex items-center">
                <Mail className="w-5 h-5 mr-2" />
                {t('info.title')}
              </h3>
              <div className="space-y-5">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-[#E6B93D] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#D1D5DB]">{t('info.location.title')}</p>
                    <p className="text-sm text-[#6B7280]">{t('info.location.value')}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-[#E6B93D] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#D1D5DB]">{t('info.email.title')}</p>
                    <a href="mailto:nikolasg1200@gmail.com" className="text-sm text-[#6B7280] hover:text-[#E6B93D] transition-colors">
                      {t('info.email.value')}
                    </a>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-[#E6B93D] mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-[#D1D5DB]">{t('info.availability.title')}</p>
                    <p className="text-sm text-[#6B7280]">{t('info.availability.value')}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Social Links */}
            <div className="bg-gradient-to-br from-[#0F0F1A] to-[#1C1C28] rounded-2xl border border-[#2A2A35] p-6">
              <h3 className="text-lg font-bold text-[#F2F2F7] mb-4">{t('social.title')}</h3>
              <div className="space-y-3">
                <a 
                  href="https://github.com/Nicolas-12000" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 bg-[#1C1C28] hover:bg-[#2A2A35] rounded-xl transition-all duration-300 border border-transparent hover:border-[#E6B93D]/20"
                >
                  <div className="flex items-center space-x-3">
                    <Github className="w-5 h-5 text-[#9CA3AF] group-hover:text-[#F2F2F7]" />
                    <span className="text-sm font-medium text-[#D1D5DB]">{t('social.github.title')}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#E6B93D] transform group-hover:translate-x-1 transition-all" />
                </a>
                
                <a 
                  href="https://www.linkedin.com/in/nicol%C3%A1s-alejandro-garc%C3%ADa-pasmi%C3%B1o-82765333b/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 bg-[#1C1C28] hover:bg-[#2A2A35] rounded-xl transition-all duration-300 border border-transparent hover:border-[#0A66C2]/30"
                >
                  <div className="flex items-center space-x-3">
                    <Linkedin className="w-5 h-5 text-[#0A66C2]" />
                    <span className="text-sm font-medium text-[#D1D5DB]">{t('social.linkedin.title')}</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#0A66C2] transform group-hover:translate-x-1 transition-all" />
                </a>

                <a 
                  href="https://www.instagram.com/nico.gp12/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="group flex items-center justify-between p-3 bg-[#1C1C28] hover:bg-[#2A2A35] rounded-xl transition-all duration-300 border border-transparent hover:border-[#E4405F]/30"
                >
                  <div className="flex items-center space-x-3">
                    <Instagram className="w-5 h-5 text-[#E4405F]" />
                    <span className="text-sm font-medium text-[#D1D5DB]">Instagram</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#6B7280] group-hover:text-[#E4405F] transform group-hover:translate-x-1 transition-all" />
                </a>
              </div>
            </div>

            {/* CV Download */}
            <div className="relative bg-gradient-to-br from-[#E6B93D]/10 to-[#D4AF37]/10 rounded-2xl border border-[#E6B93D]/30 p-6 overflow-hidden group hover:border-[#E6B93D]/50 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-[#E6B93D]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative">
                <FileText className="w-8 h-8 text-[#E6B93D] mb-3" />
                <h4 className="font-bold text-[#F2F2F7] text-lg mb-2">{t('cv.title')}</h4>
                <p className="text-sm text-[#9CA3AF] mb-4">
                  {t('cv.description')}
                </p>
                <button className="w-full bg-gradient-to-r from-[#E6B93D] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E6B93D] text-[#0A0A0F] px-4 py-3 rounded-xl font-semibold text-sm transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#E6B93D]/20">
                  {t('cv.download')}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right - Stepper Form */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-8"
          >
            <div className="bg-gradient-to-br from-[#0F0F1A] to-[#1C1C28] rounded-2xl border border-[#2A2A35] p-8 sm:p-10">
              {!submitted ? (
                <>
                  <Stepper currentStep={currentStep} totalSteps={3} />
                  
                  <div className="mt-8">
                    <AnimatePresence mode="wait">
                      {/* Step 1 */}
                      {currentStep === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="mb-8">
                            <h3 className="text-2xl font-bold text-[#F2F2F7] mb-2">{t('form.title')}</h3>
                            <p className="text-[#9CA3AF]">{t('subtitle')}</p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                              {t('form.name.label')} *
                            </label>
                            <input 
                              type="text" 
                              value={formData.name}
                              onChange={(e) => setFormData({...formData, name: e.target.value})}
                              className="w-full bg-[#0A0A0F] border border-[#2A2A35] rounded-xl px-4 py-3.5 text-[#F2F2F7] placeholder-[#6B7280] focus:border-[#E6B93D] focus:outline-none transition-colors"
                              placeholder={t('form.name.placeholder')}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                              {t('form.email.label')} *
                            </label>
                            <input 
                              type="email" 
                              value={formData.email}
                              onChange={(e) => setFormData({...formData, email: e.target.value})}
                              className="w-full bg-[#0A0A0F] border border-[#2A2A35] rounded-xl px-4 py-3.5 text-[#F2F2F7] placeholder-[#6B7280] focus:border-[#E6B93D] focus:outline-none transition-colors"
                              placeholder={t('form.email.placeholder')}
                            />
                          </div>
                        </motion.div>
                      )}

                      {/* Step 2 */}
                      {currentStep === 2 && (
                        <motion.div
                          key="step2"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="mb-8">
                            <h3 className="text-2xl font-bold text-[#F2F2F7] mb-2">{t('form.projectType.label')}</h3>
                            <p className="text-[#9CA3AF]">{t('subtitle')}</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {projectTypes.map((type) => {
                              const Icon = projectIcons[type as keyof typeof projectIcons];
                              return (
                                <label
                                  key={type}
                                  className={`relative flex items-center p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                                    formData.projectType === type
                                      ? 'bg-gradient-to-br from-[#E6B93D]/20 to-[#D4AF37]/10 border-2 border-[#E6B93D] shadow-lg shadow-[#E6B93D]/10'
                                      : 'bg-[#0A0A0F] border-2 border-[#2A2A35] hover:border-[#E6B93D]/50'
                                  }`}
                                  onClick={() => setFormData({...formData, projectType: type})}
                                >
                                  <div className="flex items-center space-x-3 flex-1">
                                    <div className={`p-2 rounded-lg ${
                                      formData.projectType === type 
                                        ? 'bg-[#E6B93D]/20' 
                                        : 'bg-[#1C1C28]'
                                    }`}>
                                      <Icon className={`w-5 h-5 ${
                                        formData.projectType === type ? 'text-[#E6B93D]' : 'text-[#9CA3AF]'
                                      }`} />
                                    </div>
                                    <span className={`text-sm font-medium ${
                                      formData.projectType === type ? 'text-[#F2F2F7]' : 'text-[#D1D5DB]'
                                    }`}>
                                      {type}
                                    </span>
                                  </div>
                                  {formData.projectType === type && (
                                    <CheckCircle2 className="w-5 h-5 text-[#E6B93D] flex-shrink-0" />
                                  )}
                                </label>
                              );
                            })}
                          </div>
                        </motion.div>
                      )}

                      {/* Step 3 */}
                      {currentStep === 3 && (
                        <motion.div
                          key="step3"
                          initial={{ opacity: 0, x: 30 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -30 }}
                          transition={{ duration: 0.3 }}
                          className="space-y-6"
                        >
                          <div className="mb-8">
                            <h3 className="text-2xl font-bold text-[#F2F2F7] mb-2">{t('form.message.label')}</h3>
                            <p className="text-[#9CA3AF]">{t('subtitle')}</p>
                          </div>

                          <div>
                            <label className="block text-sm font-medium text-[#D1D5DB] mb-2">
                              {t('form.message.label')} *
                            </label>
                            <textarea 
                              rows={7}
                              value={formData.message}
                              onChange={(e) => setFormData({...formData, message: e.target.value})}
                              className="w-full bg-[#0A0A0F] border border-[#2A2A35] rounded-xl px-4 py-3.5 text-[#F2F2F7] placeholder-[#6B7280] focus:border-[#E6B93D] focus:outline-none transition-colors resize-none"
                              placeholder={t('form.message.placeholder')}
                            />
                          </div>

                          <div className="bg-gradient-to-br from-[#E6B93D]/10 to-[#D4AF37]/5 border border-[#E6B93D]/30 rounded-xl p-5">
                            <div className="flex items-start space-x-3">
                              <Sparkles className="w-5 h-5 text-[#E6B93D] flex-shrink-0 mt-0.5" />
                              <div>
                                <p className="text-sm font-semibold text-[#E6B93D] mb-1">{t('form.submit')}</p>
                                <p className="text-sm text-[#9CA3AF]">{t('form.guarantee')}</p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Navigation */}
                    <div className="flex justify-between items-center mt-10 pt-6 border-t border-[#2A2A35]">
                      <button
                        type="button"
                        onClick={handleBack}
                        disabled={currentStep === 1}
                        className="group flex items-center space-x-2 px-5 py-2.5 text-[#9CA3AF] hover:text-[#F2F2F7] disabled:opacity-30 disabled:cursor-not-allowed transition-colors font-medium"
                      >
                        <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Atrás</span>
                      </button>
                      
                      {currentStep < 3 ? (
                        <button
                          type="button"
                          onClick={handleNext}
                          className="group flex items-center space-x-2 bg-gradient-to-r from-[#E6B93D] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E6B93D] text-[#0A0A0F] px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#E6B93D]/30"
                        >
                          <span>Siguiente</span>
                          <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                      ) : (
                        <button
                          type="button"
                          onClick={handleSubmit}
                          className="group flex items-center space-x-2 bg-gradient-to-r from-[#E6B93D] to-[#D4AF37] hover:from-[#D4AF37] hover:to-[#E6B93D] text-[#0A0A0F] px-6 py-2.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#E6B93D]/30"
                        >
                          <Send className="w-4 h-4" />
                          <span>Enviar mensaje</span>
                        </button>
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-16"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", delay: 0.2 }}
                    className="w-24 h-24 bg-gradient-to-br from-[#E6B93D] to-[#D4AF37] rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-[#E6B93D]/30"
                  >
                    <CheckCircle2 className="w-12 h-12 text-[#0A0A0F]" strokeWidth={2.5} />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-[#F2F2F7] mb-3">¡Mensaje enviado con éxito!</h3>
                  <p className="text-[#9CA3AF] mb-8 max-w-md mx-auto">
                    Gracias por contactarme, <span className="text-[#E6B93D] font-semibold">{formData.name}</span>. Revisaré tu mensaje y te responderé pronto.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setCurrentStep(1);
                      setFormData({ name: '', email: '', projectType: 'Backend Development', message: '' });
                    }}
                    className="text-[#E6B93D] hover:text-[#D4AF37] transition-colors font-medium inline-flex items-center space-x-2 group"
                  >
                    <span>Enviar otro mensaje</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}