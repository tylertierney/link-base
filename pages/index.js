import Head from "next/head";
import Layout from "../components/Layout/Layout";
import clientPromise from "../utils/mongodb";
import Feed from "../components/Feed/Feed";
import NewPost from "../components/NewPost/NewPost";

import { VStack, Button } from "@chakra-ui/react";
import { useUser } from "../context/authContext";
import { signIn, signOut, useSession } from "next-auth/client";

const Home = ({ posts }) => {
  const { user, login, logout, authReady } = useUser();

  const [session, loading] = useSession();

  // the user is stored in session
  const currentuser = session?.user;

  console.log(currentuser);

  return (
    <>
      <Head>
        <title>Linkbase</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Layout>
          {!session && (
            <Button variant="outline" onClick={() => signIn()}>
              log in
            </Button>
          )}
          {session && (
            <>
              <p>signed in as {session.user.name}</p>
              <Button variant="outline" onClick={() => signOut()}>
                log out
              </Button>
            </>
          )}

          <VStack overflowY="scroll" minH="200vh" className="feed">
            {user && <NewPost />}
            <Feed posts={posts} />
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

  const posts = await db.collection("posts").find({}).toArray();

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}
