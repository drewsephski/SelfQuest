import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import { PersonalityClass, PersonalityClassGroup, DisplayPersonalityType } from '../../lib/personality-test';

interface TestResultRelationshipsProps {
  personalityClassGroup: PersonalityClassGroup;
  personalityType: DisplayPersonalityType;
}

const TestResultRelationships: React.FC<TestResultRelationshipsProps> = ({
  personalityClassGroup,
  personalityType,
}) => {
  return (
    <Box p={4}>
      <Heading scrollMarginTop={8} id="relationship-strengths" my={4} as="h2" size="md" textAlign="center" color="text.primary">
        Relationship Strengths
      </Heading>
      <UnorderedList w="full">
        {personalityClassGroup.relationshipStrengths.map(
          (relationshipStrength, index) => (
            <ListItem my={2} key={index} textAlign="justify" color="text.secondary">
              {relationshipStrength}
            </ListItem>
          )
        )}
      </UnorderedList>
      <Heading scrollMarginTop={8} id="relationship-weaknesses" my={4} as="h2" size="md" textAlign="center" color="text.primary">
        Relationship Weaknesses
      </Heading>
      <UnorderedList w="full">
        {personalityClassGroup.relationshipWeaknesses.map(
          (relationshipWeakness, index) => (
            <ListItem my={2} key={index} textAlign="justify" color="text.secondary">
              {relationshipWeakness}
            </ListItem>
          )
        )}
      </UnorderedList>
    </Box>
  );
};

export default TestResultRelationships;