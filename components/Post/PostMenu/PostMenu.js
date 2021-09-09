import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuIcon,
  MenuDivider,
  Icon,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";

import { BsThreeDots, BsPersonPlus, BsPersonDashFill } from "react-icons/bs";

import { ViewOffIcon } from "@chakra-ui/icons";
import { ViewIcon } from "@chakra-ui/icons";

import { useState, useEffect } from "react";

import axios from "axios";

const PostMenu = ({ isHidden, setIsHidden, postedBy, user }) => {
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    if (user.following === undefined || user.following === null) {
      return;
    }
    if (user.following.includes(postedBy.id)) {
      setIsFollowing(true);
    }
  }, []);

  const handleFollowOrUnfollow = () => {
    let action = "remove";
    if (isFollowing === false) {
      action = "add";
    }

    axios.post(`/api/followuser/${postedBy.id}`, {
      currentuser_id: user.id,
      action: action,
    });

    setIsFollowing(!isFollowing);
  };

  return (
    <Menu>
      <MenuButton
        fontSize="0.8rem"
        _focus={{ outline: "none" }}
        size="sm"
        variant="ghost"
        color="gray.500"
        p="0 0.2rem"
        m="0 0 0 0.3rem"
      >
        <Icon as={BsThreeDots} w={7} h={7} />
      </MenuButton>
      <MenuList>
        <MenuItem onClick={() => setIsHidden(!isHidden)}>
          <Flex align="center">
            {isHidden ? (
              <>
                <ViewIcon></ViewIcon>
                <Text>&nbsp;&nbsp;Show Post</Text>
              </>
            ) : (
              <>
                <ViewOffIcon></ViewOffIcon>
                <Text>&nbsp;&nbsp;Hide Post</Text>
              </>
            )}
          </Flex>
        </MenuItem>
        <MenuItem onClick={() => handleFollowOrUnfollow()}>
          <Flex align="center">
            {isFollowing ? (
              <>
                <BsPersonDashFill />
                <Text>&nbsp;&nbsp;Unfollow</Text>
              </>
            ) : (
              <>
                <BsPersonPlus />
                <Text>&nbsp;&nbsp;Follow</Text>
              </>
            )}
          </Flex>
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default PostMenu;
