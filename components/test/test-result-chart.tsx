import { Box, Heading, ButtonGroup, Button, HStack, Text, VStack, useColorModeValue, Badge, Flex } from "@chakra-ui/react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  Legend,
} from "recharts";
import { Text as ChakraText } from "@chakra-ui/react";
import { personalityClasses } from "../../data/personality-classes";
import { TestResult } from "../../lib/personality-test";
import { useState } from "react";

interface TestResultChartProps {
  testResult: TestResult;
}

// Color scheme for personality types
const personalityColors = {
  E: "#FF6B6B", // Red for Extraversion
  I: "#4ECDC4", // Teal for Introversion
  S: "#45B7D1", // Blue for Sensing
  N: "#96CEB4", // Green for Intuition
  T: "#FECA57", // Yellow for Thinking
  F: "#FF9FF3", // Pink for Feeling
  P: "#54A0FF", // Blue for Perceiving
  J: "#5F27CD", // Purple for Judging
};

// Enhanced Tooltip component
const EnhancedTooltip = ({ active, payload, label }: any) => {
  const bgColor = useColorModeValue("white", "gray.800");
  const textColor = useColorModeValue("gray.800", "white");

  if (active && payload && payload.length) {
    const personalityClass = personalityClasses.find(
      (pc) => pc.description === label
    );
    const value = payload[0].value;
    const color = payload[0].color;

    return (
      <Box
        bg={bgColor}
        border="2px solid"
        borderColor={color}
        p={4}
        borderRadius="lg"
        boxShadow="xl"
        minW="200px"
        color={textColor}
      >
        <VStack align="start" spacing={2}>
          <HStack>
            <Box w={3} h={3} bg={color} borderRadius="full" />
            <ChakraText fontWeight="bold" fontSize="sm">{label}</ChakraText>
          </HStack>
          <ChakraText fontSize="lg" fontWeight="bold" color={color}>
            {value.toFixed(1)}%
          </ChakraText>
          {personalityClass && (
            <ChakraText fontSize="xs" color="gray.500" noOfLines={2}>
              {personalityClass.brief}
            </ChakraText>
          )}
        </VStack>
      </Box>
    );
  }
  return null;
};

// Custom Legend component
const CustomLegend = ({ payload }: any) => {
  return (
    <Flex wrap="wrap" justify="center" gap={3} mt={4}>
      {payload.map((entry: any, index: number) => (
        <HStack key={index}>
          <Box w={3} h={3} bg={entry.color} borderRadius="full" />
          <ChakraText fontSize="sm" color="gray.600">
            {entry.value}
          </ChakraText>
        </HStack>
      ))}
    </Flex>
  );
};

type ChartType = 'radar' | 'area' | 'bar';

export default function TestResultChart({ testResult }: TestResultChartProps) {
  const [chartType, setChartType] = useState<ChartType>('radar');

  // Chakra UI color mode values
  const axisTickColor = useColorModeValue("#4A5568", "#A0AEC0");
  const boxBgColor = useColorModeValue("white", "gray.900");
  const headingColor = useColorModeValue("gray.800", "white");
  const textColor = useColorModeValue("gray.600", "gray.300");
  const summaryBoxBgColor = useColorModeValue("gray.50", "gray.800");

  // Calculate personality scores and determine dominant traits
  const data = personalityClasses.map((pc) => {
    const testScoresFiltered = testResult.testScores.filter(
      (score) => score === pc.type
    );
    const percentage = (testScoresFiltered.length / testResult.testScores.length) * 100;
    return {
      type: pc.type,
      subject: pc.description,
      fullName: pc.description,
      A: percentage,
      color: personalityColors[pc.type as keyof typeof personalityColors],
    };
  });

  // Find dominant traits
  const sortedData = [...data].sort((a, b) => b.A - a.A);
  const dominantTraits = sortedData.slice(0, 2);
  const isBalanced = Math.abs(dominantTraits[0]?.A - dominantTraits[1]?.A) < 10;

  const renderChart = (tickColor: string) => {
    const commonProps = {
      data,
      margin: { top: 20, right: 30, left: 20, bottom: 60 },
    };

    switch (chartType) {
      case 'area':
        return (
          <AreaChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="subject"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              domain={[0, 'dataMax + 5']}
            />
            <Tooltip content={<EnhancedTooltip />} />
            <Legend content={<CustomLegend />} />
            <Area
              type="monotone"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.6}
            />
          </AreaChart>
        );

      case 'bar':
        return (
          <BarChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
            <XAxis
              dataKey="subject"
              tick={{ fontSize: 12 }}
              angle={-45}
              textAnchor="end"
              height={80}
            />
            <YAxis
              tickFormatter={(value) => `${value}%`}
              domain={[0, 'dataMax + 5']}
            />
            <Tooltip content={<EnhancedTooltip />} />
            <Legend content={<CustomLegend />} />
            <Bar dataKey="A" radius={[4, 4, 0, 0]}>
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Bar>
          </BarChart>
        );

      default: // radar
        return (
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid opacity={0.3} />
            <PolarAngleAxis
              dataKey="subject"
              tick={{ fill: tickColor, fontSize: 12 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, "dataMax + 10"]}
              tickFormatter={(value) => `${value}%`}
              tick={{ fill: tickColor, fontSize: 11 }}
            />
            <Tooltip content={<EnhancedTooltip />} />
            <Radar
              name="Personality Traits"
              dataKey="A"
              stroke="#8884d8"
              fill="#8884d8"
              fillOpacity={0.3}
              strokeWidth={2}
            />
          </RadarChart>
        );
    }
  };

  return (
    <Box p={6} width="100%" bg={boxBgColor} borderRadius="2xl" boxShadow="lg">
      <VStack spacing={6} align="stretch">
        {/* Header */}
        <Box textAlign="center">
          <Heading as="h2" size="lg" mb={2} color={headingColor}>
            Personality Trait Analysis
          </Heading>
          <ChakraText color={textColor} mb={4}>
            Your personality profile based on {testResult.testScores.length} responses
          </ChakraText>

          {/* Dominant Traits Indicator */}
          <HStack justify="center" spacing={4} wrap="wrap">
            {dominantTraits.map((trait, index) => (
              <Badge
                key={trait.type}
                colorScheme={index === 0 ? "blue" : "green"}
                variant="solid"
                px={3}
                py={1}
                borderRadius="full"
                fontSize="sm"
              >
                {trait.subject}: {trait.A.toFixed(1)}%
              </Badge>
            ))}
            {isBalanced && (
              <Badge colorScheme="purple" variant="outline" px={3} py={1} borderRadius="full">
                Well-Balanced Profile
              </Badge>
            )}
          </HStack>
        </Box>

        {/* Chart Type Selector */}
        <HStack justify="center">
          <ButtonGroup size="sm" isAttached variant="outline">
            <Button
              colorScheme={chartType === 'radar' ? 'blue' : 'gray'}
              onClick={() => setChartType('radar')}
            >
              Radar
            </Button>
            <Button
              colorScheme={chartType === 'area' ? 'blue' : 'gray'}
              onClick={() => setChartType('area')}
            >
              Area
            </Button>
            <Button
              colorScheme={chartType === 'bar' ? 'blue' : 'gray'}
              onClick={() => setChartType('bar')}
            >
              Bar
            </Button>
          </ButtonGroup>
        </HStack>

        {/* Chart */}
        <Box height="500px" width="100%">
          <ResponsiveContainer width="100%" height="100%">
            {renderChart(axisTickColor)}
          </ResponsiveContainer>
        </Box>

        {/* Personality Type Summary */}
        <Box p={4} bg={summaryBoxBgColor} borderRadius="lg">
          <ChakraText fontSize="sm" color={textColor} textAlign="center">
            This visualization shows how your answers align with different personality dimensions.
            Higher percentages indicate stronger alignment with that trait.
          </ChakraText>
        </Box>
      </VStack>
    </Box>
  );
}