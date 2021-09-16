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
      userSelect="none"
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
      {/* <div
        style={{
          position: "relative",
          width: "100%",
          border: "1px solid green",
          display: "flex",
          justifyContent: "center",
        }}
      > */}
      <Flex
        position="relative"
        w="120%"
        alignSelf="center"
        justify={["flex-start", "center"]}
        mr={["0px", "80px"]}
        // border="2px solid green"
      >
        <div
          style={
            {
              // marginRight: "60px",
            }
          }
        >
          <Image
            alt="Screenshot of LinkBase"
            minH="400px"
            h="auto"
            w={["200px", "300px"]}
            border="1px solid black"
            borderRadius="lg"
            boxShadow="20px 20px 20px 1px rgb(0, 0, 0, 0.2)"
            src="/screenshots/mobile_screenshot.png"
            ml={["10px", "0px"]}
          />
          <Image
            alt="Screenshot of LinkBase"
            position="absolute"
            top="40%"
            left={["40%", "50%"]}
            h="auto"
            w={["200px", "300px"]}
            border="1px solid black"
            borderRadius="lg"
            boxShadow="20px 20px 20px 1px rgb(0, 0, 0, 0.2)"
            src="/screenshots/mobile_screenshot2.png"
          />
        </div>
        {/* </div> */}
      </Flex>
      <br />
      <Text fontSize="0.9rem" mt={["200px", "300px"]}>
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
          <a style={{ color: "blue" }}>repository</a>
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
