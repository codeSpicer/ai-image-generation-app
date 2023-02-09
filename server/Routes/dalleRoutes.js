// Imports and configs
import express from "express";
import * as dotenv from "dotenv";
import { OpenAIApi, Configuration } from "openai";
import Post from "../mongoDB/models/post.js";
dotenv.config();

// constants
const router = express.Router();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_KEY,
});

const openai = new OpenAIApi(configuration);

// Get requests
router.route("/").get((req, res) => {
  res.send("Hello from dalleeee");
});

// Post requests
router.route("/").post(async (req, res) => {
  try {
    const { prompt } = req.body;
    const aiResponse = await openai.createImage({
      prompt,
      n: 1,
      size: "1024x1024",
      response_format: "b64_json",
    });

    const image = aiResponse.data.data[0].b64_json;
    res.status(200).json({ photo: image });
  } catch (error) {
    console.log(error);
    res.status(500).send(error?.response.data.error.message);
  }
});

export default router;
