import React from "react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Flex, Text } from "@chakra-ui/react";

export default function UserPrompt({ name, prompt }) {
  if (prompt === "" || !prompt) return null;
  return (
    <Flex
      p={2}
      color={"gray.700"}
      bg={"gray.100"}
      borderRadius="lg"
      w="fit-content"
      alignSelf={"flex-end"}
    >
      <Text>{prompt}</Text>
      <Avatar name={name} size="sm" ml={2} />
    </Flex>
  );
}
