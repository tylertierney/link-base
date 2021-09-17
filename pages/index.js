import Head from "next/head";
import Layout from "../components/Layout/Layout";
import clientPromise from "../utils/mongodb";
import Feed from "../components/Feed/Feed";
import NewPost from "../components/NewPost/NewPost";
import { useState, useEffect } from "react";

import { Divider, VStack, Flex } from "@chakra-ui/react";
import { useUser } from "../context/authContext";
import Link from "next/link";

import SortMenu from "../components/SortMenu/SortMenu";
import TabMenu from "../components/TabMenu/TabMenu";
import router from "next/router";
import WelcomeMessage from "../components/WelcomeMessage/WelcomeMessage";
import HintMessage from "../components/HintMessage/HintMessage";

const Home = ({ users }) => {
  const { user, setUser, login, logout, signup, error, authReady } = useUser();

  const [sortingBy, setSortingBy] = useState("new");
  const [tabSelection, setTabSelection] = useState("Discover");
  const [showHint, setShowHint] = useState(true);

  useEffect(() => {
    const getUserFromLocalStorage = () => {
      if (localStorage.getItem("user")) {
        let founduser = localStorage.getItem("user");

        let convertedfounduser;
        if (founduser) {
          convertedfounduser = JSON.parse(founduser);

          setUser(() => convertedfounduser);
        } else {
          router.push("/welcome");
        }

        return convertedfounduser;
      }
    };

    console.log(getUserFromLocalStorage());

    setUser(() => getUserFromLocalStorage());

    if (user) {
      for (const person of users) {
        if (person.id === user.id) {
          setUser(person);
          localStorage.setItem("user", JSON.stringify(person));
        }
      }
    }

    console.log(user);

    if (user?.username.includes("Guest123")) {
      logout();
    }
  }, [user?.id]);

  console.log(user);

  return (
    <>
      <Head>
        <title>Linkbase</title>
        <link rel="icon" href="/linkbase_logo_ico.ico" />
        <link rel="shortcut icon" href="/linkbase_logo_ico.ico" />

        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=1"
        />
      </Head>

      <main>
        <Layout>
          <VStack
            overflow="scroll"
            className="hideScrollbar"
            p="1rem 0.8rem 2rem 0.8rem"
            minW="360px"
          >
            {user ? (
              <>
                <HintMessage showHint={showHint} setShowHint={setShowHint} />
                <NewPost />
                <Flex align="center" w="85%" justify="space-between">
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
                    <SortMenu
                      sortingBy={sortingBy}
                      setSortingBy={setSortingBy}
                    />
                  </Flex>
                </Flex>
                {tabSelection === "Your Feed" ? (
                  <Feed
                    isGuest={false}
                    user={user}
                    sortingBy={sortingBy}
                    isProfilePage={false}
                    users={users}
                    isDiscover={false}
                  />
                ) : (
                  <Feed
                    user={user}
                    sortingBy={sortingBy}
                    isProfilePage={false}
                    users={users}
                    isDiscover={true}
                  />
                )}
              </>
            ) : (
              <WelcomeMessage />
            )}
          </VStack>
        </Layout>
      </main>
    </>
  );
};

export default Home;

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
