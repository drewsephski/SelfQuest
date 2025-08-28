import MainLayout from "../../components/layouts/main-layout";
import TestDisplay from "../../components/test/test-display";

export default function TestPage() {
  return (
    <MainLayout
      title="Take the MBTI Personality Test - Discover Your Type"
      description="Take our comprehensive MBTI personality test to discover your unique personality type. Answer thoughtfully designed questions to understand your preferences and traits."
    >
      <TestDisplay />
    </MainLayout>
  );
}
