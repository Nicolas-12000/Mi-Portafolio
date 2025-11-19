import React, { useEffect, useRef } from 'react';

export interface LiquidEtherProps {
  mouseForce?: number;
  cursorSize?: number;
  isViscous?: boolean;
  viscous?: number;
  iterationsViscous?: number;
  iterationsPoisson?: number;
  dt?: number;
  BFECC?: boolean;
  resolution?: number;
  isBounce?: boolean;
  colors?: string[];
  style?: React.CSSProperties;
  className?: string;
  autoDemo?: boolean;
  autoSpeed?: number;
  autoIntensity?: number;
  takeoverDuration?: number;
  autoResumeDelay?: number;
  autoRampDuration?: number;
}

const defaultColors = ['#5227FF', '#FF9FFC', '#B19EEF'];

export default function LiquidEther({
  colors = defaultColors,
  style = {},
  className = '',
}: LiquidEtherProps): React.ReactElement {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Crear canvas para el efecto líquido
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const container = mountRef.current;
    canvas.style.width = '100%';
    canvas.style.height = '100%';
    canvas.style.position = 'absolute';
    canvas.style.top = '0';
    canvas.style.left = '0';
    container.appendChild(canvas);

    let animationId: number;
    let time = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };

    const animate = () => {
      if (!ctx || !canvas) return;
      
      time += 0.005;
      
      // Crear gradiente animado con los colores proporcionados
      const gradient = ctx.createLinearGradient(
        Math.sin(time) * canvas.width,
        Math.cos(time * 0.7) * canvas.height,
        Math.cos(time * 0.5) * canvas.width,
        Math.sin(time * 0.3) * canvas.height
      );
      
      colors.forEach((color, index) => {
        gradient.addColorStop(index / (colors.length - 1), color + '33'); // Añadir transparencia
      });

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      animationId = requestAnimationFrame(animate);
    };

    resize();
    window.addEventListener('resize', resize);
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      if (animationId) cancelAnimationFrame(animationId);
      if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
    };
  }, [colors]);

  return (
    <div
      ref={mountRef}
      className={`w-full h-full relative overflow-hidden ${className || ''}`}
      style={{ 
        background: 'linear-gradient(135deg, #FAF8F3 0%, #F5F1E8 50%, #EFEAE0 100%)',
        ...style 
      }}
    />
  );
}
