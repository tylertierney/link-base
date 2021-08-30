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
} from "@chakra-ui/react";
import Feed from "../../components/Feed/Feed";
import { useEffect, useState } from "react";

import { EditIcon } from "@chakra-ui/icons";

import accountPageStyles from "./accountPage.module.css";

import SortMenu from "../../components/SortMenu/SortMenu";

const AccountPage = ({ userdata, users }) => {
  const { user, logout } = useUser();

  const [isEditable, setIsEditable] = useState(false);

  const [sortingBy, setSortingBy] = useState("new");

  console.log(sortingBy);

  useEffect(() => {
    if (userdata.id === user.id) {
      setIsEditable(true);
    }
  }, []);

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
            align="center"
            fallbackSrc="https://via.placeholder.com/600x300"
            src={userdata.cover_pic_url}
            className={accountPageStyles.coverPhoto}
            borderRadius="lg"
            boxShadow="0px 5px 20px 1px rgb(0, 0, 0, 0.5)"
          ></Image>
          <Image
            alt="Profile Picture"
            fallbackSrc="https://via.placeholder.com/300x300"
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
          <Button
            color="gray.400"
            position="absolute"
            right="10px"
            bottom="-50px"
            size="sm"
            variant="ghost"
            display={isEditable ? "" : "none"}
          >
            <Flex align="center">
              <Text>Edit&nbsp;</Text>
              <EditIcon fontSize="xl"></EditIcon>
            </Flex>
          </Button>
        </Flex>
        <Flex direction="row" justify="center" align="center" w="100%">
          <Text
            as={"h1"}
            bgGradient="linear(to-r, red.400,pink.400)"
            bgClip="text"
            userSelect="none"
          >
            <Heading>{userdata.username}</Heading>
          </Text>
        </Flex>

        <Divider />

        <VStack
          overflowY="scroll"
          minH="200vh"
          className="hideScrollbar"
          p="0.5rem 0.8rem 2rem 0.8rem"
          position="relative"
        >
          <Flex
            position="relative"
            // border="solid red 1px"
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
