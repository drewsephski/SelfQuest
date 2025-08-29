import { extendTheme } from "@chakra-ui/react";

const theme = extendTheme({
  colors: {
    // A consistent blue palette
    blue: {
      "50": "#E3F2FD",   // Lightest Blue (similar to primary 50)
      "100": "#BBDEFB",  // Lighter Blue (similar to primary 100)
      "200": "#90CAF9",  // Light Blue (similar to primary 200)
      "300": "#64B5F6",  // Medium-Light Blue (similar to primary 300)
      "400": "#42A5F5",  // Medium Blue (similar to primary 400)
      "500": "#2196F3",  // Main Blue (similar to primary 500)
      "600": "#1E88E5",  // Medium-Dark Blue (similar to primary 600)
      "700": "#1976D2",  // Dark Blue (similar to primary 700)
      "800": "#1565C0",  // Darker Blue (similar to primary 800)
      "900": "#0D47A1",  // Darkest Blue (similar to primary 900)
    },
    // Neon blue from AbstractSVGAnimation component, integrated into the blue palette
    neon: {
      "50": "#E3F2FD",   // Lightest Blue (align with blue.50)
      "100": "#BBDEFB",  // Lighter Blue (align with blue.100)
      "200": "#90CAF9",  // Light Blue (align with blue.200)
      "300": "#64B5F6",  // Medium-Light Blue (align with blue.300)
      "400": "#42A5F5",  // Medium Blue (align with blue.400)
      "500": "#2196F3",  // Main Blue (align with blue.500)
      "600": "#1E88E5",  // Medium-Dark Blue (align with blue.600)
      "700": "#1976D2",  // Dark Blue (align with blue.700)
      "800": "#1565C0",  // Darker Blue (align with blue.800)
      "900": "#0D47A1",  // Darkest Blue (align with blue.900)
    },
    // Adjusted text colors for better contrast with blue scheme
    text: {
      primary: {
        light: "#1A202C", // Very dark blue for light mode
        dark: "#E2E8F0",  // Light gray for dark mode (retained)
      },
      secondary: {
        light: "#4A5568", // Dark gray for light mode (retained)
        dark: "#A0AEC0",  // Medium gray for dark mode (retained)
      },
      muted: {
        light: "#718096", // Medium gray for light mode (retained)
        dark: "#718096",  // Medium gray for dark mode (retained)
      },
    },
    // Adjusted background colors for blue consistency
    background: {
      primary: {
        light: "#FFFFFF", // White for light mode (retained)
        dark: "#1A202C",  // Dark blue-gray for dark mode (retained)
      },
      secondary: {
        light: "#F7FAFC", // Light gray for light mode (retained)
        dark: "#2D3748",  // Medium gray for dark mode (retained)
      },
      tertiary: {
        light: "#EDF2F7", // Lighter gray for light mode (retained)
        dark: "#4A5568",  // Medium-dark gray for dark mode (retained)
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
        "--blue-50": "#E3F2FD",
        "--blue-100": "#BBDEFB",
        "--blue-200": "#90CAF9",
        "--blue-300": "#64B5F6",
        "--blue-400": "#42A5F5",
        "--blue-500": "#2196F3",
        "--blue-600": "#1E88E5",
        "--blue-700": "#1976D2",
        "--blue-800": "#1565C0",
        "--blue-900": "#0D47A1",
        "--neon-blue": "var(--blue-500)", // Align neon-blue with the main blue
        "--neon-blue-light": "var(--blue-400)",
        "--neon-blue-dark": "var(--blue-600)",
        "--neon-blue-50": "var(--blue-50)",
        "--neon-blue-100": "var(--blue-100)",
        "--neon-blue-200": "var(--blue-200)",
        "--neon-blue-300": "var(--blue-300)",
        "--neon-blue-400": "var(--blue-400)",
        "--neon-blue-500": "var(--blue-500)",
        "--neon-blue-600": "var(--blue-600)",
        "--neon-blue-700": "var(--blue-700)",
        "--neon-blue-800": "var(--blue-800)",
        "--neon-blue-900": "var(--blue-900)",
      },
      html: {
        // Prevent horizontal scrolling issues
        overflowX: "hidden",
      },
      body: {
        bg: "background.primary",
        color: "text.primary",
        transition: "background-color 0.2s, color 0.2s",
        // Ensure body also respects overflow
        overflowX: "hidden",
      },
    },
  },
});

export default theme;
