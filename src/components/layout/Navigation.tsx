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

// Constantes para evitar magic numbers
const MOBILE_BREAKPOINT = 768;
const NAV_HEIGHT_MOBILE = 56;
const NAV_HEIGHT_DESKTOP = 64;
const CARD_HEIGHT_MOBILE = 90;
const GAP_BETWEEN_CARDS = 10;
const CONTAINER_PADDING = 12;
const NUMBER_OF_CARDS = 3;

export function Navigation({ locale }: NavigationProps) {
  const t = useTranslations('nav');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLanguageSelectorOpen, setIsLanguageSelectorOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  const navRef = useRef<HTMLDivElement | null>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const tlRef = useRef<gsap.core.Timeline | null>(null);

  // Estructura de navegación
  const navCards = [
    {
      label: t('cases'),
      links: [{ id: 'cases', label: t('cases'), icon: true }]
    },
    {
      label: t('tech'),
      links: [{ id: 'tech', label: t('tech'), icon: true }]
    },
    {
      label: t('profile'),
      links: [
        { id: 'profile', label: t('profile'), icon: true },
        { id: 'contact', label: t('contact'), icon: true }
      ]
    }
  ];

  // Detectar viewport mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar selector de idiomas cuando se cierra el menú
  useEffect(() => {
    if (!isMenuOpen && isLanguageSelectorOpen) {
      setIsLanguageSelectorOpen(false);
    }
  }, [isMenuOpen, isLanguageSelectorOpen]);

  // Cerrar menú al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      
      // Verificar si el click fue dentro del nav o del dropdown de idiomas
      const clickedInNav = navRef.current?.contains(target);
      const clickedInLanguageDropdown = (target as Element).closest('.language-dropdown-portal');
      
      if (isMenuOpen && !clickedInNav && !clickedInLanguageDropdown) {
        closeMenu();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  // Calcular altura expandida del nav
  const calculateExpandedHeight = (): number => {
    const isMobileView = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
    
    if (isMobileView) {
      const cardsHeight = (CARD_HEIGHT_MOBILE * NUMBER_OF_CARDS) + 
                         (GAP_BETWEEN_CARDS * (NUMBER_OF_CARDS - 1));
      return NAV_HEIGHT_MOBILE + cardsHeight + CONTAINER_PADDING + 12;
    }
    
    return 280; // Desktop height
  };

  // Crear timeline de animación
  const createTimeline = (): gsap.core.Timeline | null => {
    const navEl = navRef.current;
    if (!navEl) return null;

    const isMobileView = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
    const initialHeight = isMobileView ? NAV_HEIGHT_MOBILE : NAV_HEIGHT_DESKTOP;

    // Setup inicial
    gsap.set(navEl, { height: initialHeight, overflow: 'hidden' });
    gsap.set(cardsRef.current, { y: 50, opacity: 0 });

    // Timeline de expansión
    const tl = gsap.timeline({ paused: true });

    tl.to(navEl, {
      height: calculateExpandedHeight,
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

  // Inicializar timeline
  useLayoutEffect(() => {
    const tl = createTimeline();
    tlRef.current = tl;

    return () => {
      tl?.kill();
      tlRef.current = null;
    };
  }, []);

  // Manejar resize
  useLayoutEffect(() => {
    const handleResize = () => {
      if (!tlRef.current) return;

      if (isMenuOpen) {
        closeMenu();
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

  // Función para cerrar el menú
  const closeMenu = () => {
    setIsLanguageSelectorOpen(false);
    tlRef.current?.eventCallback('onReverseComplete', () => setIsMenuOpen(false));
    tlRef.current?.reverse();
  };

  // Toggle del menú
  const toggleMenu = () => {
    const tl = tlRef.current;
    if (!tl) return;
    
    if (!isMenuOpen) {
      setIsMenuOpen(true);
      tl.play(0);
    } else {
      closeMenu();
    }
  };

  // Abrir menú si no está abierto
  const openMenuIfClosed = () => {
    const tl = tlRef.current;
    if (!tl || isMenuOpen) return;
    
    setIsMenuOpen(true);
    tl.play(0);
  };

  // Scroll suave a sección
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (!element) return;

    const offset = 80;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });

    closeMenu();
  };

  // Ref helper para cards
  const setCardRef = (index: number) => (el: HTMLDivElement | null) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-2 sm:pt-4 md:pt-6 px-2 sm:px-4">
      <nav
        ref={navRef}
        className="card-nav w-full max-w-4xl backdrop-blur-xl rounded-xl sm:rounded-2xl shadow-2xl overflow-hidden will-change-[height]"
        style={{ 
          height: isMobile ? NAV_HEIGHT_MOBILE : NAV_HEIGHT_DESKTOP,
          background: 'rgba(10, 10, 20, 0.4)',
          border: '1px solid rgba(230, 185, 61, 0.15)'
        }}
      >
        {/* Barra Superior */}
        <div className="absolute inset-x-0 top-0 h-14 sm:h-16 flex items-center justify-between px-2 sm:px-4 z-10">
          {/* Botón Hamburguesa */}
          <button
            onClick={toggleMenu}
            className="group flex flex-col items-center justify-center gap-1 sm:gap-1.5 w-9 h-9 sm:w-10 sm:h-10 cursor-pointer order-2 md:order-none transition-opacity hover:opacity-75"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
          >
            <div
              className={`w-6 sm:w-7 h-0.5 transition-all duration-300 ${
                isMenuOpen ? 'translate-y-1 rotate-45' : ''
              }`}
              style={{ backgroundColor: '#E6B93D', boxShadow: '0 0 8px rgba(230,185,61,0.45)' }}
            />
            <div
              className={`w-6 sm:w-7 h-0.5 transition-all duration-300 ${
                isMenuOpen ? '-translate-y-1 -rotate-45' : ''
              }`}
              style={{ backgroundColor: '#E6B93D', boxShadow: '0 0 8px rgba(230,185,61,0.45)' }}
            />
          </button>

          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-2.5 order-1 md:order-none md:absolute md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2">
            <div className="w-9 h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-[#E63946] via-[#8B0000] to-[#1a0000] rounded-lg flex items-center justify-center shadow-[0_0_20px_rgba(230,57,70,0.3)] ring-1 ring-red-500/30">
              <Code2 className="w-5 h-5 sm:w-5.5 sm:h-5.5 text-white drop-shadow-lg" strokeWidth={2.5} />
            </div>
            <span className="font-bold text-base sm:text-lg md:text-xl text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] tracking-wide">
              GARCÍA LABS
            </span>
          </div>

          {/* Controles */}
          <div className="flex items-center gap-1 sm:gap-2 order-3">
            <ThemeToggle />
            <div onClick={openMenuIfClosed}>
              <LanguageSelector 
                currentLocale={locale} 
                isOpen={isLanguageSelectorOpen}
                onOpenChange={setIsLanguageSelectorOpen}
              />
            </div>
          </div>
        </div>

        {/* Contenedor de Cards */}
        <div
          className={`card-nav-content left-0 right-0 p-2 sm:p-3 flex flex-col md:flex-row items-stretch justify-end gap-2.5 sm:gap-3 ${
            isMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
          style={{
            position: 'absolute',
            top: isMobile ? `${NAV_HEIGHT_MOBILE}px` : `${NAV_HEIGHT_DESKTOP}px`,
            bottom: 0,
            zIndex: 0
          }}
        >
          {navCards.map((card, idx) => (
            <div
              key={idx}
              ref={setCardRef(idx)}
              className="nav-card flex flex-col gap-2 sm:gap-3 p-3.5 sm:p-4 rounded-lg sm:rounded-xl md:flex-1 md:h-full cursor-pointer transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] backdrop-blur-sm bg-[#E0D9CC]/95 dark:bg-[#1a1a28]/85 border border-[#7A6E5C]/20 dark:border-transparent text-[#2C2416] dark:text-[#FFD700] shadow-lg dark:shadow-[0_4px_12px_rgba(0,0,0,0.3)]"
              style={{ minHeight: isMobile ? `${CARD_HEIGHT_MOBILE}px` : '80px' }}
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