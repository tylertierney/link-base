import { useState } from "react";
import { useUser } from "../context/authContext";

import {
  Box,
  Stack,
  Heading,
  Text,
  Container,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Flex,
  FormHelperText,
  Icon,
  VStack,
} from "@chakra-ui/react";

import Layout from "../components/Layout/Layout";
import { SpinnerIcon } from "@chakra-ui/icons";

import signupstyles from "./signup.module.css";

import { BsChevronLeft } from "react-icons/bs";

import router from "next/router";

const SignUp = ({ users }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { signup, error, isLoading } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    signup(email, password, username);
    // localStorage.setItem(
    //   "user",
    //   JSON.stringify({
    //     username: username,
    //     email: email,
    //     prof_pic_url: "",
    //     cover_pic_url: "",
    //     followers: [],
    //     following: [],
    //     posts: [],
    //     liked_posts: [],
    //     id: "",
    //     bio: "",
    //   })
    // );
  };

  return (
    <Layout>
      <Box
        w="100%"
        h="100%"
        maxW="100vw"
        maxH="100vh"
        overflowY="scroll"
        display="flex"
        flexDirection="column"
        alignItems="center"
        className="hideScrollbar"
      >
        <Flex w="100%" align="center">
          <Flex
            align="center"
            onClick={() => router.push("/")}
            cursor="pointer"
            p="20px 0 6px 10px"
            as="button"
            _focus={{ opacity: "0.5" }}
          >
            <Icon as={BsChevronLeft} color="white" />
            <Text color="white">&nbsp;Welcome</Text>
          </Flex>
        </Flex>
        <Container
          p="1rem 0 2rem 0"
          m="0 0 200px 0"
          maxW={["xs", "md", "lg"]}
          className={`${signupstyles.container} hideScrollbar`}
        >
          <form onSubmit={(e) => handleSubmit(e)}>
            <Stack
              bg={"gray.50"}
              rounded="xl"
              p={{ base: 4, sm: 6, md: 8 }}
              spacing={{ base: 8 }}
              maxW={{ lg: "lg" }}
            >
              <Stack spacing={4} m="0">
                <Heading
                  fontFamily="Poppins"
                  color="gray.600"
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
                  {/* <br />
                Or sign-in using a guest account to test out linkBase features
                anonymously. */}
                </Text>
              </Stack>
              <Box>
                <Stack spacing={3} color="gray.400">
                  <Flex direction="column" fontSize="0.8rem">
                    <Flex align="center" justify="space-between">
                      <FormLabel color="inherit" fontSize="inherit" m={0}>
                        Username
                      </FormLabel>
                      <Text fontSize="0.6rem">
                        Min 6 characters, max 20; no spaces
                      </Text>
                    </Flex>
                    <FormControl isRequired id="username" isInvalid={error}>
                      <Input
                        autoComplete="username"
                        placeholder="coolguy96"
                        bg={"gray.100"}
                        // border={0}
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
                  <Flex direction="column" fontSize="0.8rem" color="gray.400">
                    <FormLabel fontSize="inherit" m={0}>
                      Email
                    </FormLabel>
                    <FormControl isRequired id="email" isInvalid={error}>
                      <Input
                        autoComplete="email"
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
                      <FormHelperText color="inherit">
                        Your email address will never be shared publicly.
                      </FormHelperText>
                    </FormControl>
                  </Flex>
                  <Flex direction="column" fontSize="0.8rem">
                    <FormLabel fontSize="inherit" m={0}>
                      Password
                    </FormLabel>
                    <FormControl isRequired id="password" isInvalid={error}>
                      <InputGroup>
                        <Input
                          autoComplete="new-password"
                          placeholder="*******"
                          bg={"gray.100"}
                          border={0}
                          color={"gray.500"}
                          _placeholder={{
                            color: "gray.300",
                          }}
                          type={showPassword ? "text" : "password"}
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          disabled={isLoading}
                        />
                        <InputRightElement>
                          <Button
                            fontSize="0.8rem"
                            variant="ghost"
                            _focus={{
                              outline: "none",
                            }}
                            _active={{
                              backgroundColor: "transparent",
                            }}
                            mr="1rem"
                            onClick={() => setShowPassword(!showPassword)}
                            color="gray.400"
                          >
                            Show
                          </Button>
                        </InputRightElement>
                      </InputGroup>
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
      </Box>
    </Layout>
  );
};

export default SignUp;
