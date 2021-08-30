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
  FormHelperText,
} from "@chakra-ui/react";

import Layout from "../components/Layout/Layout";
import { SpinnerIcon } from "@chakra-ui/icons";

import signupstyles from "./signup.module.css";

const SignUp = ({ users }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const { user, login, signup, logout, authReady, error, isLoading } =
    useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password, username);

    signup(email, password, username);
  };

  return (
    <Layout>
      <Container
        p="1rem 0 2rem 0"
        overflowY="scroll"
        maxW={["sm", "md", "lg"]}
        className={`${signupstyles.container} hideScrollbar`}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <Stack
            bg={"gray.50"}
            rounded={"xl"}
            p={{ base: 4, sm: 6, md: 8 }}
            spacing={{ base: 8 }}
            maxW={{ lg: "lg" }}
            // maxH="90vh"
            // overflowY="scroll"
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
                more. <br />
                <br />
                Or sign-in using a guest account to test out linkBase features
                anonymously.
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
                        color: "gray.300",
                      }}
                      onChange={(e) => setUsername(e.target.value)}
                      value={username}
                      disabled={isLoading}
                    />
                  </FormControl>
                </Flex>
                <Flex direction="column" fontSize="0.8rem">
                  <FormLabel fontSize="inherit" m={0}>
                    Email
                  </FormLabel>
                  <FormControl isRequired id="email" isInvalid={error}>
                    <Input
                      placeholder="coolguy96@email.com"
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.300",
                      }}
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                    />
                    <FormHelperText>
                      Your email address will never be shared publicly.
                    </FormHelperText>
                  </FormControl>
                </Flex>
                <Flex direction="column" fontSize="0.8rem">
                  <FormLabel fontSize="inherit" m={0}>
                    Password
                  </FormLabel>
                  <FormControl isRequired id="password" isInvalid={error}>
                    <Input
                      placeholder="*******"
                      bg={"gray.100"}
                      border={0}
                      color={"gray.500"}
                      _placeholder={{
                        color: "gray.300",
                      }}
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      value={password}
                      disabled={isLoading}
                    />
                    <FormErrorMessage fontSize="inherit">
                      {error?.message}
                    </FormErrorMessage>
                  </FormControl>
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
                disabled={isLoading}
              >
                {isLoading ? (
                  <SpinnerIcon
                    color="white"
                    className="spinnerIcon"
                    fontSize="1.3rem"
                  ></SpinnerIcon>
                ) : (
                  "Confirm"
                )}
              </Button>
            </Box>
          </Stack>
        </form>
      </Container>
    </Layout>
  );
};

export default SignUp;
