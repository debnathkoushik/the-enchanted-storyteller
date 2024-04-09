"use client";

import { useFormStatus } from "react-dom";

import { Button } from "@chakra-ui/react";

export function GenStoryButton({ text }) {
  const { pending } = useFormStatus();

  return (
    <Button
      colorScheme="red"
      type="submit"
      aria-disabled={pending}
      isLoading={pending}
      align="right"
    >
      {text}
    </Button>
  );
}
