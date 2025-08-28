import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Flex, Text } from "@chakra-ui/react";

import MainLayout from "../../../../components/layouts/main-layout";
import TestResultHistory from "../../../../components/test/test-result-history";
import {
  TestResult,
  getAllSavedTestResult,
} from "../../../../lib/personality-test";

export default function TestResultHistoryPage() {
  const router = useRouter();

  const [testResults, setTestResults] = useState<{
    status: "not-asked" | "loading" | "done";
    data?: { success: boolean; data?: TestResult[] | null; error?: Error };
  }>({ status: "not-asked" });

  useEffect(() => {
    if (router.isReady) {
      setTestResults({ status: "loading" });

      getAllSavedTestResult().then((result) =>
        setTestResults({ status: "done", data: result })
      );
    }
  }, [router.isReady]);

  return (
    <MainLayout>
      {testResults.status === "not-asked" && <Text>Loading</Text>}
      {testResults.status === "loading" && <Text>Loading</Text>}
      {testResults.status === "done" && testResults.data && (
        <>
          {!testResults.data.success && (
            <Text>Something went wrong! Please refresh!</Text>
          )}
          {testResults.data.success && (
            <>
              {testResults.data.data ? (
                <TestResultHistory testResults={testResults.data.data} />
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
