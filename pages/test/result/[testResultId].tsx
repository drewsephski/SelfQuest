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
  getSavedTestResult,
  getAllSavedTestResult,
} from "../../../lib/personality-test";

export default function TestResultPage() {
  const router = useRouter();

  const [testResult, setTestResult] = useState<{
    status: "not-asked" | "loading" | "done";
    data?: { success: boolean; data?: ITestResult | null; error?: Error };
  }>({ status: "not-asked" });

  useEffect(() => {
    if (router.isReady) {
      setTestResult({ status: "loading" });

      const id = parseInt(router.query.testResultId as string);

      getSavedTestResult(id).then((result) =>
        setTestResult({ status: "done", data: result })
      );
    }
  }, [router.isReady, router.query.testResultId]);

  useEffect(() => {
    getAllSavedTestResult().then((results) => {
      if (results.success && results.data) {
        console.log("All saved test results:", results.data);
      }
    });
  }, []);

  const personalityClassGroup = testResult.data?.data
    ? getPersonalityClassGroupByTestScores(testResult.data.data.testScores)
    : undefined;
  const personalityType = personalityClassGroup; // Renaming for clarity as per new components

  return (
    <MainLayout>
      {testResult.status === "not-asked" && <Text>Loading</Text>}
      {testResult.status === "loading" && <Text>Loading</Text>}
      {testResult.status === "done" && testResult.data && (
        <>
          {!testResult.data.success && (
            <Text>Something went wrong! Please refresh!</Text>
          )}
          {testResult.data.success && (
            <>
              {testResult.data.data && personalityClassGroup && personalityType ? (
                <Tabs mt={16}>
                  <TabList justifyContent="center" mb={16} mx="auto">
                    <Tab>Overview</Tab>
                    <Tab>Traits & Gifts</Tab>
                    <Tab>Relationships</Tab>
                    <Tab>Challenges & Solutions</Tab>
                    <Tab>Growth & Success</Tab>
                    <Tab>Stats</Tab>
                    <Tab>Chart</Tab>
                    <Tab>Share</Tab>
                  </TabList>

                  <TabPanels>
                    <TabPanel display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={0} py={0}>
                      <TestResultOverview
                        personalityClassGroup={personalityClassGroup}
                        personalityType={personalityType}
                      />
                    </TabPanel>
                    <TabPanel display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={0} py={0}>
                      <TestResultTraits
                        personalityClassGroup={personalityClassGroup}
                        personalityType={personalityType}
                      />
                    </TabPanel>
                    <TabPanel display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={0} py={0}>
                      <TestResultRelationships
                        personalityClassGroup={personalityClassGroup}
                        personalityType={personalityType}
                      />
                    </TabPanel>
                    <TabPanel display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={0} py={0}>
                      <TestResultChallenges
                        personalityClassGroup={personalityClassGroup}
                        personalityType={personalityType}
                      />
                    </TabPanel>
                    <TabPanel display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={0} py={0}>
                      <TestResultGrowth
                        personalityClassGroup={personalityClassGroup}
                        personalityType={personalityType}
                      />
                    </TabPanel>
                    <TabPanel display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={0} py={0}>
                      <TestResultStats testResult={testResult.data.data} />
                    </TabPanel>
                    <TabPanel display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={0} py={0}>
                      <TestResultChart testResult={testResult.data.data} />
                    </TabPanel>
                    <TabPanel display="flex" flexDirection="column" alignItems="center" justifyContent="center" px={0} py={0}>
                      <TestResultShare url={window.location.href} />
                    </TabPanel>
                  </TabPanels>
                </Tabs>
              ) : (
                <Text>No Data</Text>
              )}
            </>
          )}
        </>
      )}
    </MainLayout>
  );
}
