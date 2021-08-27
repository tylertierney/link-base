import { Flex, Text, Button, Icon } from "@chakra-ui/react";
import { ChevronDownIcon, CheckCircleIcon } from "@chakra-ui/icons";

import Link from "next/link";

import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuIcon,
  MenuCommand,
  MenuDivider,
} from "@chakra-ui/react";
import { BiLogOut } from "react-icons/bi";
import { VscAccount } from "react-icons/vsc";

import { useUser } from "../../../context/authContext";

const UserMenu = () => {
  const { user, login, signup, error, logout } = useUser();

  const accountIcon = <Icon as={VscAccount} fontSize="0.8rem" />;
  const signoutIcon = <Icon as={BiLogOut} fontSize="0.8rem" />;

  return (
    <>
      <Menu>
        <MenuButton
          fontSize="0.8rem"
          color="brand.1000"
          // _focus={{ outline: "none" }}
        >
          <Flex
            justify="center"
            align="center"
            fontSize="0.8rem"
            cursor="pointer"
            userSelect="none"
          >
            <Text as="span" color="inherit">
              {user ? user.user_metadata.username : "no_user"}
            </Text>
            <ChevronDownIcon color="inherit" w={5} h={5} />
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem align="center" fontSize="0.8rem">
            <Flex align="center">
              {accountIcon}
              <Link href={`/${user.id}`}>&nbsp;&nbsp;Account</Link>
            </Flex>
          </MenuItem>
          <MenuDivider />
          <MenuItem fontSize="0.8rem" onClick={logout}>
            <Flex align="center">{signoutIcon}&nbsp;&nbsp;Log Out</Flex>
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserMenu;
