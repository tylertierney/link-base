import { Flex, Icon, Text } from "@chakra-ui/react";
import Link from "next/link";
// import { useUser } from "../../context/userContext";
import { ChevronDownIcon } from "@chakra-ui/icons";
import Logo from "../Logo/Logo";

const Navbar = () => {
  //   const { loadingUser, user, setUser } = useUser();

  //   const { id, name, username, email } = user || {
  //     id: "na",
  //     name: "na",
  //     username: "na",
  //     email: "na",
  //   };

  //   console.log(id);

  return (
    <>
      <main>
        <Flex
          p="0 1.3rem"
          w="100vw"
          justify="space-between"
          h="2rem"
          align="center"
          boxShadow="0px 3px 10px 2px rgb(0, 0, 0, 0.3)"
          zIndex="1"
          position="fixed"
          top="0"
          left="0"
          backgroundColor="brand.text_light"
        >
          <Logo />
          <Flex
            justify="space-between"
            align="center"
            transition="0.3s ease-in-out"
            _hover={{ opacity: "0.7" }}
          >
            <Flex
              justify="center"
              align="center"
              fontSize="0.8rem"
              cursor="pointer"
              userSelect="none"
            >
              <Text as="span">username</Text>
              <ChevronDownIcon w={5} h={5} pt="2px" />
            </Flex>
            <Flex
              justify="center"
              align="center"
              h={2}
              userSelect="none"
              cursor="pointer"
              ml="1rem"
            ></Flex>
          </Flex>
        </Flex>
      </main>
    </>
  );
};

export default Navbar;
