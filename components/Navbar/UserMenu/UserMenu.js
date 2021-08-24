import { Flex, Text, Button, Icon } from "@chakra-ui/react";
import { ChevronDownIcon, CheckCircleIcon } from "@chakra-ui/icons";

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
  const { user, login, logout } = useUser();

  const accountIcon = <Icon as={VscAccount} w={5} h={5} />;
  const signoutIcon = <Icon as={BiLogOut} w={5} h={5} />;

  return (
    <>
      <Menu>
        <MenuButton fontSize="0.8rem">
          <Flex
            justify="center"
            align="center"
            fontSize="0.8rem"
            cursor="pointer"
            userSelect="none"
          >
            <Text as="span">{user ? user.email : "no_user"}</Text>
            <ChevronDownIcon w={5} h={5} pt="2px" />
          </Flex>
        </MenuButton>
        <MenuList>
          <MenuItem icon={accountIcon}>Account</MenuItem>
          <MenuItem onClick={logout} icon={signoutIcon}>
            Log Out
          </MenuItem>
        </MenuList>
      </Menu>
    </>
  );
};

export default UserMenu;
