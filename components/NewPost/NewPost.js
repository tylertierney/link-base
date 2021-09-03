import {
  Container,
  Flex,
  Avatar,
  Text,
  FormControl,
  Input,
  Button,
  Icon,
  InputLeftAddon,
  InputGroup,
  Stack,
  FormHelperText,
  Alert,
  AlertIcon,
  FormErrorMessage,
} from "@chakra-ui/react";
import { useUser } from "../../context/authContext";

import Link from "next/link";

import { useState } from "react";
import { SpinnerIcon } from "@chakra-ui/icons";
import axios from "axios";

import { HiOutlinePhotograph, HiPhotograph } from "react-icons/hi";
import { GoLocation } from "react-icons/go";

import { formatLocationData } from "../../helperfunctions";

import { CheckCircleIcon } from "@chakra-ui/icons";

import { TiLocationOutline, TiLocation } from "react-icons/ti";
import router from "next/router";

const NewPost = () => {
  const { user, authReady } = useUser();

  const [postText, setPostText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [showPhotoURLinput, setShowPhotoURLinput] = useState(false);
  const [photoURL, setPhotoURL] = useState("");
  const [location, setLocation] = useState("");
  const [error, setError] = useState("");
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    const postObject = {
      userid: user.id,
      author: user.username,
      text: postText,
      photo_url: photoURL,
      location: location,
    };
    if (postObject.text === "" && postObject.photo_url === "") {
      setIsLoading(false);
      setError("Posts must have either a photo or a description");
      console.log(error);
      return;
    }
    createNewPost(postObject);
    setPostText("");
    setIsLoading(false);
    setLocation("");
    setPhotoURL("");
    setShowPhotoURLinput(false);
  };

  const createNewPost = (postObject) => {
    axios
      .post("/api/newpost", postObject)
      .then((response) => {
        console.log("addpost to user profile request received", response);
        setShowConfirmation(true);
      })
      .catch((error) => {
        console.log("error: ", error);
      });
  };

  const getLocation = () => {
    if (location) {
      setLocation("");
      return;
    }
    setIsLoading(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        const location_api_url = `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`;
        fetch(location_api_url)
          .then((response) => response.json())
          .then((data) => {
            setLocation(formatLocationData(data));
            setIsLoading(false);
          });
      });
    } else {
      console.log("Geolocation is not supported");
      return;
    }
  };

  return (
    <Container
      maxW={["xs", "sm", "md"]}
      backgroundColor="brand.text_light"
      boxShadow="2px 2px 15px 1px rgb(0, 0, 0, 0.2)"
      borderRadius="md"
      color="brand.text_dark"
      fontSize="0.7rem"
      p="0.8rem 0.8rem 0.4rem 0.8rem"
    >
      {showConfirmation ? (
        <Flex
          p="inherit"
          align="center"
          w="100%"
          justify="center"
          direction="column"
        >
          <Flex align="center">
            <CheckCircleIcon fontSize="1rem" mr="0.4rem" />
            <Text fontSize="0.7rem" color="gray.600">
              Your&nbsp;
              <Link href={`/user/${user.id}`} passHref>
                <a style={{ textDecoration: "underline", color: "blue" }}>
                  post
                </a>
              </Link>
              &nbsp;is live!
            </Text>
          </Flex>
          <Text fontSize="0.7rem" color="gray.600">
            You may need to refresh your profile in order to view changes.
          </Text>
        </Flex>
      ) : (
        <form onSubmit={(e) => handleSubmit(e)}>
          <Flex justify="space-between" align="center" p="inherit">
            <Link href={`/user/${user.id}`} passHref>
              <Flex align="center" cursor="pointer">
                <Avatar
                  size="sm"
                  name={user.username}
                  src={user.prof_pic_url}
                  boxShadow="0px 0px 14px 0px rgb(0, 0, 0, 0.07)"
                  backgroundColor="white"
                ></Avatar>
                <Text color="brand.text_dark" ml="0.6rem">
                  {user.username}
                </Text>
              </Flex>
            </Link>
            {location ? (
              <Flex
                fontSize="0.65rem"
                justify="center"
                align="center"
                color="gray.500"
                userSelect="none"
              >
                <Text fontStyle="italic" p="0 0.2rem 0 0">
                  {location}
                </Text>
                <Icon as={GoLocation} />
              </Flex>
            ) : (
              <></>
            )}
          </Flex>

          <Stack m="0rem 0 0.2rem 0" direction="column">
            <FormControl id="postText" isInvalid={error}>
              <Input
                variant="flushed"
                fontSize="inherit"
                size="sm"
                onChange={(e) => setPostText(e.target.value)}
                placeholder="Tell your friends what you've been up to!"
                value={postText}
                type="textarea"
                _focus={{ outline: "red" }}
                disabled={isLoading}
              />
              <FormErrorMessage userSelect="none" fontSize="0.6rem">
                {error}
              </FormErrorMessage>
            </FormControl>
            {showPhotoURLinput && (
              <FormControl id="photoURL">
                <Stack>
                  <FormHelperText fontSize="inherit"></FormHelperText>
                  <Alert userSelect="none" color="gray.600" status="info">
                    <AlertIcon />
                    Currently, linkBase does not support local file uploads. To
                    post a photo, paste the url to the image.
                  </Alert>
                  <InputGroup size="sm">
                    <InputLeftAddon fontSize="inherit" color="gray.400">
                      https://
                    </InputLeftAddon>
                    <Input
                      fontSize="inherit"
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="www.unsplash.com/1234"
                      value={photoURL}
                      type="text"
                      _focus={{ outline: "red" }}
                      disabled={isLoading}
                    />
                  </InputGroup>
                </Stack>
              </FormControl>
            )}
          </Stack>
          <Flex justify="space-between" p="inherit">
            <Flex justify="center" align="center" p="inherit">
              <Button
                p="0.1rem"
                size="sm"
                opacity={postText ? "1" : "0.5"}
                _focus={{ outline: "none" }}
                colorScheme="blue"
                variant="ghost"
                onClick={() => setShowPhotoURLinput(!showPhotoURLinput)}
              >
                {photoURL ? (
                  <Icon as={HiPhotograph} w={8} h={8} />
                ) : (
                  <Icon as={HiOutlinePhotograph} w={8} h={8} />
                )}
              </Button>
              <Button
                p="0.1rem"
                size="sm"
                opacity={postText ? "1" : "0.5"}
                _focus={{ outline: "none" }}
                colorScheme="blue"
                variant="ghost"
                onClick={() => getLocation()}
              >
                {location ? (
                  <Icon as={TiLocation} w={7} h={7} />
                ) : (
                  <Icon as={TiLocationOutline} w={7} h={7} />
                )}
              </Button>
            </Flex>
            <Button
              fontFamily={"heading"}
              bgGradient="linear(to-r, red.400,pink.400)"
              color={"white"}
              _hover={{
                bgGradient: "linear(to-r, red.400,pink.400)",
                boxShadow: "xl",
              }}
              _focus={{ outline: "none" }}
              type="submit"
              disabled={isLoading}
              size="sm"
              p="0 1.2rem"
            >
              {isLoading ? (
                <SpinnerIcon
                  color="white"
                  className="spinnerIcon"
                  fontSize="1rem"
                ></SpinnerIcon>
              ) : (
                "Post"
              )}
            </Button>
          </Flex>
        </form>
      )}
    </Container>
  );
};

export default NewPost;
