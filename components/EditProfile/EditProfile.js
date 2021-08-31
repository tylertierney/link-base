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
} from "@chakra-ui/react";

import { EditIcon } from "@chakra-ui/icons";

import { useState } from "react";

import { SpinnerIcon } from "@chakra-ui/icons";

import axios from "axios";

import { useUser } from "../../context/authContext";

import accountPageStyles from "../../pages/user/accountPage.module.css";

const EditProfile = ({ isEditable }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [isLoading, setIsLoading] = useState(false);

  const [profilePicURL, setProfilePicURL] = useState("");
  const [coverPhotoURL, setCoverPhotoURL] = useState("");
  const [aboutBio, setAboutBio] = useState("");

  const { user } = useUser();

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post("/api/updateuser", {
      userid: user.id,
      prof_pic_url: profilePicURL,
      cover_photo_url: coverPhotoURL,
      bio: aboutBio,
    });

    onClose();
  };

  let fieldsAreEmpty;

  if (!profilePicURL && !coverPhotoURL && !aboutBio) {
    fieldsAreEmpty = true;
  }

  return (
    <>
      <Button
        color="gray.400"
        position="absolute"
        // bottom="-3rem"
        // right="6rem"
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
        // maxW={["sm", "md", "lg"]}
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
                  as={"span"}
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
                <Alert color="gray.600" status="info" fontSize="sm">
                  <AlertIcon />
                  Currently, linkBase does not support local file uploads. To
                  update your profile picture or cover photo, paste the url to
                  the image.
                </Alert>

                <FormControl id="profilePicURL">
                  <FormHelperText fontSize="inherit" color="gray.600">
                    Profile Picture
                  </FormHelperText>
                  <Stack>
                    <InputGroup size="sm" fontSize="1rem">
                      <InputLeftAddon fontSize="inherit" color="gray.400">
                        https://
                      </InputLeftAddon>
                      <Input
                        // fontSize="1rem"
                        onChange={(e) => setProfilePicURL(e.target.value)}
                        placeholder="www.unsplash.com/1234"
                        value={profilePicURL}
                        type="text"
                        disabled={isLoading}
                        _focus={{ outline: "red" }}
                      />
                    </InputGroup>
                  </Stack>
                </FormControl>
                <FormControl id="coverPhotoURL">
                  <FormHelperText fontSize="inherit" color="gray.600">
                    Cover Photo
                  </FormHelperText>
                  <Stack>
                    <InputGroup size="sm" fontSize="1rem">
                      <InputLeftAddon fontSize="inherit" color="gray.400">
                        https://
                      </InputLeftAddon>
                      <Input
                        onChange={(e) => setCoverPhotoURL(e.target.value)}
                        placeholder="www.unsplash.com/5678"
                        value={coverPhotoURL}
                        type="text"
                        disabled={isLoading}
                        _focus={{ outline: "red" }}
                      />
                    </InputGroup>
                  </Stack>
                </FormControl>
                <FormControl id="aboutBio">
                  <FormHelperText fontSize="inherit" color="gray.600">
                    <Flex
                      alignItems="center"
                      justify="space-between"
                      //   border="red 1px solid"
                    >
                      <Text>Bio&nbsp;</Text>
                      <Text
                        alignSelf="flex-end"
                        //   border="solid green 1px"
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
                        _focus={{ outline: "red" }}
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
                fontFamily={"heading"}
                bgGradient="linear(to-r, red.400,pink.400)"
                color={"white"}
                _hover={{
                  bgGradient: "linear(to-r, red.400,pink.400)",
                  boxShadow: "xl",
                }}
                _focus={{ outline: "none" }}
                type="submit"
                disabled={isLoading || fieldsAreEmpty}
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
            </ModalFooter>
          </ModalContent>
        </form>
      </Modal>
    </>
  );
};

export default EditProfile;
