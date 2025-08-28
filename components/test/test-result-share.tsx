import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  LinkedinShareButton,
  LinkedinIcon,
} from "react-share";
import { Button, Flex, Input, useClipboard } from "@chakra-ui/react";

interface TestResultShareProps {
  url: string;
}

export default function TestResultShare({ url }: TestResultShareProps) {
  const { hasCopied, onCopy } = useClipboard(url);

  return (
    <Flex
      my={4}
      w="full"
      p={4}
      gap={4}
      direction="column"
      bg="background.tertiary"
      rounded="lg"
    >
      <Flex gap={2}>
        <FacebookShareButton url={url}>
          <FacebookIcon size={32} round />
        </FacebookShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon size={32} round />
        </TwitterShareButton>
        <LinkedinShareButton url={url}>
          <LinkedinIcon size={32} round />
        </LinkedinShareButton>
      </Flex>
      <Flex gap={2}>
        <Input value={url} isReadOnly />
        <Button onClick={onCopy}>{hasCopied ? "Copied" : "Copy"}</Button>
      </Flex>
    </Flex>
  );
}