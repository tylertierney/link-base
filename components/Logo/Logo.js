import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";

const Logo = ({ isGuest }) => {
  return (
    <>
      <Flex
        as="button"
        _focus={{ outline: "none", boxShadow: "none" }}
        justify="center"
        align="center"
        h={2}
        userSelect="none"
      >
        <Link href={isGuest ? "/welcome" : "/"} passHref>
          <a style={{ textDecoration: "none" }}>
            <Text
              fontSize={22}
              as="span"
              color="brand.text_dark"
              backgroundColor="transparent"
            >
              link
            </Text>
            <Text
              fontSize={22}
              as="span"
              color="brand.text_dark"
              className="Fredoka"
              backgroundColor="transparent"
            >
              Base
            </Text>
          </a>
        </Link>
      </Flex>
    </>
  );
};

export default Logo;
