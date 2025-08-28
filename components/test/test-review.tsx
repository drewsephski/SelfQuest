import {
  Box,
  Button,
  Flex,
  Text,
  useToast,
  SimpleGrid,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useState } from "react";
import { personalityTest } from "../../data/personality-test";
import {
  getQuestionAnswerScore,
  saveTestResult,
} from "../../lib/personality-test";
import useUserTestAnswersStore from "../../store/use-user-test-answers";

interface TestReviewProps {
  onCloseTestReview: () => void;
  onGoToQuestion: (questionIndex: number) => void;
}

export default function TestReview({
  onCloseTestReview,
  onGoToQuestion,
}: TestReviewProps) {
  const router = useRouter();
  const toast = useToast();
  const { userTestAnswers, setUserTestAnswers } = useUserTestAnswersStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSeeResultButtonClick() {
    setIsSubmitting(true);

    const timestamp = Date.now();
    const testScores = userTestAnswers.map((answer, index) =>
      getQuestionAnswerScore(index + 1, answer)
    );

    try {
      const result = await saveTestResult({
        testAnswers: userTestAnswers,
        testScores,
        timestamp,
      });

      if (result.success && result.data) {
        toast({
          title: "Test completed!",
          description: "Your results have been saved successfully.",
          status: "success",
          duration: 2000,
          isClosable: true,
        });

        // Clear user answers after successful save
        setUserTestAnswers([]);
        // Navigate to result page
        router.replace(`/test/result/${result.data}`);
      } else {
        throw new Error(result.error?.message || "Failed to save test result");
      }
    } catch (error) {
      console.error("Error saving test result:", error);

      toast({
        title: "Error saving results",
        description:
          "There was a problem saving your test results. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Flex direction="column" gap={4}>
      <Flex justify="space-between" align="center">
        <Text fontSize="2xl" fontWeight="bold">
          Review Your Answers
        </Text>
        <Button onClick={onCloseTestReview}>Close</Button>
      </Flex>
      <SimpleGrid columns={{ base: 2, md: 4 }} gap={4}>
        {personalityTest.map((question, index) => (
          <Button
            key={question.no}
            variant={userTestAnswers[index] ? "solid" : "outline"}
            colorScheme={userTestAnswers[index] ? "primary" : "gray"}
            onClick={() => onGoToQuestion(index)}
          >
            Question {index + 1}
          </Button>
        ))}
      </SimpleGrid>
      <Button
        colorScheme={userTestAnswers.length === personalityTest.length ? "green" : "primary"}
        size={userTestAnswers.length === personalityTest.length ? "lg" : "md"}
        fontWeight={userTestAnswers.length === personalityTest.length ? "bold" : "normal"}
        fontSize={userTestAnswers.length === personalityTest.length ? "lg" : "md"}
        boxShadow={userTestAnswers.length === personalityTest.length ? "lg" : "none"}
        _hover={{
          transform: userTestAnswers.length === personalityTest.length ? "scale(1.05)" : "none",
          boxShadow: userTestAnswers.length === personalityTest.length ? "xl" : "none"
        }}
        transition="all 0.2s"
        onClick={handleSeeResultButtonClick}
        isLoading={isSubmitting}
        loadingText="Saving Results..."
        isDisabled={userTestAnswers.length !== personalityTest.length}
      >
        {userTestAnswers.length === personalityTest.length ? "🎉 See Your Results!" : "See Result"}
      </Button>
    </Flex>
  );
}