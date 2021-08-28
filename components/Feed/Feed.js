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

const Feed = ({ users }) => {
  const { user, authReady } = useUser();

  return (
    <Box className="hideScrollbar">
      {!user && (
        <Alert status="warning">
          <AlertIcon />
          Please log in or sign up in order to view your feed.
        </Alert>
      )}
      {user && (
        <VStack spacing={3} mt={6}>
          {users &&
            users.map((user) => {
              return user.posts.map((post) => {
                return <Post key={post._id} post={post} />;
              });
            })}
        </VStack>
      )}
    </Box>
  );
};

export default Feed;
