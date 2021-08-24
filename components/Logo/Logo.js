import { Flex, Text } from "@chakra-ui/react";
import Link from "next/link";
import Head from "next/head";

const Logo = () => {
  return (
    <>
      {/* <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&display=swap"
          rel="stylesheet"
        />
      </Head> */}
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
