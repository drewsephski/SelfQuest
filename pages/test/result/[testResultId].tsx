import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Box,
} from "@chakra-ui/react";

import MainLayout from "../../../components/layouts/main-layout";
import TestResultOverview from "../../../components/test/TestResultOverview";
import TestResultTraits from "../../../components/test/TestResultTraits";
import TestResultRelationships from "../../../components/test/TestResultRelationships";
import TestResultChallenges from "../../../components/test/TestResultChallenges";
import TestResultGrowth from "../../../components/test/TestResultGrowth";
import TestResultChart from "../../../components/test/test-result-chart";
import TestResultShare from "../../../components/test/test-result-share";
import TestResultStats from "../../../components/test/test-result-stats";
import { getPersonalityClassGroupByTestScores } from "../../../lib/personality-test";
import {
  TestResult as ITestResult,
  PersonalityClass,
  PersonalityClassGroup,
  DisplayPersonalityType,
  getSavedTestResult,
  getAllSavedTestResult,
} from "../../../lib/personality-test";

export default function TestResultPage() {
  const router = useRouter();

  const [testResult, setTestResult] = useState<{
    status: "loading" | "done";
    data?: { success: boolean; data?: ITestResult | null; error?: Error };
  }>({ status: "loading" });

  useEffect(() => {
    if (router.isReady && router.query.testResultId) {
      const id = parseInt(router.query.testResultId as string);

      getSavedTestResult(id).then((result) =>
        setTestResult({ status: "done", data: result })
      );
    }
  }, [router.isReady, router.query.testResultId]);

  // This useEffect seems unrelated to the core functionality of displaying a single test result
  // and might be causing unnecessary console logs or side effects.
  // Consider removing or refactoring if not strictly needed for this page.
  // useEffect(() => {
  //   getAllSavedTestResult().then((results) => {
  //     if (results.success && results.data) {
  //       console.log("All saved test results:", results.data);
  //     }
  //   });
  // }, []);

  const personalityClassGroup = testResult.data?.data
    ? getPersonalityClassGroupByTestScores(testResult.data.data.testScores)
    : undefined;
  const personalityType: DisplayPersonalityType | undefined = personalityClassGroup ? { type: personalityClassGroup.type, description: personalityClassGroup.name, brief: personalityClassGroup.epithet } : undefined; // Renaming for clarity as per new components

  if (!router.isReady || testResult.status === "loading") {
    return (
      <MainLayout>
        <Text>Loading...</Text>
      </MainLayout>
    );
  }

  if (testResult.status === "done" && !testResult.data?.success) {
    return (
      <MainLayout>
        <Text>Something went wrong! Please refresh!</Text>
      </MainLayout>
    );
  }

  if (!testResult.data?.data || !personalityClassGroup || !personalityType) {
    return (
      <MainLayout>
        <Text>No Data</Text>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <Tabs 
        mt={{ base: 12, md: 16 }}
        variant="enclosed"
        isLazy
        lazyBehavior="keepMounted"
      >
        <Flex 
          width="100%"
          borderBottom="1px"
          borderColor="gray.200"
          mb={4}
          px={{ base: 4, md: 0 }}
        >
          <TabList 
            flexWrap="wrap"
            width="100%"
            gap={1}
            sx={{
              '& > button': {
                whiteSpace: 'nowrap',
                px: 3,
                py: 2,
                fontSize: { base: 'sm', sm: 'md' },
                _selected: {
                  color: 'blue.500',
                  borderBottom: '2px solid',
                  borderColor: 'blue.500',
                  mb: '-1px',
                },
              },
            }}
          >
            <Tab>Overview</Tab>
            <Tab>Traits</Tab>
            <Tab>Relationships</Tab>
            <Tab>Challenges</Tab>
            <Tab>Growth</Tab>
            <Tab>Stats</Tab>
            <Tab>Chart</Tab>
            <Tab>Share</Tab>
          </TabList>
        </Flex>

        <Box px={{ base: 4, md: 0 }}>
          <TabPanels>
            <TabPanel p={0}>
              {personalityClassGroup && personalityType && (
                <TestResultOverview 
                  personalityClassGroup={personalityClassGroup} 
                  personalityType={personalityType} 
                />
              )}
            </TabPanel>
            <TabPanel p={0}>
              <TestResultTraits personalityClassGroup={personalityClassGroup} personalityType={personalityType} />
            </TabPanel>
            <TabPanel p={0}>
              <TestResultRelationships personalityClassGroup={personalityClassGroup} personalityType={personalityType} />
            </TabPanel>
            <TabPanel p={0}>
              <TestResultChallenges personalityClassGroup={personalityClassGroup} personalityType={personalityType} />
            </TabPanel>
            <TabPanel p={0}>
              <TestResultGrowth personalityClassGroup={personalityClassGroup} personalityType={personalityType} />
            </TabPanel>
            <TabPanel p={0}>
              <TestResultStats testResult={testResult.data?.data} />
            </TabPanel>
            <TabPanel p={0}>
              <TestResultChart testResult={testResult.data?.data} />
            </TabPanel>
            <TabPanel p={0}>
              <TestResultShare url={typeof window !== 'undefined' ? window.location.href : ''} />
            </TabPanel>
          </TabPanels>
        </Box>
      </Tabs>
    </MainLayout>
  );
}
