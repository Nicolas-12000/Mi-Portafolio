'use client';

import { useTranslations } from 'next-intl';
import { Github, Linkedin, Instagram, Mail, Heart } from 'lucide-react';

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
        {/* Mobile-first grid */}
        <div className="flex flex-col items-center gap-6 sm:gap-8">
          
          {/* Social Links - Optimizado para touch (S25) */}
          <div className="flex items-center gap-3 sm:gap-4">
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 bg-surface-hover hover:bg-accent-primary/10 text-text-secondary hover:text-accent-primary rounded-lg transition-colors active:scale-95"
                  aria-label={link.name}
                >
                  <Icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </a>
              );
            })}
          </div>

          {/* Branding & Copyright */}
          <div className="flex flex-col items-center gap-2 text-center">
            <p className="text-sm sm:text-base font-medium text-text-primary">
              GARCÍA LABS
            </p>
            <p className="text-xs sm:text-sm text-text-secondary flex items-center gap-1.5">
              <span>© {new Date().getFullYear()}</span>
              <span>•</span>
              <span className="flex items-center gap-1">
                {t('footer_made_with') || 'Hecho con'}
                <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-accent-secondary fill-current" />
                {t('footer_by') || 'por'} Nicolás García
              </span>
            </p>
          </div>

          {/* Tech Stack Badge - Optional */}
          <div className="text-xs text-text-tertiary">
            Next.js • React • TypeScript • Tailwind CSS
          </div>
        </div>
      </div>
    </footer>
  );
}
