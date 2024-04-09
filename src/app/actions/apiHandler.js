"use server";

import Anthropic from "@anthropic-ai/sdk";

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const messages = [];

function genPromt({ userName, characters, setting }) {
  return `I'm looking to create a personalized fantasy story. Once upon a time, ${userName} went in search of a mythical ${characters} in ${setting} time. Please keep the story within 250 words.`;
}

export async function claudeApiHandler(params) {
  const { formData, userPrompt } = params;
  console.log("formData: ", formData);
  console.log("userPrompt: ", userPrompt);
  if (formData) {
    const setting = formData.get("setting");
    const characters = formData.get("characters");
    const userName = formData.get("userName");
    const prompt = genPromt({ setting, characters, userName });
    messages.push({ role: "user", content: prompt });
    console.log({ messages, prompt });
  } else if (userPrompt) {
    messages.push({
      role: "user",
      content: userPrompt,
    });
  }

  const msg = await anthropic.messages.create({
    model: "claude-3-haiku-20240307",
    max_tokens: 600,
    system:
      "You are an AI assistant with a passion for creative writing and storytelling. Your task is to to create engaging stories, offering imaginative plot twists and dynamic character development with magical realism.",
    messages,
  });
  // store claude response in array
  const { text } = msg?.content[0] || {};
  if (text) {
    messages.push({ role: "assistant", content: text });
  }
  console.log({ messages });
  return text;
}

export async function resetServerState() {
  messages.length = 0;
}
