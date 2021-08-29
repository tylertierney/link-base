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

const Feed = ({ users, isProfilePage, userdata }) => {
  const { user, authReady } = useUser();

  let postArray;
  if (isProfilePage) {
    postArray = users.map((user) => {
      if (user.id === userdata.id) {
        return user.posts.map((post) => {
          return <Post postedBy={user} key={post._id} post={post} />;
        });
      }
    });
    console.log("isprofile is true");
  } else {
    postArray = users.map((user) => {
      return user.posts.map((post) => {
        return <Post postedBy={user} key={post._id} post={post} />;
      });
    });
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
