import Link from "next/link";
import {
  Box,
  Container,
  Text,
  HStack,
  VStack,
  useColorModeValue,
  Divider,
  Icon
} from "@chakra-ui/react";
import { BiHeart, BiLinkExternal } from "react-icons/bi";

export default function Footer() {
  const bgColor = useColorModeValue("background.secondary.light", "background.secondary.dark");
  const textColor = useColorModeValue("text.secondary.light", "text.secondary.dark");
  const linkColor = useColorModeValue("neon.600", "neon.400");
  const accentColor = useColorModeValue("neon.500", "neon.300");

  return (
    <Box as="footer" bg={bgColor} width="100%" mt="auto">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={4}>
          <Divider borderColor="neon.200" opacity={0.3} />
          <VStack spacing={2} textAlign="center">
            <HStack spacing={1} fontSize="sm" color={textColor}>
              <Text>SelfQuest - Built with</Text>
              <Icon as={BiHeart} color={accentColor} boxSize={4} />
              <Text>by</Text>
              <Link
                href="https://github.com/drewsephski"
                target="_blank"
                rel="noopener noreferrer"
              >
                <HStack spacing={1} align="center">
                  <Text
                    color={linkColor}
                    _hover={{
                      color: "neon.500",
                      textDecoration: "underline",
                      boxShadow: "0 0 10px var(--neon-blue-light)"
                    }}
                    transition="all 0.2s"
                  >
                    drew sepeczi
                  </Text>
                  <Icon
                    as={BiLinkExternal}
                    boxSize={3}
                    color={linkColor}
                    _groupHover={{ color: "neon.500" }}
                  />
                </HStack>
              </Link>
            </HStack>
            <Text fontSize="xs" color={textColor} opacity={0.7}>
              Explore your personality • Discover yourself • Grow together
            </Text>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
