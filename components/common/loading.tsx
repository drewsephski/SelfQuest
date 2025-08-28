import { Spinner, VStack, Text, Box } from "@chakra-ui/react";

interface LoadingSpinnerProps {
  message?: string;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}

export function LoadingSpinner({ 
  message = "Loading...", 
  size = "xl" 
}: LoadingSpinnerProps) {
  return (
    <VStack spacing={4} py={8}>
      <Spinner size={size} color="primary.500" thickness="4px" />
      <Text color="gray.600" fontSize="sm">
        {message}
      </Text>
    </VStack>
  );
}

interface LoadingPageProps {
  message?: string;
}

export function LoadingPage({ message = "Loading..." }: LoadingPageProps) {
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      minH="50vh"
      w="full"
    >
      <LoadingSpinner message={message} />
    </Box>
  );
}

export default LoadingSpinner;