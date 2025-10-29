'use client';

import { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { Code2, ArrowUpRight } from 'lucide-react';
import { gsap } from 'gsap';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageSelector } from '@/components/ui/LanguageSelector';
import type { Locale } from '@/lib/i18n';

interface NavigationProps {
  locale: Locale;
}

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Detectar si es mobile solo en el cliente
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia('(max-width: 640px)').matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && navRef.current && !navRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
        tlRef.current?.reverse();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
    setIsMenuOpen(false);
    tlRef.current?.reverse();
  };

  // Estructura de cards - Sin colores hardcodeados para que se adapten al tema
  const navCards = [
    {
      label: t('cases'),
      links: [
        { id: 'cases', label: t('cases'), icon: true }
      ]
    },
    {
      label: t('tech'),
      links: [
        { id: 'tech', label: t('tech'), icon: true }
      ]
    },
    {
      label: t('profile'),
      links: [
        { id: 'profile', label: t('profile'), icon: true },
        { id: 'contact', label: t('contact'), icon: true }
      ]
    }
  ];

  const calculateHeight = () => {
    const navEl = navRef.current;
    if (!navEl) return 260;

    const isMobileView = window.matchMedia('(max-width: 768px)').matches;
    if (isMobileView) {
      const contentEl = navEl.querySelector('.card-nav-content') as HTMLElement;
      if (contentEl) {
        const wasVisible = contentEl.style.visibility;
        contentEl.style.visibility = 'visible';
        contentEl.style.position = 'static';
        contentEl.style.height = 'auto';

        const topBar = 56; // Altura reducida para mobile
        const padding = 16;
        const contentHeight = contentEl.scrollHeight;

        contentEl.style.visibility = wasVisible;
        return topBar + contentHeight + padding;
      }
    }
    return 280;
  };

  const createTimeline = () => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const isMobileView = window.matchMedia('(max-width: 768px)').matches;
    const initialHeight = isMobileView ? 56 : 64;

    gsap.set(navEl, { height: initialHeight, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateHeight,
      duration: 0.4,
      ease: 'power3.out'
    });

    tl.to(cardsRef.current, { 
      y: 0, 
      opacity: 1, 
      duration: 0.4, 
      ease: 'power3.out', 
      stagger: 0.08 
    }, '-=0.1');

    return tl;
  };

  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      // Cerrar el menú al cambiar de tamaño
      if (isMenuOpen) {
        setIsMenuOpen(false);
      }

      // Recrear timeline con nuevas dimensiones
      tlRef.current.kill();
      const newTl = createTimeline();
      if (newTl) {
        tlRef.current = newTl;
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMenuOpen]);

  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      tl.play(0);
    } else {
      tl.eventCallback('onReverseComplete', () => setIsMenuOpen(false));
      tl.reverse();
    }
  };

  const setCardRef = (i: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[i] = el;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 sm:pt-4 md:pt-6 px-2 sm:px-4">
      <nav
        ref={navRef}
        className="card-nav w-full max-w-4xl backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden will-change-[height]"
        style={{ 
          height: isMobile ? 56 : 64,
          background: 'rgba(10, 10, 20, 0.4)',
          border: '1px solid rgba(230, 185, 61, 0.15)'
        }}
      >
        {/* Top Bar */}
        <div className="absolute inset-x-0 top-0 h-14 sm:h-16 flex items-center justify-between px-2 sm:px-4 z-10">
          {/* Hamburger Menu */}
          <button
            onClick={toggleMenu}
            className="group flex flex-col items-center justify-center gap-1 sm:gap-1.5 w-9 h-9 sm:w-10 sm:h-10 cursor-pointer order-2 md:order-none transition-opacity hover:opacity-75"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <div
              className={`w-6 sm:w-7 h-0.5 bg-accent-primary transition-all duration-300 ${
                isMenuOpen ? 'translate-y-1 rotate-45' : ''
              }`}
            />
            <div
              className={`w-6 sm:w-7 h-0.5 bg-accent-primary transition-all duration-300 ${
                isMenuOpen ? '-translate-y-1 -rotate-45' : ''
              }`}
            />
          </button>

          {/* Logo - Centrado en desktop */}
          <div className="flex items-center gap-2 sm:gap-2.5 order-1 md:order-none md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[#E63946] via-[#8B0000] to-[#1a0000] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(230,57,70,0.3)] ring-1 ring-red-500/30">
              <Code2 className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white drop-shadow-lg" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-base sm:text-lg md:text-xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-wide">
              GARCÍA LABS
            </span>
          </div>

          {/* Actions - Siempre visibles */}
          <div className="flex items-center gap-1 sm:gap-2 order-3">
            <ThemeToggle />
            <div onClick={toggleMenu}>
              <LanguageSelector currentLocale={locale} />
            </div>
          </div>
        </div>

        {/* Cards Content */}
        <div
          className={`card-nav-content absolute left-0 right-0 top-14 sm:top-16 bottom-0 p-2 sm:p-3 flex flex-col md:flex-row items-stretch justify-end gap-2 sm:gap-3 z-0 ${
            isMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
        >
          {navCards.map((card, idx) => (
            <div
              key={idx}
              ref={setCardRef(idx)}
              className="nav-card flex flex-col gap-2 sm:gap-3 p-3 sm:p-4 rounded-lg sm:rounded-xl min-h-[70px] sm:min-h-[80px] md:flex-1 md:h-full cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm bg-[#E0D9CC]/95 dark:bg-[#1a1a28]/85 border border-[#7A6E5C]/20 dark:border-transparent text-[#2C2416] dark:text-[#FFD700] shadow-lg dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
            >
              <div className="font-semibold text-base sm:text-lg md:text-xl tracking-tight drop-shadow-sm">
                {card.label}
              </div>
              <div className="flex flex-col gap-0.5 sm:gap-1 mt-auto">
                {card.links.map((link, i) => (
                  <button
                    key={i}
                    onClick={() => scrollToSection(link.id)}
                    className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm md:text-base opacity-90 hover:opacity-100 transition-all hover:translate-x-1"
                  >
                    {link.icon && <ArrowUpRight className="w-3 h-3 sm:w-4 sm:h-4 shrink-0" />}
                    {link.label}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </div>
  );
}
