'use client';

import { useTranslations } from 'next-intl';
import { Github, Linkedin, Instagram, Mail, Code2 } from 'lucide-react';

export function Footer() {
  const t = useTranslations('contact');

  const socialLinks = [
    {
      name: 'GitHub',
      url: 'https://github.com/Nicolas-12000',
      icon: Github
    },
    {
      name: 'LinkedIn',
      url: 'https://www.linkedin.com/in/nicolas-garcia-b31b81231/',
      icon: Linkedin
    },
    {
      name: 'Instagram',
      url: 'https://www.instagram.com/nicolas_12000/',
      icon: Instagram
    },
    {
      name: 'Email',
      url: 'mailto:nicolasgarcia12000@gmail.com',
      icon: Mail
    }
  ];

  return (
    <footer className="bg-surface-elevated border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {/* Desktop: 3-column layout | Mobile: stacked */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          
          {/* Left: Logo + Brand */}
          <div className="flex items-center gap-3 order-1">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-accent-secondary via-accent-primary to-accent-secondary rounded-xl flex items-center justify-center shadow-lg shadow-accent-primary/20">
              <Code2 className="w-5 h-5 sm:w-6 sm:h-6 text-background" />
            </div>
            <div>
              <p className="text-base sm:text-lg font-bold text-text-primary tracking-tight">
                NICOLÁS GARCÍA
              </p>
              <p className="text-xs text-text-tertiary">Full-Stack Engineer</p>
            </div>
          </div>

          {/* Center: Copyright + Quote */}
          <div className="flex flex-col items-center gap-2 text-center order-3 md:order-2">
            <p className="text-xs sm:text-sm text-text-secondary">
              © {new Date().getFullYear()} Nicolás Alejandro García Pasmiño
            </p>
            <p className="text-xs sm:text-sm text-text-tertiary italic max-w-md px-4">
              &ldquo;Cada línea de código es una hora más para vivir&rdquo;
            </p>
            
            {/* Social Links - Mobile optimized */}
            <div className="flex items-center gap-2 sm:gap-3 mt-3">
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2.5 bg-surface-hover hover:bg-accent-primary/10 text-text-secondary hover:text-accent-primary rounded-lg transition-all duration-300 active:scale-95 touch-manipulation"
                    aria-label={link.name}
                  >
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right: Status Indicator */}
          <div className="flex items-center gap-3 order-2 md:order-3">
            <div className="relative">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <div className="absolute inset-0 w-3 h-3 bg-green-400 rounded-full animate-ping opacity-75"></div>
            </div>
            <div className="text-left">
              <p className="text-sm sm:text-base font-semibold text-green-400">
                {t('footer_available') || 'Disponible'}
              </p>
              <p className="text-xs text-text-tertiary">
                {t('footer_freelance') || 'Para proyectos'}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom: Tech Stack */}
        <div className="mt-6 pt-6 border-t border-border">
          <p className="text-xs text-text-tertiary text-center">
            Next.js 15 • React 19 • TypeScript • Tailwind CSS v4 • Vercel
          </p>
        </div>
      </div>
    </footer>
  );
}
