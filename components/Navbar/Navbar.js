import { Flex } from "@chakra-ui/react";
import { useUser } from "../../context/authContext";
import Logo from "../Logo/Logo";
import NavbarControls from "./NavbarControls/NavbarControls";
import UserMenu from "./UserMenu/UserMenu";

const Navbar = () => {
  const { user, login, signup, logout, authReady } = useUser();

  return (
    <>
      <nav>
        <Flex
          p="0 1.3rem"
          w="100vw"
          justify="space-between"
          h="2.2rem"
          align="center"
          boxShadow="0px 3px 10px 1px rgb(0, 0, 0, 0.2)"
          zIndex="1"
          position="fixed"
          top="0"
          left="0"
          backgroundColor="brand.text_light"
        >
          <Logo />
          <Flex justify="space-between" align="center">
            {user && <UserMenu />}
            {!user && <NavbarControls />}
          </Flex>
        </Flex>
      </nav>
    </>
  );
};

export default Navbar;
