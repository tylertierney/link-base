import { Button, Flex } from "@chakra-ui/react";
import { useUser } from "../../../context/authContext";
import Link from "next/link";

import { useState } from "react";

import { SpinnerIcon } from "@chakra-ui/icons";

const NavbarControls = () => {
  const { user, login, logout } = useUser();

  const [loginIsLoading, setLoginIsLoading] = useState(false);
  const [signupIsLoading, setSignupIsLoading] = useState(false);

  return (
    <Flex
      justify="center"
      align="center"
      h={2}
      userSelect="none"
      cursor="pointer"
      ml="1rem"
    >
      <Button
        onClick={() => setSignupIsLoading(true)}
        variant="ghost"
        colorScheme="gray"
        size="xs"
        fontSize="0.7rem"
        _focus={{ outline: "none" }}
        mr="10px"
        p="0.1rem 1rem"
      >
        {signupIsLoading ? (
          <SpinnerIcon
            color="brand.600"
            className="spinnerIcon"
            fontSize="0.8rem"
          ></SpinnerIcon>
        ) : (
          <Link href="/signup">Sign Up</Link>
        )}
      </Button>
      <Button
        size="xs"
        bgGradient="linear(to-r, red.400,pink.400)"
        color={"white"}
        _hover={{
          bgGradient: "linear(to-r, red.400,pink.400)",
          boxShadow: "xl",
        }}
        _focus={{ outline: "none" }}
        p="0.1rem 1rem"
        onClick={() => setLoginIsLoading(true)}
      >
        {loginIsLoading ? (
          <SpinnerIcon
            color="white"
            className="spinnerIcon"
            fontSize="0.8rem"
          ></SpinnerIcon>
        ) : (
          <Link href="/login">Log In</Link>
        )}
      </Button>
    </Flex>
  );
};

export default NavbarControls;
