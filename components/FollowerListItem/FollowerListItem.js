import { Flex, Avatar, Text } from "@chakra-ui/react";

import Link from "next/link";

import { useState } from "react";

import { SpinnerIcon } from "@chakra-ui/icons";

const FollowerListItem = ({ person }) => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Link href={`/user/${person.id}`} passHref>
      <Flex
        align="center"
        borderTop="1px solid gray.400"
        borderBottom="1px solid gray.400"
        backgroundColor="white"
        w="96vw"
        p="0.6rem 0.8rem"
        maxW="600px"
        borderRadius="lg"
        cursor="pointer"
        userSelect="none"
        onClick={() => setIsLoading(true)}
      >
        <Avatar size="xs" mr="1rem" src={person.prof_pic_url} />
        <Text mr="1rem">{person.username}</Text>
        {isLoading ? (
          <SpinnerIcon
            color="gray.500"
            className="spinnerIcon"
            fontSize="1rem"
          ></SpinnerIcon>
        ) : (
          ""
        )}
      </Flex>
    </Link>
  );
};

export default FollowerListItem;
