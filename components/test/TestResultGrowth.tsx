import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import { PersonalityClass, PersonalityClassGroup, DisplayPersonalityType } from '../../lib/personality-test';

interface TestResultGrowthProps {
  personalityClassGroup: PersonalityClassGroup;
  personalityType: DisplayPersonalityType;
}

const TestResultGrowth: React.FC<TestResultGrowthProps> = ({
  personalityClassGroup,
  personalityType,
}) => {
  return (
    <Box p={4}>
      <Heading scrollMarginTop={8} id="living-happily-tips" my={4} as="h2" size="md" textAlign="center" color="text.primary">
        Living Happily Tips
      </Heading>
      {personalityClassGroup.livingHappilyTips
        .split(/\.\n+/g)
        .map((tips) => (tips.endsWith(".") ? tips : `${tips}.`))
        .map((tips, index) => (
          <Text key={index} textAlign="justify" alignSelf="start" color="text.secondary">
            {`${tips}`}
          </Text>
        ))}
      {personalityClassGroup.suggestions !== undefined && personalityClassGroup.suggestions.length === 1 && (
        <>
          <Heading scrollMarginTop={8} id="specific-suggestions" my={4} as="h2" size="md" textAlign="center" color="text.primary">
            Specific Suggestions
          </Heading>
          {personalityClassGroup.suggestions[0]
            .split(/\.\n+/g)
            .map((suggestion) =>
              suggestion.endsWith(".") ? suggestion : `${suggestion}.`
            )
            .map((suggestion, index) => (
              <Text key={index} textAlign="justify" alignSelf="start" color="text.secondary">
                {`${suggestion}`}
              </Text>
            ))}
        </>
      )}
      {personalityClassGroup.suggestions !== undefined && personalityClassGroup.suggestions.length > 1 && (
        <>
          <Heading scrollMarginTop={8} id="specific-suggestions" my={4} as="h2" size="md" textAlign="center" color="text.primary">
            Specific Suggestions
          </Heading>
          <UnorderedList w="full">
            {personalityClassGroup.suggestions!.map((suggestion, index) => (
              <ListItem my={2} key={index} textAlign="justify" color="text.secondary">
                {suggestion}
              </ListItem>
            ))}
          </UnorderedList>
        </>
      )}
      <Heading scrollMarginTop={8} id="ten-rules-to-live-to-achieve-success" my={4} as="h2" size="md" textAlign="center" color="text.primary">
        Ten Rules to Live to Achieve Success
      </Heading>
      <UnorderedList w="full">
        {personalityClassGroup.tenRulesToLive.map((rule, index) => (
          <ListItem my={2} key={index} textAlign="justify" color="text.secondary">
            {rule}
          </ListItem>
        ))}
      </UnorderedList>
    </Box>
  );
};

export default TestResultGrowth;