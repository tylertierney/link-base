import { useState } from "react";
import { useUser } from "../context/authContext";

import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  Button,
  SimpleGrid,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Flex,
} from "@chakra-ui/react";

import Layout from "../components/Layout/Layout";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { user, login, signup, logout, authReady, error } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, username);

    signup(email, password, username);
  };

  return (
    <Layout>
      <Box overflowY="scroll" className="signup_form" p="2rem 0 2rem 0">
        <Container as={SimpleGrid} maxW={"lg"} spacing={{ base: 10, lg: 32 }}>
          <form onSubmit={(e) => handleSubmit(e)} autoComplete="true">
            <Stack
              bg={"gray.50"}
              rounded={"xl"}
              p={{ base: 4, sm: 6, md: 8 }}
              spacing={{ base: 8 }}
              maxW={{ lg: "lg" }}
            >
              <Stack spacing={4} m="0">
                <Heading
                  color={"gray.800"}
                  lineHeight={1.1}
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                >
                  Join our community
                  <Text
                    as={"span"}
                    bgGradient="linear(to-r, red.400,pink.400)"
                    bgClip="text"
                  >
                    !
                  </Text>
                </Heading>
                <Text color={"gray.500"} fontSize={{ base: "sm", sm: "md" }}>
                  Create an account to interact with friends, create posts, and
                  more. Or sign-in using a guest account to test out linkBase
                  features anonymously.
                </Text>
              </Stack>
              <Box>
                <Stack spacing={3}>
                  <Flex direction="column" fontSize="0.8rem">
                    <FormLabel fontSize="inherit" m={0}>
                      Username
                    </FormLabel>
                    <FormControl isRequired id="username" isInvalid={error}>
                      <Input
                        placeholder="coolguy96"
                        bg={"gray.100"}
                        border={0}
                        color={"gray.500"}
                        _placeholder={{
                          color: "gray.500",
                        }}
                        onChange={(e) => setUsername(e.target.value)}
                        value={username}
                      />
                      <FormErrorMessage fontSize="inherit">
                        {error?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex direction="column" fontSize="0.8rem">
                    <FormLabel fontSize="inherit" m={0}>
                      Email
                    </FormLabel>
                    <FormControl isRequired id="email" isInvalid={error}>
                      <Input
                        placeholder="coolguy@email.com"
                        bg={"gray.100"}
                        border={0}
                        color={"gray.500"}
                        _placeholder={{
                          color: "gray.500",
                        }}
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <FormErrorMessage fontSize="inherit">
                        {error?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex direction="column" fontSize="0.8rem">
                    <FormLabel fontSize="inherit" m={0}>
                      Password
                    </FormLabel>
                    <FormControl isRequired id="password" isInvalid={error}>
                      <Input
                        placeholder="Password"
                        bg={"gray.100"}
                        border={0}
                        color={"gray.500"}
                        _placeholder={{
                          color: "gray.500",
                        }}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                      />
                      <FormErrorMessage>{error?.message}</FormErrorMessage>
                    </FormControl>
                    <FormErrorMessage fontSize="inherit">
                      {error?.message}
                    </FormErrorMessage>
                  </Flex>
                </Stack>
                <Button
                  fontFamily={"heading"}
                  mt={8}
                  w={"full"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,pink.400)",
                    boxShadow: "xl",
                  }}
                  _focus={{ outline: "none" }}
                  type="submit"
                >
                  Confirm
                </Button>
              </Box>
            </Stack>
          </form>
        </Container>
      </Box>
    </Layout>
  );
};

export default SignUp;
