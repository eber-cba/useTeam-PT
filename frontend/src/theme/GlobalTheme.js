import { createGlobalStyle } from 'styled-components';

// Definición del tema global
export const theme = {
  colors: {
    // Colores principales
    primary: '#4299e1',
    primaryDark: '#3182ce',
    primaryLight: '#63b3ed',
    
    // Colores secundarios
    secondary: '#9f7aea',
    secondaryDark: '#805ad5',
    secondaryLight: '#b794f6',
    
    // Colores de estado
    success: '#48bb78',
    warning: '#ed8936',
    error: '#f56565',
    info: '#4299e1',
    
    // Colores de texto
    text: '#2d3748',
    textSecondary: '#718096',
    textLight: '#a0aec0',
    textInverse: '#ffffff',
    
    // Colores de fondo
    background: '#ffffff',
    backgroundSecondary: '#f7fafc',
    backgroundTertiary: '#edf2f7',
    
    // Colores de borde
    border: '#e2e8f0',
    borderLight: '#f1f5f9',
    borderDark: '#cbd5e0',
    
    // Gradientes
    gradientPrimary: 'linear-gradient(135deg, #4299e1 0%, #9f7aea 100%)',
    gradientSecondary: 'linear-gradient(135deg, #48bb78 0%, #38b2ac 100%)',
    gradientWarning: 'linear-gradient(135deg, #ed8936 0%, #f6ad55 100%)',
    gradientError: 'linear-gradient(135deg, #f56565 0%, #fc8181 100%)',
    
    // Colores con transparencia
    overlay: 'rgba(0, 0, 0, 0.6)',
    glass: 'rgba(255, 255, 255, 0.95)',
    glassSecondary: 'rgba(255, 255, 255, 0.8)',
  },
  
  // Espaciado
  spacing: {
    xs: '0.25rem',   // 4px
    sm: '0.5rem',    // 8px
    md: '1rem',      // 16px
    lg: '1.5rem',    // 24px
    xl: '2rem',      // 32px
    '2xl': '3rem',   // 48px
    '3xl': '4rem',   // 64px
  },
  
  // Tipografía
  fonts: {
    body: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    heading: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    mono: '"Fira Code", "Monaco", "Cascadia Code", "Segoe UI Mono", "Roboto Mono", "Oxygen Mono", "Ubuntu Monospace", monospace',
  },
  
  fontSizes: {
    xs: '0.75rem',   // 12px
    sm: '0.875rem',  // 14px
    md: '1rem',      // 16px
    lg: '1.125rem',  // 18px
    xl: '1.25rem',   // 20px
    '2xl': '1.5rem', // 24px
    '3xl': '1.875rem', // 30px
    '4xl': '2.25rem',  // 36px
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
    none: '0',
    sm: '0.25rem',   // 4px
    md: '0.5rem',    // 8px
    lg: '0.75rem',   // 12px
    xl: '1rem',      // 16px
    '2xl': '1.5rem', // 24px
    full: '9999px',
  },
  
  // Sombras
  shadows: {
    sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
    none: 'none',
  },
  
  // Transiciones
  transitions: {
    fast: '0.15s ease',
    normal: '0.3s ease',
    slow: '0.5s ease',
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
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
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
    background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
    min-height: 100vh;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  
  /* Headings */
  h1, h2, h3, h4, h5, h6 {
    font-family: ${theme.fonts.heading};
    font-weight: ${theme.fontWeights.semibold};
    line-height: ${theme.lineHeights.tight};
    color: ${theme.colors.text};
  }
  
  h1 { font-size: ${theme.fontSizes['4xl']}; }
  h2 { font-size: ${theme.fontSizes['3xl']}; }
  h3 { font-size: ${theme.fontSizes['2xl']}; }
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
    
    h1 { font-size: ${theme.fontSizes['3xl']}; }
    h2 { font-size: ${theme.fontSizes['2xl']}; }
    h3 { font-size: ${theme.fontSizes.xl}; }
  }
  
  /* Modo oscuro (preparado para futuras implementaciones) */
  @media (prefers-color-scheme: dark) {
    /* Los estilos de modo oscuro se pueden agregar aquí */
  }
`;

export default theme;