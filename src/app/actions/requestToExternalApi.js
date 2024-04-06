"use server";

import Anthropic from "@anthropic-ai/sdk";

function genPromt({ userName, characters, setting }) {
  return `I'm looking to create a personalized fantasy story. Once upon a time, ${userName} went in search of a mythical ${characters} in ${setting} time. `;
}

export async function responseFromApi(formData) {
  const setting = formData.get("setting");
  const characters = formData.get("characters");
  const userName = formData.get("userName");
  const prompt = genPromt({ setting, characters, userName });
  const anthropic = new Anthropic({
    apiKey: process.env.ANTHROPIC_API_KEY, // defaults to process.env["ANTHROPIC_API_KEY"]
  });

  const msg = await anthropic.messages.create({
    model: "claude-3-opus-20240229",
    max_tokens: 300,
    system:
      "You are an AI assistant with a passion for creative writing and storytelling. Your task is to to create engaging stories, offering imaginative plot twists and dynamic character development with magical realism.",
    messages: [{ role: "user", content: prompt }],
  });
  console.log(msg);

  return msg;
}
