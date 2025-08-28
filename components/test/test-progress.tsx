import { Progress, Flex, Text, Box } from "@chakra-ui/react";

import { personalityTest } from "../../data/personality-test";
import useUserTestAnswersStore from "../../store/use-user-test-answers";
import { getQuestionAnswerScore } from "../../lib/personality-test";

interface TestProgressProps {
  currentQuestionIndex: number;
  onGoToQuestion: (questionIndex: number) => void;
}

export default function TestProgress({
  currentQuestionIndex,
  onGoToQuestion,
}: TestProgressProps) {
  const { userTestAnswers } = useUserTestAnswersStore();

  const answeredQuestions = userTestAnswers.filter((answer) => answer).length;
  const progress = (answeredQuestions / personalityTest.length) * 100;
  const roundedProgress = Math.round(progress);

  const dimensionScores = {
    E: 0,
    I: 0,
    S: 0,
    N: 0,
    T: 0,
    F: 0,
    J: 0,
    P: 0,
  };

  userTestAnswers.forEach((answer, index) => {
    if (answer) {
      const score = getQuestionAnswerScore(index + 1, answer);
      dimensionScores[score]++;
    }
  });

  const dimensions = [
    { name: "Introversion (I) - Extroversion (E)", scores: [dimensionScores.I, dimensionScores.E] },
    { name: "Sensing (S) - Intuition (N)", scores: [dimensionScores.S, dimensionScores.N] },
    { name: "Thinking (T) - Feeling (F)", scores: [dimensionScores.T, dimensionScores.F] },
    { name: "Judging (J) - Perceiving (P)", scores: [dimensionScores.J, dimensionScores.P] },
  ];

  return (
    <Flex w="full" direction="column" gap={3} alignItems="center" px={2}>
      <Flex w="full" gap={1}>
        {personalityTest.map((_, index) => (
          <Box
            key={index}
            flex="1"
            h="12px"
            bg={
              userTestAnswers[index]
                ? "primary.500"
                : currentQuestionIndex === index
                ? "primary.200"
                : "gray.200"
            }
            rounded="full"
            cursor="pointer"
            onClick={() => onGoToQuestion(index)}
          />
        ))}
      </Flex>
      <Flex
        alignItems="center"
        gap={2}
        bg="white"
        px={4}
        py={2}
        rounded="full"
        boxShadow="sm"
        border="1px solid"
        borderColor="gray.200"
        _dark={{
          bg: "gray.800",
          borderColor: "gray.600",
        }}
      >
        <Text
          fontSize="lg"
          fontWeight="bold"
          color="primary.500"
          minW="60px"
          textAlign="center"
        >
          {roundedProgress}%
        </Text>
        <Text fontSize="sm" color="gray.500" _dark={{ color: "gray.400" }}>
          Complete
        </Text>
      </Flex>
      <Flex w="full" direction="column" gap={2} mt={4}>
        {dimensions.map((dimension, index) => (
          <Box key={index}>
            <Text fontSize="sm" fontWeight="medium" mb={1}>
              {dimension.name}
            </Text>
            <Flex w="full" h="8px" bg="gray.200" rounded="full">
              <Box
                h="full"
                w={`${(dimension.scores[0] / 10) * 100}%`}
                bg="blue.400"
                rounded="full"
              />
              <Box
                h="full"
                w={`${(dimension.scores[1] / 10) * 100}%`}
                bg="red.400"
                rounded="full"
              />
            </Flex>
          </Box>
        ))}
      </Flex>
    </Flex>
  );
}
