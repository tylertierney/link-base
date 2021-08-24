import { Flex, Icon, Text, Button } from "@chakra-ui/react";
import { ChevronDownIcon } from "@chakra-ui/icons";
import { useUser } from "../../context/authContext";
import Logo from "../Logo/Logo";
import Login from "./Login/Login";
import Account from "./Account/Account";
import Logout from "./Logout/Logout";

const Navbar = () => {
  const { user, login, logout } = useUser();

  console.log(user);

  return (
    <>
      <main>
        <nav>
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
              <Account />
              <Login />
              <Logout />
            </Flex>
          </Flex>
        </nav>
      </main>
    </>
  );
};

export default Navbar;
