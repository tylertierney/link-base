import {
  Container,
  Flex,
  Avatar,
  Text,
  Divider,
  Icon,
  Image,
  Button,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

import { FiThumbsUp } from "react-icons/fi";
import { FaThumbsUp } from "react-icons/fa";
import axios from "axios";

import Link from "next/link";
import { useUser } from "../../context/authContext";
import { convertDate } from "../../helperfunctions";

import { GoLocation } from "react-icons/go";

import { BsThreeDots } from "react-icons/bs";

import PostMenu from "./PostMenu/PostMenu";

import poststyles from "./poststyles.module.css";

import PostPanel from "../PostPanel/PostPanel";

const Post = ({ postedBy, post, isPanel }) => {
  const { user } = useUser();

  const [isLiked, setIsLiked] = useState(false);
  const [seeingMore, setSeeingMore] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [panelIsShowing, setPanelIsShowing] = useState(false);

  useEffect(() => {
    for (const likedby of post.likes) {
      if (likedby === user.id) {
        setIsLiked(true);
      }
    }

    if (post.text.length > 196) {
      setNeedsTruncation(true);
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

  let numberOfLikes = post.likes.length;

  if (isLiked) {
    numberOfLikes = post.likes.length + 1;
  } else {
    if (post.likes.length === 0) {
      numberOfLikes = "";
    } else {
      numberOfLikes = post.likes.length;
    }
  }

  return (
    <Container
      maxW={["xs", "sm", "md"]}
      backgroundColor="brand.text_light"
      boxShadow="2px 2px 15px 1px rgb(0, 0, 0, 0.2)"
      key={post._id}
      // borderRadius="md"
      borderRadius={isPanel ? "none" : "lg"}
      color="brand.text_dark"
      fontSize="0.7rem"
      p="0.5rem 0rem"
    >
      <Flex
        p="0 0.8rem 0rem 0.8"
        m="0rem 0.3rem 0.3rem 0.3rem"
        justify="space-between"
        align="center"
      >
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
        <Flex>
          {post.location ? (
            <Flex
              fontSize="0.65rem"
              justify="center"
              align="center"
              color="gray.500"
            >
              <Text fontStyle="italic" p="0 0.2rem 0 0">
                {post.location}
              </Text>
              <Icon as={GoLocation} />
            </Flex>
          ) : (
            <></>
          )}
          <PostMenu isHidden={isHidden} setIsHidden={setIsHidden} />
        </Flex>
      </Flex>

      {!isHidden && (
        <>
          {post.text && <Divider m="0.3rem 0" />}
          <Flex direction="column" position="relative">
            {post.text && (
              <>
                <Text
                  className={`${poststyles.postText} ${
                    seeingMore ? poststyles.noclamp : poststyles.clamp
                  }`}
                  pl="0.8rem"
                  pr="0.6rem"
                  pb="0rem"
                  mb="0.3rem"
                  maxW="100%"
                  userSelect="none"
                  onClick={() => setPanelIsShowing(true)}
                >
                  {post.text}
                </Text>
                {needsTruncation && (
                  <Text
                    p="0 0.8rem 0 0.8rem"
                    textAlign="right"
                    decoration="underline"
                    color="gray.500"
                    userSelect="none"
                  >
                    <Text
                      as="span"
                      cursor="pointer"
                      onClick={() => setSeeingMore(!seeingMore)}
                      fontSize="0.6rem"
                    >
                      See {seeingMore ? "less" : "more"}
                    </Text>
                  </Text>
                )}
              </>
            )}
            {post.photoURL && (
              <Image
                alt="user uploaded image"
                width="100%"
                src={post.photoURL}
                onClick={() => setPanelIsShowing(true)}
              />
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
                  {numberOfLikes}
                </Text>
              </Flex>
              <Text fontSize="0.6rem" as={"p"} textAlign="right">
                {convertDate(post.posted_at)}
              </Text>
            </Flex>
            <PostPanel
              panelIsShowing={panelIsShowing}
              setPanelIsShowing={setPanelIsShowing}
              postedBy={postedBy}
              post={post}
            />
          </Flex>
        </>
      )}
    </Container>
  );
};

export default Post;
