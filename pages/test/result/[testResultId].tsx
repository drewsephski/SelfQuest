import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Flex, Show, Text } from "@chakra-ui/react";

import MainLayout from "../../../components/layouts/main-layout";
import TestResult from "../../../components/test/test-result";
import TestResultTableOfContent from "../../../components/test/test-result-table-of-content";
import TestResultStats from "../../../components/test/test-result-stats";
import {
  TestResult as ITestResult,
  getSavedTestResult,
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
              {testResult.data.data ? (
                <Flex
                  h="full"
                  direction={{
                    base: "column",
                    lg: "row",
                  }}
                >
                  <TestResultStats testResult={testResult.data.data} />
                  <TestResult testResult={testResult.data.data} />
                  <Show above="lg">
                    <TestResultTableOfContent />
                  </Show>
                </Flex>
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
