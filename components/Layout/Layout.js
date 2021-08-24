import { Flex } from "@chakra-ui/react";
import Navbar from "../Navbar/Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <Flex
        direction="column"
        maxW="100vw"
        minH="100vh"
        w="100vw"
        mt="2rem"
        p="1rem 1rem"
        justifyContent="flex-start"
        alignItems="center"
        backgroundColor="blue.300"
        background="linear-gradient(180deg, rgba(237,69,81,1) 0%, rgba(249,200,206,1) 100%)"
      >
        {children}
      </Flex>
    </>
  );
}
