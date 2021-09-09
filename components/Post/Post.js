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

import PostMenu from "./PostMenu/PostMenu";

import poststyles from "./poststyles.module.css";

import PostPanel from "../PostPanel/PostPanel";

import { FaRegComments, FaComments } from "react-icons/fa";

import CommentSection from "../CommentSection/CommentSection";

import { AiOutlineUser } from "react-icons/ai";
import { SpinnerIcon } from "@chakra-ui/icons";

const Post = ({ isSponsored, postedBy, post, isPanel }) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);

  const [isLiked, setIsLiked] = useState(false);
  const [hasCommented, setHasCommented] = useState(false);
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

  return (
    <Container
      maxW={["xs", "sm", "md"]}
      backgroundColor="brand.text_light"
      boxShadow="2px 2px 15px 1px rgb(0, 0, 0, 0.2)"
      key={post._id}
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
        <Link href={`/user/${post.userid}`}>
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
            user={user}
            postedBy={postedBy}
            isHidden={isHidden}
            setIsHidden={setIsHidden}
          />
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
              <>
                <Image
                  alt="user uploaded image"
                  width="100%"
                  src={post.photoURL}
                  onClick={() => setPanelIsShowing(true)}
                />
                {isSponsored && (
                  // <Flex justify="flex-end" p="0.1rem 0.4rem">
                  <Button
                    position="absolute"
                    bottom={isPanel ? "90px" : "50px"}
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
                    Buy Now
                  </Button>
                  // </Flex>
                )}
              </>
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
            <Divider p="0.2rem 0" />
            <CommentSection
              isSponsored={isSponsored}
              hasCommented={hasCommented}
              setHasCommented={setHasCommented}
              post={post}
              isPanel={isPanel}
            />
            <PostPanel
              panelIsShowing={panelIsShowing}
              setPanelIsShowing={setPanelIsShowing}
              postedBy={postedBy}
              post={post}
              isSponsored={isSponsored}
            />
          </Flex>
        </>
      )}
    </Container>
  );
};

export default Post;
