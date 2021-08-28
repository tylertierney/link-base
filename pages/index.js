import Head from "next/head";
import Layout from "../components/Layout/Layout";
import clientPromise from "../utils/mongodb";
import Feed from "../components/Feed/Feed";
import NewPost from "../components/NewPost/NewPost";
import { useState, useEffect } from "react";

import { Divider, VStack, Button } from "@chakra-ui/react";
import { useUser } from "../context/authContext";
import Link from "next/link";

const Home = ({ users }) => {
  const { user, setUser, login, logout, signup, error, authReady } = useUser();

  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    users.forEach((person) => {
      if (person.id === user.id) {
        setUser(person);
      }
      console.log(person);
    });
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
                <Divider padding="0.5rem" w="10rem" />
              </>
            )}
            <Feed users={users} />
          </VStack>
        </Layout>
      </main>
    </>
  );
};

export default Home;

export async function getStaticProps(context) {
  const client = await clientPromise;

  const db = await client.db();

  const users = await db.collection("users").find({}).toArray();

  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
