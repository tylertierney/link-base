import { Alert, Icon, Text, Flex } from "@chakra-ui/react";
import { HiOutlineLightBulb } from "react-icons/hi";
import { AiOutlineClose } from "react-icons/ai";

const HintMessage = ({ showHint, setShowHint }) => {
  return (
    <Alert
      p="1rem 0"
      borderRadius="md"
      status="info"
      maxW={["330px", "sm", "md"]}
      display={showHint ? "inherit" : "none"}
    >
      <Flex justify="center" align="center" w="100%" h="100%">
        <Flex ml="10px">
          <Icon as={HiOutlineLightBulb} mr="0.2rem" />
          <Text fontSize="0.7rem">Hint: Swipe left on a post to hide it</Text>
        </Flex>
        <Icon
          cursor="pointer"
          onClick={() => setShowHint(false)}
          as={AiOutlineClose}
          ml="auto"
          mr="10px"
        />
      </Flex>
    </Alert>
  );
};

export default HintMessage;
