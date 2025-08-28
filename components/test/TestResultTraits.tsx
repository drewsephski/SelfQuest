import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import { PersonalityClass, PersonalityClassGroup } from '../../data/personality-classes';

interface TestResultTraitsProps {
  personalityClassGroup: PersonalityClassGroup;
  personalityType: PersonalityClass;
}

const TestResultTraits: React.FC<TestResultTraitsProps> = ({
  personalityClassGroup,
  personalityType,
}) => {
  return (
    <Box p={4}>
      <Heading scrollMarginTop={8} id="general-traits" my={4} as="h2" size="md" textAlign="center" color="text.primary">
        {`${personalityType.type} General Traits`}
      </Heading>
      <UnorderedList>
        {personalityClassGroup.generalTraits.map((trait, index) => (
          <ListItem my={2} key={index} textAlign="justify" color="text.secondary">
            {trait}
          </ListItem>
        ))}
      </UnorderedList>
      <Heading scrollMarginTop={8} id="strengths" my={4} as="h2" size="md" textAlign="center" color="text.primary">
        Strengths
      </Heading>
      <UnorderedList w="full">
        {personalityClassGroup.strengths.map((strength, index) => (
          <ListItem my={2} key={index} textAlign="justify" color="text.secondary">
            {strength}
          </ListItem>
        ))}
      </UnorderedList>
      <Heading scrollMarginTop={8} id="special-gifts" my={4} as="h2" size="md" textAlign="center" color="text.primary">
        Special Gifts
      </Heading>
      <UnorderedList w="full">
        {personalityClassGroup.gifts.map((gift, index) => (
          <ListItem my={2} key={index} textAlign="justify" color="text.secondary">
            {gift}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default TestResultTraits;