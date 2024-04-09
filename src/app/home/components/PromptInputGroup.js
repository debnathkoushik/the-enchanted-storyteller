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
          <InputGroup size="md" borderColor={"red.100"}>
            <Input
              pr="4.5rem"
              type="text"
              onChange={handleUserPrompt}
              name="userPrompt"
              id="userPrompt"
              value={userPrompt}
              focusBorderColor={"red.200"}
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
      colorScheme="red"
      variant="outline"
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
