import { Flex, Text, Button, Icon } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import Link from "next/link";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuGroup,
  MenuIcon,
  MenuDivider,
} from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";
import { FaUserFriends } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";

import { useUser } from "../../../context/authContext";

import { useState } from "react";

import { SpinnerIcon } from "@chakra-ui/icons";

const UserMenu = ({ isGuest }) => {
  const { user, login, signup, error, logout, setUser } = useUser();

  const [menuIsOpen, setMenuIsOpen] = useState();

  const accountIcon = <Icon as={VscAccount} fontSize="0.8rem" />;
  const signoutIcon = <Icon as={BiLogOut} fontSize="0.8rem" />;
  const followingIcon = <Icon as={FaUserFriends} fontSize="0.8rem" />;
  const followersIcon = <Icon as={HiOutlineUsers} fontSize="0.8rem" />;

  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton
              fontSize="0.8rem"
              color="brand.1000"
              _focus={{ outline: "none" }}
            >
              <Flex
                justify="center"
                align="center"
                fontSize="0.8rem"
                cursor="pointer"
                userSelect="none"
              >
                {isLoading ? (
                  <SpinnerIcon
                    color="brand.600"
                    className="spinnerIcon"
                    fontSize="1rem"
                  ></SpinnerIcon>
                ) : (
                  ""
                )}
                <Text ml="0.4rem" as="span" color="inherit">
                  {user.username}
                </Text>
                {isOpen ? (
                  <ChevronUpIcon color="inherit" w={5} h={5} />
                ) : (
                  <ChevronDownIcon color="inherit" w={5} h={5} />
                )}
              </Flex>
            </MenuButton>
            <MenuList>
              {isGuest ? (
                <Link passHref href={`/user/guest`}>
                  <MenuItem
                    align="center"
                    fontSize="0.8rem"
                    onClick={() => setIsLoading(true)}
                  >
                    <Flex align="center">
                      {accountIcon}
                      &nbsp;&nbsp;Account
                    </Flex>
                  </MenuItem>
                </Link>
              ) : (
                <Link href={`/user/${user.id}`} passHref>
                  <MenuItem
                    align="center"
                    fontSize="0.8rem"
                    onClick={() => setIsLoading(true)}
                  >
                    <Flex align="center">
                      {accountIcon}
                      &nbsp;&nbsp;Account
                    </Flex>
                  </MenuItem>
                </Link>
              )}
              <MenuDivider />
              <Link passHref href="/following">
                <MenuItem fontSize="0.8rem" onClick={() => setIsLoading(true)}>
                  <Flex align="center">
                    {followingIcon}&nbsp;&nbsp;Following
                  </Flex>
                </MenuItem>
              </Link>
              <MenuDivider />
              <Link passHref href="/followers">
                <MenuItem fontSize="0.8rem" onClick={() => setIsLoading(true)}>
                  <Flex align="center">
                    {followersIcon}&nbsp;&nbsp;Followers
                  </Flex>
                </MenuItem>
              </Link>
              <MenuDivider />
              <Link passHref href="/">
                <MenuItem
                  fontSize="0.8rem"
                  // onClick={isGuest ? setUser(null) : logout}
                  onClick={logout}
                >
                  <Flex align="center">{signoutIcon}&nbsp;&nbsp;Log Out</Flex>
                </MenuItem>
              </Link>
            </MenuList>
          </>
        )}
      </Menu>
    </>
  );
};

export default UserMenu;
