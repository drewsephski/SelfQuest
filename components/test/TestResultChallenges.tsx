import { Box, Heading, Text, UnorderedList, ListItem } from '@chakra-ui/react';
import { PersonalityClass, PersonalityClassGroup, DisplayPersonalityType } from '../../lib/personality-test';

interface TestResultChallengesProps {
  personalityClassGroup: PersonalityClassGroup;
  personalityType: DisplayPersonalityType;
}

const TestResultChallenges: React.FC<TestResultChallengesProps> = ({
  personalityClassGroup,
  personalityType,
}) => {
  return (
    <Box p={4}>
      <Heading scrollMarginTop={8} id="potential-problem-areas" my={4} as="h2" size="md" textAlign="center" color="text.primary">
        Potential Problem Areas
      </Heading>
      {personalityClassGroup.potentialProblemAreas.length === 1 ? (
        personalityClassGroup.potentialProblemAreas[0]
          .split(/\.\n+/g)
          .map((potentialProblemArea) =>
            potentialProblemArea.endsWith(".")
              ? potentialProblemArea
              : `${potentialProblemArea}.`
          )
          .map((potentialProblemArea, index) => (
            <Text key={index} textAlign="justify" alignSelf="start" color="text.secondary">
              {`${potentialProblemArea}`}
            </Text>
          ))
      ) : (
        <UnorderedList w="full">
          {personalityClassGroup.potentialProblemAreas.map(
            (potentialProblemArea, index) => (
              <ListItem my={2} key={index} textAlign="justify" color="text.secondary">
                {potentialProblemArea}
              </ListItem>
            )
          )}
        </UnorderedList>
      )}
      <Heading scrollMarginTop={8} id="explanation-of-problems" my={4} as="h2" size="md" textAlign="center" color="text.primary">
        Explanation of Problems
      </Heading>
      {personalityClassGroup.explanationOfProblems
        .split(/\.\n+/g)
        .map((explanationOfProblem) =>
          explanationOfProblem.endsWith(".")
            ? explanationOfProblem
            : `${explanationOfProblem}.`
        )
        .map((explanationOfProblem, index) => (
          <Text key={index} textAlign="justify" alignSelf="start" color="text.secondary">
            {`${explanationOfProblem}`}
          </Text>
        ))}
      <Heading scrollMarginTop={8} id="solutions" my={4} as="h2" size="md" textAlign="center" color="text.primary">
        Solutions
      </Heading>
      {personalityClassGroup.solutions
        .split(/\.\n+/g)
        .map((solution) => (solution.endsWith(".") ? solution : `${solution}.`))
        .map((solution, index) => (
          <Text key={index} textAlign="justify" alignSelf="start" color="text.secondary">
            {`${solution}`}
          </Text>
        ))}
    </Box>
  );
};

export default TestResultChallenges;