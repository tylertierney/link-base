import Layout from "../Layout/Layout";
import { useUser } from "../../context/authContext";
import Post from "../Post/Post";

import {
  VStack,
  Container,
  Flex,
  Avatar,
  Text,
  Alert,
  AlertIcon,
  Box,
} from "@chakra-ui/react";

const Feed = ({ users, isProfilePage, userdata, sortingBy }) => {
  const { user, authReady } = useUser();

  console.log(sortingBy);

  const sortPosts = (postArray) => {
    if (sortingBy === "popular") {
      postArray.sort((a, b) => {
        return b.props.post.likes.length - a.props.post.likes.length;
      });
    } else {
      postArray.sort((a, b) => {
        console.log(a.props.post.posted_at);
        return (
          Date.parse(b.props.post.posted_at) -
          Date.parse(a.props.post.posted_at)
        );
      });
    }
  };

  let postArray;
  if (isProfilePage) {
    postArray = users.map((user) => {
      if (user.id === userdata.id) {
        return user.posts.map((post) => {
          return <Post postedBy={user} key={post._id} post={post} />;
        });
      }
    });
    console.log(postArray[1]);
    sortPosts(postArray[1]);
  } else {
    postArray = users.map((user) => {
      return user.posts.map((post) => {
        return <Post postedBy={user} key={post._id} post={post} />;
      });
    });
    sortPosts(postArray[1]);
  }

  return (
    <Box className="hideScrollbar" p="0 0 10rem 0">
      {!user && (
        <Alert status="warning">
          <AlertIcon />
          Please log in or sign up in order to view your feed.
        </Alert>
      )}
      {user && (
        <VStack spacing={3} mt={1} w={["sm", "md", "lg"]}>
          {postArray}
        </VStack>
      )}
    </Box>
  );
};

export default Feed;
