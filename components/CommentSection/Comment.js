import { Flex, Avatar, Text, Divider } from "@chakra-ui/react";
import { convertDate } from "../../helperfunctions";

const Comment = ({ author_username, author_prof_pic, date, text }) => {
  const converted_date = convertDate(date);

  return (
    <>
      <Flex direction="column" backgroundColor="brand.text_light">
        <Flex p="0.8rem 0.3rem 0.8rem 0.5rem">
          <Flex direction="column" w="100%">
            <Flex
              align="center"
              fontSize="0.6rem"
              p="10px"
              justify="space-between"
            >
              <Flex align="center">
                <Avatar
                  src={author_prof_pic}
                  size="2xs"
                  name="something"
                  mr="10px"
                />
                <Text fontWeight="500">{author_username}</Text>
              </Flex>
              <Text color="gray.400">{converted_date}</Text>
            </Flex>
            <Text textAlign="left" color="gray.600" pl="10px">
              {text}
            </Text>
          </Flex>
        </Flex>
        <Divider />
      </Flex>
    </>
  );
};

export default Comment;
