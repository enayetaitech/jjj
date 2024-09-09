import { MdAlternateEmail } from "react-icons/md";
import { IoLogoTiktok } from "react-icons/io5";
import { FaPlay, FaYoutube } from "react-icons/fa";
import audio1 from "../assets/alloy.mp3";
import audio2 from "../assets/echo.mp3";
import audio3 from "../assets/onyx.mp3";

// export const serverbaseURL='https://automovies.click/api/';
export const serverbaseURL = "http://localhost:3000/";
export const durationOptions = [
  { id: 1, name: "30 to 60 seconds" },
  { id: 2, name: "60 to 90 seconds" },
];

export const destinationOptions = [
  { id: 1, icon: <MdAlternateEmail />, name: "Email Me Instead" },
  // { id: 2, icon: <IoLogoTiktok />, name: 'Link a TikTok Account' },
  { id: 3, icon: <FaYoutube />, name: "Link a YouTube Account" },
];

export const languageOptions = [
  { id: 1, name: "English US" },
  { id: 2, name: "Czech CZ" },
  { id: 3, name: "Danish DK" },
  { id: 4, name: "Dutch UL" },
  { id: 5, name: "French FR" },
  { id: 6, name: "German DE" },
  { id: 7, name: "Greek GR" },
  { id: 8, name: "Hindi IN" },
  { id: 9, name: "Indonesian ID" },
  { id: 10, name: "Italian IT" },
  { id: 11, name: "Japanese JP" },
  { id: 12, name: "Norwegian NO" },
  { id: 13, name: "Polish PL" },
  { id: 14, name: "Portuguese PT" },
  { id: 15, name: "Russian RU" },
  { id: 16, name: "Spanish ES" },
  { id: 17, name: "Swedish SE" },
  { id: 18, name: "Turkish TR" },
  { id: 19, name: "Ukrainian UA" },
];

export const ChannelPrompts = {
  History: {
    storyPrompt:
      "Please only respond with script. Create a 60-second script about a lesser-known but fascinating historical event. Include a surprising fact and explain its impact on modern society.Please only mention the story and nothing else.",
    ImageGenPrompt: `Please respond with json only. Please analyze the following story JSON and create compelling, vivid image generation prompts for each scene. Follow these guidelines:

Focus on the most visually striking elements of each scene.
Use descriptive language that captures the mood, atmosphere, and key details.
Include relevant style descriptors (e.g., photorealistic, cinematic, animated, etc.) when appropriate.
Avoid complex compositions or split screens; keep each prompt focused on a single, impactful image.
Incorporate relevant color palettes or lighting conditions to enhance the visual appeal.
When characters are involved, describe their appearance, expression, or action succinctly.
Please provide your response in the following JSON format:

{ "storyToSceneMapping": [ { "index": 1, "words": "Four words from text", "ImageGeneratingDetailedPrompt": "Vivid, detailed image prompt" }, ... ] }

Aim to create image prompts that would result in visually stunning and emotionally engaging illustrations for each scene in the story.
`,
  },
  Ocean: {
    storyPrompt:
      "Please only respond with script. Write a brief, engaging script about an unusual deep-sea creature. Describe its unique features and how it has adapted to life in the ocean's depths.",
    ImageGenPrompt: `Please respond with json only. Please analyze the following story JSON and create compelling, vivid image generation prompts for each scene. Follow these guidelines:

Focus on the most visually striking elements of each scene.
Use descriptive language that captures the mood, atmosphere, and key details.
Include relevant style descriptors (e.g., photorealistic, cinematic, animated, etc.) when appropriate.
Avoid complex compositions or split screens; keep each prompt focused on a single, impactful image.
Incorporate relevant color palettes or lighting conditions to enhance the visual appeal.
When characters are involved, describe their appearance, expression, or action succinctly.
Please provide your response in the following JSON format:

{ "storyToSceneMapping": [ { "index": 1, "words": "Four words from text", "ImageGeneratingDetailedPrompt": "Vivid, detailed image prompt" }, ... ] }

Aim to create image prompts that would result in visually stunning and emotionally engaging illustrations for each scene in the story.
`,
  },
  Conspiracytheories: {
    storyPrompt:
      "Please only respond with script. Develop a short script presenting a popular conspiracy theory. Briefly explain the theory, mention why some people believe it, and end with a thought-provoking question.",
    ImageGenPrompt: `Please respond with json only. Please analyze the following story JSON and create compelling, vivid image generation prompts for each scene. Follow these guidelines:

Focus on the most visually striking elements of each scene.
Use descriptive language that captures the mood, atmosphere, and key details.
Include relevant style descriptors (e.g., photorealistic, cinematic, animated, etc.) when appropriate.
Avoid complex compositions or split screens; keep each prompt focused on a single, impactful image.
Incorporate relevant color palettes or lighting conditions to enhance the visual appeal.
When characters are involved, describe their appearance, expression, or action succinctly.
Please provide your response in the following JSON format:

{ "storyToSceneMapping": [ { "index": 1, "words": "Four words from text", "ImageGeneratingDetailedPrompt": "Vivid, detailed image prompt" }, ... ] }

Aim to create image prompts that would result in visually stunning and emotionally engaging illustrations for each scene in the story.
`,
  },
  Stoicism: {
    storyPrompt:
      "Please only respond with script. Craft a concise script explaining a key Stoic principle and how it can be applied to everyday modern life. Include a relevant quote from a famous Stoic philosopher.",
    ImageGenPrompt: `Please respond with json only. Please analyze the following story JSON and create compelling, vivid image generation prompts for each scene. Follow these guidelines:

Focus on the most visually striking elements of each scene.
Use descriptive language that captures the mood, atmosphere, and key details.
Include relevant style descriptors (e.g., photorealistic, cinematic, animated, etc.) when appropriate.
Avoid complex compositions or split screens; keep each prompt focused on a single, impactful image.
Incorporate relevant color palettes or lighting conditions to enhance the visual appeal.
When characters are involved, describe their appearance, expression, or action succinctly.
Please provide your response in the following JSON format:

{ "storyToSceneMapping": [ { "index": 1, "words": "Four words from text", "ImageGeneratingDetailedPrompt": "Vivid, detailed image prompt" }, ... ] }

Aim to create image prompts that would result in visually stunning and emotionally engaging illustrations for each scene in the story.
`,
  },
  Motivation: {
    storyPrompt:
      "Please only respond with script. Write an inspiring 60-second script that tells a brief story of someone overcoming a significant obstacle. End with a powerful motivational message for viewers.",
    ImageGenPrompt: `Please respond with json only. Please analyze the following story JSON and create compelling, vivid image generation prompts for each scene. Follow these guidelines:

Focus on the most visually striking elements of each scene.
Use descriptive language that captures the mood, atmosphere, and key details.
Include relevant style descriptors (e.g., photorealistic, cinematic, animated, etc.) when appropriate.
Avoid complex compositions or split screens; keep each prompt focused on a single, impactful image.
Incorporate relevant color palettes or lighting conditions to enhance the visual appeal.
When characters are involved, describe their appearance, expression, or action succinctly.
Please provide your response in the following JSON format:

{ "storyToSceneMapping": [ { "index": 1, "words": "Four words from text", "ImageGeneratingDetailedPrompt": "Vivid, detailed image prompt" }, ... ] }

Aim to create image prompts that would result in visually stunning and emotionally engaging illustrations for each scene in the story.
`,
  },
  GOTHaryPotterMatrixCult: {
    storyPrompt:
      "Please only respond with script. Create a short script that combines elements from Game of Thrones, Harry Potter, The Matrix, and cult classics. Focus on a shared theme or concept that appears in all of these works, and explain its significance.",
    ImageGenPrompt: `Please respond with json only. Please analyze the following story JSON and create compelling, vivid image generation prompts for each scene. Follow these guidelines:

Focus on the most visually striking elements of each scene.
Use descriptive language that captures the mood, atmosphere, and key details.
Include relevant style descriptors (e.g., photorealistic, cinematic, animated, etc.) when appropriate.
Avoid complex compositions or split screens; keep each prompt focused on a single, impactful image.
Incorporate relevant color palettes or lighting conditions to enhance the visual appeal.
When characters are involved, describe their appearance, expression, or action succinctly.
Please provide your response in the following JSON format:

{ "storyToSceneMapping": [ { "index": 1, "words": "Four words from text", "ImageGeneratingDetailedPrompt": "Vivid, detailed image prompt" }, ... ] }

Aim to create image prompts that would result in visually stunning and emotionally engaging illustrations for each scene in the story.
`,
  },
};

export const contentOptions = [
  { id: 1, name: "AI Anecdotes" },
  { id: 2, name: "Spooky Tales" },
  { id: 3, name: "Uplifting Moments" },
  { id: 4, name: "Nighttime Narratives" },
  { id: 5, name: "Historical Highlights" },
  { id: 6, name: "Fascinating Facts" },
  { id: 7, name: "Extended Laughs" },
  { id: 8, name: "Life Hacks" },
  { id: 9, name: "Simplified Insights" },
  { id: 10, name: "Deep Thoughts" },
  { id: 11, name: "Marketing Mastery" },
  // { id: 12,  name: 'Custom' },
];

export const narrationOptions = [
  { id: 1, icon: <FaPlay />, name: "Reverberate", audio: audio1 },
  { id: 2, icon: <FaPlay />, name: "Metal", audio: audio2 },
  { id: 3, icon: <FaPlay />, name: "Obsidian", audio: audio3 },
  { id: 4, icon: <FaPlay />, name: "Myth", audio: audio3 },
  { id: 5, icon: <FaPlay />, name: "Supernova", audio: audio3 },
  { id: 6, icon: <FaPlay />, name: "Glimmer", audio: audio3 },
];
