import {
  Container,
  Flex,
  Avatar,
  Text,
  Divider,
  Icon,
  Image,
  Button,
  Box,
} from "@chakra-ui/react";

import { useState, useEffect } from "react";

import { FiThumbsUp } from "react-icons/fi";
import { FaThumbsUp } from "react-icons/fa";
import axios from "axios";

import Link from "next/link";
import { useUser } from "../../context/authContext";
import { convertDate } from "../../helperfunctions";

import { GoLocation } from "react-icons/go";

import PostMenu from "./PostMenu/PostMenu";

import poststyles from "./poststyles.module.css";

import PostPanel from "../PostPanel/PostPanel";

import { FaRegComments, FaComments } from "react-icons/fa";

import CommentSection from "../CommentSection/CommentSection";

import { AiOutlineUser } from "react-icons/ai";
import { SpinnerIcon } from "@chakra-ui/icons";

import { TiArrowLeftOutline } from "react-icons/ti";

const Post = ({
  isSponsored,
  postedBy,
  post,
  isPanel,
  user,
  isGuest,
  isOwnPost,
}) => {
  console.log(isOwnPost);

  // const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);
  const [seeingMore, setSeeingMore] = useState(false);
  const [needsTruncation, setNeedsTruncation] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [panelIsShowing, setPanelIsShowing] = useState(false);

  const [boxIsMoving, setBoxIsMoving] = useState(false);
  const [modalYValue, setModalYValue] = useState(0);

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
    // If a user is a guest, do not execute the post request
    if (isGuest) {
      setIsLiked(!isLiked);
      return;
    }

    let addOrRemove = "add";
    if (isLiked === true) {
      addOrRemove = "remove";
    }

    axios.post(`/api/${post._id}`, {
      post: post,
      currentuser: user.id,
      addOrRemove: addOrRemove,
      likeOrComment: "like",
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

  let numberOfComments = post.comments.length;
  if (hasCommented) {
    numberOfComments = post.comments.length + 1;
  } else {
    if (post.comments.length === 0) {
      numberOfComments = "";
    } else {
      numberOfComments = post.comments.length;
    }
  }

  // const handleCommentIconClick = (e) => {
  //   console.log("clicked");
  //   console.log(panelIsShowing);
  //   if (panelIsShowing===true) {
  //     return;
  //   } else {
  //     setPanelIsShowing(true);
  //   }
  // };

  const hidePostOnScroll = (e) => {
    console.log(e.currentTarget);
    if (e.currentTarget.scrollLeft > 260) {
      setIsHidden(true);
    }
  };

  return (
    <Container
      maxW={["330px", "sm", "md"]}
      backgroundColor="brand.text_light"
      boxShadow="2px 2px 15px 1px rgb(0, 0, 0, 0.2)"
      key={post._id}
      borderRadius={isPanel ? "none" : "lg"}
      color="brand.text_dark"
      fontSize="0.7rem"
      p="0.5rem 0rem"
    >
      <Flex
        p="0 0.8rem 0.3rem 0.8"
        m="0rem 0.3rem 0rem 0.3rem"
        justify="space-between"
        align="center"
      >
        <Link href={`/user/${post.userid}`} passHref>
          <Flex
            align="center"
            cursor="pointer"
            onClick={() => setIsLoading(true)}
          >
            <Avatar
              size="sm"
              outline="none"
              icon={<AiOutlineUser />}
              src={postedBy.prof_pic_url}
              boxShadow="0px 0px 14px 0px rgb(0, 0, 0, 0.1)"
              fontSize="1.3rem"
            ></Avatar>
            <Text ml="0.8rem" mr="0.8rem">
              {post.author}
            </Text>
            {isLoading ? (
              <SpinnerIcon
                color="gray.400"
                className="spinnerIcon"
                fontSize="1rem"
              ></SpinnerIcon>
            ) : (
              <></>
            )}
          </Flex>
        </Link>
        <Flex>
          {isSponsored && (
            <Flex
              fontSize="0.65rem"
              justify="center"
              align="center"
              color="gray.500"
            >
              <Text fontStyle="italic" p="0 0.2rem 0 0">
                sponsored
              </Text>
            </Flex>
          )}
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
          <PostMenu
            isGuest={isGuest}
            user={user}
            postedBy={postedBy}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
          />
        </Flex>
      </Flex>

      {!isHidden && (
        <>
          {/* {post.text && 
          <Divider p="0.2rem 0" opacity="1" />
          } */}
          <Divider p="0.2rem 0" opacity="1" />
          <Flex
            direction="column"
            position="relative"
            background="linear-gradient(90deg, rgba(69,233,237,1) 0%, rgba(102,127,255,1) 100%)"
          >
            <Flex
              position="absolute"
              top="14px"
              right="10px"
              align="center"
              direction="column"
            >
              <Icon as={TiArrowLeftOutline} fontSize="1.7rem" color="white" />
              <Text color="white" fontSize="1rem">
                Hide
              </Text>
            </Flex>
            <Box
              overflowX="scroll"
              position="relative"
              w="100%"
              h="auto"
              maxW="100%"
              display="flex"
              className="hideScrollbar"
              style={{
                scrollSnapType: "x mandatory",
              }}
              onScroll={(e) => hidePostOnScroll(e)}
              // visibility="hidden"
            >
              <Box w="100%" flexShrink="0" style={{ scrollSnapAlign: "start" }}>
                {post.text && (
                  <>
                    <Text
                      className={`${poststyles.postText} ${
                        seeingMore ? poststyles.noclamp : poststyles.clamp
                      }`}
                      pl="0.6rem"
                      pr="0.6rem"
                      pb="0.3rem"
                      pt="0.3rem"
                      maxW="100%"
                      userSelect="none"
                      onClick={() => setPanelIsShowing(true)}
                      textAlign="left"
                      backgroundColor="brand.text_light"
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
                        backgroundColor="brand.text_light"
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
                  <>
                    <Image
                      alt="user uploaded image"
                      maxW="100%"
                      width="100%"
                      h="auto"
                      src={post.photoURL}
                      onClick={() => setPanelIsShowing(true)}
                    />
                    {isSponsored && (
                      <Button
                        position="absolute"
                        bottom="0.7rem"
                        right="10px"
                        p="0 0.6rem"
                        backgroundColor="blackAlpha.500"
                        color="white"
                        _focus={{ backgroundColor: "transparent" }}
                        _active={{ backgroundColor: "transparent" }}
                        _hover={{ backgroundColor: "inherit" }}
                        fontSize="0.7rem"
                        size="sm"
                        variant="outline"
                      >
                        {/* Buy Now */}
                        {post.cta}
                      </Button>
                    )}
                  </>
                )}
              </Box>
              <Box
                flexShrink="0"
                h="auto"
                w="100%"
                visibility="hidden"
                style={{ scrollSnapAlign: "start" }}
              >
                <Flex h="100%" w="100%">
                  <Text fontSize="1.3rem">Swipe to hide post</Text>
                </Flex>
              </Box>
            </Box>
            <Flex
              justify="space-between"
              align="center"
              color="gray.400"
              userSelect="none"
              p="0.6rem 0.8rem 0 0.8rem"
              backgroundColor="brand.text_light"
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

                <Text p="0 0 0 0.2rem" fontSize="0.8rem" mr="0.5rem">
                  {numberOfLikes.toLocaleString("en-us")}
                </Text>
                <Flex>
                  {hasCommented ? (
                    <Icon
                      color="blue.600"
                      as={FaComments}
                      fontSize="1.1rem"
                      cursor="pointer"
                    />
                  ) : (
                    <Icon
                      as={FaRegComments}
                      fontSize="1.1rem"
                      color="gray.400"
                      cursor="pointer"
                    />
                  )}
                </Flex>
                <Text p="0 0 0 0.2rem" fontSize="0.8rem" mr="0.5rem">
                  {numberOfComments}
                </Text>
              </Flex>
              <Text fontSize="0.6rem" as={"p"} textAlign="right">
                {convertDate(post.posted_at)}
              </Text>
            </Flex>
            <Divider
              p="0.2rem 0"
              opacity="1"
              backgroundColor="brand.text_light"
            />
            <CommentSection
              isGuest={isGuest}
              isSponsored={isSponsored}
              hasCommented={hasCommented}
              setHasCommented={setHasCommented}
              post={post}
              isPanel={isPanel}
            />
            <PostPanel
              isGuest={isGuest}
              panelIsShowing={panelIsShowing}
              setPanelIsShowing={setPanelIsShowing}
              postedBy={postedBy}
              post={post}
              isSponsored={isSponsored}
              user={user}
            />
          </Flex>
        </>
      )}
    </Container>
  );
};

export default Post;
