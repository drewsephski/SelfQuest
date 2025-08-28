import Link from "next/link";
import {
  Heading,
  Text,
  VStack,
  Button,
  Box,
  SimpleGrid,
  Icon,
  useColorModeValue,
  Flex,
  Spacer
} from "@chakra-ui/react";
import { FiArrowRight, FiUser, FiTrendingUp, FiHeart, FiInfo } from "react-icons/fi";
import AbstractSVGAnimation from "../components/common/abstract-svg-animation";

import MainLayout from "../components/layouts/main-layout";

const features = [
  {
    icon: FiUser,
    title: "Self-Discovery",
    description: "Understand your personality type and core preferences."
  },
  {
    icon: FiTrendingUp,
    title: "Personal Growth",
    description: "Identify strengths and areas for development."
  },
  {
    icon: FiHeart,
    title: "Better Relationships",
    description: "Improve how you connect and communicate with others."
  }
];

export default function HomePage() {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardBorder = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");
  const placeholderBg = useColorModeValue("gray.200", "gray.700");
  const placeholderColor = useColorModeValue("gray.500", "gray.400");

  return (
    <MainLayout
      title="Unlock Your Potential | Free MBTI Personality Test"
      description="Take our free, in-depth personality test to discover your MBTI type, understand your strengths, and unlock your true potential."
    >
      <VStack spacing={12} py={12} textAlign="center" maxW="5xl" mx="auto">
        
        {/* Hero Section */}
        <Flex
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="space-between"
          w="full"
        >
          <VStack        
          spacing={6}
            px={2}
            w={{ base: "full", md: "50%" }}
            align={{ base: "center", md: "flex-start" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <Heading
              as="h1"
              size="3xl"
              lineHeight="shorter"
              fontWeight="extrabold"
              color={useColorModeValue("gray.900", "white")}
              mb={-2}
              mt={2}
            >
              Discover Who You Truly Are.
            </Heading>

            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color={textColor}
              mb={1}
            >
              Take our comprehensive, free personality test to reveal your MBTI type,
              unlock your potential, and gain a deeper understanding of yourself.
            </Text>

            <VStack spacing={4} align={{ base: "center", md: "flex-start" }} w="full">
              <Link href="/test" passHref>
                <Button
                  as="a"
                  size="lg"
                  colorScheme="primary"
                  rightIcon={<FiArrowRight size={20} />}
                  _hover={{ transform: "translateY(-2px)" }}
                  transition="all 0.2s"
                  w={{ base: "full", sm: "auto" }}
                  aria-label="Start the personality test"
                >
                  Discover My Personality Type
                </Button>
              </Link>
              <Link href="/#learn-more" passHref>
                <Button
                  as="a"
                  size="lg"
                  variant="ghost"
                  rightIcon={<FiInfo size={20} />}
                  w={{ base: "full", sm: "auto" }}
                  aria-label="Learn more about the personality test"
                >
                  Learn More
                </Button>
              </Link>
            </VStack>
          </VStack>
          
          <Spacer />

          <Box w={{ base: "80%", md: "45%" }} mt={{ base: 8, md: 0 }} mr="70px">
            <AbstractSVGAnimation
            />
          </Box>
        </Flex>

        {/* Features Section */}
        <VStack spacing={8} w="full" id="learn-more">
          <Heading size="2xl" fontWeight="bold">Why Take The Test?</Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} w="full">
            {features.map((feature, index) => (
              <Box
                key={index}
                p={8}
                bg={cardBg}
                border="1px"
                borderColor={cardBorder}
                borderRadius="xl"
                shadow="md"
                _hover={{ shadow: "lg", transform: "translateY(-4px)" }}
                transition="all 0.3s ease-in-out"
              >
                <VStack spacing={5}>
                  <Icon
                    as={feature.icon}
                    boxSize={10}
                    color="primary.500"
                  />
                  <Heading size="md" fontWeight="bold">{feature.title}</Heading>
                  <Text color={textColor}>
                    {feature.description}
                  </Text>
                </VStack>
              </Box>
            ))}
          </SimpleGrid>
        </VStack>

      </VStack>
    </MainLayout>
  );
}
