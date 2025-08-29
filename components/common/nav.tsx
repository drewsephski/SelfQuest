import Link from "next/link";
import { useRouter } from "next/router";
import {
  Flex,
  Button,
  Container,
  HStack,
  useColorModeValue,
  Box,
  Text,
  IconButton,
  useBreakpointValue
} from "@chakra-ui/react";
import { BiHistory, BiBrain, BiMenu } from "react-icons/bi";
import { ColorModeToggle } from "./color-mode-toggle";
import React from "react";

export default function Nav() {
  const router = useRouter();
  const bgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.800", "white");
  const isMobile = useBreakpointValue({ base: true, md: false });
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Box
      as="nav"
      bg={bgColor}
      borderBottom="1px"
      borderColor={borderColor}
      position="sticky"
      top={0}
      zIndex={10}
      backdropFilter="blur(10px)"
      opacity={0.98}
      w="100%"
      overflowX="hidden"
    >
      <Container maxW="container.lg" px={{ base: 4, sm: 6 }}>
        <Flex
          py={3}
          justifyContent="space-between"
          alignItems="center"
          minH="60px"
        >
          <Link href="/" passHref>
            <Button
              variant="ghost"
              fontWeight="bold"
              fontSize={["sm", "md", "lg"]}
              leftIcon={<BiBrain size={20} />}
              _hover={{
                bg: "neon.500",
                color: "white",
                transform: "scale(1.05)",
                boxShadow: "0 0 20px var(--neon-blue)"
              }}
              _active={{
                bg: "neon.600",
                transform: "scale(0.98)"
              }}
              transition="all 0.2s"
              color={textColor}
              px={{ base: 1, md: 2 }}
              h={{ base: "auto", md: "auto" }}
              minW={{ base: "auto", md: "auto" }}
            >
              <Text>SelfQuest</Text>
            </Button>
          </Link>

          {isMobile ? (
            <HStack spacing={2}>
              <ColorModeToggle />
              <IconButton
                aria-label="Toggle menu"
                icon={<BiMenu size={24} />}
                variant="ghost"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            </HStack>
          ) : (
            <HStack spacing={3}>
              <ColorModeToggle />
              <Link href="/test/result/history" passHref>
                <Button
                  variant={router.pathname.includes('/history') ? "solid" : "outline"}
                  colorScheme={router.pathname.includes('/history') ? "neon" : "gray"}
                  leftIcon={<BiHistory size={18} />}
                  size="md"
                  _hover={{
                    bg: router.pathname.includes('/history') ? "neon.600" : "neon.50",
                    color: router.pathname.includes('/history') ? "white" : "neon.700",
                    borderColor: "neon.400",
                    boxShadow: "0 0 10px var(--neon-blue-light)"
                  }}
                  _active={{
                    bg: "neon.700",
                    transform: "scale(0.95)"
                  }}
                  transition="all 0.2s"
                >
                  History
                </Button>
              </Link>
            </HStack>
          )}
        </Flex>

        {/* Mobile menu */}
        {isMobile && isMenuOpen && (
          <Box
            pb={4}
            borderTop="1px"
            borderColor={borderColor}
            mt={2}
            pt={2}
          >
            <Link href="/test/result/history" passHref>
              <Button
                variant={router.pathname.includes('/history') ? "solid" : "ghost"}
                colorScheme={router.pathname.includes('/history') ? "neon" : "gray"}
                leftIcon={<BiHistory size={18} />}
                size="lg"
                w="100%"
                justifyContent="flex-start"
                mb={2}
                _hover={{
                  bg: router.pathname.includes('/history') ? "neon.600" : "neon.50",
                  color: router.pathname.includes('/history') ? "white" : "neon.700",
                }}
              >
                Test History
              </Button>
            </Link>
          </Box>
        )}
      </Container>
    </Box>
  );
}
