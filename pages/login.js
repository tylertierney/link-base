import { useState } from "react";
import { useUser } from "../context/authContext";
import Layout from "../components/Layout/Layout";

import Link from "next/link";

import { SpinnerIcon } from "@chakra-ui/icons";

import {
  Box,
  Stack,
  Heading,
  Container,
  Input,
  Button,
  SimpleGrid,
  FormControl,
  FormErrorMessage,
  Flex,
  FormLabel,
  Icon,
} from "@chakra-ui/react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { user, login, signup, logout, authReady, error, isLoading } =
    useUser();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);

    login(email, password);
  };

  const errorType = {
    email: false,
    password: false,
  };

  return (
    <Layout>
      <Box
        overflowY="scroll"
        p="2rem 0 2rem 0"
        className="hideScrollbar"
        w={[300, 400, 500]}
      >
        <Container as={SimpleGrid}>
          <form onSubmit={(e) => handleSubmit(e)}>
            <Stack
              bg={"gray.50"}
              rounded={"xl"}
              p={{ base: 4, sm: 6, md: 8 }}
              spacing={{ base: 8 }}
            >
              <Stack spacing={4}>
                <Heading
                  color="gray.600"
                  fontFamily="Poppins"
                  lineHeight={1.1}
                  fontSize={{ base: "2xl", sm: "3xl", md: "4xl" }}
                >
                  Log In
                </Heading>
              </Stack>
              <Box mt={10}>
                <Stack spacing={4}>
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
                        onChange={(e) => setEmail(e.target.value)}
                        type="email"
                        value={email}
                        fontSize="inherit"
                        disabled={isLoading}
                      />
                      {/* <FormErrorMessage fontSize="inherit">
                        {error?.message}
                      </FormErrorMessage> */}
                    </FormControl>
                  </Flex>
                  <Flex direction="column" fontSize="0.8rem">
                    <FormLabel fontSize="inherit" m={0}>
                      Password
                    </FormLabel>
                    <FormControl isRequired id="password" isInvalid={error}>
                      <Input
                        placeholder="********"
                        bg={"gray.100"}
                        border={0}
                        color={"gray.500"}
                        _placeholder={{
                          color: "gray.300",
                        }}
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        value={password}
                        fontSize="inherit"
                        disabled={isLoading}
                      />
                      <FormErrorMessage fontSize="inherit">
                        {error?.message}
                      </FormErrorMessage>
                    </FormControl>
                  </Flex>
                  <Flex w="100%" fontSize="0.7rem" justify="center">
                    <Link href="/" passHref>
                      <a style={{ color: "blue", textDecoration: "underline" }}>
                        I forgot my password
                      </a>
                    </Link>
                  </Flex>
                </Stack>

                <Button
                  fontFamily={"heading"}
                  mt={5}
                  w={"full"}
                  bgGradient="linear(to-r, red.400,pink.400)"
                  color={"white"}
                  _hover={{
                    bgGradient: "linear(to-r, red.400,pink.400)",
                    boxShadow: "xl",
                  }}
                  type="submit"
                  _focus={{ outline: "none" }}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <SpinnerIcon
                      color="white"
                      className="spinnerIcon"
                      fontSize="1.3rem"
                    ></SpinnerIcon>
                  ) : (
                    "Submit"
                  )}
                </Button>
              </Box>
            </Stack>
          </form>
        </Container>
      </Box>
    </Layout>
  );
};

export default Login;
