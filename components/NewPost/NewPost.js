import {
  Box,
  VStack,
  Container,
  Flex,
  Avatar,
  Text,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  Input,
  Button,
} from "@chakra-ui/react";
import { useUser } from "../../context/authContext";

import { useState } from "react";

const NewPost = () => {
  const { user, authReady } = useUser();

  const [postText, setPostText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");
  };

  return (
    <Container
      p="0"
      maxW="400px"
      minW="400px"
      backgroundColor="brand.text_light"
      boxShadow="2px 2px 15px 1px rgb(0, 0, 0, 0.2)"
      borderRadius="md"
      color="brand.text_dark"
      fontSize="0.7rem"
      p="0.8rem 0.8rem 0.4rem 0.8rem"
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <Flex justify="flex-start" align="center" p="inherit" userSelect="none">
          <Avatar size="xs" name="something"></Avatar>
          <Text color="brand.text_dark" ml="0.6rem">
            {user.email}
          </Text>
        </Flex>
        <Flex m="0.4rem 0">
          <FormControl id="postText">
            <Input
              fontSize="inherit"
              size="sm"
              onChange={(e) => setPostText(e.target.value)}
              placeholder="Tell your friends what you've been up to!"
              value={postText}
              type="textarea"
              _focus={{ outline: "red" }}
            />
          </FormControl>
        </Flex>
        <Flex justify="flex-end" p="inherit">
          <Button size="sm" type="submit" colorScheme="brand">
            Post
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default NewPost;
