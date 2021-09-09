import { useUser } from "../context/authContext";
import Layout from "../components/Layout/Layout";
import { VStack, Heading, Icon } from "@chakra-ui/react";

import clientPromise from "../utils/mongodb";

import FollowerListItem from "../components/FollowerListItem/FollowerListItem";

import { FiFrown } from "react-icons/fi";

const followers = ({ users }) => {
  const { user } = useUser();

  const followersArray = users.filter((person) => {
    return user.followers.includes(person.id);
  });

  const followerListItems = followersArray.map((person) => {
    return <FollowerListItem person={person} />;
  });

  return (
    <Layout>
      <VStack
        overflow="scroll"
        className="hideScrollbar"
        p="1rem 0.8rem 2rem 0.8rem"
      >
        {" "}
        {user.followers.length > 0 ? (
          <>
            {" "}
            <Heading w="100%" textAlign="left">
              Followers
            </Heading>
            {followerListItems}{" "}
          </>
        ) : (
          <Heading w="100%" textAlign="center" fontSize="1.1rem">
            You don't have any followers
            <br />
            <Icon as={FiFrown} fontSize="inherit" />
          </Heading>
        )}
      </VStack>
    </Layout>
  );
};

export default followers;

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
