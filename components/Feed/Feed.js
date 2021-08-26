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
} from "@chakra-ui/react";

const Feed = ({ posts }) => {
  const { user, authReady } = useUser();

  return (
    <>
      {!authReady && <p>Loading, one moment....</p>}
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
              return <Post post={post} />;
            })}
        </VStack>
      )}
    </>
  );
};

export default Feed;