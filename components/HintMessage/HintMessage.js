import { Alert, Icon, Text, Flex } from "@chakra-ui/react";
import { HiOutlineLightBulb } from "react-icons/hi";

const HintMessage = () => {
  return (
    <Alert
      p="1rem 0"
      borderRadius="md"
      status="info"
      maxW={["330px", "sm", "md"]}
    >
      <Flex justify="center" align="center" w="100%" h="100%">
        <Icon as={HiOutlineLightBulb} mr="0.2rem" />
        <Text fontSize="0.7rem">Hint: Swipe left on a post to hide it</Text>
      </Flex>
    </Alert>
  );
};

export default HintMessage;
