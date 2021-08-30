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

const Home = ({ users }) => {
  const { user, setUser, login, logout, signup, error, authReady } = useUser();

  const [sortingBy, setSortingBy] = useState("popular");

  useEffect(() => {
    if (user) {
      console.log(user);

      for (const person of users) {
        if (person.id === user.id) {
          setUser(person);
          break;
        }
      }
    }
  }, []);

  return (
    <>
      <Head>
        <title>Linkbase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Layout>
          <VStack
            overflow="scroll"
            className="hideScrollbar"
            p="1rem 0.8rem 2rem 0.8rem"
          >
            {user && (
              <>
                <NewPost />
                <Flex align="center" position="relative">
                  <Divider padding="0.2rem" w="10rem">
                    <SortMenu
                      sortingBy={sortingBy}
                      setSortingBy={setSortingBy}
                    />
                  </Divider>
                </Flex>
              </>
            )}
            <Feed sortingBy={sortingBy} isProfilePage={false} users={users} />
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
