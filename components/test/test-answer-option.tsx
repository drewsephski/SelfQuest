import { useRadio, Box, useColorModeValue } from "@chakra-ui/react";
import { ReactNode } from "react";

interface TestAnswerOptionProps {
  children: ReactNode;
  [key: string]: any;
}

export default function TestAnswerOption(props: TestAnswerOptionProps) {
  const { getInputProps, getRadioProps } = useRadio(props);
  const input = getInputProps();
  const radio = getRadioProps();

  const borderColor = useColorModeValue("gray.200", "gray.600");
  const hoverBg = useColorModeValue("gray.50", "gray.700");
  const checkedBg = useColorModeValue("primary.500", "primary.600");

  return (
    <Box w="full" as="label">
      <input {...input} />
      <Box
        px={6}
        py={4}
        cursor="pointer"
        borderWidth={2}
        borderRadius="lg"
        borderColor={borderColor}
        userSelect="none"
        transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
        _hover={{
          bg: hoverBg,
          borderColor: "primary.300",
          transform: "translateY(-1px)",
          shadow: "md",
        }}
        _checked={{
          bg: checkedBg,
          color: "white",
          borderColor: checkedBg,
          transform: "translateY(-1px)",
          shadow: "lg",
        }}
        _focus={{
          boxShadow: "0 0 0 3px rgba(52, 152, 219, 0.3)",
          outline: "none",
        }}
        _active={{
          transform: "translateY(0)",
        }}
        {...radio}
      >
        {props.children}
      </Box>
    </Box>
  );
}
