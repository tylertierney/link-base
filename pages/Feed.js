import { useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import { useUser } from "../context/authContext";
import Skeleton from "react-loading-skeleton";

import {
  VStack,
  Container,
  Flex,
  Avatar,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";

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

  return (
    <Layout>
      {!authReady && <p>Loading, one moment....</p>}
      {error && (
        //   <div>{error}</div>
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      )}
      <VStack spacing="40px">
        {posts &&
          posts.map((post) => {
            return (
              <Container
                p="0"
                maxW="400px"
                minW="400px"
                backgroundColor="brand.text_light"
                boxShadow="2px 2px 15px 1px rgb(0, 0, 0, 0.2)"
                key={post.id}
              >
                <Flex justify="flex-start" align="center" p="0.2rem 0.2rem">
                  <Avatar
                    size="xs"
                    name={post.author}
                    src={post.prof_pic}
                  ></Avatar>
                  <Text ml="0.8rem">{post.author}</Text>
                </Flex>
                <Flex>
                  <Text p="0.2rem 0.2rem">{post.content}</Text>
                </Flex>
              </Container>
            );
          })}
      </VStack>
    </Layout>
  );
};

export default Feed;
