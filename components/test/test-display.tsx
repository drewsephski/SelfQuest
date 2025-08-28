import { useState } from "react";
import { Flex, Box, Container, Fade } from "@chakra-ui/react";

import TestMenu from "./test-menu";
import TestInstructions from "./test-instructions";
import TestQuestion from "./test-question";

export default function TestDisplay() {
  const [showTestInstructions, setShowTestInstructions] = useState(true);

  function handleShowInstructionsButtonClick() {
    setShowTestInstructions(true);
  }

  function handleCloseTestInstructions() {
    setShowTestInstructions(false);
  }

  return (
    <Container maxW="container.lg" py={4}>
      <Flex
        w="full"
        direction="column"
        gap={6}
        minH="80vh"
      >
        <TestMenu
          onShowInstructionsButtonClick={handleShowInstructionsButtonClick}
        />
        
        <Box flex="1" position="relative">
          <Fade in={showTestInstructions} unmountOnExit>
            <Box position="absolute" w="full" h="full">
              <TestInstructions
                onCloseTestInstructions={handleCloseTestInstructions}
              />
            </Box>
          </Fade>
          
          <Fade in={!showTestInstructions} unmountOnExit>
            <Box position="absolute" w="full" h="full">
              <TestQuestion />
            </Box>
          </Fade>
        </Box>
      </Flex>
    </Container>
  );
}
