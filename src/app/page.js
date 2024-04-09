"use client";

import { useState, Fragment } from "react";
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
  Flex,
  Card,
} from "@chakra-ui/react";

import { claudeApiHandler } from "@/app/actions/apiHandler";
import { GenStoryButton } from "@/app/home/components/GenStoryButton";
import { capitalizeFirstLetter } from "@/app/home/utils";
import UserPrompt from "@/app/home/components/UserPrompt";
import AssistantPrompt from "@/app/home/components/AssistantPrompt";
import PromptInputGroup from "@/app/home/components/PromptInputGroup";

const characters = ["dragon", "spells", "wizard"];
const settings = ["ancient", "medieval", "retro"];

export default function MainUi() {
  const [input, setInput] = useState("");
  const [renderStory, setRenderStory] = useState(false);
  const [story, setStory] = useState([]); // LLM response array
  const [userPrompt, setUserPrompt] = useState("");
  const [userName, setUserName] = useState(null);
  const [promptContainer, setPromptContainer] = useState([]); // store previous prompts

  const handleInputChange = (e) => setInput(e.target.value);

  // for handling changes in Input field for story continuation
  const handleUserPrompt = (e) => setUserPrompt(e.target.value);

  // for initial story generation
  async function onSubmitForm(formData) {
    // storing the initial prompt
    setPromptContainer([
      {
        role: "user",
        content: `I'm looking to create a personalized fantasy story. Once upon a time, ${formData.get(
          "userName"
        )} went in search of a mythical ${formData.get(
          "characters"
        )} in ${formData.get("setting")} time. `,
      },
    ]);
    setUserName(formData.get("userName"));
    await claudeApiHandler({ formData }).then((response) => {
      setStory([
        ...story,
        {
          role: "assistant",
          content: response,
        },
      ]);
      setRenderStory(true);
    });
  }

  // for continuing the story
  async function onSubmitUserPrompt(prompt) {
    const userPrompt = prompt.get("userPrompt");
    setPromptContainer([
      ...promptContainer,
      { role: "user", content: userPrompt },
    ]);
    await claudeApiHandler({ userPrompt }).then((response) => {
      setStory([
        ...story,
        {
          role: "assistant",
          content: response,
        },
      ]);
    });
  }

  return (
    <>
      <Grid
        templateAreas={`"header header"
                  "main main"`}
        gridTemplateRows={"50px 1fr"}
        gridTemplateColumns={"1fr"}
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" bg="orange.300" area={"header"}>
          <Center mt={3} mb={1}>
            Enchanted Story
          </Center>
        </GridItem>
      </Grid>
      {!renderStory ? (
        <GridItem pl="2" area={"main"}>
          <Container maxW="lg">
            <Box borderWidth="5px" borderRadius="lg" maxW="lg" p={1}>
              <form key="inputForm" action={onSubmitForm}>
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
                    {characters.map((c, i) => (
                      <option key={i} value={c}>
                        {capitalizeFirstLetter(c)}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl mb={3}>
                  <FormLabel>Setting</FormLabel>
                  <Select name="setting" id="setting" size="sm" mb={1}>
                    {settings.map((c, i) => (
                      <option key={i} value={c}>
                        {capitalizeFirstLetter(c)}
                      </option>
                    ))}
                  </Select>
                </FormControl>
                <FormControl>
                  <GenStoryButton text={"Generate Story"} />
                </FormControl>
              </form>
            </Box>
          </Container>
        </GridItem>
      ) : (
        <GridItem pl="2" area={"main"}>
          <Container
            style={{
              whiteSpace: "pre-line",
              height: "calc(100vh - 150px)",
            }}
            m={2}
            mx={"auto"}
            p={0}
            w="100%"
            borderWidth="2px"
            borderRadius="lg"
          >
            <Flex
              id="story"
              rowGap={2}
              direction={"column"}
              style={{ height: "100%" }}
            >
              <Card p={1} overflow="auto" direction="column" rowGap={2}>
                {story.map((eachStory, i) => {
                  return (
                    <Fragment key={i}>
                      <AssistantPrompt story={eachStory.content} />
                      <UserPrompt
                        name={userName}
                        prompt={promptContainer[i + 1]?.content}
                      />
                    </Fragment>
                  );
                })}
              </Card>
              <PromptInputGroup
                handleUserPrompt={handleUserPrompt}
                onSubmitUserPrompt={onSubmitUserPrompt}
                userPrompt={userPrompt}
              />
            </Flex>
          </Container>
        </GridItem>
      )}
      {/* End of grid */}
    </>
  );
}
