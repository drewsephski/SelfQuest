import { useState, useEffect } from "react";
import { Flex, Text } from "@chakra-ui/react";
import { FiClock } from "react-icons/fi";
import dayjs from "dayjs";

const SECOND_IN_MILISECONDS = 1000;

export default function TestTimer() {
  const [elapsedTime, setElapsedTime] = useState<dayjs.Dayjs>(
    dayjs().minute(0).second(0).millisecond(0)
  );

  useEffect(() => {
    const intervalId = setTimeout(() => {
      setElapsedTime((prevElapsedTime) => prevElapsedTime.add(1000, "ms"));
    }, SECOND_IN_MILISECONDS);

    return () => clearTimeout(intervalId);
  }, [elapsedTime]);

  return (
    <Flex
      width={100}
      px={2}
      columnGap={2}
      justifyContent="center"
      alignItems="center"
      borderColor="blackAlpha.300"
      rounded="md"
    >
      <FiClock size={20} />
      <Text fontWeight="bold">
        <>
          {elapsedTime.minute().toString().padStart(2, "0")} : {elapsedTime.second().toString().padStart(2, "0")}
        </>
      </Text>
    </Flex>
  );
}
