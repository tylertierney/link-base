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
import router from "next/router";

const Home = ({ users }) => {
  const { user, setUser, login, logout, signup, error, authReady } = useUser();

  const [sortingBy, setSortingBy] = useState("popular");

  useEffect(() => {
    const getUserFromLocalStorage = async () => {
      if (localStorage.getItem("user")) {
        console.log("local storage grabbed something");

        let founduser = localStorage.getItem("user");
        let convertedfounduser = JSON.parse(founduser);
        await setUser(() => convertedfounduser);

        console.log(convertedfounduser);
        return;
      }

      if (user) {
        for (const person of users) {
          if (person.id === user.id) {
            console.log("searching database for person");
            setUser(person);
            localStorage.setItem("user", JSON.stringify(person));
          }
        }
      }
    };
    getUserFromLocalStorage();

    // if (user) {
    //   for (const person of users) {
    //     if (person.id === user.id) {
    //       console.log("searching database for person");
    //       setUser(person);
    //       localStorage.setItem("user", JSON.stringify(person));
    //     }
    //   }
    // }
  }, [user?.confirmed_at]);

  // const getUserFromLocalStorage = async () => {
  //   if (localStorage.getItem("user")) {
  //     console.log("local storage grabbed something");

  //     let founduser = localStorage.getItem("user");
  //     let convertedfounduser = JSON.parse(founduser);
  //     await setUser((oldstate) => convertedfounduser);

  //     console.log(convertedfounduser);

  //     // setUser(JSON.parse(localStorage.getItem("user")));
  //     return;
  //   }
  // };
  console.log(user);

  return (
    <>
      <Head>
        <title>Linkbase</title>
        <link rel="icon" href="/linkbase_logo_ico.ico" />

        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width, maximum-scale=1, user-scalable=0"
        />
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
                  <Divider padding="0.2rem" w="10rem"></Divider>
                  <SortMenu sortingBy={sortingBy} setSortingBy={setSortingBy} />
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
