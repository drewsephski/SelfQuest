import Image from "next/image";
import { Flex } from "@chakra-ui/react";

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
    <Flex my={4} w="full" h="full" px={8} gap={4} alignItems="center" direction="column">
      {/* All content moved to new components */}
    </Flex>
  );
}
