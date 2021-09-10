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
  Box,
  Avatar,
} from "@chakra-ui/react";

import { AiOutlineUser } from "react-icons/ai";

import Feed from "../../components/Feed/Feed";
import { useEffect, useState } from "react";

import accountPageStyles from "./accountPage.module.css";

import SortMenu from "../../components/SortMenu/SortMenu";

import { BsPersonPlus, BsPersonCheckFill, BsChevronLeft } from "react-icons/bs";

import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import axios from "axios";

import { CheckCircleIcon } from "@chakra-ui/icons";

import router from "next/router";

import EditProfile_Guest from "../../components/EditProfile/EditProfile_Guest";

import Navbar from "../../components/Navbar/Navbar";

const GuestAccount = ({ users }) => {
  const [isEditable, setIsEditable] = useState(false);

  const [sortingBy, setSortingBy] = useState("new");

  const [isFollowing, setIsFollowing] = useState(true);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const [guest_prof_pic, setGuest_prof_pic] = useState("");
  const [guest_cover_pic, setGuest_cover_pic] = useState("");

  const { user, setUser, logout } = useUser();

  const userdata = user;

  useEffect(() => {
    // setUser(() => JSON.parse(localStorage.getItem("user")));

    setIsEditable(true);
    setIsFollowing(false);

    return () => localStorage.setItem("user", JSON.stringify(user));
  }, []);

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

  //   const handleFollowUser = () => {
  //     setIsFollowing(true);

  //     axios.post(`/api/followuser/${userdata.id}`, {
  //       currentuser_id: user.id,
  //       action: "add",
  //     });
  //   };
  //   const handleUnfollowUser = () => {
  //     setIsFollowing(false);
  //     axios.post(`/api/followuser/${userdata.id}`, {
  //       currentuser_id: user.id,
  //       action: "remove",
  //     });
  //   };

  return (
    <>
      <Navbar isGuest={true} />
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
            <Icon
              as={BsChevronLeft}
              color="white"
              position="absolute"
              top="30px"
              left="5px"
              cursor="pointer"
              onClick={() => router.push("/welcome")}
            />

            <Image
              alt="Cover Photo"
              maxH="300px"
              minH="300px"
              minW="600px"
              align="center"
              fallbackSrc="https://linkbase.s3.us-east-2.amazonaws.com/brand-gradient.png"
              src={guest_cover_pic}
              className={accountPageStyles.coverPhoto}
              borderRadius="lg"
              boxShadow="0px 5px 20px 1px rgb(0, 0, 0, 0.5)"
            ></Image>
            <Avatar
              size="full"
              boxSize="150px"
              src={guest_prof_pic}
              position="absolute"
              bottom="0"
              left="50%"
              transform="translate(-50%, 50%)"
              border="2px solid lightgray"
              // name={userdata.username}
              boxShadow="0px 0px 10px 2px rgb(0, 0, 0, 0.7)"
              fontSize="4rem"
              icon={<AiOutlineUser />}
            ></Avatar>
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
              <EditProfile_Guest
                guest_cover_pic={guest_cover_pic}
                guest_prof_pic={guest_prof_pic}
                setGuest_cover_pic={setGuest_cover_pic}
                setGuest_prof_pic={setGuest_prof_pic}
                user={user}
                isEditable={isEditable}
                showConfirmation={showConfirmation}
                setShowConfirmation={setShowConfirmation}
              />
            ) : isFollowing ? (
              <Button
                position="absolute"
                fontSize="0.8rem"
                size="sm"
                colorScheme="blue"
                variant="outline"
                className={accountPageStyles.followButton}
                onClick={(e) => handleUnfollowUser(e)}
                _focus={{ outline: "none" }}
              >
                <Icon as={BsPersonCheckFill} />
              </Button>
            ) : (
              <Button
                position="absolute"
                fontSize="0.8rem"
                size="sm"
                colorScheme="blue"
                className={accountPageStyles.followButton}
                onClick={(e) => handleFollowUser(e)}
                _focus={{ outline: "none" }}
              >
                Follow&nbsp;
                <Icon as={BsPersonPlus} />
              </Button>
            )}
          </Flex>
          {showConfirmation && (
            <Flex
              p="inherit"
              align="center"
              w="100%"
              justify="center"
              direction="column"
            >
              <Flex align="center">
                <CheckCircleIcon fontSize="1rem" mr="0.4rem" />
                <Text fontSize="0.7rem" color="gray.600">
                  It may take a few minutes to view your changes.
                </Text>
              </Flex>
            </Flex>
          )}
          <Tabs
            colorScheme="red"
            // isFitted
            align="center"
            minW="100%"
          >
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
                    user={user}
                    sortingBy={sortingBy}
                    userdata={userdata}
                    isProfilePage={true}
                    users={users}
                  />
                </VStack>
              </TabPanel>
              <TabPanel maxW="100vw">
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
                    align="flex-start"
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
        </VStack>
      </Flex>
    </>
  );
};

export default GuestAccount;

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
