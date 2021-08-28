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

import { useUser } from "../../../context/authContext";

import { useState } from "react";

const UserMenu = () => {
  const { user, login, signup, error, logout } = useUser();

  const [menuIsOpen, setMenuIsOpen] = useState();

  const accountIcon = <Icon as={VscAccount} fontSize="0.8rem" />;
  const signoutIcon = <Icon as={BiLogOut} fontSize="0.8rem" />;

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
                <Text as="span" color="inherit">
                  {user.user_metadata.username}
                </Text>
                {isOpen ? (
                  <ChevronUpIcon color="inherit" w={5} h={5} />
                ) : (
                  <ChevronDownIcon color="inherit" w={5} h={5} />
                )}
              </Flex>
            </MenuButton>
            <MenuList>
              <Link passHref href={`/${user.id}`}>
                <MenuItem align="center" fontSize="0.8rem">
                  <Flex align="center">
                    {accountIcon}
                    &nbsp;&nbsp;Account
                  </Flex>
                </MenuItem>
              </Link>
              <MenuDivider />
              <Link passHref href={`/${user.id}`}>
                <MenuItem fontSize="0.8rem" onClick={logout}>
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
