import Layout from "../components/Layout/Layout";

import { VStack, Alert, AlertIcon, Flex } from "@chakra-ui/react";

import NewPost_GuestUser from "../components/NewPost/NewPost_GuestUser";
import TabMenu from "../components/TabMenu/TabMenu";
import SortMenu from "../components/SortMenu/SortMenu";
import Feed from "../components/Feed/Feed";
import { useUser } from "../context/authContext";

import { useState, useEffect } from "react";

import clientPromise from "../utils/mongodb";
import { EmailIcon } from "@chakra-ui/icons";

const Welcome = ({ users, guest_pw }) => {
  const [sortingBy, setSortingBy] = useState("popular");
  const [tabSelection, setTabSelection] = useState("Discover");

  const { user, setUser, login } = useUser();

  const guestuser_obj = {
    id: 123456,
    posts: [],
    liked_posts: [],
    prof_pic_url: "",
    cover_pic_url: "",
    followers: [],
    following: [],
    username: "Guest",
    bio: "Excited to try out some of these cool features and connect with my friends!",
  };

  useEffect(async () => {
    // login("Guest@email.com", guest_pw);
    login("Guest@email.com", guest_pw, true);

    if (user) {
      for (const person of users) {
        if (person.id === user.id) {
          await setUser(() => person);
          //   localStorage.setItem("user", JSON.stringify(person));
        }
      }
    }

    // return () => login("Guest@email.com", guest_pw, true);
  }, [user?.id]);

  console.log(user);

  return (
    <Layout>
      <VStack
        overflow="scroll"
        className="hideScrollbar"
        p="1rem 0.8rem 2rem 0.8rem"
        minW="360px"
      >
        <Alert
          borderRadius="lg"
          variant="subtle"
          status="info"
          maxW={["xs", "sm", "md"]}
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
            isGuest={true}
            user={user}
            sortingBy={sortingBy}
            isProfilePage={false}
            users={users}
            isDiscover={false}
          />
        ) : (
          <Feed
            isGuest={true}
            user={user}
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

  const guest_pw = process.env.GUEST_PW;

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
      guest_pw: guest_pw,
    },
  };
}
