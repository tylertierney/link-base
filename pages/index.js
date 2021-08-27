import Head from "next/head";
import Layout from "../components/Layout/Layout";
import clientPromise from "../utils/mongodb";
import Feed from "../components/Feed/Feed";
import NewPost from "../components/NewPost/NewPost";

import { VStack, Button } from "@chakra-ui/react";
import { useUser } from "../context/authContext";
import Link from "next/link";

const Home = ({ posts }) => {
  const { user, login, logout, signup, error, authReady } = useUser();

  console.log(JSON.stringify(user));

  return (
    <>
      <Head>
        <title>Linkbase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Layout>
          <VStack
            overflowY="scroll"
            minH="200vh"
            className="hideScrollbar"
            p="1rem 0.8rem 2rem 0.8rem"
          >
            {user && <NewPost />}
            <Feed posts={posts} />
          </VStack>
          <Link href="/login">Log In</Link>
          <Link href="/signup">Sign Up</Link>
        </Layout>
      </main>
    </>
  );
};

export default Home;

export async function getStaticProps(context) {
  const client = await clientPromise;

  const db = await client.db();

  const posts = await db.collection("posts").find({}).toArray();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
