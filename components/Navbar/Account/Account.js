import { Flex, Text, Button } from "@chakra-ui/layout";
import { ChevronDownIcon } from "@chakra-ui/icons";

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

import { useUser } from "../../../context/authContext";

const Account = () => {
  const { user, login, logout } = useUser();

  return (
    <>
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
      {/* <Menu>
        <MenuButton as={<ChevronDownIcon w={5} h={5} pt="2px" />}>
          
        </MenuButton>
        <MenuList>
          <MenuItem>Download</MenuItem>
          <MenuItem>Create a Copy</MenuItem>
          <MenuItem>Mark as Draft</MenuItem>
          <MenuItem>Delete</MenuItem>
          <MenuItem>Attend a Workshop</MenuItem>
        </MenuList>
      </Menu> */}
    </>
  );
};

export default Account;
