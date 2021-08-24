import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";

const Logo = () => {
  return (
    <>
      <Flex justify="center" align="center" h={2}>
        <Link href="/" passHref>
          <a>
            <Text
              fontSize={22}
              as="span"
              color="brand.text_dark"
              className="Poppins"
            >
              link
            </Text>
            <Text
              fontSize={22}
              as="span"
              color="brand.text_dark"
              className="Fredoka"
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
