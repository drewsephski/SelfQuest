import {
  VStack,
  Heading,
  Text,
  Button,
  Box,
  Icon,
  HStack,
  useColorModeValue,
  Flex,
  ListItem,
  UnorderedList,
} from "@chakra-ui/react";
import { FiClock, FiCheckCircle, FiHeart, FiZap } from "react-icons/fi";

interface TestInstructionsProps {
  onCloseTestInstructions: () => void;
}

export default function TestInstructions(props: TestInstructionsProps) {
  return (
    <Flex
      h="full"
      px={4}
      direction="column"
      gap={8}
      bg="background.tertiary"
      p={6}
      rounded="lg"
    >
      <Heading color="text.primary">Welcome to the Personality Test</Heading>
      <Flex direction="column" gap={4}>
        <Text color="text.secondary">
          This test is based on the Myers-Briggs Type Indicator (MBTI) and will
          help you understand your personality preferences. It consists of 70
          questions and takes about 10-15 minutes to complete.
        </Text>
        <Box>
          <Heading size="md" color="text.primary" mb={2}>
            A few tips for the best results:
          </Heading>
          <UnorderedList spacing={2}>
            <ListItem color="text.secondary">
              <HStack>
                <Icon as={FiCheckCircle} color="green.500" />
                <Text>There are no right or wrong answers.</Text>
              </HStack>
            </ListItem>
            <ListItem color="text.secondary">
              <HStack>
                <Icon as={FiHeart} color="red.500" />
                <Text>
                  Trust your instincts and go with your first reaction.
                </Text>
              </HStack>
            </ListItem>
            <ListItem color="text.secondary">
              <HStack>
                <Icon as={FiZap} color="yellow.500" />
                <Text>
                  Be yourself, not who you think you should be.
                </Text>
              </HStack>
            </ListItem>
          </UnorderedList>
        </Box>
      </Flex>
      <Button
        w="full"
        colorScheme="primary"
        onClick={props.onCloseTestInstructions}
        size="lg"
        mt={4}
      >
        Begin My Journey
      </Button>
    </Flex>
  );
}