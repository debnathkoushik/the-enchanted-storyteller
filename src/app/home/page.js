"use client";

import { useFormState } from "react-dom";
import { useState } from "react";
import {
  Grid,
  GridItem,
  Center,
  Select,
  Input,
  Container,
  Box,
  FormControl,
  FormLabel,
  FormHelperText,
} from "@chakra-ui/react";

import { responseFromApi } from "@/app/actions/requestToExternalApi";
import { GenStoryButton } from "@/app/home/components/GenStoryButton";
import { capitalizeFirstLetter } from "@/app/home/utils";

const characters = ["dragon", "spells", "wizard"];
const settings = ["ancient", "medieval", "retro"];

export default function ArticleComment({ initialState }) {
  const [state, formAction] = useFormState(responseFromApi, {});

  const [input, setInput] = useState("");
  const handleInputChange = (e) => setInput(e.target.value);

  const [story, setStory] = useState("");

  async function onSubmitForm(formData) {
    console.log({ formData });
    console.log("setting: ", formData.get("setting"));
    console.log("userName: ", formData.get("userName"));
    console.log("characters: ", formData.get("characters"));
    const response = await responseFromApi(formData);
    console.log({ response });
    const story = response?.content[0]?.text;
    setStory(story);
  }

  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "main main"`}
        gridTemplateRows={"50px 1fr"}
        gridTemplateColumns={"1fr"}
        h="200px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="orange.300" area={"header"}>
          <Center mt={3} mb={1}>
            Enchanted Story
          </Center>
        </GridItem>

        <GridItem pl="2" area={"main"}>
          <Container maxW="lg">
            <Box borderWidth="5px" borderRadius="lg" maxW="lg" p={1}>
              <form action={onSubmitForm}>
                <FormControl mb={3} isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input
                    id="userName"
                    name="userName"
                    value={input}
                    placeholder="Example: Rahul"
                    size="sm"
                    mb={1}
                    onChange={handleInputChange}
                  />
                  <FormHelperText>
                    Enter a username and get started!
                  </FormHelperText>
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>Characters</FormLabel>
                  <Select name="characters" id="characters" size="sm" mb={1}>
                    {characters.map((c) => (
                      <option value={c}>{capitalizeFirstLetter(c)}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>Setting</FormLabel>
                  <Select name="setting" id="setting" size="sm" mb={1}>
                    {settings.map((c) => (
                      <option value={c}>{capitalizeFirstLetter(c)}</option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <GenStoryButton />
                </FormControl>
              </form>
            </Box>
          </Container>

          {story && (
            <Container>
              <Box
                style={{
                  whiteSpace: "pre-line",
                }}
                m={2}
                p={2}
                borderWidth="5px"
                borderRadius="lg"
              >
                {story}
              </Box>
            </Container>
          )}
        </GridItem>
      </Grid>

      {/* End of grid */}
    </>
  );
}
