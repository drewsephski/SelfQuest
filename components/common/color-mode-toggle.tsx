import { useColorMode, IconButton } from "@chakra-ui/react";
import { FiSun, FiMoon } from "react-icons/fi";

export function ColorModeToggle() {
  const { colorMode, toggleColorMode } = useColorMode();
  return (
    <IconButton
      aria-label="Toggle color mode"
      icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
      onClick={toggleColorMode}
    />
  );
}