import Layout from "../components/Layout/Layout";

import { VStack, Alert, AlertIcon, Flex } from "@chakra-ui/react";

import NewPost_GuestUser from "../components/NewPost/NewPost_GuestUser";
import TabMenu from "../components/TabMenu/TabMenu";
import SortMenu from "../components/SortMenu/SortMenu";
import Feed from "../components/Feed/Feed";

import { useState } from "react";

import clientPromise from "../utils/mongodb";

const Welcome = ({ users }) => {
  const [sortingBy, setSortingBy] = useState("popular");
  const [tabSelection, setTabSelection] = useState("Discover");

  const guestuser_obj = {
    id: 123456,
    posts: [],
    liked_posts: [],
    prof_pic_url: "",
    cover_pic_url: "",
    followers: [],
    following: [],
  };

  return (
    <Layout>
      <VStack
        overflow="scroll"
        className="hideScrollbar"
        p="1rem 0.8rem 2rem 0.8rem"
        minW="360px"
      >
        <Alert
          variant="subtle"
          status="info"
          maxW={["80", "76%"]}
          fontSize="0.7rem"
          p="2rem 0.8rem"
        >
          <AlertIcon />
          You are browsing LinkBase in Welcome Mode. As a guest user, you are
          unable to post content,
        </Alert>
        <NewPost_GuestUser />
        <Flex align="center" w="80%" justify="space-between">
          <Flex align="center" justify="center" w={["24%", "20%"]}>
            <TabMenu
              tabSelection={tabSelection}
              setTabSelection={setTabSelection}
            />
          </Flex>
          <Flex w={["52%", "60%"]} align="center" justify="center">
            <Flex
              w="96%"
              h="4px"
              borderRadius="lg"
              backgroundColor="whiteAlpha.800"
            ></Flex>
          </Flex>
          <Flex align="center" justify="center" w={["24%", "20%"]}>
            <SortMenu sortingBy={sortingBy} setSortingBy={setSortingBy} />
          </Flex>
        </Flex>
        {tabSelection === "Your Feed" ? (
          <Feed
            user={guestuser_obj}
            sortingBy={sortingBy}
            isProfilePage={false}
            users={users}
            isDiscover={false}
          />
        ) : (
          <Feed
            user={guestuser_obj}
            sortingBy={sortingBy}
            isProfilePage={false}
            users={users}
            isDiscover={true}
          />
        )}
      </VStack>
    </Layout>
  );
};

export default Welcome;

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
