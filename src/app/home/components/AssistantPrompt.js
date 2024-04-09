import React from "react";
import { Avatar, AvatarBadge, AvatarGroup } from "@chakra-ui/react";
import { Flex, Text } from "@chakra-ui/react";

export default function AssistantPrompt({ story }) {
  if (story === "" || !story) return null;
  return (
    <Flex
      p={2}
      bg={"blue.100"}
      color={"gray.700"}
      borderRadius="lg"
      w="fit-content"
      alignSelf={"flex-start"}
    >
      <Avatar name="Story Teller" size="sm" mr={2} src="/avatar.jpeg" />
      <Text>{story}</Text>
    </Flex>
  );
}
