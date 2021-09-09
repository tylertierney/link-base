import { useUser } from "../context/authContext";
import Layout from "../components/Layout/Layout";
import { VStack, Heading, Icon } from "@chakra-ui/react";

import clientPromise from "../utils/mongodb";

import FollowingListItem from "../components/FollowingListItem/FollowingListItem";

import { FiFrown } from "react-icons/fi";

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
      >
        {" "}
        {user.following.length > 0 ? (
          <>
            {" "}
            <Heading w="100%" textAlign="left">
              Following
            </Heading>
            {followingListItems}{" "}
          </>
        ) : (
          <Heading w="100%" textAlign="center" fontSize="1.1rem">
            You aren&apos;t following anyone
            <br />
            <Icon as={FiFrown} fontSize="inherit" />
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
