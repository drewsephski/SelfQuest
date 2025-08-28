import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import "@fontsource/poppins/400.css";
import "@fontsource/poppins/600.css";
import "@fontsource/poppins/700.css";

import theme from "../theme";
import ErrorBoundary from "../components/common/error-boundary";
import { usePerformanceOptimization, useWebVitals } from "../hooks/use-performance";

function AppContent({ Component, pageProps }: AppProps) {
  usePerformanceOptimization();
  useWebVitals();

  return <Component {...pageProps} />;
}

export default function App(props: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <ErrorBoundary>
        <AppContent {...props} />
      </ErrorBoundary>
    </ChakraProvider>
  );
}
