import { useUser } from "../context/authContext";
import Layout from "../components/Layout/Layout";
import { VStack, Heading, Icon, Flex, Text } from "@chakra-ui/react";

import clientPromise from "../utils/mongodb";

import FollowerListItem from "../components/FollowerListItem/FollowerListItem";

import { FiFrown } from "react-icons/fi";

import { BsChevronLeft } from "react-icons/bs";

import router from "next/router";

const Followers = ({ users }) => {
  const { user } = useUser();

  const followersArray = users.filter((person) => {
    return user.followers.includes(person.id);
  });

  const followerListItems = followersArray.map((person) => {
    return (
      <FollowerListItem
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
        {user.followers.length > 0 ? (
          <>
            {" "}
            <Heading
              userSelect="none"
              w="100%"
              textAlign="left"
              fontFamily="Poppins"
              fontSize="1.3rem"
            >
              Followers ({followersArray.length})
            </Heading>
            {followerListItems}{" "}
          </>
        ) : (
          <Heading
            fontFamily="Poppins"
            userSelect="none"
            w="100%"
            textAlign="center"
            fontSize="1.2rem"
          >
            You don&apos;t have any followers
            <br />
            <Icon as={FiFrown} fontSize="2rem" />
          </Heading>
        )}
      </VStack>
    </Layout>
  );
};

export default Followers;

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
