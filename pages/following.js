import { useUser } from "../context/authContext";
import Layout from "../components/Layout/Layout";
import { VStack, Heading, Icon, Flex, Text } from "@chakra-ui/react";

import clientPromise from "../utils/mongodb";

import FollowingListItem from "../components/FollowingListItem/FollowingListItem";

import { BsChevronLeft } from "react-icons/bs";

import { FiFrown } from "react-icons/fi";

import router from "next/router";

const Following = ({ users }) => {
  const { user } = useUser();

  const followingArray = users.filter((person) => {
    return user.following.includes(person.id);
  });

  const followingListItems = followingArray.map((person) => {
    return (
      <FollowingListItem
        key={Math.floor(Math.random() * 1000000)}
        person={person}
      />
    );
  });

  return (
    <Layout>
      <VStack
        overflow="scroll"
        className="hideScrollbar"
        p="1rem 0.8rem 2rem 0.8rem"
        minW={["100vw", "500px"]}
      >
        <Flex w="100%" align="center">
          <Flex align="center" onClick={() => router.back()} cursor="pointer">
            <Icon as={BsChevronLeft} color="white" />
            <Text color="white">&nbsp;Back</Text>
          </Flex>
        </Flex>{" "}
        {user.following.length > 0 ? (
          <>
            {" "}
            <Heading
              w="100%"
              textAlign="left"
              fontFamily="Poppins"
              userSelect="none"
              fontSize="1.3rem"
            >
              Following ({followingArray.length})
            </Heading>
            {followingListItems}{" "}
          </>
        ) : (
          <Heading
            userSelect="none"
            w="100%"
            textAlign="center"
            fontSize="1.2rem"
            fontFamily="Poppins"
          >
            You aren&apos;t following anyone
            <br />
            <Icon as={FiFrown} fontSize="2rem" />
          </Heading>
        )}
      </VStack>
    </Layout>
  );
};

export default Following;

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const db = await client.db();

  const users = await db.collection("users").find({}).toArray();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
