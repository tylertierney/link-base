import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import { FaUserFriends } from "react-icons/fa";
import { IoMdGlobe } from "react-icons/io";

import tabstyles from "./tabmenu.module.css";

const TabMenu = ({ tabSelection, setTabSelection }) => {
  const textcolor = "light";

  return (
    <Menu autoSelect={false}>
      {({ isOpen }) => (
        <>
          <MenuButton
            position="absolute"
            // right="-60%"
            top="0.4rem"
            transform="translate(0, -50%)"
            fontSize="0.7rem"
            color={textcolor === "dark" ? "gray.400" : "whiteAlpha.600"}
            _focus={{ outline: "none" }}
            className={tabstyles.menubutton}
          >
            <Flex align="center">
              <Text
              //   className={tabstyles.menutext}
              >
                {tabSelection}
              </Text>
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setTabSelection("Discover")}>
              <Flex align="center" w="100%" justify="flex-start">
                <Icon as={IoMdGlobe} mr="0.3rem" />
                <Text>Discover</Text>
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => setTabSelection("Your Feed")}>
              <Flex align="center" w="100%" justify="flex-start">
                <Icon as={FaUserFriends} mr="0.3rem" />
                <Text>Your Feed</Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default TabMenu;
