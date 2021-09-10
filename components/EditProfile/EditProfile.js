import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Flex,
  Text,
  Button,
} from "@chakra-ui/react";

import {
  FormControl,
  FormLabel,
  Stack,
  Alert,
  AlertIcon,
  FormHelperText,
  FormErrorMessage,
  Input,
  InputGroup,
  InputLeftAddon,
  VStack,
  Textarea,
  Image,
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";

import { useState, useEffect } from "react";

import { SpinnerIcon } from "@chakra-ui/icons";

import axios from "axios";

import { useUser } from "../../context/authContext";

import accountPageStyles from "../../pages/user/accountPage.module.css";

const EditProfile = ({ isEditable, showConfirmation, setShowConfirmation }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(false);

  const [aboutBio, setAboutBio] = useState(user.bio);
  const [profilePicFile, setProfilePicFile] = useState(null);
  const [coverPhotoFile, setCoverPhotoFile] = useState(null);
  const [profilePicPreviewURL, setProfilePicPreviewURL] = useState(
    user.prof_pic_url
  );
  const [coverPhotoPreviewURL, setCoverPhotoPreviewURL] = useState(
    user.cover_pic_url
  );

  const [newUsername, setNewUsername] = useState(user.username);

  const sendFileToS3 = (file, s3url) => {
    let config = { headers: { "Content-Type": "multipart/form-data" } };

    axios
      .put(s3url, file, config)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  const handleProfilePicUpload = (e) => {
    let imagefile = e.target.files[0];
    if (imagefile) {
      setProfilePicFile(() => imagefile);
      let url = URL.createObjectURL(imagefile);
      setProfilePicPreviewURL(url);
    }
  };
  const handleCoverPhotoUpload = (e) => {
    let imagefile = e.target.files[0];

    if (imagefile) {
      setCoverPhotoFile(() => imagefile);
      let url = URL.createObjectURL(imagefile);
      setCoverPhotoPreviewURL(url);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (profilePicFile) {
      axios
        .get("/api/s3")
        .then((response) => {
          sendFileToS3(profilePicFile, response.data.url);
          let new_url = response.data.url.split("?")[0];
          axios.post("/api/updateuser", {
            userid: user.id,
            bio: aboutBio,
            prof_pic_url: new_url,
            username: newUsername,
          });
          setShowConfirmation(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (coverPhotoFile) {
      axios
        .get("/api/s3")
        .then((response) => {
          sendFileToS3(coverPhotoFile, response.data.url);
          let new_url = response.data.url.split("?")[0];
          axios.post("/api/updateuser", {
            userid: user.id,
            bio: aboutBio,
            cover_pic_url: new_url,
            username: newUsername,
          });
          setShowConfirmation(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }

    setIsLoading(false);
    onClose();
  };

  return (
    <>
      <Button
        color="gray.400"
        position="absolute"
        size="sm"
        variant="ghost"
        display={isEditable ? "" : "none"}
        onClick={onOpen}
        _focus={{ outline: "none" }}
        className={accountPageStyles.followButton}
      >
        <Flex align="center">
          <Text>Edit&nbsp;</Text>
          <EditIcon fontSize="xl"></EditIcon>
        </Flex>
      </Button>
      <Modal
        autoFocus={false}
        motionPreset="slideInBottom"
        allowPinchZoom={true}
        isOpen={isOpen}
        onClose={onClose}
      >
        <form onSubmit={(e) => handleSubmit(e)}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader p="0.6rem 1.4rem">
              <Flex align="center">
                <Text
                  bgGradient="linear(to-r, red.400,pink.400)"
                  bgClip="text"
                  fontSize="1.3rem"
                >
                  Edit Profile&nbsp;
                </Text>
                <EditIcon fontSize="1.3rem" color="gray.400" />
              </Flex>
            </ModalHeader>
            <ModalBody>
              <VStack fontSize="0.8rem">
                <Flex w="100%" align="flex-start" direction="column">
                  <FormLabel>Profile Picture</FormLabel>
                  <label
                    style={{
                      border: "1px solid red",
                      padding: "0.3rem 0.5rem",
                      cursor: "pointer",
                      borderRadius: "6px",
                    }}
                    htmlFor="profile_pic"
                  >
                    Choose File
                  </label>
                  <input
                    id="profile_pic"
                    type="file"
                    accept="image/*"
                    style={{
                      border: "solid blue 1px",
                      opacity: "0",
                      fontSize: "inherit",
                    }}
                    onChange={(e) => handleProfilePicUpload(e)}
                  />
                  <Image
                    src={profilePicPreviewURL}
                    alt="User profile image"
                    boxSize="200px"
                    borderRadius="full"
                    mb="20px"
                    border="solid lightgray 2px"
                    boxShadow="0px 0px 20px 1px rgb(0, 0, 0, 0.4)"
                    fallbackSrc="https://www.macmillandictionary.com/external/slideshow/full/White_full.png"
                  />
                </Flex>
                <Flex w="100%" align="flex-start" direction="column">
                  <FormLabel>Cover Photo</FormLabel>
                  <label
                    style={{
                      border: "1px solid red",
                      padding: "0.3rem 0.5rem",
                      cursor: "pointer",
                      borderRadius: "6px",
                    }}
                    htmlFor="cover_photo"
                  >
                    Choose File
                  </label>
                  <input
                    id="cover_photo"
                    type="file"
                    accept="image/*"
                    style={{
                      border: "solid blue 1px",
                      opacity: "0",
                      fontSize: "inherit",
                    }}
                    onChange={(e) => handleCoverPhotoUpload(e)}
                  />
                  <Image
                    src={coverPhotoPreviewURL}
                    alt="User cover image"
                    fit="cover"
                    maxH="200px"
                    h="200px"
                    w="300px"
                    maxW="100%"
                    border="solid lightgray 2px"
                    boxShadow="0px 0px 20px 1px rgb(0, 0, 0, 0.4)"
                    fallbackSrc="https://www.macmillandictionary.com/external/slideshow/full/White_full.png"
                  />
                </Flex>
                <FormControl id="username">
                  <FormHelperText fontSize="inherit" color="gray.600">
                    <Flex alignItems="center" justify="space-between">
                      <FormLabel>Username</FormLabel>
                      <Text
                        alignSelf="flex-end"
                        color="gray.400"
                        fontSize="0.6rem"
                      >
                        Maximum 20 characters
                      </Text>
                    </Flex>
                  </FormHelperText>
                  <Stack>
                    <InputGroup size="sm">
                      <Input
                        fontSize="1rem"
                        onChange={(e) => setNewUsername(e.target.value)}
                        value={newUsername}
                        disabled={isLoading}
                        _focus={{ outline: "none" }}
                      />
                    </InputGroup>
                  </Stack>
                </FormControl>
                <FormControl id="aboutBio">
                  <FormHelperText fontSize="inherit" color="gray.600">
                    <Flex alignItems="center" justify="space-between">
                      <FormLabel>Bio</FormLabel>
                      <Text
                        alignSelf="flex-end"
                        color="gray.400"
                        fontSize="0.6rem"
                      >
                        Maximum 200 characters
                      </Text>
                    </Flex>
                  </FormHelperText>
                  <Stack>
                    <InputGroup size="sm">
                      <Textarea
                        fontSize="1rem"
                        onChange={(e) => setAboutBio(e.target.value)}
                        value={aboutBio}
                        disabled={isLoading}
                        _focus={{ outline: "none" }}
                      />
                    </InputGroup>
                  </Stack>
                </FormControl>
              </VStack>
            </ModalBody>
            <ModalFooter>
              <Button
                onClick={onClose}
                mr="1rem"
                color="gray.400"
                variant="ghost"
              >
                Cancel
              </Button>

              <Button
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
                  "Confirm Changes"
                )}
              </Button>
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditProfile;
