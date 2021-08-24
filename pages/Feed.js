import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useUser } from "../context/authContext";
import { VStack, Container, Flex, Avatar, Text } from "@chakra-ui/react";

const Feed = () => {
  const { user, authReady } = useUser();
  const [posts, setPosts] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (authReady) {
      fetch(
        "/.netlify/functions/posts",
        user && {
          headers: {
            Authorization: `Bearer ${user.token.access_token}`,
          },
        }
      )
        .then((res) => {
          if (!res.ok) {
            throw Error("You must be logged in to view this content.");
          }
          return res.json();
        })
        .then((data) => {
          setPosts(data);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
          setPosts(null);
        });
    }
  }, [user, authReady]);

  const postsArray = posts.map((post) => {
    return (
      <Container p="0" border="1px solid blue" maxW="400px" minW="400px">
        <Flex
          justify="flex-start"
          align="center"
          p="0.2rem 0.2rem"
          border="solid green 1px"
        >
          <Avatar size="xs" name={post.author} src={post.prof_pic}></Avatar>
          <Text ml="0.8rem">{post.author}</Text>
        </Flex>
        <Flex>
          <Text>{post.content}</Text>
        </Flex>
        <img></img>
      </Container>
    );
  });

  return (
    <Layout>
      <VStack spacing="40px">{postsArray}</VStack>
    </Layout>
  );
};

export default Feed;
