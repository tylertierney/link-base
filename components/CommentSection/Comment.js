import { Flex, Avatar, Text, Divider } from "@chakra-ui/react";

const Comment = () => {
  return (
    <>
      <Flex direction="column">
        <Flex p="0.8rem 0.3rem 0.8rem 0.5rem">
          <Flex direction="column">
            <Flex
              align="center"
              fontSize="0.6rem"
              p="10px"
              justify="space-between"
            >
              <Flex align="center">
                <Avatar size="2xs" name="something" mr="10px" />
                <Text fontWeight="500">username</Text>
              </Flex>
              <Text color="gray.400">Sat Aug 28</Text>
            </Flex>
            <Text color="gray.600" pl="10px">
              Love that show! Why this picture though ? Love that show! Why this
              picture though ? Love that show! Why this picture though ? Love
              that show! Why this picture though ?
            </Text>
          </Flex>
        </Flex>
        <Divider />
      </Flex>
    </>
  );
};

export default Comment;
