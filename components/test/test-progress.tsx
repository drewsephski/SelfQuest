import { Progress, Flex, Text, Box } from "@chakra-ui/react";

import { personalityTest } from "../../data/personality-test";
import useUserTestAnswersStore from "../../store/use-user-test-answers";

interface TestProgressProps {
  currentQuestionIndex: number;
}

export default function TestProgress({ currentQuestionIndex }: TestProgressProps) {
  const { userTestAnswers } = useUserTestAnswersStore();

  const progress = (userTestAnswers.length / personalityTest.length) * 100;
  const roundedProgress = Math.round(progress);

  return (
    <Flex
      w="full"
      direction="column"
      gap={3}
      alignItems="center"
      px={2}
    >
      <Box
        position="relative"
        w="full"
        h="12px"
        bg="gray.100"
        rounded="full"
        overflow="hidden"
        _dark={{ bg: "gray.700" }}
        boxShadow="inner"
      >
        <Box
          position="absolute"
          top={0}
          left={0}
          h="full"
          w={`${progress}%`}
          bgGradient="linear(to-r, #60a5fa 0%, #1d4ed8 100%)"
          rounded="full"
          transition="width 0.3s ease-in-out"
          boxShadow="0 0 10px rgba(102, 126, 234, 0.4)"
        />
        <Box
          position="absolute"
          top={0}
          left={0}
          h="full"
          w="full"
          bgGradient="linear(to-r, rgba(255,255,255,0.1) 0%, transparent 50%)"
          rounded="full"
        />
      </Box>
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
          borderColor: "gray.600"
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
        <Text
          fontSize="sm"
          color="gray.500"
          _dark={{ color: "gray.400" }}
        >
          Complete
        </Text>
      </Flex>
    </Flex>
  );
}
