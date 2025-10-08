import { createGlobalStyle } from "styled-components";

// Definición del tema global
export const theme = {
  colors: {
    // Colores principales - Paleta moderna y vibrante
    primary: "#6366f1",
    primaryDark: "#4f46e5",
    primaryLight: "#818cf8",

    // Colores secundarios
    secondary: "#ec4899",
    secondaryDark: "#db2777",
    secondaryLight: "#f472b6",

    // Colores de estado
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",

    // Colores de texto
    text: "#1f2937",
    textSecondary: "#6b7280",
    textLight: "#9ca3af",
    textInverse: "#ffffff",

    // Colores de fondo - Gradientes modernos
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    backgroundSecondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    backgroundTertiary: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    backgroundCard: "rgba(255, 255, 255, 0.95)",
    backgroundGlass: "rgba(255, 255, 255, 0.1)",

    // Colores de borde
    border: "rgba(255, 255, 255, 0.2)",
    borderLight: "rgba(255, 255, 255, 0.1)",
    borderDark: "rgba(255, 255, 255, 0.3)",

    // Gradientes modernos
    gradientPrimary: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    gradientSecondary: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    gradientSuccess: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
    gradientWarning: "linear-gradient(135deg, #f59e0b 0%, #d97706 100%)",
    gradientError: "linear-gradient(135deg, #ef4444 0%, #dc2626 100%)",
    gradientInfo: "linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)",
    gradientGlass:
      "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",

    // Colores con transparencia
    overlay: "rgba(0, 0, 0, 0.6)",
    glass: "rgba(255, 255, 255, 0.95)",
    glassSecondary: "rgba(255, 255, 255, 0.8)",
    glassDark: "rgba(0, 0, 0, 0.1)",
  },

  // Espaciado
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
  },

  // Tipografía
  fonts: {
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    heading:
      '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"Fira Code", "Monaco", "Cascadia Code", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", monospace',
  },

  fontSizes: {
    xs: "0.75rem", // 12px
    sm: "0.875rem", // 14px
    md: "1rem", // 16px
    lg: "1.125rem", // 18px
    xl: "1.25rem", // 20px
    "2xl": "1.5rem", // 24px
    "3xl": "1.875rem", // 30px
    "4xl": "2.25rem", // 36px
  },

  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
  },

  lineHeights: {
    tight: 1.25,
    normal: 1.5,
    relaxed: 1.75,
  },

  // Bordes
  borderRadius: {
    none: "0",
    sm: "0.25rem", // 4px
    md: "0.5rem", // 8px
    lg: "0.75rem", // 12px
    xl: "1rem", // 16px
    "2xl": "1.5rem", // 24px
    full: "9999px",
  },

  // Sombras
  shadows: {
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
    "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    inner: "inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)",
    none: "none",
  },

  // Transiciones
  transitions: {
    fast: "0.15s ease",
    normal: "0.3s ease",
    slow: "0.5s ease",
  },

  // Z-index
  zIndex: {
    dropdown: 1000,
    sticky: 1020,
    fixed: 1030,
    modal: 1040,
    popover: 1050,
    tooltip: 1060,
    toast: 1070,
  },

  // Breakpoints
  breakpoints: {
    sm: "640px",
    md: "768px",
    lg: "1024px",
    xl: "1280px",
    "2xl": "1536px",
  },
};

// Estilos globales
export const GlobalStyle = createGlobalStyle`
  /* Importar fuentes de Google Fonts */
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  
  /* Reset y estilos base */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  html {
    font-size: 16px;
    scroll-behavior: smooth;
  }
  
  body {
    font-family: ${theme.fonts.body};
    font-size: ${theme.fontSizes.md};
    font-weight: ${theme.fontWeights.normal};
    line-height: ${theme.lineHeights.normal};
    color: ${theme.colors.text};
    background: ${theme.colors.background};
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    overflow-x: hidden;
  }
  
  body::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 15% 85%, rgba(102, 126, 234, 0.4) 0%, transparent 60%),
      radial-gradient(circle at 85% 15%, rgba(240, 147, 251, 0.35) 0%, transparent 55%),
      radial-gradient(circle at 45% 45%, rgba(79, 172, 254, 0.25) 0%, transparent 50%),
      radial-gradient(circle at 70% 70%, rgba(236, 72, 153, 0.2) 0%, transparent 45%),
      radial-gradient(circle at 25% 25%, rgba(118, 75, 162, 0.3) 0%, transparent 40%);
    z-index: -1;
    animation: backgroundShift 25s ease-in-out infinite;
  }
  
  body::after {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: 
      radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.05) 0%, transparent 30%),
      radial-gradient(circle at 20% 80%, rgba(255, 255, 255, 0.03) 0%, transparent 25%);
    z-index: -1;
    animation: backgroundShimmer 15s ease-in-out infinite;
  }
  
  @keyframes backgroundShift {
    0%, 100% { 
      transform: translateX(0) translateY(0) rotate(0deg) scale(1);
      filter: hue-rotate(0deg);
    }
    25% { 
      transform: translateX(-30px) translateY(-15px) rotate(2deg) scale(1.05);
      filter: hue-rotate(15deg);
    }
    50% { 
      transform: translateX(20px) translateY(-25px) rotate(-1deg) scale(0.98);
      filter: hue-rotate(-10deg);
    }
    75% { 
      transform: translateX(-10px) translateY(20px) rotate(1deg) scale(1.02);
      filter: hue-rotate(5deg);
    }
  }

  @keyframes backgroundShimmer {
    0%, 100% { 
      opacity: 0.5;
      transform: translateX(0) translateY(0);
    }
    50% { 
      opacity: 0.8;
      transform: translateX(-20px) translateY(-20px);
    }
  }
  
  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: ${theme.fontWeights.semibold};
    line-height: ${theme.lineHeights.tight};
    color: ${theme.colors.text};
  }
  
  h1 { font-size: ${theme.fontSizes["4xl"]}; }
  h2 { font-size: ${theme.fontSizes["3xl"]}; }
  h3 { font-size: ${theme.fontSizes["2xl"]}; }
  h4 { font-size: ${theme.fontSizes.xl}; }
  h5 { font-size: ${theme.fontSizes.lg}; }
  h6 { font-size: ${theme.fontSizes.md}; }
  
  /* Links */
  a {
    color: ${theme.colors.primary};
    text-decoration: none;
    transition: ${theme.transitions.fast};
    
    &:hover {
      color: ${theme.colors.primaryDark};
      text-decoration: underline;
    }
  }
  
  /* Buttons */
  button {
    font-family: inherit;
    cursor: pointer;
    border: none;
    outline: none;
    transition: ${theme.transitions.normal};
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
  
  /* Form elements */
  input, textarea, select {
    font-family: inherit;
    font-size: inherit;
    
    &:focus {
      outline: none;
    }
  }
  
  /* Scrollbar personalizado */
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  
  ::-webkit-scrollbar-track {
    background: ${theme.colors.backgroundTertiary};
    border-radius: ${theme.borderRadius.md};
  }
  
  ::-webkit-scrollbar-thumb {
    background: ${theme.colors.borderDark};
    border-radius: ${theme.borderRadius.md};
    
    &:hover {
      background: ${theme.colors.textSecondary};
    }
  }
  
  /* Selección de texto */
  ::selection {
    background: rgba(66, 153, 225, 0.2);
    color: ${theme.colors.text};
  }
  
  /* Animaciones globales */
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateX(-20px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes scaleIn {
    from {
      opacity: 0;
      transform: scale(0.9);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
  
  /* Utilidades */
  .fade-in {
    animation: fadeIn 0.3s ease-out;
  }
  
  .slide-in {
    animation: slideIn 0.3s ease-out;
  }
  
  .scale-in {
    animation: scaleIn 0.3s ease-out;
  }
  
  /* Clases de utilidad para texto */
  .text-center { text-align: center; }
  .text-left { text-align: left; }
  .text-right { text-align: right; }
  
  .font-normal { font-weight: ${theme.fontWeights.normal}; }
  .font-medium { font-weight: ${theme.fontWeights.medium}; }
  .font-semibold { font-weight: ${theme.fontWeights.semibold}; }
  .font-bold { font-weight: ${theme.fontWeights.bold}; }
  
  /* Responsive utilities */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }
  
  /* Focus styles para accesibilidad */
  .focus-visible:focus-visible {
    outline: 2px solid ${theme.colors.primary};
    outline-offset: 2px;
  }
  
  /* Mejoras para dispositivos móviles */
  @media (max-width: ${theme.breakpoints.md}) {
    body {
      font-size: ${theme.fontSizes.sm};
    }
    
    h1 { font-size: ${theme.fontSizes["3xl"]}; }
    h2 { font-size: ${theme.fontSizes["2xl"]}; }
    h3 { font-size: ${theme.fontSizes.xl}; }
  }
  
  /* Efectos de cursor personalizados para drag and drop */
  .dragging {
    cursor: grabbing !important;
  }

  .draggable {
    cursor: grab;
  }

  .draggable:active {
    cursor: grabbing;
  }

  /* Efectos de selección mejorados */
  .drag-preview {
    opacity: 0.8;
    transform: rotate(5deg) scale(1.05);
    transition: all 0.2s ease;
  }

  /* Modo oscuro (preparado para futuras implementaciones) */
  @media (prefers-color-scheme: dark) {
    /* Los estilos de modo oscuro se pueden agregar aquí */
  }
`;

export default theme;
