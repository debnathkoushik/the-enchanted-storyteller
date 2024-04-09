"use client";

export default function fetchAndDisplayStory(FormData) {
  //console.log("formData from fetchAndDisplayStory: ", FormData);
  //   const [story, setStory] = useState("");

  //   async function onSubmitForm(formData) {
  //     const response = await responseFromApi(formData);
  //     console.log({ response });
  //     const story = response?.content[0]?.text;
  //     setStory(story);
  //   }

  //onSubmitForm();

  return (
    <>
      <div>I will tell you a story</div>
      {/* <Grid
        templateAreas={`"header header"
                  "main main"`}
        gridTemplateRows={"50px 1fr"}
        gridTemplateColumns={"1fr"}
        h="200px"
        gap="1"
        color="blackAlpha.700"
        fontWeight="bold"
      >
        <GridItem pl="2" area={"main"}>
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
      </Grid> */}

      {/* End of grid */}
    </>
  );
}
