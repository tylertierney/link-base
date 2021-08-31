import { Flex, Avatar, Text } from "@chakra-ui/react";

const CommentPreview = () => {
  return (
    <Flex p="0.4rem 0.3rem 0.2rem 0.5rem">
      <Flex align="center" fontSize="0.6rem">
        <Avatar size="2xs" name="something" mr="4px" />
        <Text fontWeight="500">username</Text>
        <Text color="gray.600" pl="10px">
          Love that show! Why this picture though ?
        </Text>
      </Flex>
    </Flex>
  );
};

export default CommentPreview;
