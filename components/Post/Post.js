import {
  VStack,
  Container,
  Flex,
  Avatar,
  Text,
  Divider,
  Icon,
} from "@chakra-ui/react";

import { useUser } from "../../context/authContext";

import { useState } from "react";

import { FiThumbsUp } from "react-icons/fi";
import { FaThumbsUp } from "react-icons/fa";

const Post = ({ post }) => {
  const [isLiked, setIsLiked] = useState();

  const { user } = useUser();

  const convertDate = (postedAt) => {
    const date = new Date(postedAt);
    const day = date.toDateString();

    return day.substr(0, day.length - 5);
  };

  return (
    <Container
      maxW={["xs", "sm", "md"]}
      backgroundColor="brand.text_light"
      boxShadow="2px 2px 15px 1px rgb(0, 0, 0, 0.2)"
      key={post._id}
      borderRadius="md"
      color="brand.text_dark"
      fontSize="0.7rem"
      p="0.5rem 0.8rem"
    >
      <Flex justify="flex-start" align="center">
        <Avatar size="xs" name={post.author} src={post.prof_pic}></Avatar>
        <Text ml="0.8rem">{post.author}</Text>
      </Flex>
      <Divider m="0.3rem 0" />
      <Flex direction="column">
        <Text p="0.5rem 0 0 0.5rem">
          {post.text}
          <br />
        </Text>
        <Flex
          justify="space-between"
          align="center"
          color="gray"
          m="0.6rem 0 0 0"
        >
          {isLiked ? (
            <Icon
              as={FaThumbsUp}
              fontSize="1.1rem"
              color="blue.600"
              cursor="pointer"
              onClick={() => setIsLiked(!isLiked)}
            />
          ) : (
            <Icon
              as={FiThumbsUp}
              fontSize="1.1rem"
              cursor="pointer"
              onClick={() => setIsLiked(!isLiked)}
            />
          )}
          <Text fontSize="0.6rem" color="gray.400" as={"p"} textAlign="right">
            {convertDate(post.posted_at)}
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Post;
