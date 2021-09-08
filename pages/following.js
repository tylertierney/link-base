import { useUser } from "../context/authContext";
import Layout from "../components/Layout/Layout";
import { Divider, VStack, Flex, Avatar, Text } from "@chakra-ui/react";

import Link from "next/link";

import clientPromise from "../utils/mongodb";

import followingstyles from "./following.module.css";

const following = ({ users }) => {
  const { user } = useUser();

  const followingArray = users.filter((person) => {
    user.following.includes(person.id);
  });

  const followerListItems = followingArray.map((person) => {
    return (
      <Link href="/" passHref>
        <Flex
          align="center"
          borderTop="1px solid gray.400"
          borderBottom="1px solid gray.400"
          backgroundColor="white"
          w="96vw"
          p="0.6rem 0.8rem"
          maxW="600px"
          borderRadius="lg"
        >
          <Avatar size="xs" mr="1rem" src={person.prof_pic_url} />
          <Text>{person.username}</Text>
        </Flex>
      </Link>
    );
  });

  return (
    <Layout>
      <VStack
        overflow="scroll"
        className="hideScrollbar"
        p="1rem 0.8rem 2rem 0.8rem"
      >
        {/* <Link href="/" passHref>
          <Flex
            align="center"
            borderTop="1px solid gray.400"
            borderBottom="1px solid gray.400"
            backgroundColor="white"
            w="96vw"
            p="0.6rem 0.8rem"
            maxW="600px"
            borderRadius="lg"
          >
            <Avatar size="xs" mr="1rem" />
            <Text>username</Text>
          </Flex>
        </Link> */}
        {followerListItems}
      </VStack>
    </Layout>
  );
};

export default following;

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
