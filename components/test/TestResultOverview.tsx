import { Box, Heading, Text, Image, Highlight, Table, Tbody, Tr, Th, Td } from '@chakra-ui/react';
import { PersonalityClass, PersonalityClassGroup, DisplayPersonalityType } from '../../lib/personality-test';

interface TestResultOverviewProps {
  personalityClassGroup: PersonalityClassGroup;
  personalityType: DisplayPersonalityType;
}

const TestResultOverview: React.FC<TestResultOverviewProps> = ({
  personalityClassGroup,
  personalityType,
}) => {
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
      <Image
        alt="illustration"
        src={`/images/mbti/${personalityType.type.toLowerCase()}.png`}
        width={200}
        height={200}
        mx="auto"
        display="block"
      />
      <Heading scrollMarginTop={8} id="description" my={8} fontSize="md" textAlign="center" color="text.primary" as="h2">
        {personalityClassGroup.epithet}
      </Heading>
      {personalityClassGroup.description
        .split(/\.\n+/g)
        .map((description) => (description.endsWith(".") ? description : `${description}.`))
        .map((description, index) => (
          <Text key={index} textAlign="justify" color="text.secondary">
            {`${description}`}
          </Text>
        ))}
      <Heading scrollMarginTop={8} id="jungian-functional-preference-ordering" my={4} as="h2" size="md" textAlign="center" color="text.primary">
        Jungian Functional Preference Ordering
      </Heading>
      <Table variant="simple">
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