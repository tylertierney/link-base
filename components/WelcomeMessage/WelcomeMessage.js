import { Flex, Heading, Text, Image } from "@chakra-ui/react";

import Link from "next/link";

const WelcomeMessage = () => {
  return (
    <Flex
      backgroundColor="white"
      borderRadius="xl"
      p="1.8rem"
      direction="column"
      minW="300px"
      textAlign="left"
      boxShadow="0px 0px 10px 1px rgb(0, 0, 0, 0.3)"
      color="gray.600"
      maxW="700px"
      mb="50vh"
    >
      <Heading fontFamily="Poppins" fontSize="1.4rem">
        Looks like you&apos;re new here
        <Text
          as={"span"}
          bgGradient="linear(to-r, red.400,pink.400)"
          bgClip="text"
        >
          ...
        </Text>
      </Heading>
      <br />
      <Text fontSize="0.9rem">Welcome!</Text>
      <br />
      <Text fontSize="0.9rem">
        LinkBase is a social media platform. Think of it like an Instagram or
        Facebook clone. Users can post status updates, share photos, tag posts
        with their current location, and of course follow content posted by
        other users.
      </Text>
      <br />
      <Text fontSize="0.9rem">
        LinkBase is fully functional in a desktop web browser, but the platform
        is optimized for a mobile-first experience. As a progressive web
        application (PWA), LinkBase can
        <Text as="span" fontSize="0.9rem" fontStyle="italic">
          &nbsp;also&nbsp;
        </Text>
        be added to your phone&apos;s home screen and will function like an app
        downloaded from the app store.
      </Text>
      <br />
      <Text fontSize="0.9rem">
        If you&apos;re not ready to create an account just yet, feel free to get
        started in{" "}
        <Link href="/welcome" passHref>
          <a style={{ color: "blue" }}>Welcome Mode</a>
        </Link>{" "}
        as a guest user with limited features.
      </Text>
      <br />
      <Text fontSize="0.9rem">
        If you&apos;re a developer and want to learn about the tech stack behind
        LinkBase, check out the{" "}
        <Link href="https://github.com/tylertierney/link-base" passHref>
          <a style={{ color: "blue" }}>respository</a>
        </Link>{" "}
        on Github.
      </Text>
      <br />
      <Text fontSize="0.9rem" textAlign="right">
        - Tyler Tierney, Founder
      </Text>
    </Flex>
  );
};

export default WelcomeMessage;
