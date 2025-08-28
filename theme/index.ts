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
      body: {
        bg: "background.primary",
        color: "text.primary",
        transition: "background-color 0.2s, color 0.2s",
      },
    },
  },
});

export default theme;
