// Thème global basé sur les images de référence
const theme = {
    colors: {
      // Palette principale (rouge corail)
      primary: {
        50: "#FFF5F5",
        100: "#FFE8E6",
        200: "#FFD1CC",
        300: "#FFB3AD",
        400: "#FF8C85",
        500: "#FF6B61",
        600: "#FF4136", // Couleur principale (rouge corail)
        700: "#E63B31",
        800: "#CC352C",
        900: "#B32F27",
      },
      // Couleurs neutres
      gray: {
        50: "#F9FAFB",
        100: "#F3F4F6",
        200: "#E5E7EB",
        300: "#D1D5DB",
        400: "#9CA3AF",
        500: "#6B7280",
        600: "#4B5563",
        700: "#374151",
        800: "#1F2937",
        900: "#111827",
      },
      // Couleurs d'état
      success: "#10B981",
      warning: "#F59E0B",
      error: "#EF4444",
      info: "#3B82F6",
      white: "#FFFFFF",
      black: "#000000",
    },
  
    fonts: {
      body: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
      heading: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
    },
  
    fontSizes: {
      xs: "0.75rem",
      sm: "0.875rem",
      md: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
  
    fontWeights: {
      light: 300,
      normal: 400,
      medium: 500,
      semibold: 600,
      bold: 700,
      extrabold: 800,
    },
  
    lineHeights: {
      none: 1,
      tight: 1.25,
      normal: 1.5,
      relaxed: 1.75,
    },
  
    space: {
      0: "0",
      1: "0.25rem",
      2: "0.5rem",
      3: "0.75rem",
      4: "1rem",
      5: "1.25rem",
      6: "1.5rem",
      8: "2rem",
      10: "2.5rem",
      12: "3rem",
      16: "4rem",
      20: "5rem",
    },
  
    radii: {
      none: "0",
      sm: "0.125rem",
      md: "0.375rem",
      lg: "0.5rem",
      xl: "0.75rem",
      "2xl": "1rem",
      full: "9999px",
    },
  
    shadows: {
      sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)",
      md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
      lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
      xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      "2xl": "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
    },
  
    transitions: {
      fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
      normal: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
      slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
    },
  
    breakpoints: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
  }
  
  export default theme
  
  