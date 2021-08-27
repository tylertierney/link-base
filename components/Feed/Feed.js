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

const Feed = ({ posts }) => {
  const { user, authReady } = useUser();

  return (
    <Box overflowY="scroll" className="hideScrollbar">
      {!user && (
        <Alert status="warning">
          <AlertIcon />
          Please log in or sign up in order to view your feed.
        </Alert>
      )}
      {user && (
        <VStack spacing="40px">
          {posts &&
            posts.map((post) => {
              return <Post key={post._id} post={post} />;
            })}
        </VStack>
      )}
    </Box>
  );
};

export default Feed;
