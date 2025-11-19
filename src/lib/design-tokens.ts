/**
 * 🎨 DESIGN TOKENS - Sistema centralizado de colores y estilos
 * 
 * IMPORTANTE: Estos son los colores base. Los componentes deben usar
 * variables CSS (var(--color)) para soportar cambio automático de tema.
 */

// ===== COLORES PRINCIPALES =====
export const COLORS = {
  // Backgrounds - Dark Mode
  background: {
    primary: '#050507',      // Fondo principal oscuro
    surface: '#151520',      // Superficie elevada
    elevated: '#1C1C1E',     // Superficie más elevada
    hover: 'rgba(21, 21, 32, 0.5)',  // Hover state
    
    // Light mode
    light: {
      primary: '#FAF8F3',    // Crema muy suave
      surface: '#F5F1E8',    // Crema suave
      elevated: '#EFEAE0',   // Beige claro
      hover: 'rgba(239, 234, 224, 0.8)',
    },
    
    // Fondos específicos de componentes
    navDark: 'rgba(10, 10, 20, 0.4)',
    surfaceCard: 'rgba(10, 10, 15, 0.6)',
    dark: '#0A0A0F',
    darker: '#0A0A14',
    cardDark: 'rgba(20, 20, 24, 0.6)',
    cardHover: 'rgba(30, 30, 36, 0.4)',
  },

  // Texto
  text: {
    primary: '#F2F2F7',      // Texto principal claro
    secondary: '#9CA3AF',    // Texto secundario gris
    tertiary: '#6B7280',     // Texto terciario más gris
    
    // Light mode
    light: {
      primary: '#1A1512',    // Casi negro con toque marrón
      secondary: '#4A4238',  // Marrón oscuro
      tertiary: '#6B6358',   // Marrón medio
    },
  },

  // Acentos (Dorado/Rojo)
  accent: {
    primary: '#E6B93D',      // Dorado principal
    secondary: '#E63946',    // Rojo vibrante
    burgundy: '#4A0E1F',     // Burgundy base
    goldAlt: '#D4AF37',      // Dorado alternativo
    
    // Light mode
    light: {
      primary: '#B8932F',    // Dorado profundo
      secondary: '#C44536',  // Rojo terracota elegante
      burgundy: '#8B2635',   // Burgundy rico
      goldAlt: '#9C7A2F',    // Dorado alternativo más oscuro
    },
  },

  // Colores específicos para efectos dorados
  gold: {
    bright: '#FFD700',       // Dorado brillante
    warm: '#FFA500',         // Naranja dorado
    light: '#FEFCE8',        // Amarillo muy claro
    mid: '#FACC15',          // Amarillo medio
    dark: '#78350F',         // Marrón dorado oscuro
  },

  // Colores rojos/burgundy
  red: {
    vibrant: '#E63946',      // Rojo coral vibrante
    crimson: '#D62839',      // Rojo carmesí
    burgundy: '#C41E3A',     // Rojo burgundy profundo
    darkBurgundy: '#8B1538', // Burgundy muy oscuro
  },

  // Borders
  border: {
    default: 'rgba(74, 14, 31, 0.2)',
    subtle: 'rgba(74, 14, 31, 0.1)',
    accent: 'rgba(230, 185, 61, 0.15)',
    accentHover: 'rgba(230, 185, 61, 0.3)',
    
    // Light mode
    light: {
      default: 'rgba(155, 138, 115, 0.2)',
      subtle: 'rgba(155, 138, 115, 0.1)',
    },
    
    // Específicos
    gray: '#2A2A35',
    navBorder: '#1C1C28',
  },

  // Status
  status: {
    success: '#10B981',
    error: '#EF4444',
    warning: '#F59E0B',
    info: '#3B82F6',
    
    // Light mode
    light: {
      success: '#2F7A5B',
      error: '#B8554D',
      warning: '#B8832F',
      info: '#4A6B8B',
    },
  },
} as const;

// ===== GRADIENTES =====
export const GRADIENTS = {
  // Gradientes principales
  warm: 'linear-gradient(to right, #4A0E1F, #E63946, #E6B93D)',
  goldRed: 'linear-gradient(to right, #E6B93D, #E63946)',
  burgundyToRed: 'linear-gradient(to right, #4A0E1F, #E63946)',
  
  // Gradientes de texto
  text: 'linear-gradient(to right, #F2F2F7, #E6B93D, #E63946)',
  textLight: 'linear-gradient(to right, #2C2416, #C9A961, #B8554D)',
  
  // Gradientes para backgrounds
  bgDark: 'linear-gradient(to bottom, #050507, #0A0A0F, #050507)',
  bgTransparent: 'linear-gradient(to bottom, transparent, rgba(10, 10, 20, 0.2), #050507)',
  
  // Gradientes de botones y componentes
  goldButton: 'linear-gradient(to right, #E6B93D, #D4AF37)',
  goldButtonReverse: 'linear-gradient(to right, #D4AF37, #E6B93D)',
  
  // HeroSection - Título dorado metálico
  goldMetallic: 'linear-gradient(to bottom, #FEFCE8, #FACC15, #78350F)',
  goldGlow: 'linear-gradient(to right, #FFD700, #FFA500, #FFD700)',
  goldShine: 'linear-gradient(to bottom, white, rgba(255, 255, 255, 0.4), transparent)',
  goldShadow: 'linear-gradient(to bottom, transparent, #78350F, black)',
} as const;

// ===== ESPACIADO (Mobile First - S25 + iPhone SE) =====
export const SPACING = {
  // Espaciado de secciones (py)
  section: {
    xs: 'py-8 sm:py-12',      // Muy compacto (móvil pequeño)
    sm: 'py-12 sm:py-16',     // Compacto
    md: 'py-16 sm:py-20',     // Medio
    lg: 'py-20 sm:py-24',     // Grande (default)
    xl: 'py-24 sm:py-32',     // Extra grande
  },
  
  // Padding de contenedor
  container: 'px-3 sm:px-4 md:px-6 lg:px-8',
  containerTight: 'px-4 sm:px-6',
  
  // Gaps
  gap: {
    xs: 'gap-1.5 sm:gap-2',
    sm: 'gap-2 sm:gap-4',
    md: 'gap-4 sm:gap-6',
    lg: 'gap-6 sm:gap-8',
    xl: 'gap-8 sm:gap-12',
  },
  
  // Márgenes comunes
  mb: {
    xs: 'mb-4 sm:mb-6',
    sm: 'mb-6 sm:mb-8',
    md: 'mb-8 sm:mb-10',
    lg: 'mb-10 sm:mb-12',
    xl: 'mb-12 sm:mb-16',
  },
} as const;

// ===== TIPOGRAFÍA =====
export const TYPOGRAPHY = {
  // Tamaños de texto (mobile-first)
  size: {
    // Títulos
    h1: 'text-3xl sm:text-4xl md:text-5xl lg:text-6xl',      // Hero principal
    h2: 'text-2xl sm:text-3xl md:text-4xl lg:text-5xl',      // Títulos de sección
    h3: 'text-xl sm:text-2xl md:text-3xl',                    // Subtítulos
    h4: 'text-lg sm:text-xl md:text-2xl',                     // Títulos pequeños
    
    // Texto
    base: 'text-sm sm:text-base',                             // Texto normal
    lg: 'text-base sm:text-lg',                               // Texto grande
    xl: 'text-lg sm:text-xl md:text-2xl',                     // Texto extra grande
    
    // Pequeños
    sm: 'text-xs sm:text-sm',                                 // Texto pequeño
    xs: 'text-[10px] sm:text-xs',                             // Texto muy pequeño
  },
  
  // Pesos
  weight: {
    normal: 'font-normal',
    medium: 'font-medium',
    semibold: 'font-semibold',
    bold: 'font-bold',
  },
} as const;

// ===== SOMBRAS Y EFECTOS =====
export const EFFECTS = {
  // Sombras
  shadow: {
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
    '2xl': 'shadow-2xl',
    goldGlow: 'shadow-[0_0_10px_rgba(230,185,61,0.6)]',
    goldGlowDark: 'shadow-[0_0_10px_rgba(201,169,97,0.6)]',
    accentGlow: 'shadow-lg shadow-accent-primary/30',
  },
  
  // Blur
  blur: {
    sm: 'blur-sm',
    md: 'blur-md',
    lg: 'blur-lg',
    xl: 'blur-xl',
    '2xl': 'blur-2xl',
    '3xl': 'blur-[120px]',
  },
  
  // Backdrop
  backdrop: {
    blur: 'backdrop-blur-sm',
    blurMd: 'backdrop-blur-md',
    blurLg: 'backdrop-blur-lg',
    blurXl: 'backdrop-blur-xl',
  },
  
  // Transiciones
  transition: {
    fast: 'transition-all duration-150 ease-in-out',
    base: 'transition-all duration-300 ease-in-out',
    slow: 'transition-all duration-500 ease-in-out',
    colors: 'transition-colors duration-300',
  },
} as const;

// ===== BREAKPOINTS (Mobile First) =====
export const BREAKPOINTS = {
  // Pantallas pequeñas (iPhone SE, 12 mini, 13 mini: 375px)
  xs: '375px',
  // Samsung S25, iPhone 14/15: 390px - 430px
  sm: '640px',
  // Tablets
  md: '768px',
  // Tablets grandes / laptops pequeñas
  lg: '1024px',
  // Laptops
  xl: '1280px',
  // Monitores grandes
  '2xl': '1536px',
} as const;

// ===== UTILIDADES DE COMPONENTES =====
export const COMPONENTS = {
  // Botones
  button: {
    primary: 'bg-gradient-to-r from-burgundy to-accent-secondary hover:from-accent-secondary hover:to-burgundy',
    secondary: 'border-2 border-accent-primary/50 hover:bg-accent-primary/10 hover:border-accent-primary',
    sizes: {
      sm: 'px-4 py-2 text-sm',
      md: 'px-6 py-2.5 text-base',
      lg: 'px-8 py-3 text-lg',
    },
  },
  
  // Cards
  card: {
    base: 'bg-surface-elevated/60 backdrop-blur-lg rounded-xl border border-border',
    hover: 'hover:border-accent-primary/50 transition-all duration-300',
  },
  
  // Inputs
  input: {
    base: 'bg-[#0A0A0F] border border-[#2A2A35] rounded-xl px-4 py-3 text-text-primary placeholder:text-text-tertiary focus:border-accent-primary focus:outline-none transition-colors',
  },
} as const;

// ===== ANIMACIONES =====
export const ANIMATIONS = {
  // Durations (más sutiles)
  duration: {
    fast: 150,
    base: 300,
    slow: 500,
    verySlow: 800,
  },
  
  // Easings
  easing: {
    default: 'ease-in-out',
    spring: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
  
  // Clases de animación
  fadeIn: 'animate-fadeIn',
  slideUp: 'animate-slideUp',
  scaleIn: 'animate-scaleIn',
  pulse: 'animate-pulse',
} as const;

// ===== UTILIDADES DE TAILWIND (Clases frecuentes) =====
export const TAILWIND_UTILS = {
  // Clases de color reutilizables
  bg: {
    dark: 'bg-[#050507]',
    surface: 'bg-[#151520]',
    elevated: 'bg-surface-elevated',
    card: 'bg-[#0A0A0F]',
  },
  
  text: {
    primary: 'text-[#F2F2F7]',
    secondary: 'text-[#9CA3AF]',
    tertiary: 'text-[#6B7280]',
    gold: 'text-[#E6B93D]',
    goldAlt: 'text-[#D4AF37]',
    red: 'text-[#E63946]',
  },
  
  border: {
    default: 'border-[rgba(74,14,31,0.2)]',
    accent: 'border-[#E6B93D]',
    gray: 'border-[#2A2A35]',
  },
} as const;

// ===== HELPER FUNCTIONS =====

/**
 * Combina clases de Tailwind de forma segura
 * (Simple alternativa a clsx/tailwind-merge sin dependencias)
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Obtiene el color según el tema
 */
export function getThemeColor(lightColor: string, darkColor: string, theme: 'light' | 'dark'): string {
  return theme === 'light' ? lightColor : darkColor;
}
