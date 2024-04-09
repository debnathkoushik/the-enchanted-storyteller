"use client";

import { useFormStatus } from "react-dom";

import {
  Box,
  Button,
  InputGroup,
  FormControl,
  Input,
  InputRightElement,
} from "@chakra-ui/react";

export default function PromptInputGroup({
  handleUserPrompt,
  text,
  onSubmitUserPrompt,
  userPrompt = "",
}) {
  return (
    <Box p={1}>
      <form key="storyForm" action={onSubmitUserPrompt}>
        <FormControl isRequired>
          <InputGroup size="md">
            <Input
              pr="4.5rem"
              type="text"
              onChange={handleUserPrompt}
              name="userPrompt"
              id="userPrompt"
              value={userPrompt}
            />
            <InputRightElement width="6rem">
              <ContinueStoryBtn />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </form>
    </Box>
  );
}

function ContinueStoryBtn() {
  const { pending } = useFormStatus();

  return (
    <Button
      colorScheme="blue"
      type="submit"
      aria-disabled={pending}
      isLoading={pending}
      align="right"
      size={"sm"}
    >
      Continue
    </Button>
  );
}
