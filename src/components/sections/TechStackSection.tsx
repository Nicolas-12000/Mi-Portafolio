'use client';

import { useTranslations } from 'next-intl';
import { Database, Cloud, Code2, Zap, CheckCircle, Target, TrendingUp, Server, Layers, Boxes, Brain, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

export function TechStackSection() {
  const t = useTranslations('tech');
  const currentYear = new Date().getFullYear();
  const currentQuarter = Math.ceil((new Date().getMonth() + 1) / 3);

  const techCategories = [
    {
      level: 'expert',
      title: t('strong.title'),
      icon: CheckCircle,
      gradient: 'from-red-500 to-orange-500',
      glowColor: 'shadow-red-500/10',
      items: [
        { 
          name: t('backend.title'), 
          icon: Server,
          iconColor: 'text-red-400',
          techs: ['Spring Boot', 'Spring Security', 'JPA/Hibernate', 'Swagger'] 
        },
        { 
          name: 'Arquitectura',
          icon: Layers,
          iconColor: 'text-red-400',
          techs: ['Hexagonal', 'Modelo 4+1', 'SOLID', 'APIs REST'] 
        },
        { 
          name: t('databases.title'), 
          icon: Database, 
          iconColor: 'text-red-400',
          techs: ['MySQL', 'MongoDB', 'Redis', 'PostgreSQL'] 
        },
        { 
          name: 'Metodologías',
          icon: Target,
          iconColor: 'text-red-400',
          techs: ['Scrum', 'Git Flow', 'TDD', 'Clean Code'] 
        }
      ]
    },
    {
      level: 'proficient',
      title: t('consolidated.title'),
      icon: Target,
      gradient: 'from-orange-500 to-amber-500',
      glowColor: 'shadow-orange-500/10',
      items: [
        { 
          name: t('devops.title'), 
          icon: Cloud, 
          iconColor: 'text-red-400',
          techs: ['Azure DevOps', 'Docker', 'Jenkins', 'GitHub Actions'] 
        },
        { 
          name: t('fullstack.title'), 
          icon: Code2, 
          iconColor: 'text-red-400',
          techs: ['Django + DRF', 'Flutter', 'JavaScript', 'HTML/CSS'] 
        },
        { 
          name: t('tools.title'), 
          icon: Boxes, 
          iconColor: 'text-red-400',
          techs: ['Git', 'IaaS/PaaS', 'Swagger/OpenAPI', 'Postman'] 
        }
      ]
    },
    {
      level: 'learning',
      title: t('learning.title'),
      icon: TrendingUp,
      gradient: 'from-amber-500 to-yellow-500',
      glowColor: 'shadow-amber-500/10',
      items: [
        { 
          name: t('frontend.title'), 
          icon: Code2, 
          iconColor: 'text-red-400',
          techs: ['React + Hooks', 'Next.js', 'TypeScript', 'Tailwind CSS'] 
        },
        { 
          name: t('ai.title'), 
          icon: Brain, 
          iconColor: 'text-red-400',
          techs: ['PyTorch', 'Tensores', 'LLMs', 'Machine Learning'] 
        },
        { 
          name: t('cloud.title'), 
          icon: Cloud, 
          iconColor: 'text-red-400',
          techs: ['Azure Ecosystem', 'GraphQL', 'Webhooks', 'Microservicios'] 
        },
        { 
          name: t('automation.title'), 
          icon: Zap, 
          iconColor: 'text-red-400',
          techs: ['n8n', 'Pytest', 'Jest Testing', 'CI/CD'] 
        }
      ]
    }
  ];

  const roadmapItems = [
    {
      quarter: 'Q1',
      title: t('roadmap.q1.title'),
      description: t('roadmap.q1.description'),
      icon: CheckCircle,
      gradient: 'from-amber-600 to-orange-600',
      status: 'completed'
    },
    {
      quarter: 'Q2',
      title: t('roadmap.q2.title'),
      description: t('roadmap.q2.description'),
      icon: Rocket,
      gradient: 'from-orange-600 to-red-600',
      status: 'current'
    },
    {
      quarter: 'Q3-Q4',
      title: t('roadmap.q3.title'),
      description: t('roadmap.q3.description'),
      icon: Brain,
      gradient: 'from-red-600 to-rose-600',
      status: 'upcoming'
    }
  ];

  return (
    <section id="tech" className="relative py-16 md:py-24 theme-bg overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.02]" />
      <div className="absolute top-1/4 -left-64 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.08]" style={{ background: 'radial-gradient(circle, var(--accent-secondary), var(--gold-alt))' }} />
      <div className="absolute bottom-1/4 -right-64 w-[600px] h-[600px] rounded-full blur-[150px] opacity-[0.08]" style={{ background: 'radial-gradient(circle, var(--accent-primary), var(--gold-mid))' }} />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-3xl" style={{ background: 'radial-gradient(circle, var(--accent-secondary), transparent, transparent)', opacity: 0.1 }} />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
          >
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
            <span className="theme-gradient-text">
              {t('title')}
            </span>
          </h2>
          <p className="text-base sm:text-lg theme-text-muted max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Tech Stack by Level */}
        <div className="space-y-16">
          {techCategories.map((category, categoryIdx) => {
            const CategoryIcon = category.icon;
            return (
              <motion.div
                key={category.level}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: categoryIdx * 0.15 }}
              >
                {/* Category Header with Gradient */}
                <div className="relative mb-8">
                  <div className="flex items-center gap-4">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`relative p-3 bg-gradient-to-br ${category.gradient} rounded-2xl shadow-lg ${category.glowColor}`}
                    >
                      <CategoryIcon className="w-7 h-7 text-white" />
                      <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} rounded-2xl blur-xl opacity-20`}></div>
                    </motion.div>
                    <div>
                      <h3 className="text-2xl sm:text-3xl font-bold theme-text">
                        {category.title}
                      </h3>
                      <div className={`h-1 w-24 bg-gradient-to-r ${category.gradient} rounded-full mt-2 opacity-40`}></div>
                    </div>
                  </div>
                </div>

                {/* Tech Cards Grid - More Compact & Organized */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5">
                  {category.items.map((item, itemIdx) => {
                    const ItemIcon = item.icon;
                    return (
                      <motion.div
                        key={itemIdx}
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        whileHover={{ y: -5, scale: 1.02 }}
                        transition={{ delay: categoryIdx * 0.1 + itemIdx * 0.05 }}
                        className="group relative theme-glass rounded-2xl border theme-border hover:border-[var(--accent-secondary)]/40 p-5 transition-all duration-300 theme-shadow-lg hover:shadow-[var(--accent-secondary)]/10"
                      >
                        {/* Hover Glow Effect */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`}></div>
                        
                        {/* Icon & Title */}
                        <div className="relative flex items-center gap-3 mb-4 pb-3 border-b theme-border group-hover:border-[var(--accent-secondary)]/20 transition-colors">
                          <div className={`p-2 theme-surface rounded-xl border theme-border group-hover:border-[var(--accent-secondary)]/30 transition-colors`}>
                            <ItemIcon className={`w-5 h-5 ${item.iconColor} group-hover:scale-110 transition-transform`} />
                          </div>
                          <h4 className="font-bold theme-text text-sm group-hover:text-[var(--accent-secondary)] transition-colors">
                            {item.name}
                          </h4>
                        </div>
                        
                        {/* Tech Tags */}
                        <div className="relative flex flex-wrap gap-2">
                          {item.techs.map((tech, techIdx) => (
                            <motion.span
                              key={techIdx}
                              initial={{ opacity: 0, scale: 0.8 }}
                              whileInView={{ opacity: 1, scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: categoryIdx * 0.1 + itemIdx * 0.05 + techIdx * 0.02 }}
                              whileHover={{ scale: 1.05 }}
                              className="px-2.5 py-1.5 theme-surface border theme-border rounded-lg text-xs theme-text-secondary hover:border-[var(--accent-secondary)]/40 hover:text-[var(--accent-secondary)] hover:shadow-lg hover:shadow-[var(--accent-secondary)]/10 transition-all duration-200 cursor-default"
                            >
                              {tech}
                            </motion.span>
                          ))}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Roadmap Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 relative"
        >
          {/* Roadmap Header */}
          <div className="text-center mb-12">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
            >
            </motion.div>
            <h3 className="text-3xl sm:text-4xl font-bold mb-4">
              <span className="theme-gradient-text">
                {t('roadmap.title', { year: currentYear })}
              </span>
            </h3>
            <div className="flex items-center justify-center gap-2 text-sm">
              <div className="w-2 h-2 rounded-full animate-pulse" style={{ backgroundColor: 'var(--accent-secondary)' }}></div>
              <span className="theme-text-muted">En progreso • Q{currentQuarter} de {currentYear}</span>
            </div>
          </div>

          {/* Roadmap Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
            {/* Connection Line */}
            <div className="hidden md:block absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-red-500/20 to-transparent"></div>
            
            {roadmapItems.map((item, idx) => {
              const ItemIcon = item.icon;
              const isActive = item.status === 'current';
              const isCompleted = item.status === 'completed';
              
              return (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className={`relative group ${isActive ? 'z-10' : ''}`}
                >
                  {/* Active Badge */}
                  {isActive && (
                    <motion.div 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-4 left-1/2 -translate-x-1/2 z-20"
                    >
                      <span className="px-4 py-1.5 bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg shadow-red-500/30 whitespace-nowrap">
                        En progreso
                      </span>
                    </motion.div>
                  )}

                  {/* Card */}
                  <div className={`relative theme-glass rounded-2xl border p-8 transition-all duration-300 theme-shadow-lg overflow-hidden ${
                    isCompleted 
                      ? 'border-[var(--accent-primary)]/40 hover:border-[var(--accent-primary)]/60 hover:shadow-[var(--accent-primary)]/20' 
                      : isActive
                      ? 'border-[var(--accent-secondary)]/50 hover:border-[var(--accent-secondary)]/70 hover:shadow-[var(--accent-secondary)]/20 shadow-[var(--accent-secondary)]/10'
                      : 'theme-border hover:border-[var(--accent-secondary)]/30 hover:shadow-[var(--accent-secondary)]/10'
                  }`}>
                    {/* Glow Effect */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                    
                    <div className="relative flex flex-col items-center text-center space-y-5">
                      {/* Icon */}
                      <motion.div 
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        className={`relative w-20 h-20 rounded-2xl flex items-center justify-center shadow-lg ${
                          isCompleted 
                            ? `bg-gradient-to-br ${item.gradient} shadow-amber-500/30` 
                            : isActive
                            ? `bg-gradient-to-br ${item.gradient} shadow-red-500/30`
                            : 'bg-gradient-to-br from-[#2A2A35] to-[#1C1C28]'
                        }`}
                      >
                        <ItemIcon className={`w-10 h-10 ${
                          isCompleted || isActive ? 'text-white' : 'text-[#9CA3AF]'
                        }`} />
                        
                        {/* Pulse Animation for Active */}
                        {isActive && (
                          <motion.div
                            animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className={`absolute inset-0 bg-gradient-to-br ${item.gradient} rounded-2xl`}
                          />
                        )}
                      </motion.div>
                      
                      {/* Content */}
                      <div>
                        <p className={`text-xs font-bold mb-2 tracking-wider ${
                          isCompleted ? 'text-[var(--accent-primary)]' : isActive ? 'text-[var(--accent-secondary)]' : 'theme-text-muted'
                        }`}>
                          {item.quarter} {currentYear}
                        </p>
                        <h4 className="text-lg font-bold theme-text mb-3 group-hover:text-[var(--accent-secondary)] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-sm theme-text-muted leading-relaxed">
                          {item.description}
                        </p>
                      </div>

                      {/* Progress Indicator */}
                      {isCompleted && (
                        <div className="absolute top-4 right-4">
                          <div className="w-8 h-8 rounded-full bg-amber-500/20 flex items-center justify-center">
                            <CheckCircle className="w-5 h-5 text-amber-400" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}