import { useRouter } from "next/router";
import { useState, useEffect, useCallback } from "react";
import { useRadioGroup, Flex, Text, Button, useToast } from "@chakra-ui/react";

import TestProgress from "./test-progress";
import TestAnswerOption from "./test-answer-option";

import { personalityTest } from "../../data/personality-test";
import {
  TestAnswerOption as TestAnswer,
  getQuestionAnswerScore,
  saveTestResult,
} from "../../lib/personality-test";
import useUserTestAnswersStore from "../../store/use-user-test-answers";

interface TestQuestionProps {}

export default function TestQuestion({}: TestQuestionProps) {
  const router = useRouter();
  const toast = useToast();

  const { userTestAnswers, setUserTestAnswers } = useUserTestAnswersStore();

  const [currentPersonalityTestIndex, setCurrentPersonalityTestIndex] =
    useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isUserAlreadyPickAnswer =
    userTestAnswers[currentPersonalityTestIndex] !== undefined;

  const { getRootProps, getRadioProps, setValue } = useRadioGroup({
    name: "answer",
    defaultValue: userTestAnswers[currentPersonalityTestIndex],
    onChange: (value) => {
      const newUserTestAnswers = [...userTestAnswers];

      newUserTestAnswers[currentPersonalityTestIndex] =
        value as TestAnswer["type"];

      setUserTestAnswers(newUserTestAnswers);

      // Automatically advance to next question if not the last one
      if (currentPersonalityTestIndex < personalityTest.length - 1) {
        setCurrentPersonalityTestIndex(currentPersonalityTestIndex + 1);
      }
    },
  });

  const group = getRootProps();

  useEffect(() => {
    if (userTestAnswers[currentPersonalityTestIndex] === undefined) {
      setValue("");
      return;
    }

    setValue(userTestAnswers[currentPersonalityTestIndex]);
  }, [currentPersonalityTestIndex, userTestAnswers, setValue]);

  function handlePreviousButtonClick() {
    setCurrentPersonalityTestIndex((currentPersonalityTestIndex) => {
      if (currentPersonalityTestIndex - 1 < 0) {
        return currentPersonalityTestIndex;
      }

      return currentPersonalityTestIndex - 1;
    });
  }

  function handleGoToQuestion(questionIndex: number) {
    setCurrentPersonalityTestIndex(questionIndex);
  }

  useEffect(() => {
    const listener = (e: any) => {
      handleGoToQuestion(e.detail);
    };
    window.addEventListener("goToQuestion", listener);
    return () => {
      window.removeEventListener("goToQuestion", listener);
    };
  }, []);

  const handleSeeResultButtonClick = useCallback(async () => {
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
        description: "There was a problem saving your test results. Please try again.",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [router, toast, userTestAnswers, setUserTestAnswers]);

  // Automatic submission when all questions are answered
  useEffect(() => {
    const allQuestionsAnswered = userTestAnswers.every(answer => answer !== undefined);
    const isOnLastQuestion = currentPersonalityTestIndex === personalityTest.length - 1;

    if (allQuestionsAnswered && isOnLastQuestion && !isSubmitting) {
      handleSeeResultButtonClick();
    }
  }, [userTestAnswers, currentPersonalityTestIndex, isSubmitting, handleSeeResultButtonClick]);

  return (
    <Flex
      py={{ base: 4, md: 6 }}
      w="full"
      h="full"
      gap={{ base: 4, md: 1 }}
      direction="column"
      justifyContent="space-between"
      alignItems="center"
      maxW="2xl"
      mx="auto"
    >
      <TestProgress
        currentQuestionIndex={currentPersonalityTestIndex}
        onGoToQuestion={handleGoToQuestion}
      />

      <Flex
        direction="column"
        textAlign="center"
        gap={{ base: 1, md: 2 }}
        px={{ base: 2, md: 4 }}
      >
        <Text
          fontSize={{ base: "xs", md: "sm" }}
          fontWeight="semibold"
          color="primary.500"
          textTransform="uppercase"
          letterSpacing="wide"
        >
          Question {currentPersonalityTestIndex + 1} of {personalityTest.length}
        </Text>
        <Text
          fontSize={{ base: "lg", md: "xl", lg: "2xl" }}
          fontWeight="medium"
          lineHeight="shorter"
          color="gray.700"
          _dark={{ color: "gray.200" }}
        >
          {personalityTest[currentPersonalityTestIndex].question}
        </Text>
      </Flex>

      <Flex
        w="full"
        gap={{ base: 2, md: 3 }}
        direction="column"
        px={{ base: 2, md: 4 }}
        {...group}
      >
        {personalityTest[currentPersonalityTestIndex].answerOptions.map(
          (answerOption, index) => {
            const radio = getRadioProps({ value: answerOption.type });

            return (
              <TestAnswerOption
                key={answerOption.type}
                {...radio} // Pass radio props directly
              >
                {answerOption.answer}
              </TestAnswerOption>
            );
          }
        )}
      </Flex>

      <Flex
        direction="row"
        w="full"
        gap={{ base: 2, md: 4 }}
        px={{ base: 2, md: 4 }}
      >
        <Button
          w="full"
          variant="outline"
          colorScheme="gray"
          isDisabled={currentPersonalityTestIndex === 0}
          onClick={handlePreviousButtonClick}
          _hover={{
            transform: "translateY(-2px)",
            shadow: "md",
          }}
          transition="all 0.2s"
          fontSize={{ base: "sm", md: "md" }}
          py={{ base: 2, md: "auto" }}
          h={{ base: 10, md: "auto" }}
        >
          Previous
        </Button>

        {currentPersonalityTestIndex === personalityTest.length - 1 ? (
          <Button
            w="full"
            colorScheme="green"
            size={{ base: "md", md: "lg" }}
            fontWeight="bold"
            fontSize={{ base: "md", md: "lg" }}
            boxShadow="lg"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "xl",
            }}
            transition="all 0.2s"
            onClick={handleSeeResultButtonClick}
            isLoading={isSubmitting}
            loadingText="Saving Results..."
            py={{ base: 2, md: "auto" }}
            h={{ base: 10, md: "auto" }}
          >
            🎉 Finish Test!
          </Button>
        ) : null}
      </Flex>
    </Flex>
  );
}