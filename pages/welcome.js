import Layout from "../components/Layout/Layout";

import { VStack, Alert, AlertIcon, Flex, Text } from "@chakra-ui/react";

import NewPost_GuestUser from "../components/NewPost/NewPost_GuestUser";
import TabMenu from "../components/TabMenu/TabMenu";
import SortMenu from "../components/SortMenu/SortMenu";
import Feed from "../components/Feed/Feed";
import { useUser } from "../context/authContext";

import Navbar from "../components/Navbar/Navbar";

import { useState, useEffect } from "react";

import clientPromise from "../utils/mongodb";
import router from "next/router";

const Welcome = ({ users, guest_pw }) => {
  const [sortingBy, setSortingBy] = useState("popular");
  const [tabSelection, setTabSelection] = useState("Discover");
  const [isLoading, setIsLoading] = useState(false);

  const { user, setUser, login } = useUser();

  useEffect(
    () => {
      console.log("login event should happen here");
      login("Guest@email.com", guest_pw, true);

      // if (user) {
      for (const person of users) {
        if (person.id === "449f7966-9439-4f82-bf31-0abc9637b63b") {
          console.log(person);
          setUser(() => person);
          // localStorage.setItem("user", JSON.stringify(person));
        }
        console.log(user);
      }

      // if (user === null || user === undefined) {
      //   router.push("/");
      // }
      // }

      // return () => login("Guest@email.com", guest_pw, true);
    },
    // [user?.id]
    []
  );

  return (
    <>
      <Navbar
        isGuest={true}
        isLoading={isLoading}
        setIsLoading={setIsLoading}
      />
      <Flex
        direction="column"
        maxW="100vw"
        minH="100vh"
        maxH="100vh"
        p="2rem 0rem 0rem 0rem"
        justifyContent="flex-start"
        alignItems="center"
        backgroundColor="blue.300"
        background="linear-gradient(180deg, rgba(237,69,81,1) 0%, rgba(249,200,206,1) 100%)"
        overflowY="hidden"
        overflow="hidden"
      >
        <VStack
          overflow="scroll"
          className="hideScrollbar"
          p="1rem 0.8rem 2rem 0.8rem"
          minW="330px"
        >
          <Alert
            borderRadius="lg"
            variant="subtle"
            status="info"
            maxW={["330px", "sm", "md"]}
            fontSize="0.65rem"
            p="2.2rem 0.8rem"
            // p="1rem"
            color="black"
            fontWeight="semibold"
          >
            <AlertIcon />
            <Text>
              You are browsing LinkBase in Welcome Mode. As a guest user, you
              are unable to post content, post comments, or follow other users.
            </Text>
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
      </Flex>
    </>
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
