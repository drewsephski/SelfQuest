import Link from "next/link";
import { 
  Box, 
  Container, 
  Text, 
  HStack, 
  VStack,
  useColorModeValue,
  Divider
} from "@chakra-ui/react";

export default function Footer() {
  const bgColor = useColorModeValue("background.secondary.light", "background.secondary.dark");
  const textColor = useColorModeValue("text.secondary.light", "text.secondary.dark");
  const linkColor = useColorModeValue("primary.600", "primary.300");

  return (
    <Box as="footer" bg={bgColor} mt="auto">
      <Container maxW="container.xl" py={8}>
        <VStack spacing={4}>
          <Divider />
          <VStack spacing={2} textAlign="center">
            <HStack spacing={1} fontSize="sm" color={textColor}>
              <Text>SelfQuest - Built with ❤️ by</Text>
              <Link
                href="https://github.com/drewsephski"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Text color={linkColor} textDecoration="underline hover:text-white">
                  drew sepeczi
                </Text>
              </Link>
            </HStack>
          </VStack>
        </VStack>
      </Container>
    </Box>
  );
}
