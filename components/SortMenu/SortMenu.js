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
  Button,
  Text,
  Flex,
  Icon,
} from "@chakra-ui/react";

import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import { BiTimeFive } from "react-icons/bi";
import { FaFireAlt } from "react-icons/fa";

import sortstyles from "./sortmenu.module.css";

const SortMenu = ({ textcolor, sortingBy, setSortingBy }) => {
  return (
    <Menu autoSelect={false}>
      {({ isOpen }) => (
        <>
          <MenuButton
            // position="absolute"
            // top="0.4rem"
            // transform="translate(0, -50%)"
            fontSize="0.7rem"
            color={textcolor === "dark" ? "gray.400" : "whiteAlpha.800"}
            _focus={{ outline: "none" }}
            // className={sortstyles.menubutton}
          >
            <Flex align="center">
              <Text>Sort</Text>
              <Text>:&nbsp;</Text>
              <Text className={sortstyles.menutext}>
                {sortingBy === "new" ? "New" : "Popular"}
              </Text>
              {isOpen ? <ChevronUpIcon /> : <ChevronDownIcon />}
            </Flex>
          </MenuButton>
          <MenuList>
            <MenuItem onClick={() => setSortingBy("popular")}>
              <Flex align="center" w="100%" justify="flex-start">
                <Icon as={FaFireAlt} mr="0.3rem" />
                <Text>Popular</Text>
              </Flex>
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={() => setSortingBy("new")}>
              <Flex align="center" w="100%" justify="flex-start">
                <Icon as={BiTimeFive} mr="0.3rem" />
                <Text>New</Text>
              </Flex>
            </MenuItem>
          </MenuList>
        </>
      )}
    </Menu>
  );
};

export default SortMenu;
