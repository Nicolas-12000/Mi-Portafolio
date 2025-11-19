'use client';

import { useTranslations } from 'next-intl';
import { Github, Linkedin, ArrowUp, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

export function Footer() {
  // translations not used in this footer currently
  // const t = useTranslations('contact');
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative theme-bg border-t theme-border overflow-hidden">
      {/* Background effects */}
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--accent-primary), transparent)', opacity: 0.3 }}></div>
      <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.015]"></div>
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-40 rounded-full blur-[150px]" style={{ background: 'radial-gradient(circle, var(--accent-primary), transparent)', opacity: 0.05 }}></div>

      {/* Scroll to Top */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 w-12 h-12 rounded-full flex items-center justify-center theme-shadow-lg transition-all duration-300 hover:scale-110 active:scale-95"
          style={{ 
            background: 'linear-gradient(to bottom right, var(--accent-primary), var(--gold-alt))',
            boxShadow: '0 20px 25px -5px rgba(var(--accent-primary-rgb), 0.2)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to bottom right, var(--gold-alt), var(--accent-primary))'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to bottom right, var(--accent-primary), var(--gold-alt))'}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" style={{ color: 'var(--background)' }} strokeWidth={2.5} />
        </motion.button>
      )}

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-16 sm:py-20">
        
        {/* Main Content - Hero Section */}
        <div className="text-center mb-16">
          <p className="text-base sm:text-lg theme-text-muted italic mb-6">
            ¿Listo para convertir ideas en código?
          </p>
          <h2 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold theme-text mb-12">
            Let&apos;s start
          </h2>

          {/* Contact Info Row */}
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12">
            {/* Email */}
            <a 
              href="mailto:nicolasgarcia12000@gmail.com"
              className="group"
            >
              <div className="text-2xl sm:text-3xl lg:text-4xl font-bold theme-text hover:text-[var(--accent-primary)] transition-colors duration-300">
                nicolasgarcia12000@gmail.com
              </div>
              <div className="h-0.5 w-0 group-hover:w-full transition-all duration-500 mx-auto" style={{ background: 'linear-gradient(to right, var(--accent-primary), var(--gold-alt))' }}></div>
            </a>

            {/* Divider */}
            <div className="hidden lg:block w-px h-20 theme-border"></div>

            {/* Status Badge */}
            <div className="flex items-center gap-4 px-8 py-4 theme-surface border border-[var(--accent-primary)]/30 rounded-full backdrop-blur-sm">
              <span
                className="inline-block w-3 h-3 rounded-full bg-[#10b981] shadow-[0_0_8px_rgba(16,185,129,0.08)] led-blink"
                aria-hidden="true"
              />
              <div className="text-left">
                <p className="text-base font-bold theme-accent">Disponible</p>
                <p className="text-sm theme-text-muted">Remoto & Híbrido</p>
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mt-12">
            <a
              href="https://github.com/Nicolas-12000"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-16 h-16 theme-surface border theme-border hover:border-[var(--accent-primary)]/50 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[var(--accent-primary)]/10 active:scale-95"
              aria-label="GitHub"
            >
              <Github className="w-6 h-6 theme-text-muted group-hover:text-[var(--accent-primary)] transition-colors" />
            </a>
            <a
              href="https://www.linkedin.com/in/nicolas-garcia-b31b81231/"
              target="_blank"
              rel="noopener noreferrer"
              className="group w-16 h-16 theme-surface border theme-border hover:border-[var(--accent-primary)]/50 rounded-full flex items-center justify-center transition-all duration-300 hover:bg-[var(--accent-primary)]/10 active:scale-95"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-6 h-6 theme-text-muted group-hover:text-[var(--accent-primary)] transition-colors" />
            </a>
          </div>
        </div>

        {/* Divider with dots */}
        <div className="relative mb-12">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t theme-border"></div>
          </div>
          <div className="relative flex justify-center">
            <div className="flex items-center gap-2 theme-bg px-4">
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-secondary)' }}></div>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-secondary)' }}></div>
              <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-secondary)' }}></div>
            </div>
          </div>
        </div>

        {/* Bottom Section - 3 Columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Left: Brand + Quote */}
          <div className="text-center md:text-left space-y-3">
            <div className="flex items-center gap-3 justify-center md:justify-start">
              <div className="relative">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center ring-1" style={{ background: 'linear-gradient(to bottom right, var(--accent-secondary), var(--red-dark), var(--red-darker))', boxShadow: '0 0 20px rgba(230,57,70,0.3)', borderColor: 'var(--accent-secondary)' }}>
                    <Code2 className="w-5 h-5 text-white" strokeWidth={2.5} />
                  </div>
                  <div className="absolute inset-0 rounded-lg blur-lg opacity-16" style={{ backgroundColor: 'var(--accent-secondary)' }}></div>
                </div>
              <div>
                <p className="text-sm font-bold theme-text">NICOLÁS GARCÍA</p>
                <p className="text-xs theme-text-muted">Software Engineer</p>
              </div>
            </div>
            <p className="text-xs theme-text-muted italic">
              &ldquo;Cada línea de código es una hora más para vivir&rdquo;
            </p>
          </div>

          {/* Center: Copyright */}
          <div className="text-center space-y-1">
            <p className="text-sm theme-text-muted">
              © {new Date().getFullYear()} Nicolás Alejandro García Pasmiño
            </p>
          </div>

          {/* Right: Location + Tech */}
          <div className="text-center md:text-right space-y-2">
            <p className="text-sm theme-text-muted">
              Pasto, Nariño, Colombia
            </p>
            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Built with Next.js • React • TypeScript
            </p>
          </div>
        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: 'linear-gradient(to right, transparent, var(--accent-primary), transparent)', opacity: 0.2 }}></div>
      <style jsx>{`
        .led-blink {
          animation: ledBlink 2s linear infinite;
          will-change: opacity, box-shadow, transform;
        }

        @keyframes ledBlink {
          /* Quick bright pulse early in the cycle, otherwise dim */
          0%, 20%, 100% {
            transform: scale(1);
            box-shadow: 0 0 8px rgba(16,185,129,0.08);
            opacity: 0.65;
          }
          5% {
            transform: scale(1.14);
            box-shadow: 0 0 26px rgba(16,185,129,0.26);
            opacity: 1;
          }
          8% {
            transform: scale(1.08);
            box-shadow: 0 0 16px rgba(16,185,129,0.16);
            opacity: 0.92;
          }
        }

        /* Respect user's reduced-motion preference */
        @media (prefers-reduced-motion: reduce) {
          .led-blink {
            animation: none !important;
            opacity: 0.9 !important;
            box-shadow: 0 0 10px rgba(16,185,129,0.08) !important;
            transform: none !important;
          }
        }
      `}</style>
    </footer>
  );
}