import {
  Container,
  Flex,
  Avatar,
  Text,
  Divider,
  Icon,
  Image,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

import { FiThumbsUp } from "react-icons/fi";
import { FaThumbsUp } from "react-icons/fa";
import axios from "axios";

import Link from "next/link";
import { useUser } from "../../context/authContext";
import { convertDate } from "../../helperfunctions";

const Post = ({ postedBy, post }) => {
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    for (const likedby of post.likes) {
      if (likedby === user.id) {
        setIsLiked(true);
      }
    }
  }, []);

  const handleLike = () => {
    let addOrRemove = "add";
    if (isLiked === true) {
      addOrRemove = "remove";
    }

    axios.post(`/api/${post._id}`, {
      post: post,
      currentuser: user.id,
      addOrRemove: addOrRemove,
    });

    setIsLiked(!isLiked);
  };

  return (
    <Container
      maxW={["xs", "sm", "md"]}
      backgroundColor="brand.text_light"
      boxShadow="2px 2px 15px 1px rgb(0, 0, 0, 0.2)"
      key={post._id}
      borderRadius="md"
      color="brand.text_dark"
      fontSize="0.7rem"
      p="0.5rem 0rem"
    >
      <Flex p="0 0.8rem" justify="flex-start" align="center">
        <Link href={`/user/${post.userid}`} passHref>
          <Flex align="center" cursor="pointer">
            <Avatar
              size="sm"
              border="solid lightgray 1px"
              name={post.author}
              src={postedBy.prof_pic_url}
            ></Avatar>
            <Text ml="0.8rem">{post.author}</Text>
          </Flex>
        </Link>
      </Flex>
      <Divider m="0.3rem 0" />
      <Flex direction="column">
        <Text p="0.5rem 0.8rem 0.5rem 0.8rem" userSelect="none">
          {post.text}
          <br />
        </Text>
        {post.photoURL && (
          <Image alt="user uploaded image" width="100%" src={post.photoURL} />
        )}
        <Flex
          justify="space-between"
          align="center"
          color="gray.400"
          m="0.6rem 0 0 0"
          userSelect="none"
          p="0 0.8rem"
        >
          <Flex justify="space-between" align="flex-start">
            <Flex onClick={() => handleLike()}>
              {isLiked ? (
                <Icon
                  as={FaThumbsUp}
                  fontSize="1.1rem"
                  color="blue.600"
                  cursor="pointer"
                />
              ) : (
                <Icon as={FiThumbsUp} fontSize="1.1rem" cursor="pointer" />
              )}
            </Flex>
            <Text p="0 0 0 0.2rem" fontSize="0.8rem">
              {isLiked ? post.likes.length + 1 : post.likes.length}
            </Text>
          </Flex>
          <Text fontSize="0.6rem" as={"p"} textAlign="right">
            {convertDate(post.posted_at)}
          </Text>
        </Flex>
      </Flex>
    </Container>
  );
};

export default Post;
