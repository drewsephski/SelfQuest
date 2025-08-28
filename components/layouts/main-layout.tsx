import Head from "next/head";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import { Flex, Container } from "@chakra-ui/react";
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
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3498db" />
        <link rel="icon" href="/favicon.ico" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        
        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:title" content={title} />
        <meta property="twitter:description" content={description} />
      </Head>
      
      <Flex direction="column" minH={isResultsPage ? "auto" : "100vh"}>
        <Nav />
        <Container
          as="main"
          maxW="container.xl"
          flex={isResultsPage ? "none" : "1"}
          display="flex"
          alignItems={isResultsPage ? "flex-start" : "center"}
          justifyContent={isResultsPage ? "flex-start" : "center"}
          py={isResultsPage ? { base: 4, md: 8 } : 8}
        >
          {children}
        </Container>
        <Footer />
      </Flex>
    </>
  );
}
