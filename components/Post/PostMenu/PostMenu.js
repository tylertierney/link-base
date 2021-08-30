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

import { BsThreeDots } from "react-icons/bs";

import { ViewOffIcon } from "@chakra-ui/icons";
import { ViewIcon } from "@chakra-ui/icons";

const PostMenu = ({ isHidden, setIsHidden }) => {
  return (
    <Menu>
      <MenuButton
        fontSize="0.8rem"
        color="brand.1000"
        _focus={{ outline: "none" }}
      >
        <Button
          size="sm"
          variant="ghost"
          color="gray.500"
          _focus={{ outline: "none" }}
          p="0 0.2rem"
          m="0 0 0 0.3rem"
        >
          <Icon as={BsThreeDots} w={7} h={7} />
        </Button>
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
      </MenuList>
    </Menu>
  );
};

export default PostMenu;
