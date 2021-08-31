import {
  Flex,
  Input,
  FormControl,
  InputRightAddon,
  Text,
  Avatar,
  Button,
  InputRightElement,
} from "@chakra-ui/react";

import { useState } from "react";

import { SpinnerIcon } from "@chakra-ui/icons";

import CommentPreview from "./CommentPreview";

const CommentSection = ({ hasCommented, setHasCommented, post, isPanel }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleNewComment = (e) => {
    e.preventDefault();
    axios.post(`/api/${post._id}`, {
      post: post,
      likeOrComment: "comment",
    });

    setIsLiked(!isLiked);
  };

  return (
    <>
      {isPanel ? (
        <Flex p="0.4rem 0.3rem 0.2rem 0.5rem">
          <form onSubmit={(e) => handleNewComment(e)}>
            <FormControl>
              <Input
                type="text"
                backgroundColor="white"
                variant="filled"
                placeholder="Say something!"
                _focus={{ outline: "none" }}
              ></Input>
              <InputRightElement h="100%">
                <Button
                  borderRadius="none"
                  borderRightRadius="md"
                  fontFamily={"heading"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,pink.400)",
                    boxShadow: "xl",
                  }}
                  _focus={{ outline: "none" }}
                  type="submit"
                  disabled={isLoading}
                  size="sm"
                  h="100%"
                >
                  {isLoading ? (
                    <SpinnerIcon
                      color="white"
                      className="spinnerIcon"
                      fontSize="1rem"
                    ></SpinnerIcon>
                  ) : (
                    "Post"
                  )}
                </Button>
              </InputRightElement>
            </FormControl>
          </form>
        </Flex>
      ) : (
        <CommentPreview
          post={post}
          hasCommented={hasCommented}
          setHasCommented={setHasCommented}
        />
      )}
    </>
  );
};

export default CommentSection;
