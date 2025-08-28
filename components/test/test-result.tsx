import Image from "next/image";
import {
  Flex,
  Heading,
  Highlight,
  Text,
  Table,
  Tbody,
  Tr,
  Th,
  Td,
  UnorderedList,
  ListItem,
} from "@chakra-ui/react";

import {
  TestResult as ITestResult,
  getPersonalityClassGroupByTestScores,
} from "../../lib/personality-test";

interface TestResultProps {
  testResult: ITestResult;
}

export default function TestResult(props: TestResultProps) {
  const personalityClassGroup = getPersonalityClassGroupByTestScores(
    props.testResult.testScores
  );

  return (
    <Flex
      my={4}
      w={{
        base: "full",
        lg: "50%",
      }}
      h="full"
      px={8}
      gap={4}
      alignItems="center"
      direction="column"
    >
      <Heading
        id={personalityClassGroup.type}
        as="h1"
        textAlign="center"
        color="text.primary"
      >
        <Highlight
          query={personalityClassGroup.type}
          styles={{ color: "primary.500" }}
        >
          {`${personalityClassGroup.type} - ${personalityClassGroup.name}`}
        </Highlight>
      </Heading>
      <Text
        fontSize="lg"
        fontWeight="bold"
        textAlign="center"
        color="text.secondary"
      >
        {personalityClassGroup.nameDescription}
      </Text>
      <Image
        alt="illustration"
        src={`/images/mbti/${personalityClassGroup.type.toLowerCase()}.png`}
        width={200}
        height={200}
      />
      <Heading
        scrollMarginTop={8}
        id="description"
        as="h2"
        my={8}
        fontSize="md"
        textAlign="center"
        color="text.primary"
      >
        {personalityClassGroup.epithet}
      </Heading>
      {personalityClassGroup.description
        .split(/\.\n+/g)
        .map((description) =>
          description.endsWith(".") ? description : `${description}.`
        )
        .map((description, index) => (
          <Text
            key={index}
            textAlign="justify"
            color="text.secondary"
          >
            {`${description}`}
          </Text>
        ))}
      <Heading
        scrollMarginTop={8}
        id="jungian-functional-preference-ordering"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
        color="text.primary"
      >
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
      <Heading
        scrollMarginTop={8}
        id="general-traits"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
        color="text.primary"
      >
        {`${personalityClassGroup.type} General Traits`}
      </Heading>
      <UnorderedList>
        {personalityClassGroup.generalTraits.map((trait, index) => (
          <ListItem
            my={2}
            key={index}
            textAlign="justify"
            color="text.secondary"
          >
            {trait}
          </ListItem>
        ))}
      </UnorderedList>
      <Heading
        scrollMarginTop={8}
        id="relationship-strengths"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
        color="text.primary"
      >
        Relationship Strengths
      </Heading>
      <UnorderedList w="full">
        {personalityClassGroup.relationshipStrengths.map(
          (relationshipStrength, index) => (
            <ListItem
              my={2}
              key={index}
              textAlign="justify"
              color="text.secondary"
            >
              {relationshipStrength}
            </ListItem>
          )
        )}
      </UnorderedList>
      <Heading
        scrollMarginTop={8}
        id="relationship-weaknesses"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
        color="text.primary"
      >
        Relationship Weaknesses
      </Heading>
      <UnorderedList w="full">
        {personalityClassGroup.relationshipWeaknesses.map(
          (relationshipWeakness, index) => (
            <ListItem
              my={2}
              key={index}
              textAlign="justify"
              color="text.secondary"
            >
              {relationshipWeakness}
            </ListItem>
          )
        )}
      </UnorderedList>
      <Heading
        scrollMarginTop={8}
        id="success-definition"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
        color="text.primary"
      >
        Success Definition
      </Heading>
      {personalityClassGroup.successDefinition
        .split(/\.\n+/g)
        .map((successDefinition) =>
          successDefinition.endsWith(".")
            ? successDefinition
            : `${successDefinition}.`
        )
        .map((successDefinition, index) => (
          <Text
            key={index}
            textAlign="justify"
            color="text.secondary"
          >
            {`${successDefinition}`}
          </Text>
        ))}
      <Heading
        scrollMarginTop={8}
        id="strengths"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
        color="text.primary"
      >
        Strengths
      </Heading>
      <UnorderedList w="full">
        {personalityClassGroup.strengths.map((strength, index) => (
          <ListItem
            my={2}
            key={index}
            textAlign="justify"
            color="text.secondary"
          >
            {strength}
          </ListItem>
        ))}
      </UnorderedList>
      <Heading
        scrollMarginTop={8}
        id="special-gifts"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
        color="text.primary"
      >
        Special Gifts
      </Heading>
      <UnorderedList w="full">
        {personalityClassGroup.gifts.map((gift, index) => (
          <ListItem
            my={2}
            key={index}
            textAlign="justify"
            color="text.secondary"
          >
            {gift}
          </ListItem>
        ))}
      </UnorderedList>
      <Heading
        scrollMarginTop={8}
        id="potential-problem-areas"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
        color="text.primary"
      >
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
            <Text
              key={index}
              textAlign="justify"
              alignSelf="start"
              color="text.secondary"
            >
              {`${potentialProblemArea}`}
            </Text>
          ))
      ) : (
        <UnorderedList w="full">
          {personalityClassGroup.potentialProblemAreas.map(
            (potentialProblemArea, index) => (
              <ListItem
                my={2}
                key={index}
                textAlign="justify"
                color="text.secondary"
              >
                {potentialProblemArea}
              </ListItem>
            )
          )}
        </UnorderedList>
      )}
      <Heading
        scrollMarginTop={8}
        id="explanation-of-problems"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
        color="text.primary"
      >
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
          <Text
            key={index}
            textAlign="justify"
            alignSelf="start"
            color="text.secondary"
          >
            {`${explanationOfProblem}`}
          </Text>
        ))}
      <Heading
        scrollMarginTop={8}
        id="solutions"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
        color="text.primary"
      >
        Solutions
      </Heading>
      {personalityClassGroup.solutions
        .split(/\.\n+/g)
        .map((solution) => (solution.endsWith(".") ? solution : `${solution}.`))
        .map((solution, index) => (
          <Text
            key={index}
            textAlign="justify"
            alignSelf="start"
            color="text.secondary"
          >
            {`${solution}`}
          </Text>
        ))}
      <Heading
        scrollMarginTop={8}
        id="living-happily-tips"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
        color="text.primary"
      >
        Living Happily Tips
      </Heading>
      {personalityClassGroup.livingHappilyTips
        .split(/\.\n+/g)
        .map((tips) => (tips.endsWith(".") ? tips : `${tips}.`))
        .map((tips, index) => (
          <Text
            key={index}
            textAlign="justify"
            alignSelf="start"
            color="text.secondary"
          >
            {`${tips}`}
          </Text>
        ))}
      {personalityClassGroup.suggestions !== undefined &&
        personalityClassGroup.suggestions.length === 1 && (
          <>
            <Heading
              scrollMarginTop={8}
              id="specific-suggestions"
              my={4}
              as="h2"
              size="md"
              textAlign="center"
              color="text.primary"
            >
              Specific Suggestions
            </Heading>
            {personalityClassGroup.suggestions[0]
              .split(/\.\n+/g)
              .map((suggestion) =>
                suggestion.endsWith(".") ? suggestion : `${suggestion}.`
              )
              .map((suggestion, index) => (
                <Text
                  key={index}
                  textAlign="justify"
                  alignSelf="start"
                  color="text.secondary"
                >
                  {`${suggestion}`}
                </Text>
              ))}
          </>
        )}
      {personalityClassGroup.suggestions !== undefined &&
        personalityClassGroup.suggestions.length > 1 && (
          <>
            <Heading
              scrollMarginTop={8}
              id="specific-suggestions"
              my={4}
              as="h2"
              size="md"
              textAlign="center"
              color="text.primary"
            >
              Specific Suggestions
            </Heading>
            <UnorderedList w="full">
              {personalityClassGroup.suggestions!.map((suggestion, index) => (
                <ListItem
                  my={2}
                  key={index}
                  textAlign="justify"
                  color="text.secondary"
                >
                  {suggestion}
                </ListItem>
              ))}
            </UnorderedList>
          </>
        )}
      <Heading
        scrollMarginTop={8}
        id="ten-rules-to-live-to-achieve-success"
        my={4}
        as="h2"
        size="md"
        textAlign="center"
        color="text.primary"
      >
        Ten Rules to Live to Achieve Success
      </Heading>
      <UnorderedList w="full">
        {personalityClassGroup.tenRulesToLive.map((rule, index) => (
          <ListItem
            my={2}
            key={index}
            textAlign="justify"
            color="text.secondary"
          >
            {rule}
          </ListItem>
        ))}
      </UnorderedList>
    </Flex>
  );
}
