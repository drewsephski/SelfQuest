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
      <Heading color="text.primary">Instructions</Heading>
      <Flex
        direction="column"
        gap={2}
      >
        <Text color="text.secondary">
          Completing the test should only take 15 minutes or so. Here is several
          hints about how to complete this test:
        </Text>
        <UnorderedList spacing={2}>
          <ListItem color="text.secondary">
            There are no right answers to any of these questions.
          </ListItem>
          <ListItem color="text.secondary">
            Answer the questions quickly, do not over-analyze them. Some seem
            worded poorly. Go with what feels best.
          </ListItem>
          <ListItem color="text.secondary">
            Answer the questions as &ldquo;the way you are&rdquo;, not &ldquo;the way you&apos;d like
            to be seen by others&rdquo;.
          </ListItem>
        </UnorderedList>
      </Flex>
      <Button
        w="min-content"
        colorScheme="primary"
        alignSelf="flex-end"
        onClick={props.onCloseTestInstructions}
      >
        Okay, I got it!
      </Button>
    </Flex>
  );
}
