import { Button, Flex } from "@chakra-ui/react";
import { useUser } from "../../../context/authContext";
import Link from "next/link";

const NavbarControls = () => {
  const { user, login, logout } = useUser();

  return (
    <Flex
      justify="center"
      align="center"
      h={2}
      userSelect="none"
      cursor="pointer"
      ml="1rem"
    >
      <Button variant="ghost" colorScheme="gray" size="xs" fontSize="0.7rem">
        <Link href="/signup">Sign Up</Link>
      </Button>
      <Button
        variant="solid"
        p="0 0.8rem"
        color="brand.text_light"
        backgroundColor="blue.400"
        _hover={{ opacity: "0.8" }}
        size="xs"
      >
        <Link href="/login">Log In</Link>
      </Button>
    </Flex>
  );
};

export default NavbarControls;
