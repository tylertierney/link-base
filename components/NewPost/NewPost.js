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

import { HiOutlinePhotograph } from "react-icons/hi";
import { GoLocation } from "react-icons/go";

import { formatLocationData } from "../../helperfunctions";

import { CheckCircleIcon } from "@chakra-ui/icons";

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
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setIsLoading(true);
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
        <Flex p="inherit" align="center" w="100%" justify="center">
          <CheckCircleIcon fontSize="1rem" mr="0.4rem" />
          <Text fontSize="0.8rem" color="brand.text_dark">
            Your&nbsp;
            <Link href={`/user/${user.id}`} passHref>
              <a style={{ textDecoration: "underline", color: "blue" }}>post</a>
            </Link>
            &nbsp;is live!
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
                  border="solid lightgray 1px"
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

          <Stack m="0.4rem 0" direction="column">
            <FormControl id="postText">
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
            </FormControl>
            <FormErrorMessage>{error}</FormErrorMessage>
            {showPhotoURLinput && (
              <FormControl id="photoURL">
                <Stack>
                  <FormHelperText fontSize="inherit"></FormHelperText>
                  <Alert color="gray.600" status="info">
                    <AlertIcon />
                    Currently, linkBase does not support local file uploads. To
                    post a photo, paste the url to the image.
                  </Alert>
                  <InputGroup size="sm">
                    <InputLeftAddon
                      fontSize="inherit"
                      color="gray.400"
                      // children="https://"
                    >
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
                <Icon as={HiOutlinePhotograph} w={8} h={8} />
              </Button>
              <Button
                p="0.1rem"
                size="sm"
                opacity={postText ? "1" : "0.5"}
                _focus={{ outline: "none" }}
                colorScheme="blue"
                variant="ghost"
                onClick={getLocation()}
              >
                <Icon as={GoLocation} w={6} h={6} />
              </Button>
            </Flex>
            <Button
              size="sm"
              type="submit"
              colorScheme="blue"
              opacity={postText ? "1" : "0.5"}
              _focus={{ outline: "none" }}
              disabled={isLoading || error}
            >
              {isLoading ? (
                <SpinnerIcon
                  color="white"
                  className="spinnerIcon"
                  fontSize="1rem"
                  m="0 0.4rem"
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
