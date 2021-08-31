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
  Heading,
} from "@chakra-ui/react";

const Feed = ({ users, isProfilePage, userdata, sortingBy }) => {
  const { user, authReady } = useUser();

  const sortPosts = (postArray) => {
    if (postArray === undefined) {
      return;
    }
    if (sortingBy === "popular") {
      postArray.sort((a, b) => {
        return b.props.post.likes.length - a.props.post.likes.length;
      });
    } else {
      postArray.sort((a, b) => {
        return (
          Date.parse(b.props.post.posted_at) -
          Date.parse(a.props.post.posted_at)
        );
      });
    }
  };

  let postArray = [];
  if (isProfilePage) {
    if (user.id === userdata.id) {
      postArray = user.posts.map((post) => {
        return <Post postedBy={user} key={post._id} post={post} />;
      });
      sortPosts(postArray);
    } else {
      postArray = userdata.posts.map((post) => {
        return <Post postedBy={userdata} key={post._id} post={post} />;
      });
      sortPosts(postArray);
    }
  } else {
    users.forEach((user) => {
      user.posts.forEach((post) => {
        postArray.push(<Post postedBy={user} key={post._id} post={post} />);
      });
    });
    sortPosts(postArray);
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
          {postArray.length === 0 ? (
            <Heading textAlign="center" fontSize="1.2rem" color="gray.400">
              This user hasn&apos;t posted anything yet
            </Heading>
          ) : (
            postArray
          )}
        </VStack>
      )}
    </Box>
  );
};

export default Feed;
