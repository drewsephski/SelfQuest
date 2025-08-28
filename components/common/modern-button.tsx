import { Button, ButtonProps } from "@chakra-ui/react";
import { forwardRef } from "react";

interface ModernButtonProps extends ButtonProps {
  isLoading?: boolean;
  loadingText?: string;
}

export const ModernButton = forwardRef<HTMLButtonElement, ModernButtonProps>(
  ({ children, isLoading, loadingText, ...props }, ref) => {
    return (
      <Button
        ref={ref}
        isLoading={isLoading}
        loadingText={loadingText}
        _hover={{
          transform: "translateY(-2px)",
          shadow: "lg",
          ...props._hover,
        }}
        _active={{
          transform: "translateY(0)",
          ...props._active,
        }}
        transition="all 0.2s cubic-bezier(0.4, 0, 0.2, 1)"
        {...props}
      >
        {children}
      </Button>
    );
  }
);

ModernButton.displayName = "ModernButton";

export default ModernButton;