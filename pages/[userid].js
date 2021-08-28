import Layout from "../components/Layout/Layout";
import { useUser } from "../context/authContext";
import clientPromise from "../utils/mongodb";
import { Image, Flex, Heading, Text, VStack, Divider } from "@chakra-ui/react";
import Feed from "../components/Feed/Feed";

const AccountPage = ({ userdata }) => {
  const { user, logout } = useUser();

  console.log(userdata);

  return (
    <Layout>
      <VStack backgroundColor="brand.text_light" minH="100vh" w="100%">
        <Flex direction="column" position="relative" mb="75px" pt="1.2rem">
          <Image
            alt="Cover Photo"
            maxH="300px"
            minH="300px"
            align="center"
            fallbackSrc="https://via.placeholder.com/600x300"
            src={userdata.cover_pic_url}
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
        </Flex>
        <Flex direction="column" align="center">
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
          p="1rem 0.8rem 2rem 0.8rem"
          // maxW={["xs", "sm", "md"]}
          // w={["sm", "md", "lg"]}
          // maxW="40px"
        >
          <Feed posts={userdata.posts} />
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

  return {
    props: {
      userdata: JSON.parse(JSON.stringify(userdata[0])),
    },
  };
}
