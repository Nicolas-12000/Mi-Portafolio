'use client';

import { useState, useEffect } from 'react';

/**
 * Hook para detectar si el usuario prefiere movimiento reducido
 * Respeta la configuración del sistema operativo (prefers-reduced-motion)
 * 
 * @returns boolean - true si el usuario prefiere movimiento reducido
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Detectar preferencia inicial
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Escuchar cambios en la preferencia
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Usar addEventListener para compatibilidad moderna
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return prefersReducedMotion;
}

/**
 * Hook para obtener configuración de animación adaptativa
 * Reduce la intensidad si el usuario prefiere movimiento reducido
 * 
 * @returns objeto con configuraciones de animación
 */
export function useAnimationConfig() {
  const prefersReducedMotion = useReducedMotion();

  return {
    // Duraciones (en segundos para GSAP, en ms para Framer Motion)
    duration: {
      fast: prefersReducedMotion ? 0.1 : 0.2,
      normal: prefersReducedMotion ? 0.15 : 0.4,
      slow: prefersReducedMotion ? 0.2 : 0.6,
    },
    
    // Valores de stagger para animaciones escalonadas
    stagger: prefersReducedMotion ? 0 : 0.08,
    
    // Valores de desplazamiento (y, x)
    offset: {
      small: prefersReducedMotion ? 5 : 10,
      medium: prefersReducedMotion ? 10 : 20,
      large: prefersReducedMotion ? 15 : 50,
    },
    
    // Escalas
    scale: {
      subtle: prefersReducedMotion ? 1 : 0.95,
      normal: prefersReducedMotion ? 1 : 1.05,
    },
    
    // Opacidades
    opacity: {
      hidden: prefersReducedMotion ? 0.8 : 0,
      visible: 1,
    },
    
    // Ease functions
    ease: prefersReducedMotion ? 'linear' : 'power3.out',
    
    // Deshabilitar completamente
    shouldAnimate: !prefersReducedMotion,
  };
}
