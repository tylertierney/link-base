import Layout from "../Layout/Layout";
import { useUser } from "../../context/authContext";
import Post from "../Post/Post";
import { useState } from "react";

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
  Icon,
} from "@chakra-ui/react";

import SponsoredPost from "../SponsoredPost/SponsoredPost";
import { IoMdGlobe } from "react-icons/io";

import { ads } from "../SponsoredPost/SponsoredPost";

const Feed = ({
  users,
  isProfilePage,
  userdata,
  sortingBy,
  isDiscover,
  user,
}) => {
  // const { user } = useUser();

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
      if (user.posts) {
        postArray = user.posts.map((post) => {
          return (
            <Post
              isSponsored={false}
              isPanel={false}
              postedBy={user}
              key={post._id}
              post={post}
            />
          );
        });
        sortPosts(postArray);
      }
    } else {
      postArray = userdata.posts.map((post) => {
        return (
          <Post
            isSponsored={false}
            isPanel={false}
            postedBy={userdata}
            key={post._id}
            post={post}
          />
        );
      });
      sortPosts(postArray);
    }
  } else {
    if (isDiscover === true) {
      users.forEach((person) => {
        person.posts.forEach((post) => {
          postArray.push(
            <Post
              isSponsored={false}
              isPanel={false}
              postedBy={person}
              key={post._id}
              post={post}
            />
          );
        });
      });
    } else {
      users.forEach((person) => {
        if (
          user.following !== undefined &&
          user.following.includes(person.id)
        ) {
          person.posts.forEach((post) => {
            postArray.push(
              <Post
                isSponsored={false}
                isPanel={false}
                postedBy={person}
                key={post._id}
                post={post}
              />
            );
          });
        }
      });
    }
    sortPosts(postArray);
  }

  // This determines whether to display the feed or to display the relevant message if the feed empty
  const determineFeedOrMessage = () => {
    if (postArray.length === 0) {
      return (
        <Heading textAlign="center" fontSize="1.2rem" color="gray.700">
          {isProfilePage ? (
            <Heading textAlign="center" fontSize="1.2rem" color="gray.700">
              This user hasn&apos;t posted anything yet
            </Heading>
          ) : (
            <>
              {" "}
              <br />
              <Heading
                maxW="90vw"
                textAlign="center"
                fontSize="1.2rem"
                color="gray.700"
              >
                Follow some users to populate your feed.
              </Heading>
              <br />
              <Heading
                maxW="90vw"
                textAlign="center"
                fontSize="1.2rem"
                color="gray.700"
              >
                View the Discover <Icon as={IoMdGlobe} /> tab to find users and
                popular content!
              </Heading>
            </>
          )}
        </Heading>
      );
    } else {
      return postArray;
    }
  };

  // This performs ad insertion at a 1/6 rate within the feed;
  // This function runs AFTER all other sorting and data-fetching
  // functions have been completed

  for (let i = 5, j = 0; i < postArray.length; i++) {
    if (i % 6 === 0) {
      postArray.splice(
        i,
        0,
        <SponsoredPost
          key={Math.floor(Math.random() * 1000000)}
          postedBy={ads[j][0]}
          post={ads[j][1]}
        />
      );
      j += 1;
    }
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
          {determineFeedOrMessage()}
        </VStack>
      )}
    </Box>
  );
};

export default Feed;
