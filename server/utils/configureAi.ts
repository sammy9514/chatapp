// utils/configureAi.ts
import Configuration from "openai";

export const configureAi = () => {
  return new Configuration({
    apiKey: process.env.OPENAI_API_KEY, // Ensure this is set in your environment variables
  });
};
