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
import Comment from "./Comment";
import { useUser } from "../../context/authContext";

import axios from "axios";

const CommentSection = ({
  isSponsored,
  hasCommented,
  setHasCommented,
  post,
  isPanel,
}) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [commentText, setCommentText] = useState("");

  const handleNewComment = (e) => {
    e.preventDefault();
    axios.post(`/api/${post._id}`, {
      post: post,
      likeOrComment: "comment",
      author_id: post.userid,
      author_prof_pic: user.prof_pic_url,
      author_username: user.username,
      text: commentText,
    });

    setHasCommented(true);
    setCommentText("");
    setIsLoading(false);
  };

  const commentArray = post.comments.map((comment, index) => {
    return (
      <Comment
        key={index}
        author_username={comment.author_username}
        author_prof_pic={comment.author_prof_pic}
        date={comment.date}
        text={comment.text}
      />
    );
  });

  const showFirstComment = () => {
    if (post.comments.length > 0) {
      return (
        <Comment
          author_username={post.comments[0].author_username}
          author_prof_pic={post.comments[0].author_prof_pic}
          date={post.comments[0].date}
          text={post.comments[0].text}
        />
      );
    }
  };

  return (
    <>
      {isPanel ? (
        <Flex
          backgroundColor="white"
          p="0.4rem 0.3rem 0.2rem 0.5rem"
          direction="column"
        >
          {isSponsored === false && (
            <form onSubmit={(e) => handleNewComment(e)}>
              <FormControl>
                <Input
                  type="text"
                  backgroundColor="white"
                  variant="outline"
                  placeholder="Say something!"
                  _focus={{ outline: "none" }}
                  border="1px solid lightgray"
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                ></Input>
                <InputRightElement h="100%">
                  <Button
                    borderRadius="none"
                    borderRightRadius="md"
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
          )}
          <p style={{ minHeight: "20px" }}></p>
          {commentArray}
        </Flex>
      ) : (
        // <CommentPreview
        //   post={post}
        //   hasCommented={hasCommented}
        //   setHasCommented={setHasCommented}
        // />
        showFirstComment()
      )}
    </>
  );
};

export default CommentSection;
