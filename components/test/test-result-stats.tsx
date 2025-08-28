import {
  Flex,
  Heading,
  Box,
  Text,
  Progress,
  VStack,
  HStack,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Divider,
} from "@chakra-ui/react";
import { keyframes } from "@chakra-ui/system";
import { FiTrendingUp, FiTarget, FiZap, FiHeart, FiClock } from "react-icons/fi";

import { TestResult } from "../../lib/personality-test";
import { personalityClasses } from "../../data/personality-classes";

interface TestResultStatsProps {
  testResult: TestResult;
}

interface DimensionStatsProps {
  title: string;
  typeOne: string;
  typeTwo: string;
  testResult: TestResult;
  icon: any;
  colorScheme: string;
}

const pulseAnimation = keyframes`
  0% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.02); }
  100% { opacity: 1; transform: scale(1); }
`;

const fadeInAnimation = keyframes`
  0% { opacity: 0; transform: translateY(20px); }
  100% { opacity: 1; transform: translateY(0); }
`;

function DimensionStats({ title, typeOne, typeTwo, testResult, icon, colorScheme }: DimensionStatsProps) {
  const bgColor = useColorModeValue(`${colorScheme}.50`, `${colorScheme}.900`);
  const borderColor = useColorModeValue(`${colorScheme}.200`, `${colorScheme}.700`);
  const accentColor = useColorModeValue(`${colorScheme}.500`, `${colorScheme}.400`);

  const personalityOne = personalityClasses.find(p => p.type === typeOne);
  const personalityTwo = personalityClasses.find(p => p.type === typeTwo);

  if (!personalityOne || !personalityTwo) return null;

  const typeOneCount = testResult.testScores.filter(score => score === typeOne).length;
  const typeTwoCount = testResult.testScores.filter(score => score === typeTwo).length;
  const total = testResult.testScores.length;

  const typeOnePercentage = (typeOneCount / total) * 100;
  const typeTwoPercentage = (typeTwoCount / total) * 100;

  const dominantType = typeOneCount > typeTwoCount ? personalityOne : personalityTwo;
  const isBalanced = Math.abs(typeOnePercentage - typeTwoPercentage) < 10;

  return (
    <Box
      p={6}
      bg={bgColor}
      border="2px solid"
      borderColor={borderColor}
      borderRadius="xl"
      position="relative"
      overflow="hidden"
      transition="all 0.3s ease"
      animation={`${fadeInAnimation} 0.6s ease-out`}
      _hover={{
        transform: "translateY(-4px)",
        boxShadow: "xl",
        borderColor: accentColor,
      }}
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        bg: `linear-gradient(90deg, ${accentColor}, transparent)`,
      }}
    >
      {/* Header */}
      <VStack spacing={3} align="stretch">
        <HStack justify="space-between" align="center">
          <HStack spacing={3}>
            <Icon
              as={icon}
              boxSize={6}
              color={accentColor}
              animation={`${pulseAnimation} 2s infinite`}
            />
            <Heading
              size="md"
              color="text.primary"
              fontWeight="bold"
            >
              {title}
            </Heading>
          </HStack>
          {isBalanced && (
            <Badge
              colorScheme="purple"
              variant="subtle"
              fontSize="xs"
              px={2}
              py={1}
              borderRadius="full"
            >
              Balanced
            </Badge>
          )}
        </HStack>

        <Divider />

        {/* Stats */}
        <SimpleGrid columns={2} spacing={4}>
          {/* Type One Stats */}
          <Stat textAlign="center">
            <StatLabel
              fontSize="sm"
              color="text.secondary"
              fontWeight="medium"
            >
              {personalityOne.description}
            </StatLabel>
            <StatNumber
              fontSize="2xl"
              color={typeOneCount > typeTwoCount ? accentColor : "text.secondary"}
              fontWeight="bold"
            >
              {typeOnePercentage.toFixed(1)}%
            </StatNumber>
            <StatHelpText fontSize="xs" color="text.muted">
              {typeOneCount} of {total} responses
            </StatHelpText>
            {typeOneCount > typeTwoCount && (
              <StatArrow type="increase" color={accentColor} />
            )}
          </Stat>

          {/* Type Two Stats */}
          <Stat textAlign="center">
            <StatLabel
              fontSize="sm"
              color="text.secondary"
              fontWeight="medium"
            >
              {personalityTwo.description}
            </StatLabel>
            <StatNumber
              fontSize="2xl"
              color={typeTwoCount > typeOneCount ? accentColor : "text.secondary"}
              fontWeight="bold"
            >
              {typeTwoPercentage.toFixed(1)}%
            </StatNumber>
            <StatHelpText fontSize="xs" color="text.muted">
              {typeTwoCount} of {total} responses
            </StatHelpText>
            {typeTwoCount > typeOneCount && (
              <StatArrow type="increase" color={accentColor} />
            )}
          </Stat>
        </SimpleGrid>

        {/* Progress Bar */}
        <Box w="full">
          <HStack justify="space-between" mb={2}>
            <Text fontSize="xs" color="text.secondary" fontWeight="medium">
              {personalityOne.type}
            </Text>
            <Text fontSize="xs" color="text.secondary" fontWeight="medium">
              {personalityTwo.type}
            </Text>
          </HStack>
          <Progress
            value={typeOnePercentage}
            colorScheme={colorScheme}
            size="lg"
            borderRadius="full"
            bg={useColorModeValue("gray.100", "gray.700")}
            sx={{
              "& > div": {
                transition: "width 1.2s ease-in-out",
              }
            }}
          />
        </Box>

        {/* Description */}
        <Box
          p={3}
          bg={useColorModeValue("white", "gray.800")}
          borderRadius="lg"
          border="1px solid"
          borderColor={borderColor}
        >
          <Text
            fontSize="sm"
            color="text.secondary"
            lineHeight="1.5"
            textAlign="center"
          >
            <Text as="span" fontWeight="semibold" color={accentColor}>
              {dominantType.description}
            </Text>
            {dominantType.brief.toLowerCase()}
          </Text>
        </Box>
      </VStack>
    </Box>
  );
}

export default function TestResultStats(props: TestResultStatsProps) {
  const bgColor = useColorModeValue("background.secondary", "background.tertiary");

  const dimensions = [
    {
      title: "Energy Source",
      typeOne: "E",
      typeTwo: "I",
      icon: FiZap,
      colorScheme: "orange"
    },
    {
      title: "Information Processing",
      typeOne: "S",
      typeTwo: "N",
      icon: FiTarget, // Changed from FiBrain to FiTarget as FiBrain is not exported
      colorScheme: "blue"
    },
    {
      title: "Decision Making",
      typeOne: "T",
      typeTwo: "F",
      icon: FiHeart,
      colorScheme: "pink"
    },
    {
      title: "Lifestyle Approach",
      typeOne: "P",
      typeTwo: "J",
      icon: FiClock,
      colorScheme: "green"
    }
  ];

  return (
    <Flex
      my={6}
      mx={{ base: 2, lg: 6 }}
      w="full"
      direction="column"
      alignSelf={{
        base: "center",
        lg: "flex-start",
      }}
      bg={bgColor}
      rounded="2xl"
      p={6}
      boxShadow="lg"
      border="1px solid"
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      {/* Header */}
      <VStack spacing={4} align="center" mb={8}>
        <HStack spacing={3}>
          <Icon as={FiTrendingUp} boxSize={8} color="primary.500" />
          <Heading
            as="h2"
            textAlign="center"
            fontSize="2xl"
            color="text.primary"
            fontWeight="bold"
          >
            Personality Profile Analysis
          </Heading>
        </HStack>
        <Text
          fontSize="md"
          color="text.secondary"
          textAlign="center"
          maxW="600px"
          lineHeight="1.6"
        >
          Your responses reveal unique patterns across four key personality dimensions.
          Each dimension shows your natural preferences and tendencies.
        </Text>
        <Divider />
      </VStack>

      {/* Stats Grid */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 2 }}
        spacing={6}
        w="full"
      >
        {dimensions.map((dimension, index) => (
          <DimensionStats
            key={index}
            title={dimension.title}
            typeOne={dimension.typeOne}
            typeTwo={dimension.typeTwo}
            testResult={props.testResult}
            icon={dimension.icon}
            colorScheme={dimension.colorScheme}
          />
        ))}
      </SimpleGrid>

      {/* Footer */}
      <Box mt={8} pt={6} borderTop="1px solid" borderColor={useColorModeValue("gray.200", "gray.700")}>
        <HStack justify="center" spacing={4}>
          <Icon as={FiTarget} boxSize={4} color="text.secondary" />
          <Text fontSize="sm" color="text.secondary" textAlign="center">
            Based on {props.testResult.testScores.length} responses • Analysis complete
          </Text>
        </HStack>
      </Box>
    </Flex>
  );
}
