import Layout from "../../components/Layout/Layout";
import { useUser } from "../../context/authContext";
import clientPromise from "../../utils/mongodb";
import {
  Image,
  Flex,
  Heading,
  Text,
  VStack,
  Divider,
  Button,
  Icon,
} from "@chakra-ui/react";

import Feed from "../../components/Feed/Feed";
import { useEffect, useState } from "react";

import accountPageStyles from "./accountPage.module.css";

import SortMenu from "../../components/SortMenu/SortMenu";

import { BsPersonPlus, BsFillPersonCheckFill } from "react-icons/bs";

import EditProfile from "../../components/EditProfile/EditProfile";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import axios from "axios";

const AccountPage = ({ userdata, users }) => {
  const [isEditable, setIsEditable] = useState(false);

  const [sortingBy, setSortingBy] = useState("new");

  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    setUser(() => JSON.parse(localStorage.getItem("user")));

    let founduser = JSON.parse(localStorage.getItem("user"));
    axios
      .get(`/api/singleuser/${founduser.id}`)
      .then((response) => {
        console.log(response);
        setUser(response.data.body);
      })
      .catch((err) => console.log(err));

    if (userdata.id === user.id) {
      setIsEditable(true);
    }
    return () => localStorage.setItem("user", JSON.stringify(user));
  }, []);

  const { user, setUser, logout } = useUser();

  let usernameLength = userdata.username.length;
  let usernameSize = "2rem";

  if (usernameLength > 14) {
    usernameSize = "1.8rem";
  }
  if (usernameLength > 16) {
    usernameSize = "1.7rem";
  }
  if (usernameLength > 18) {
    usernameSize = "1.6rem";
  }

  return (
    <Layout>
      <VStack
        backgroundColor="brand.text_light"
        minH="100vh"
        w="100%"
        overflowY="scroll"
        overflowX="hidden"
        maxW="100vw"
        className="hideScrollbar"
      >
        <Flex
          direction="column"
          position="relative"
          mb="75px"
          className={accountPageStyles.header}
        >
          <Image
            alt="Cover Photo"
            maxH="300px"
            minH="300px"
            minW="600px"
            align="center"
            // fallbackSrc="https://via.placeholder.com/600x300?text=_"
            fallbackSrc="https://images.unsplash.com/photo-1510472306330-201b18c210fc?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
            src={userdata.cover_pic_url}
            className={accountPageStyles.coverPhoto}
            borderRadius="lg"
            boxShadow="0px 5px 20px 1px rgb(0, 0, 0, 0.5)"
          ></Image>
          <Image
            alt="Profile Picture"
            // fallbackSrc="https://via.placeholder.com/300x300"
            fallbackSrc="https://images.unsplash.com/photo-1553356084-58ef4a67b2a7?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=334&q=80"
            boxSize="150px"
            fit="cover"
            borderRadius="full"
            src={userdata.prof_pic_url}
            position="absolute"
            bottom="0"
            left="50%"
            transform="translate(-50%, 50%)"
            border="2px solid lightgray"
            boxShadow="0px 0px 10px 2px rgb(0, 0, 0, 0.7)"
          ></Image>
          {/* <EditProfile isEditable={isEditable} /> */}
        </Flex>
        <Flex
          position="relative"
          direction="row"
          justify="center"
          align="center"
          className={accountPageStyles.headerAndFollowBtn}
        >
          <Text
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
            userSelect="none"
            textAlign="center"
            fontSize={usernameSize}
          >
            {userdata.username}
          </Text>
          {isEditable ? (
            <EditProfile isEditable={isEditable} />
          ) : (
            <Button
              position="absolute"
              fontSize="0.8rem"
              size="sm"
              colorScheme="blue"
              className={accountPageStyles.followButton}
            >
              Follow&nbsp;
              <Icon as={BsPersonPlus} />
            </Button>
          )}
        </Flex>
        <Tabs colorScheme="red" isFitted>
          <TabList>
            <Tab
              color="gray.400"
              _focus={{ outline: "none", boxShadow: "none" }}
              _active={{ background: "transparent" }}
            >
              Posts
            </Tab>
            <Tab
              color="gray.400"
              _focus={{ outline: "none", boxShadow: "none" }}
              _active={{ background: "transparent" }}
            >
              About
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <VStack
                overflowY="scroll"
                minH="200vh"
                className="hideScrollbar"
                p="0.5rem 0.8rem 2rem 0.8rem"
                position="relative"
              >
                <Flex
                  position="relative"
                  pb="0.5rem"
                  m="0 2rem 0 2rem"
                  alignSelf="flex-end"
                >
                  <SortMenu
                    textcolor="dark"
                    sortingBy={sortingBy}
                    setSortingBy={setSortingBy}
                  />
                </Flex>
                <Feed
                  sortingBy={sortingBy}
                  userdata={userdata}
                  isProfilePage={true}
                  users={users}
                />
              </VStack>
            </TabPanel>
            <TabPanel>
              <VStack
                overflowY="scroll"
                minH="200vh"
                className={`${accountPageStyles.tabs} hideScrollbar`}
                p="0.5rem 0.8rem 2rem 0.8rem"
                position="relative"
              >
                <Flex
                  position="relative"
                  direction="column"
                  pb="0.5rem"
                  m="0 2rem 0 2rem"
                  w="100%"
                >
                  <Heading fontSize="1.2rem" color="gray.600" mb="10px">
                    Bio
                  </Heading>
                  <Text fontSize="0.9rem" color="gray.600">
                    {userdata.bio}
                  </Text>
                </Flex>
              </VStack>
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Divider />

        {/* <VStack
          overflowY="scroll"
          minH="200vh"
          className="hideScrollbar"
          p="0.5rem 0.8rem 2rem 0.8rem"
          position="relative"
        >
          <Flex
            position="relative"
            pb="0.5rem"
            m="0 2rem 0 2rem"
            alignSelf="flex-end"
          >
            <SortMenu
              textcolor="dark"
              sortingBy={sortingBy}
              setSortingBy={setSortingBy}
            />
          </Flex>
          <Feed
            sortingBy={sortingBy}
            userdata={userdata}
            isProfilePage={true}
            users={users}
          />
        </VStack> */}
      </VStack>
    </Layout>
  );
};

export default AccountPage;

export async function getServerSideProps(context) {
  const client = await clientPromise;

  const db = await client.db();

  const userdata = await db
    .collection("users")
    .find({ id: context.params.userid })
    .toArray();

  const users = await db.collection("users").find({}).toArray();

  return {
    props: {
      userdata: JSON.parse(JSON.stringify(userdata[0])),
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
