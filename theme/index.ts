import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    primary: {
      "50": "#f2f8fd",
      "100": "#e3effb",
      "200": "#c1dff6",
      "300": "#8ac5ef",
      "400": "#4ca7e4",
      "500": "#3498db",
      "600": "#176fb2",
      "700": "#145990",
      "800": "#144c78",
      "900": "#164064",
    },
    // Neon blue from AbstractSVGAnimation component
    neon: {
      "50": "#eff6ff",
      "100": "#dbeafe",
      "200": "#bfdbfe",
      "300": "#93c5fd",
      "400": "#60a5fa",
      "500": "#3b82f6",  // Main neon blue from SVG animation
      "600": "#2563eb",
      "700": "#1d4ed8",
      "800": "#1e40af",
      "900": "#1e3a8a",
    },
    // Enhanced text colors for better contrast
    text: {
      primary: {
        light: "#2d3748", // Dark gray for light mode
        dark: "#e2e8f0",  // Light gray for dark mode
      },
      secondary: {
        light: "#4a5568", // Medium gray for light mode
        dark: "#a0aec0",  // Medium gray for dark mode
      },
      muted: {
        light: "#718096", // Light gray for light mode
        dark: "#718096",  // Same light gray for dark mode
      },
    },
    // Enhanced background colors
    background: {
      primary: {
        light: "#ffffff", // White for light mode
        dark: "#1a202c",  // Dark blue-gray for dark mode
      },
      secondary: {
        light: "#f7fafc", // Light gray for light mode
        dark: "#2d3748",  // Medium gray for dark mode
      },
      tertiary: {
        light: "#edf2f7", // Lighter gray for light mode
        dark: "#4a5568",  // Medium-dark gray for dark mode
      },
    },
  },
  fonts: {
    heading: `Poppins, sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  styles: {
    global: {
      ":root": {
        "--neon-blue": "#3b82f6",
        "--neon-blue-light": "#60a5fa",
        "--neon-blue-dark": "#2563eb",
        "--neon-blue-50": "#eff6ff",
        "--neon-blue-100": "#dbeafe",
        "--neon-blue-200": "#bfdbfe",
        "--neon-blue-300": "#93c5fd",
        "--neon-blue-400": "#60a5fa",
        "--neon-blue-500": "#3b82f6",
        "--neon-blue-600": "#2563eb",
        "--neon-blue-700": "#1d4ed8",
        "--neon-blue-800": "#1e40af",
        "--neon-blue-900": "#1e3a8a",
      },
      body: {
        bg: "background.primary",
        color: "text.primary",
        transition: "background-color 0.2s, color 0.2s",
      },
    },
  },
});

export default theme;
