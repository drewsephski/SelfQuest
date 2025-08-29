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
  Spacer,
  useBreakpointValue,
  Container
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
  const headingSize = useBreakpointValue({ base: "2xl", md: "4xl" });
  const subtextSize = useBreakpointValue({ base: "md", md: "lg" });
  const buttonSize = useBreakpointValue({ base: "lg", md: "lg" });

  return (
    <MainLayout
      title="Unlock Your Potential | Free MBTI Personality Test"
      description="Take our free, in-depth personality test to discover your MBTI type, understand your strengths, and unlock your true potential."
    >
      <VStack spacing={8} py={[8, 12]} textAlign="center" w="full">
        <VStack spacing={{ base: 4, md: 6 }} maxW="3xl" px={{ base: 2, md: 4 }}>
          <Heading
            as="h1"
            size={headingSize}
            fontWeight="bold"
            lineHeight={{ base: "1.2", md: "1.2" }}
            letterSpacing="tighter"
          >
            Discover Your <Box as="span" color="neon.500"><br/>True Self</Box>
          </Heading>
          
          <Text
            fontSize={{ base: "md", md: subtextSize }}
            color={textColor}
            maxW="2xl"
            lineHeight="tall"
            px={{ base: 0, md: 2 }}
          >
            Take our free, scientifically validated MBTI personality test to gain insights into your personality type, strengths, and growth opportunities.
          </Text>

          <VStack spacing={{ base: 3, md: 4 }} align="stretch" w="full" maxW="md" pt={{ base: 1, md: 2 }}>
            <Link href="/test" passHref>
              <Button
                as="a"
                size={buttonSize}
                colorScheme="neon"
                rightIcon={<FiArrowRight />}
                py={{ base: 5, md: 6 }}
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="semibold"
                _hover={{
                  transform: "translateY(-2px)",
                  boxShadow: "lg"
                }}
                _active={{
                  transform: "translateY(0)"
                }}
                transition="all 0.2s"
              >
                Start Free Test
              </Button>
            </Link>
            
            <Link href="#learn-more" passHref>
              <Button
                as="a"
                size={buttonSize}
                variant="outline"
                rightIcon={<FiInfo />}
                py={{ base: 5, md: 6 }}
                fontSize={{ base: "md", md: "lg" }}
                _hover={{
                  bg: useColorModeValue("gray.100", "gray.700")
                }}
              >
                Learn More
              </Button>
            </Link>
          </VStack>
        </VStack>

        <Box w="full" maxW="6xl" px={{ base: 2, md: 4 }} py={{ base: 6, md: 8 }}>
          <SimpleGrid
            columns={{ base: 1, md: 3 }}
            spacing={{ base: 4, md: 6 }}
            w="full"
          >
            {features.map((feature, index) => (
              <Box
                key={index}
                bg={cardBg}
                p={6}
                borderRadius="lg"
                border="1px"
                borderColor={cardBorder}
                textAlign="center"
                _hover={{
                  transform: "translateY(-4px)",
                  boxShadow: "lg"
                }}
                transition="all 0.2s"
              >
                <Flex
                  alignItems="center"
                  justifyContent="center"
                  w={16}
                  h={16}
                  bg="neon.50"
                  color="neon.600"
                  rounded="full"
                  mx="auto"
                  mb={4}
                >
                  <Icon as={feature.icon} boxSize={6} />
                </Flex>
                <Heading as="h3" size="md" mb={3}>
                  {feature.title}
                </Heading>
                <Text color={textColor} fontSize="md">
                  {feature.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>

        <Box w="full" maxW="4xl" px={4} py={12} id="learn-more">
          <VStack spacing={6} textAlign="center">
            <Heading size="xl">How It Works</Heading>
            <Text fontSize="lg" color={textColor} maxW="2xl">
              Our test takes about 10-15 minutes to complete and provides you with a detailed analysis of your personality type based on the Myers-Briggs Type Indicator (MBTI) framework.
            </Text>
          </VStack>
        </Box>
      </VStack>
    </MainLayout>
  );
}
