import { Box, Heading, Text, Highlight, Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import Image from 'next/image';
import { PersonalityClass, PersonalityClassGroup, DisplayPersonalityType } from '../../lib/personality-test';

interface TestResultOverviewProps {
  personalityClassGroup: PersonalityClassGroup;
  personalityType: DisplayPersonalityType;
}

// Generate blur data URL for personality images (simple colored placeholder)
const generateBlurDataURL = (personalityType: string): string => {
  // Create a base64 encoded 1x1 pixel blur placeholder
  // Different colors for better visual distinction
  const personalityColors: Record<string, string> = {
    enth: '#FF6B6B', // Red for ENTH (Extraverted)
    intro: '#4ECDC4', // Teal for INTRO (Introverted)
    intuitor: '#45B7D1', // Blue for INTUITOR (Intuition)
    sensor: '#96CEB4', // Green for SENSOR (Sensing)
    thinker: '#FECA57', // Yellow for THINKER (Thinking)
    feeler: '#FF9FF3', // Pink for FEELER (Feeling)
    perceiver: '#54A0FF', // Blue for PERCEIVER (Perceiving)
    judger: '#5F27CD', // Purple for JUDGER (Judging)
  };

  const getColorFromType = () => {
    const firstLetter = personalityType.charAt(0);
    if (firstLetter === 'E') return personalityColors.enth;
    if (firstLetter === 'I') return personalityColors.intro;
    if (firstLetter === 'N') return personalityColors.intuitor;
    if (firstLetter === 'S') return personalityColors.sensor;
    if (firstLetter === 'T') return personalityColors.thinker;
    if (firstLetter === 'F') return personalityColors.feeler;
    if (firstLetter === 'P') return personalityColors.perceiver;
    if (firstLetter === 'J') return personalityColors.judger;
    return '#CBD5E0'; // Default gray
  };

  const color = getColorFromType();
  // Create a small SVG as base64 for the blur data URL
  const svg = `<svg width="20" height="20" xmlns="http://www.w3.org/2000/svg"><rect width="20" height="20" fill="${color}"/></svg>`;
  const base64 = Buffer.from(svg).toString('base64');
  return `data:image/svg+xml;base64,${base64}`;
};

const TestResultOverview: React.FC<TestResultOverviewProps> = ({
  personalityClassGroup,
  personalityType,
}) => {
  // Responsive image sizes for different breakpoints
  const imageSrc = `/images/mbti/${personalityType.type.toLowerCase()}.png`;
  const sizes = "(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw";
  const blurDataURL = generateBlurDataURL(personalityType.type);

  return (
    <Box p={4}>
      <Heading as="h1" textAlign="center" color="text.primary">
        <Highlight query={personalityClassGroup.name} styles={{ color: "primary.500" }}>
          {`${personalityClassGroup.type} - ${personalityClassGroup.name}`}
        </Highlight>
      </Heading>
      <Text fontSize="lg" fontWeight="bold" textAlign="center" color="text.secondary">
        {personalityType.description}
      </Text>
      <Box
        position="relative"
        width="100%"
        maxWidth={{ base: "200px", md: "300px" }}
        height={{ base: "200px", md: "300px" }}
        mx="auto"
        display="block"
      >
        <Image
          alt={`Personality type illustration for ${personalityType.type} - ${personalityType.description}`}
          src={imageSrc}
          fill
          sizes={sizes}
          placeholder="blur"
          blurDataURL={blurDataURL}
          quality={85}
          style={{
            objectFit: 'contain',
            borderRadius: '12px'
          }}
        />
      </Box>
      <Heading scrollMarginTop={8} id="description" my={{ base: 4, md: 8 }} fontSize="md" textAlign="center" color="text.primary" as="h2">
        {personalityClassGroup.epithet}
      </Heading>
      {personalityClassGroup.description
        .split(/\.\n+/g)
        .map((description) => (description.endsWith(".") ? description : `${description}.`))
        .map((description, index) => (
          <Text key={index} textAlign={{ base: "left", md: "justify" }} color="text.secondary">
            {`${description}`}
          </Text>
        ))}
      <Heading scrollMarginTop={8} id="jungian-functional-preference-ordering" my={4} as="h2" size="md" textAlign="center" color="text.primary">
        Jungian Functional Preference Ordering
      </Heading>
      <Table variant="simple" size={{ base: "sm", md: "md" }}>
        <Tbody>
          <Tr>
            <Th color="text.primary">Dominant</Th>
            <Td color="text.secondary">
              {personalityClassGroup.jungianFunctionalPreference.dominant}
            </Td>
          </Tr>
          <Tr>
            <Th color="text.primary">Auxiliary</Th>
            <Td color="text.secondary">
              {personalityClassGroup.jungianFunctionalPreference.auxiliary}
            </Td>
          </Tr>
          <Tr>
            <Th color="text.primary">Tertiary</Th>
            <Td color="text.secondary">
              {personalityClassGroup.jungianFunctionalPreference.tertiary}
            </Td>
          </Tr>
          <Tr>
            <Th color="text.primary">Inferior</Th>
            <Td color="text.secondary">
              {personalityClassGroup.jungianFunctionalPreference.inferior}
            </Td>
          </Tr>
        </Tbody>
      </Table>
    </Box>
  );
};

export default TestResultOverview;
