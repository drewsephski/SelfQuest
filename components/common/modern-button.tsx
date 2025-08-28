import { Button, ButtonProps, useColorModeValue } from "@chakra-ui/react";
import { forwardRef } from "react";

interface ModernButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
  variant?: "primary" | "secondary" | "ghost" | "outline";
}

export const ModernButton = forwardRef<HTMLButtonElement, ModernButtonProps>(
  ({ children, isLoading, loadingText, variant = "primary", ...props }, ref) => {
    const neonBlue = useColorModeValue("neon.500", "neon.400");
    const neonBlueLight = useColorModeValue("neon.400", "neon.300");
    const neonBlueDark = useColorModeValue("neon.600", "neon.500");

    // Define variant-specific styles
    const getVariantStyles = () => {
      switch (variant) {
        case "primary":
          return {
            bg: neonBlue,
            color: "white",
            _hover: {
              bg: neonBlueDark,
              transform: "translateY(-2px)",
              shadow: "0 0 20px var(--neon-blue)",
              boxShadow: `0 0 20px var(--neon-blue), 0 10px 25px rgba(59, 130, 246, 0.3)`,
              ...props._hover,
            },
            _active: {
              bg: neonBlueDark,
              transform: "translateY(0)",
              shadow: "0 0 10px var(--neon-blue)",
              ...props._active,
            },
          };
        case "secondary":
          return {
            bg: "transparent",
            color: neonBlue,
            border: "2px solid",
            borderColor: neonBlue,
            _hover: {
              bg: neonBlue,
              color: "white",
              transform: "translateY(-2px)",
              shadow: "0 0 15px var(--neon-blue)",
              boxShadow: `0 0 15px var(--neon-blue), 0 8px 20px rgba(59, 130, 246, 0.2)`,
              ...props._hover,
            },
            _active: {
              bg: neonBlueDark,
              transform: "translateY(0)",
              shadow: "0 0 8px var(--neon-blue)",
              ...props._active,
            },
          };
        case "ghost":
          return {
            bg: "transparent",
            color: neonBlue,
            _hover: {
              bg: "neon.50",
              color: neonBlueDark,
              transform: "translateY(-1px)",
              shadow: "0 0 10px var(--neon-blue-light)",
              ...props._hover,
            },
            _active: {
              bg: "neon.100",
              transform: "translateY(0)",
              ...props._active,
            },
          };
        case "outline":
          return {
            bg: "transparent",
            color: neonBlue,
            border: "1px solid",
            borderColor: neonBlue,
            _hover: {
              bg: neonBlue,
              color: "white",
              transform: "translateY(-1px)",
              shadow: "0 0 12px var(--neon-blue)",
              ...props._hover,
            },
            _active: {
              bg: neonBlueDark,
              transform: "translateY(0)",
              ...props._active,
            },
          };
        default:
          return {};
      }
    };

    const variantStyles = getVariantStyles();

    return (
      <Button
        ref={ref}
        isLoading={isLoading}
        loadingText={loadingText}
        _focus={{
          boxShadow: `0 0 0 3px ${neonBlueLight}40`,
          outline: "none",
        }}
        _focusVisible={{
          boxShadow: `0 0 0 3px ${neonBlueLight}60`,
          outline: "none",
        }}
        transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
        {...variantStyles}
        {...props}
      >
        {children}
      </Button>
    );
  }
);

ModernButton.displayName = "ModernButton";

export default ModernButton;