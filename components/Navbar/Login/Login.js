import { Button, Flex } from "@chakra-ui/react";
import { useUser } from "../../../context/authContext";

const Login = () => {
  const { user, login, logout } = useUser();

  return (
    <Flex
      justify="center"
      align="center"
      h={2}
      userSelect="none"
      cursor="pointer"
      ml="1rem"
      onClick={login}
    >
      <Button variant="outline" colorScheme="red" size="xs">
        Log In
      </Button>
    </Flex>
  );
};

export default Login;
