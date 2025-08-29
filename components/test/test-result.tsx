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
    <Flex 
      my={4} 
      w="full" 
      h="full" 
      px={{ base: 4, md: 8 }} 
      gap={{ base: 2, md: 4 }} 
      alignItems="center" 
      direction="column"
      overflowX="hidden"
    >
      {/* All content moved to new components */}
    </Flex>
  );
}
