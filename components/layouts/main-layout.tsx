import Head from "next/head";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Box, Flex, Container } from "@chakra-ui/react";
import Nav from "../common/nav";
import Footer from "../common/footer";

interface MainLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
}

export default function MainLayout({
  children,
  title = "MBTI Personality Test",
  description = "Discover your personality type with our comprehensive MBTI personality test. Learn about your strengths, preferences, and how you interact with the world."
}: MainLayoutProps) {
  const pathname = usePathname();
  const isResultsPage = pathname?.startsWith('/test/result') && !pathname?.includes('/history');
  
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1, maximum-scale=1, viewport-fit=cover, shrink-to-fit=no" 
        />
        <meta name="theme-color" content="#2196F3" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="MBTI Test" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Head>
      
      <Flex direction="column" minH="100vh" maxW="100vw" overflowX="hidden">
        <Nav />
        <Box flex="1" w="full" as="main">
          <Container
            maxW="container.lg"
            px={{ base: 4, sm: 6 }}
            py={{ base: 4, md: 6 }}
          >
            {children}
          </Container>
        </Box>
        <Footer />
      </Flex>
    </>
  );
}
