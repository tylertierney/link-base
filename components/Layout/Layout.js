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
        maxH="100vh"
        p="2rem 0.5rem 0rem 0.5rem"
        justifyContent="flex-start"
        alignItems="center"
        backgroundColor="blue.300"
        background="linear-gradient(180deg, rgba(237,69,81,1) 0%, rgba(249,200,206,1) 100%)"
        overflowY="hidden"
      >
        {children}
      </Flex>
    </>
  );
}
