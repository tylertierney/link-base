import {
  Container,
  Flex,
  Avatar,
  Text,
  FormControl,
  Input,
  Button,
} from "@chakra-ui/react";
import { useUser } from "../../context/authContext";

import { useState } from "react";
import { SpinnerIcon } from "@chakra-ui/icons";
import axios from "axios";

const NewPost = () => {
  const { user, authReady } = useUser();

  const [postText, setPostText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    setIsLoading(true);
    e.preventDefault();

    const postObject = {
      userid: user.id,
      author: user.user_metadata.username,
      text: postText,
      photo_url: "placeholder.com",
    };
    createNewPost(postObject);
    setPostText("");
    setIsLoading(false);
  };

  const createNewPost = (postObject) => {
    axios
      .post("/api/newpost", postObject)
      .then((response) => {
        console.log("addpost to user profile request received", response);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  console.log(user);

  return (
    <Container
      maxW={["xs", "sm", "md"]}
      backgroundColor="brand.text_light"
      boxShadow="2px 2px 15px 1px rgb(0, 0, 0, 0.2)"
      borderRadius="md"
      color="brand.text_dark"
      fontSize="0.7rem"
      p="0.8rem 0.8rem 0.4rem 0.8rem"
    >
      <form onSubmit={(e) => handleSubmit(e)}>
        <Flex justify="flex-start" align="center" p="inherit" userSelect="none">
          <Avatar
            size="xs"
            name={user.username}
            src={user.prof_pic_url}
          ></Avatar>
          <Text color="brand.text_dark" ml="0.6rem">
            {user.user_metadata.username}
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
          <Button
            size="sm"
            type="submit"
            colorScheme="blue"
            // backgroundColor="brand.1000"
            // color="brand.900"
            opacity={postText ? "1" : "0.5"}
            _focus={{ outline: "none" }}
          >
            {isLoading ? (
              <SpinnerIcon
                color="white"
                className="spinnerIcon"
                fontSize="1rem"
                m="0 0.4rem"
              ></SpinnerIcon>
            ) : (
              "Post"
            )}
          </Button>
        </Flex>
      </form>
    </Container>
  );
};

export default NewPost;
