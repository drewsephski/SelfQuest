import { Flex, Text, Heading, FlexProps } from "@chakra-ui/react";

import { personalityClasses } from "../../data/personality-classes";
import { PersonalityClass, TestResult } from "../../lib/personality-test";

interface TestResultStatCardProps extends FlexProps {
  testResult: TestResult;
  title: string;
  typeOne: PersonalityClass["type"];
  typeTwo: PersonalityClass["type"];
}

function ScoreStats(props: {
  testScores: PersonalityClass["type"][];
  targetScore: PersonalityClass["type"];
}) {
  const testScoresFiltered = props.testScores.filter(
    (score) => score === props.targetScore
  );

  return (
    <Flex
      py={1}
      px={2}
      gap={2}
      rounded="md"
      justifyContent="space-between"
      bg="white"
    >
      <Text fontWeight="semibold" color="black">
        {((testScoresFiltered.length / props.testScores.length) * 100)
          .toFixed(2)
          .replace(/[.,]0+$/, "")}
        %
      </Text>
      <Text color="black">({testScoresFiltered.length})</Text>
    </Flex>
  );
}

export default function TestResultStatCard(props: TestResultStatCardProps) {
  const { testResult, title, typeOne, typeTwo, ...rest } = props;
  const statsColorScheme = [
    "red",
    "blue",
    "yellow",
    "purple",
    "orange",
    "green",
    "pink",
    "teal",
  ];

  const personalityClassOne = personalityClasses.find(
    (p) => p.type === typeOne
  );
  const personalityClassTwo = personalityClasses.find(
    (p) => p.type === typeTwo
  );

  if (!personalityClassOne || !personalityClassTwo) {
    return <></>;
  }

  return (
    <Flex
      my={4}
      mx={{ base: 0, lg: 4 }}
      w="full"
      h="min-content"
      p={4}
      gap={4}
      top={5}
      direction="column"
      pos={{
        base: "static",
        lg: "sticky",
      }}
      alignSelf="flex-start"
      bg="background.tertiary"
      rounded="lg"
      {...rest}
    >
      <Heading
        as="h1"
        textAlign="center"
        fontSize="lg"
        color="text.primary"
      >
        {props.title}
      </Heading>
      {[personalityClassOne, personalityClassTwo].map(
        (personalityClass, index) => (
          <Flex key={index} p={2} direction="column" gap={2}>
            <Flex
              p={2}
              rounded="md"
              justifyContent="space-between"
              alignItems="center"
              bg={`${statsColorScheme[index]}.500`}
            >
              <Text fontWeight="semibold" color="white">
                {personalityClass.description}
              </Text>
              <ScoreStats
                testScores={props.testResult.testScores}
                targetScore={personalityClass.type}
              />
            </Flex>
            <Text color="text.secondary" fontSize="sm">
              {personalityClass.brief}
            </Text>
          </Flex>
        )
      )}
    </Flex>
  );
}