"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@chakra-ui/react";

export function GenStoryButton() {
  const { pending } = useFormStatus();

  return (
    <Button
      colorScheme="blue"
      type="submit"
      ariaDisabled={pending}
      isLoading={pending}
      align="right"
    >
      Generate Story
    </Button>
  );
}
