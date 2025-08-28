import Link from "next/link";
import { 
  Heading, 
  Text, 
  Highlight, 
  VStack, 
  Button, 
  Box,
  SimpleGrid,
  Icon,
  useColorModeValue
} from "@chakra-ui/react";
import { FiArrowRight, FiUser, FiTrendingUp, FiHeart } from "react-icons/fi";

import MainLayout from "../components/layouts/main-layout";

const features = [
  {
    icon: FiUser,
    title: "Self Discovery",
    description: "Understand your personality type and core preferences"
  },
  {
    icon: FiTrendingUp,
    title: "Personal Growth",
    description: "Identify strengths and areas for development"
  },
  {
    icon: FiHeart,
    title: "Better Relationships",
    description: "Improve how you connect and communicate with others"
  }
];

export default function HomePage() {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");

  return (
    <MainLayout
      title="MBTI Personality Test - Discover Your True Self"
      description="Take our comprehensive MBTI personality test to discover your personality type, understand your strengths, and improve your relationships."
    >
      <VStack spacing={12} textAlign="center" maxW="4xl" mx="auto">
        <VStack spacing={6}>
          <Heading
            as="h1"
            size="2xl"
            lineHeight="shorter"
            textAlign="center"
          >
            <Highlight
              query="MBTI Personality Test"
              styles={{
                py: 2,
                px: 4,
                rounded: "full",
                bg: "primary.500",
                color: "white",
              }}
            >
              Welcome to MBTI Personality Test
            </Highlight>
          </Heading>
          
          <Text
            fontSize={{ base: "lg", md: "xl" }}
            color="gray.500"
            maxW="2xl"
          >
            Discover your unique personality type and unlock insights about how you 
            think, feel, and interact with the world around you.
          </Text>
        </VStack>

        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6} w="full">
          {features.map((feature, index) => (
            <Box
              key={index}
              p={6}
              bg={cardBg}
              border="1px"
              borderColor={cardBorder}
              borderRadius="lg"
              shadow="sm"
              _hover={{ shadow: "md", transform: "translateY(-2px)" }}
              transition="all 0.2s"
            >
              <VStack spacing={4}>
                <Icon 
                  as={feature.icon} 
                  boxSize={8} 
                  color="primary.500" 
                />
                <Heading size="md">{feature.title}</Heading>
                <Text color="gray.500" fontSize="sm">
                  {feature.description}
                </Text>
              </VStack>
            </Box>
          ))}
        </SimpleGrid>

        <VStack spacing={4}>
          <Link href="/test" passHref>
            <Button
              size="lg"
              colorScheme="primary"
              rightIcon={<FiArrowRight size={20} />}
              _hover={{ transform: "translateY(-2px)" }}
              transition="all 0.2s"
            >
              Start Your Journey
            </Button>
          </Link>
          <Text fontSize="sm" color="gray.500">
            Takes about 10-15 minutes • Completely free
          </Text>
        </VStack>
      </VStack>
    </MainLayout>
  );
}
