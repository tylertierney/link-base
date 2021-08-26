import {
  VStack,
  Container,
  Flex,
  Avatar,
  Text,
  Alert,
  AlertIcon,
  Divider,
} from "@chakra-ui/react";
import { useUser } from "../../context/authContext";

const Post = ({ post }) => {
  const { user } = useUser();

  return (
    <Container
      maxW="400px"
      minW="400px"
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
      <Flex>
        <Text p="0.2rem 0.2rem">{post.content}</Text>
      </Flex>
    </Container>
  );
};

export default Post;
