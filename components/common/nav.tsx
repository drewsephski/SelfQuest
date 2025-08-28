import Link from "next/link";
import { useRouter } from "next/router";
import {
  Flex,
  Button,
  Container,
  HStack,
  useColorModeValue,
  Box,
  Text
} from "@chakra-ui/react";
import { BiHistory, BiBrain } from "react-icons/bi";
import { ColorModeToggle } from "./color-mode-toggle";

export default function Nav() {
  const router = useRouter();
  const bgColor = useColorModeValue("background.primary.light", "background.primary.dark");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("text.primary.light", "text.primary.dark");

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
    >
      <Container maxW="container.xl">
        <Flex
          py={4}
          justifyContent="space-between"
          alignItems="center"
          minH={16}
        >
          <Link href="/" passHref>
            <Button
              variant="ghost"
              fontWeight="bold"
              fontSize="lg"
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
            >
              <Text display={{ base: "none", sm: "block" }}>
                SelfQuest
              </Text>
              <Text display={{ base: "block", sm: "none" }}>
                SelfQuest
              </Text>
            </Button>
          </Link>

          <HStack spacing={2}>
            <ColorModeToggle />
            <Link href="/test/result/history" passHref>
              <Button
                variant={router.pathname.includes('/history') ? "solid" : "outline"}
                colorScheme={router.pathname.includes('/history') ? "neon" : "gray"}
                leftIcon={<BiHistory size={18} />}
                size={{ base: "sm", md: "md" }}
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
                <Text display={{ base: "none", sm: "block" }}>
                  History
                </Text>
              </Button>
            </Link>
          </HStack>
        </Flex>
      </Container>
    </Box>
  );
}
