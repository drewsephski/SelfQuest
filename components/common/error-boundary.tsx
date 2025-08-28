import React, { Component, ErrorInfo, ReactNode } from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  VStack,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from '@chakra-ui/react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
    
    // You can log the error to an error reporting service here
    if (process.env.NODE_ENV === 'production') {
      // Example: logErrorToService(error, errorInfo);
    }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <Box p={8} textAlign="center" maxW="md" mx="auto" mt={20}>
          <Alert status="error" flexDirection="column" borderRadius="lg">
            <AlertIcon boxSize="40px" mr={0} />
            <AlertTitle mt={4} mb={1} fontSize="lg">
              Something went wrong!
            </AlertTitle>
            <AlertDescription maxWidth="sm" textAlign="center">
              <VStack spacing={4} mt={4}>
                <Text fontSize="sm" color="gray.600">
                  We apologize for the inconvenience. Please try refreshing the page.
                </Text>
                <Button 
                  colorScheme="primary" 
                  onClick={this.handleReset}
                  size="sm"
                >
                  Try Again
                </Button>
              </VStack>
            </AlertDescription>
          </Alert>
        </Box>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;